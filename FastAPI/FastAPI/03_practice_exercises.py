from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

app = FastAPI()

class BookBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=150)
    author: str = Field(..., min_length=2, max_length=100)
    publication_year: int = Field(..., ge=1450, le=2030)
    genre: str
    pages: int = Field(..., gt=0)

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=150)
    author: Optional[str] = Field(None, min_length=2, max_length=100)
    publication_year: Optional[int] = Field(None, ge=1450, le=2030)
    genre: Optional[str] = None
    pages: Optional[int] = Field(None, gt=0)

class BookResponse(BookBase):
    id: int
    added_at: datetime

books_db = {
    1: {
        "id": 1,
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "publication_year": 2008,
        "genre": "Tech",
        "pages": 464,
        "added_at": datetime.now()
    },
    2: {
        "id": 2,
        "title": "The Pragmatic Programmer",
        "author": "Andrew Hunt",
        "publication_year": 1999,
        "genre": "Tech",
        "pages": 352,
        "added_at": datetime.now()
    }
}
next_book_id = 3

@app.get("/books/", response_model=List[BookResponse])
def get_books(
    genre: Optional[str] = None,
    min_pages: Optional[int] = None
):
    results = list(books_db.values())
    if genre:
        results = [b for b in results if b["genre"].lower() == genre.lower()]
    if min_pages is not None:
        results = [b for b in results if b["pages"] >= min_pages]
    return results

@app.get("/books/{book_id}", response_model=BookResponse)
def get_book(book_id: int):
    if book_id not in books_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book with ID {book_id} not found."
        )
    return books_db[book_id]

@app.post("/books/", response_model=BookResponse, status_code=status.HTTP_201_CREATED)
def add_book(book: BookCreate):
    global next_book_id
    new_id = next_book_id
    next_book_id += 1

    book_entry = {
        "id": new_id,
        **book.model_dump(),
        "added_at": datetime.now()
    }
    books_db[new_id] = book_entry
    return book_entry

@app.patch("/books/{book_id}", response_model=BookResponse)
def update_book(book_id: int, book_update: BookUpdate):
    if book_id not in books_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book with ID {book_id} not found."
        )

    existing_book = books_db[book_id]
    update_data = book_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        existing_book[field] = value

    return existing_book

@app.delete("/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(book_id: int):
    if book_id not in books_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book with ID {book_id} not found."
        )
    del books_db[book_id]
    return None

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("03_practice_exercises:app", host="127.0.0.1", port=8002, reload=True)
