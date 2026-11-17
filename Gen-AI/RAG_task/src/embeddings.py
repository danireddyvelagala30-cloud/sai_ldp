import numpy as np
from typing import List, Union
from fastembed import TextEmbedding
from src.config import EMBEDDING_MODEL_NAME, EMBEDDING_DIM

class EmbeddingEngine:
    """
    Embedding Engine utilizing fast local ONNX models (BAAI/bge-small-en-v1.5).
    Runs completely locally with high speed, no GPU required, and no external API limits.
    """

    def __init__(self, model_name: str = EMBEDDING_MODEL_NAME):
        self.model_name = model_name
        self._model = None
        self.dim = EMBEDDING_DIM

    @property
    def model(self):
        if self._model is None:
            self._model = TextEmbedding(model_name=self.model_name)
        return self._model

    def _normalize(self, vector: np.ndarray) -> np.ndarray:
        norm = np.linalg.norm(vector)
        if norm > 0:
            return vector / norm
        return vector

    def embed_text(self, text: str) -> List[float]:
        """Generates a normalized dense vector embedding for a single text string."""
        clean_text = text.strip()
        if not clean_text:
            return [0.0] * self.dim
        embeddings = list(self.model.embed([clean_text]))
        vec = self._normalize(embeddings[0])
        return vec.tolist()

    def embed_batch(self, texts: List[str], batch_size: int = 64) -> List[List[float]]:
        """Generates normalized vector embeddings for a list of text strings in batches."""
        if not texts:
            return []
        
        cleaned_texts = [t.strip() if t.strip() else "empty text" for t in texts]
        embeddings_iter = self.model.embed(cleaned_texts, batch_size=batch_size)
        
        result: List[List[float]] = []
        for emb in embeddings_iter:
            vec = self._normalize(emb)
            result.append(vec.tolist())
            
        return result

if __name__ == "__main__":
    engine = EmbeddingEngine()
    test_phrase = "NVIDIA reports Q4 FY25 revenue of $37.5 billion."
    vec = engine.embed_text(test_phrase)
    print(f"Model: {engine.model_name}")
    print(f"Embedding dimension: {len(vec)}")
    print(f"Vector preview: {vec[:5]}...")
