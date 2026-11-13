import sqlite3
import json
import time
from typing import List, Dict, Any, Optional
from src.config import CHAT_DB_PATH

class ChatHistoryManager:
    def __init__(self, db_path: str = CHAT_DB_PATH):
        self.db_path = db_path
        self._init_db()

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path, timeout=10)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self):
        with self._get_connection() as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS chat_messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    session_id TEXT NOT NULL,
                    timestamp REAL NOT NULL,
                    role TEXT NOT NULL,
                    content TEXT NOT NULL,
                    rephrased_query TEXT,
                    sub_queries TEXT,
                    company_targets TEXT,
                    sources TEXT,
                    metadata TEXT
                );
            """)
            conn.execute("CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages(session_id, timestamp);")

    def add_message(
        self,
        session_id: str,
        role: str,
        content: str,
        rephrased_query: Optional[str] = None,
        sub_queries: Optional[List[str]] = None,
        company_targets: Optional[List[str]] = None,
        sources: Optional[List[Dict[str, Any]]] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> int:
        sub_queries_json = json.dumps(sub_queries) if sub_queries else None
        targets_json = json.dumps(company_targets) if company_targets else None
        sources_json = json.dumps(sources) if sources else None
        metadata_json = json.dumps(metadata) if metadata else None

        with self._get_connection() as conn:
            cursor = conn.execute("""
                INSERT INTO chat_messages (
                    session_id, timestamp, role, content,
                    rephrased_query, sub_queries, company_targets,
                    sources, metadata
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                session_id,
                time.time(),
                role,
                content,
                rephrased_query,
                sub_queries_json,
                targets_json,
                sources_json,
                metadata_json
            ))
            return cursor.lastrowid

    def get_history(self, session_id: str, limit: int = 20) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            rows = conn.execute("""
                SELECT * FROM chat_messages
                WHERE session_id = ?
                ORDER BY timestamp ASC
                LIMIT ?
            """, (session_id, limit)).fetchall()

            history = []
            for row in rows:
                item = dict(row)
                if item.get("sub_queries"):
                    try:
                        item["sub_queries"] = json.loads(item["sub_queries"])
                    except Exception:
                        pass
                if item.get("company_targets"):
                    try:
                        item["company_targets"] = json.loads(item["company_targets"])
                    except Exception:
                        pass
                if item.get("sources"):
                    try:
                        item["sources"] = json.loads(item["sources"])
                    except Exception:
                        pass
                if item.get("metadata"):
                    try:
                        item["metadata"] = json.loads(item["metadata"])
                    except Exception:
                        pass
                history.append(item)
            return history

    def get_formatted_context(self, session_id: str, max_turns: int = 5) -> str:
        history = self.get_history(session_id, limit=max_turns * 2)
        if not history:
            return ""

        formatted_lines = []
        for msg in history[-max_turns * 2:]:
            role_display = "Analyst" if msg["role"] == "user" else "Assistant"
            content_preview = msg["content"].strip().replace("\n", " ")
            if len(content_preview) > 300:
                content_preview = content_preview[:300] + "..."
            formatted_lines.append(f"[{role_display}]: {content_preview}")

        return "\n".join(formatted_lines)

    def list_sessions(self) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            rows = conn.execute("""
                SELECT 
                    session_id, 
                    COUNT(*) as message_count, 
                    MAX(timestamp) as last_activity,
                    MIN(timestamp) as started_at
                FROM chat_messages
                GROUP BY session_id
                ORDER BY last_activity DESC
            """).fetchall()
            return [dict(r) for r in rows]

    def clear_session(self, session_id: str):
        with self._get_connection() as conn:
            conn.execute("DELETE FROM chat_messages WHERE session_id = ?", (session_id,))
