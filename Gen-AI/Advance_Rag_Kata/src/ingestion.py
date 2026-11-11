import re
import os
import time
import logging
from pathlib import Path
from typing import List, Dict, Any, Optional
from bs4 import BeautifulSoup
from fastembed import TextEmbedding

from src.config import EMBEDDING_MODEL_NAME, EMBEDDING_DIM
from src.vector_store import MilvusVectorStore
from src.caching import MultiTierCache

logger = logging.getLogger(__name__)

class DocumentParser:
    @staticmethod
    def clean_html(html_content: str) -> Dict[str, Any]:
        soup = BeautifulSoup(html_content, "html.parser")

        for element in soup(["script", "style", "nav", "footer", "header", "aside", "noscript", "svg", "form"]):
            element.decompose()

        title = ""
        if soup.title and soup.title.string:
            title = soup.title.string.strip()
        elif soup.h1:
            title = soup.h1.get_text().strip()

        lines = []
        for elem in soup.find_all(["h1", "h2", "h3", "h4", "p", "li", "tr"]):
            text = elem.get_text(separator=" ", strip=True)
            if not text:
                continue
            if elem.name in ["h1", "h2", "h3", "h4"]:
                lines.append(f"\n## {text}\n")
            elif elem.name == "li":
                lines.append(f"- {text}")
            elif elem.name == "tr":
                lines.append(f"| {text} |")
            else:
                lines.append(text)

        cleaned_text = "\n\n".join(lines)
        return {
            "title": title or "Web Document",
            "clean_text": cleaned_text
        }

    @staticmethod
    def parse_markdown_sections(content: str) -> List[Dict[str, str]]:
        lines = content.splitlines()
        sections = []
        current_header = "Overview"
        current_lines = []

        for line in lines:
            header_match = re.match(r"^(#{1,3})\s+(.+)$", line)
            if header_match:
                if current_lines:
                    text_block = "\n".join(current_lines).strip()
                    if text_block:
                        sections.append({
                            "header": current_header,
                            "text": text_block
                        })
                    current_lines = []
                current_header = header_match.group(2).strip()
            else:
                current_lines.append(line)

        if current_lines:
            text_block = "\n".join(current_lines).strip()
            if text_block:
                sections.append({
                    "header": current_header,
                    "text": text_block
                })

        return sections if sections else [{"header": "Overview", "text": content}]


class SectionAwareChunker:
    def __init__(self, target_chunk_size: int = 700, chunk_overlap: int = 120):
        self.target_chunk_size = target_chunk_size
        self.chunk_overlap = chunk_overlap

    def chunk_document(
        self,
        company: str,
        doc_title: str,
        doc_type: str,
        source_file: str,
        published_date: str,
        sections: List[Dict[str, str]]
    ) -> List[Dict[str, Any]]:
        chunks = []
        chunk_idx = 1

        for sec in sections:
            header = sec["header"]
            text = sec["text"]

            if len(text) <= self.target_chunk_size:
                context_prefix = f"[{company} | {doc_title} | Section: {header}] "
                full_text = context_prefix + text
                chunks.append({
                    "chunk_id": f"{company.lower()}_{chunk_idx}",
                    "company": company,
                    "doc_title": doc_title,
                    "doc_type": doc_type,
                    "source_file": source_file,
                    "section": header,
                    "date": published_date,
                    "text": full_text
                })
                chunk_idx += 1
            else:
                sentences = re.split(r"(?<=[.!?])\s+", text)
                current_chunk = []
                current_len = 0

                for sent in sentences:
                    sent = sent.strip()
                    if not sent:
                        continue

                    if current_len + len(sent) > self.target_chunk_size and current_chunk:
                        chunk_body = " ".join(current_chunk)
                        context_prefix = f"[{company} | {doc_title} | Section: {header}] "
                        full_text = context_prefix + chunk_body

                        chunks.append({
                            "chunk_id": f"{company.lower()}_{chunk_idx}",
                            "company": company,
                            "doc_title": doc_title,
                            "doc_type": doc_type,
                            "source_file": source_file,
                            "section": header,
                            "date": published_date,
                            "text": full_text
                        })
                        chunk_idx += 1

                        overlap_sents = []
                        overlap_len = 0
                        for s in reversed(current_chunk):
                            if overlap_len + len(s) < self.chunk_overlap:
                                overlap_sents.insert(0, s)
                                overlap_len += len(s)
                            else:
                                break
                        current_chunk = overlap_sents
                        current_len = sum(len(s) for s in current_chunk)

                    current_chunk.append(sent)
                    current_len += len(sent)

                if current_chunk:
                    chunk_body = " ".join(current_chunk)
                    context_prefix = f"[{company} | {doc_title} | Section: {header}] "
                    full_text = context_prefix + chunk_body
                    chunks.append({
                        "chunk_id": f"{company.lower()}_{chunk_idx}",
                        "company": company,
                        "doc_title": doc_title,
                        "doc_type": doc_type,
                        "source_file": source_file,
                        "section": header,
                        "date": published_date,
                        "text": full_text
                    })
                    chunk_idx += 1

        return chunks


class IngestionEngine:
    def __init__(
        self,
        vector_store: Optional[MilvusVectorStore] = None,
        cache: Optional[MultiTierCache] = None
    ):
        self.vector_store = vector_store or MilvusVectorStore()
        self.cache = cache or MultiTierCache()
        self.parser = DocumentParser()
        self.chunker = SectionAwareChunker()
        self._embedder: Optional[TextEmbedding] = None

    def _get_embedder(self) -> TextEmbedding:
        if self._embedder is None:
            logger.info(f"Loading FastEmbed model '{EMBEDDING_MODEL_NAME}'...")
            self._embedder = TextEmbedding(model_name=EMBEDDING_MODEL_NAME)
        return self._embedder

    def embed_texts(self, texts: List[str]) -> List[List[float]]:
        results = [None] * len(texts)
        uncached_indices = []
        uncached_texts = []

        for i, t in enumerate(texts):
            cached_vec = self.cache.get_embedding(t)
            if cached_vec is not None:
                results[i] = cached_vec
            else:
                uncached_indices.append(i)
                uncached_texts.append(t)

        if uncached_texts:
            embedder = self._get_embedder()
            computed_vectors = list(embedder.embed(uncached_texts))
            for orig_idx, vec in zip(uncached_indices, computed_vectors):
                vec_list = vec.tolist()
                results[orig_idx] = vec_list
                self.cache.set_embedding(texts[orig_idx], vec_list)

        return results

    def embed_query(self, query: str) -> List[float]:
        cached = self.cache.get_embedding(query)
        if cached is not None:
            return cached
        embedder = self._get_embedder()
        vec = list(embedder.embed([query]))[0].tolist()
        self.cache.set_embedding(query, vec)
        return vec

    def ingest_document(
        self,
        raw_text: str,
        company: str,
        doc_title: str,
        doc_type: str = "financial_report",
        source_url_or_file: str = "web_document",
        published_date: str = "2024-11-01",
        is_html: bool = False
    ) -> Dict[str, Any]:
        start_time = time.time()
        logger.info(f"Starting ingestion for '{doc_title}' ({company})...")

        if is_html:
            parsed = self.parser.clean_html(raw_text)
            content_text = parsed["clean_text"]
            if not doc_title or doc_title == "Untitled Document":
                doc_title = parsed["title"]
        else:
            content_text = raw_text

        sections = self.parser.parse_markdown_sections(content_text)

        chunks = self.chunker.chunk_document(
            company=company,
            doc_title=doc_title,
            doc_type=doc_type,
            source_file=source_url_or_file,
            published_date=published_date,
            sections=sections
        )

        if not chunks:
            return {"status": "empty", "chunks_inserted": 0, "company": company}

        texts_to_embed = [c["text"] for c in chunks]
        vectors = self.embed_texts(texts_to_embed)
        for i, v in enumerate(vectors):
            chunks[i]["vector"] = v

        inserted_count = self.vector_store.insert(chunks, company_name=company)
        elapsed = time.time() - start_time

        logger.info(f"Ingested {inserted_count} chunks into partition for '{company}' in {elapsed:.2f}s.")
        return {
            "status": "success",
            "company": company,
            "partition": self.vector_store.ensure_partition(company),
            "doc_title": doc_title,
            "chunks_inserted": inserted_count,
            "elapsed_seconds": round(elapsed, 2)
        }
