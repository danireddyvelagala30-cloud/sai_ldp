import re
from dataclasses import dataclass
from typing import List, Dict, Any, Optional
from src.document_loader import Document
from src.config import CHUNK_SIZE, CHUNK_OVERLAP

@dataclass
class Chunk:
    chunk_id: str
    doc_id: str
    doc_title: str
    doc_type: str
    source_file: str
    section: str
    date: str
    text: str
    chunk_index: int
    metadata: Dict[str, Any]

class SectionAwareChunker:
    """
    Intelligently splits markdown and corporate text documents into chunks,
    preserving section hierarchy, tables, and operational metrics.
    """

    def __init__(self, chunk_size: int = CHUNK_SIZE, chunk_overlap: int = CHUNK_OVERLAP):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def _split_into_sections(self, content: str) -> List[Dict[str, str]]:
        """Splits text by markdown headers (#, ##, ###) while tracking the section title."""
        lines = content.splitlines()
        sections: List[Dict[str, str]] = []
        
        current_title = "Overview"
        current_lines: List[str] = []

        for line in lines:
            header_match = re.match(r"^(#{1,3})\s+(.+)$", line)
            if header_match:
                if current_lines:
                    text_block = "\n".join(current_lines).strip()
                    if text_block:
                        sections.append({
                            "section": current_title,
                            "content": text_block
                        })
                    current_lines = []
                current_title = header_match.group(2).strip()
            else:
                current_lines.append(line)

        if current_lines:
            text_block = "\n".join(current_lines).strip()
            if text_block:
                sections.append({
                    "section": current_title,
                    "content": text_block
                })

        return sections

    def _split_text_block(self, text: str) -> List[str]:
        """Splits a block of text into sub-chunks respecting paragraph and sentence boundaries."""
        if "|" in text and "-|-" in text:
            if len(text) <= self.chunk_size * 2:
                return [text]

        paragraphs = text.split("\n\n")
        chunks: List[str] = []
        current_chunk = ""

        for para in paragraphs:
            para = para.strip()
            if not para:
                continue

            if len(current_chunk) + len(para) + 2 > self.chunk_size and len(current_chunk) > 150:
                chunks.append(current_chunk.strip())
                words = current_chunk.split()
                overlap_text = " ".join(words[-15:]) if len(words) > 15 else ""
                current_chunk = (overlap_text + "\n\n" + para).strip() if overlap_text else para
            else:
                if current_chunk:
                    current_chunk += "\n\n" + para
                else:
                    current_chunk = para

        if current_chunk.strip():
            chunks.append(current_chunk.strip())

        refined_chunks: List[str] = []
        for c in chunks:
            if len(c) > self.chunk_size * 1.5:
                sentences = re.split(r"(?<=[.!?])\s+", c)
                sub_chunk = ""
                for sent in sentences:
                    if len(sub_chunk) + len(sent) + 1 > self.chunk_size and len(sub_chunk) > 100:
                        refined_chunks.append(sub_chunk.strip())
                        sub_chunk = sent
                    else:
                        sub_chunk = (sub_chunk + " " + sent).strip()
                if sub_chunk.strip():
                    refined_chunks.append(sub_chunk.strip())
            else:
                refined_chunks.append(c)

        return refined_chunks

    def chunk_document(self, doc: Document) -> List[Chunk]:
        """Chunks a Document into a list of Chunk objects."""
        sections = self._split_into_sections(doc.content)
        all_chunks: List[Chunk] = []
        chunk_idx = 0

        for sec in sections:
            section_title = sec["section"]
            sec_content = sec["content"]

            sub_chunks = self._split_text_block(sec_content)
            for text in sub_chunks:
                clean_text = text.strip()
                if len(clean_text) < 40:
                    continue

                context_prefix = f"[{doc.title} | Section: {section_title}]\n"
                enriched_text = context_prefix + clean_text

                chunk_id = f"{doc.doc_id}_c{chunk_idx:03d}"
                chunk = Chunk(
                    chunk_id=chunk_id,
                    doc_id=doc.doc_id,
                    doc_title=doc.title,
                    doc_type=doc.doc_type,
                    source_file=doc.source_file,
                    section=section_title,
                    date=doc.date,
                    text=enriched_text,
                    chunk_index=chunk_idx,
                    metadata={
                        **doc.metadata,
                        "section": section_title,
                        "raw_text": clean_text,
                        "char_count": len(enriched_text)
                    }
                )
                all_chunks.append(chunk)
                chunk_idx += 1

        return all_chunks

    def chunk_all(self, docs: List[Document]) -> List[Chunk]:
        """Chunks a collection of documents."""
        chunks: List[Chunk] = []
        for doc in docs:
            chunks.extend(self.chunk_document(doc))
        return chunks

if __name__ == "__main__":
    from src.document_loader import DocumentLoader
    loader = DocumentLoader()
    docs = loader.load_all_documents()
    chunker = SectionAwareChunker()
    chunks = chunker.chunk_all(docs)
    print(f"Generated {len(chunks)} chunks across {len(docs)} documents.")
    if chunks:
        print(f"\nSample Chunk #0:")
        print(f"ID: {chunks[0].chunk_id}")
        print(f"Source: {chunks[0].source_file}")
        print(f"Section: {chunks[0].section}")
        print(f"Text snippet: {chunks[0].text[:180]}...")
