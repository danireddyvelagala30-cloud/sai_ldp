import sqlite3
import json
import time
import hashlib
import logging
from typing import List, Dict, Any, Optional, Tuple
import numpy as np

from src.config import (
    CACHE_DB_PATH,
    EXACT_CACHE_ENABLED,
    SEMANTIC_CACHE_ENABLED,
    SEMANTIC_CACHE_THRESHOLD,
    CACHE_TTL_SECONDS
)

logger = logging.getLogger(__name__)

class MultiTierCache:
    def __init__(self, db_path: str = CACHE_DB_PATH):
        self.db_path = db_path
        self.memory_exact_cache: Dict[str, Dict[str, Any]] = {}
        self.semantic_cache_entries: List[Dict[str, Any]] = []
        self.embedding_cache: Dict[str, List[float]] = {}
        self.web_doc_cache: Dict[str, Dict[str, Any]] = {}

        self.metrics = {
            "total_queries": 0,
            "exact_hits": 0,
            "semantic_hits": 0,
            "misses": 0,
            "saved_latency_ms": 0.0
        }

        self._init_db()
        self._load_semantic_cache()

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path, timeout=10)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self):
        with self._get_connection() as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS exact_query_cache (
                    cache_key TEXT PRIMARY KEY,
                    query_text TEXT NOT NULL,
                    partitions_key TEXT,
                    response_json TEXT NOT NULL,
                    created_at REAL NOT NULL,
                    hit_count INTEGER DEFAULT 1,
                    original_latency_ms REAL DEFAULT 0.0
                );
            """)
            conn.execute("""
                CREATE TABLE IF NOT EXISTS semantic_query_cache (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    query_text TEXT NOT NULL,
                    partitions_key TEXT,
                    vector_json TEXT NOT NULL,
                    response_json TEXT NOT NULL,
                    created_at REAL NOT NULL,
                    hit_count INTEGER DEFAULT 0,
                    original_latency_ms REAL DEFAULT 0.0
                );
            """)
            conn.execute("CREATE INDEX IF NOT EXISTS idx_exact_key ON exact_query_cache(cache_key);")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_semantic_parts ON semantic_query_cache(partitions_key);")

    def _compute_key(self, query: str, partitions: Optional[List[str]] = None, filter_str: Optional[str] = None) -> str:
        norm_query = query.strip().lower()
        parts_str = ",".join(sorted(partitions)) if partitions else "all"
        filt_str = filter_str or "none"
        raw = f"{norm_query}|{parts_str}|{filt_str}"
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()

    def _load_semantic_cache(self):
        try:
            with self._get_connection() as conn:
                rows = conn.execute("""
                    SELECT query_text, partitions_key, vector_json, response_json, created_at, original_latency_ms
                    FROM semantic_query_cache
                    ORDER BY created_at DESC
                    LIMIT 200
                """).fetchall()

                self.semantic_cache_entries = []
                now = time.time()
                for r in rows:
                    if (now - r["created_at"]) > CACHE_TTL_SECONDS:
                        continue
                    vec = np.array(json.loads(r["vector_json"]), dtype=np.float32)
                    norm = np.linalg.norm(vec)
                    if norm > 0:
                        vec = vec / norm
                    resp = json.loads(r["response_json"])
                    self.semantic_cache_entries.append({
                        "query": r["query_text"],
                        "partitions_key": r["partitions_key"],
                        "vector": vec,
                        "response": resp,
                        "created_at": r["created_at"],
                        "latency_ms": r["original_latency_ms"]
                    })
        except Exception as e:
            logger.warning(f"Could not load semantic cache: {e}")

    def get_exact(
        self,
        query: str,
        partitions: Optional[List[str]] = None,
        filter_str: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        if not EXACT_CACHE_ENABLED:
            return None

        key = self._compute_key(query, partitions, filter_str)
        now = time.time()

        if key in self.memory_exact_cache:
            entry = self.memory_exact_cache[key]
            if (now - entry["created_at"]) <= CACHE_TTL_SECONDS:
                self.metrics["exact_hits"] += 1
                self.metrics["saved_latency_ms"] += entry.get("original_latency_ms", 1200.0)
                resp = dict(entry["response"])
                resp["cache_hit_type"] = "Tier 1: Exact Match"
                resp["cache_latency_ms"] = 0.5
                return resp
            else:
                del self.memory_exact_cache[key]

        try:
            with self._get_connection() as conn:
                row = conn.execute(
                    "SELECT response_json, created_at, original_latency_ms FROM exact_query_cache WHERE cache_key = ?",
                    (key,)
                ).fetchone()

                if row and (now - row["created_at"]) <= CACHE_TTL_SECONDS:
                    conn.execute("UPDATE exact_query_cache SET hit_count = hit_count + 1 WHERE cache_key = ?", (key,))
                    resp = json.loads(row["response_json"])
                    orig_latency = row["original_latency_ms"]

                    self.memory_exact_cache[key] = {
                        "response": resp,
                        "created_at": row["created_at"],
                        "original_latency_ms": orig_latency
                    }

                    self.metrics["exact_hits"] += 1
                    self.metrics["saved_latency_ms"] += orig_latency
                    resp["cache_hit_type"] = "Tier 1: Exact Match"
                    resp["cache_latency_ms"] = 1.0
                    return resp
        except Exception as e:
            logger.debug(f"Exact cache lookup exception: {e}")

        return None

    def get_semantic(
        self,
        query: str,
        query_vector: List[float],
        partitions: Optional[List[str]] = None,
        threshold: float = SEMANTIC_CACHE_THRESHOLD
    ) -> Optional[Tuple[Dict[str, Any], float]]:
        if not SEMANTIC_CACHE_ENABLED or not self.semantic_cache_entries:
            return None

        parts_key = ",".join(sorted(partitions)) if partitions else "all"
        q_vec = np.array(query_vector, dtype=np.float32)
        q_norm = np.linalg.norm(q_vec)
        if q_norm == 0:
            return None
        q_vec = q_vec / q_norm

        best_score = -1.0
        best_entry: Optional[Dict[str, Any]] = None

        now = time.time()
        for entry in self.semantic_cache_entries:
            if entry["partitions_key"] != parts_key:
                continue
            if (now - entry["created_at"]) > CACHE_TTL_SECONDS:
                continue

            similarity = float(np.dot(q_vec, entry["vector"]))
            if similarity > best_score:
                best_score = similarity
                best_entry = entry

        if best_entry and best_score >= threshold:
            self.metrics["semantic_hits"] += 1
            saved = best_entry.get("latency_ms", 1500.0)
            self.metrics["saved_latency_ms"] += saved

            resp = dict(best_entry["response"])
            resp["cache_hit_type"] = f"Tier 2: Semantic Match ({best_score * 100:.1f}%)"
            resp["matched_cached_query"] = best_entry["query"]
            resp["semantic_similarity"] = best_score
            resp["cache_latency_ms"] = 8.0
            return resp, best_score

        return None

    def put(
        self,
        query: str,
        query_vector: List[float],
        response: Dict[str, Any],
        partitions: Optional[List[str]] = None,
        filter_str: Optional[str] = None,
        original_latency_ms: float = 0.0
    ):
        now = time.time()
        key = self._compute_key(query, partitions, filter_str)
        parts_key = ",".join(sorted(partitions)) if partitions else "all"

        self.memory_exact_cache[key] = {
            "response": response,
            "created_at": now,
            "original_latency_ms": original_latency_ms
        }

        resp_json = json.dumps(response)
        try:
            with self._get_connection() as conn:
                conn.execute("""
                    INSERT OR REPLACE INTO exact_query_cache (
                        cache_key, query_text, partitions_key,
                        response_json, created_at, original_latency_ms
                    ) VALUES (?, ?, ?, ?, ?, ?)
                """, (key, query, parts_key, resp_json, now, original_latency_ms))
        except Exception as e:
            logger.debug(f"Failed to persist exact cache: {e}")

        if SEMANTIC_CACHE_ENABLED and query_vector:
            vec = np.array(query_vector, dtype=np.float32)
            norm = np.linalg.norm(vec)
            if norm > 0:
                vec = vec / norm
            self.semantic_cache_entries.append({
                "query": query,
                "partitions_key": parts_key,
                "vector": vec,
                "response": response,
                "created_at": now,
                "latency_ms": original_latency_ms
            })

            try:
                vec_json = json.dumps(query_vector)
                with self._get_connection() as conn:
                    conn.execute("""
                        INSERT INTO semantic_query_cache (
                            query_text, partitions_key, vector_json,
                            response_json, created_at, original_latency_ms
                        ) VALUES (?, ?, ?, ?, ?, ?)
                    """, (query, parts_key, vec_json, resp_json, now, original_latency_ms))
            except Exception as e:
                logger.debug(f"Failed to persist semantic cache: {e}")

    def get_embedding(self, text: str) -> Optional[List[float]]:
        h = hashlib.md5(text.encode("utf-8")).hexdigest()
        return self.embedding_cache.get(h)

    def set_embedding(self, text: str, vector: List[float]):
        h = hashlib.md5(text.encode("utf-8")).hexdigest()
        self.embedding_cache[h] = vector

    def get_web_doc(self, url: str) -> Optional[Dict[str, Any]]:
        h = hashlib.md5(url.encode("utf-8")).hexdigest()
        return self.web_doc_cache.get(h)

    def set_web_doc(self, url: str, doc_data: Dict[str, Any]):
        h = hashlib.md5(url.encode("utf-8")).hexdigest()
        self.web_doc_cache[h] = doc_data

    def record_miss(self):
        self.metrics["misses"] += 1

    def get_metrics(self) -> Dict[str, Any]:
        total = self.metrics["exact_hits"] + self.metrics["semantic_hits"] + self.metrics["misses"]
        hit_ratio = (
            ((self.metrics["exact_hits"] + self.metrics["semantic_hits"]) / total * 100)
            if total > 0 else 0.0
        )
        return {
            "total_queries": total,
            "exact_hits": self.metrics["exact_hits"],
            "semantic_hits": self.metrics["semantic_hits"],
            "misses": self.metrics["misses"],
            "hit_ratio_pct": round(hit_ratio, 1),
            "saved_latency_ms": round(self.metrics["saved_latency_ms"], 1),
            "memory_exact_entries": len(self.memory_exact_cache),
            "semantic_cache_entries": len(self.semantic_cache_entries),
            "cached_embeddings": len(self.embedding_cache),
            "cached_web_docs": len(self.web_doc_cache)
        }

    def clear(self):
        self.memory_exact_cache.clear()
        self.semantic_cache_entries.clear()
        self.embedding_cache.clear()
        self.web_doc_cache.clear()
        try:
            with self._get_connection() as conn:
                conn.execute("DELETE FROM exact_query_cache;")
                conn.execute("DELETE FROM semantic_query_cache;")
        except Exception:
            pass
