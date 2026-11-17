import re
from dataclasses import dataclass
from pathlib import Path
from typing import List, Dict, Any
from src.config import DATA_DIR, FINANCIAL_DIR, BLOGS_DIR, PRESS_RELEASES_DIR

@dataclass
class Document:
    doc_id: str
    title: str
    doc_type: str
    content: str
    source_file: str
    file_path: str
    date: str
    metadata: Dict[str, Any]

class DocumentLoader:
    """Loads and parses corporate documents with metadata extraction."""

    def __init__(self, data_dir: Path = DATA_DIR):
        self.data_dir = data_dir

    def _extract_metadata(self, text: str, file_path: Path) -> Dict[str, Any]:
        meta = {
            "title": file_path.stem.replace("_", " ").title(),
            "doc_type": "general_document",
            "date": "Unknown Date",
            "author": "NVIDIA Corporate",
        }

        lines = text.splitlines()
        for line in lines[:20]:
            clean_line = line.strip()
            
            if clean_line.startswith("# ") and meta["title"] == file_path.stem.replace("_", " ").title():
                meta["title"] = clean_line[2:].strip()

            type_match = re.search(r"\*\*Document Type:\*\*\s*(.*)", clean_line, re.IGNORECASE)
            if type_match:
                meta["doc_type"] = type_match.group(1).strip()

            date_match = re.search(r"\*\*(?:Release Date|Publication Date|Date of Release|Fiscal Period):\*\*\s*(.*)", clean_line, re.IGNORECASE)
            if date_match:
                meta["date"] = date_match.group(1).strip()

            author_match = re.search(r"\*\*(?:Author|Issuer):\*\*\s*(.*)", clean_line, re.IGNORECASE)
            if author_match:
                meta["author"] = author_match.group(1).strip()

        lower_path = str(file_path).lower()
        if "financial" in lower_path:
            meta["canonical_type"] = "financial_report"
        elif "blog" in lower_path:
            meta["canonical_type"] = "blog_post"
        elif "press" in lower_path or "pr_" in lower_path:
            meta["canonical_type"] = "press_release"
        else:
            meta["canonical_type"] = meta.get("doc_type", "general")

        return meta

    def load_document(self, file_path: Path) -> Document:
        """Loads a single document file and returns a Document object."""
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        meta = self._extract_metadata(content, file_path)
        doc_id = file_path.stem

        return Document(
            doc_id=doc_id,
            title=meta.get("title", file_path.stem),
            doc_type=meta.get("canonical_type", "general"),
            content=content,
            source_file=file_path.name,
            file_path=str(file_path),
            date=meta.get("date", "Unknown"),
            metadata=meta
        )

    def load_all_documents(self) -> List[Document]:
        """Loads all financial reports, blog posts, and press releases."""
        documents: List[Document] = []
        target_dirs = [FINANCIAL_DIR, BLOGS_DIR, PRESS_RELEASES_DIR]

        for directory in target_dirs:
            if not directory.exists():
                continue
            for file_path in directory.glob("*.md"):
                doc = self.load_document(file_path)
                documents.append(doc)

        return documents

if __name__ == "__main__":
    loader = DocumentLoader()
    docs = loader.load_all_documents()
    print(f"Loaded {len(docs)} documents successfully:")
    for d in docs:
        print(f" - [{d.doc_type.upper()}] {d.title} ({d.source_file}, {d.date})")
