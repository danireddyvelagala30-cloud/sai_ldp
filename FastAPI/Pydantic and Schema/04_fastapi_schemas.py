from typing import Optional
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field


app = FastAPI(
    title="Pydantic & Schema Practice API",
    version="1.0.0"
)

fake_db = {}
id_counter = 1


class BookBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    author: str = Field(..., min_length=2, max_length=50)
    price: float = Field(..., gt=0)
    pages: Optional[int] = Field(default=None, gt=0)


class BookCreate(BookBase):
    secret_internal_notes: Optional[str] = None


class BookUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    author: Optional[str] = Field(None, min_length=2, max_length=50)
    price: Optional[float] = Field(None, gt=0)
    pages: Optional[int] = Field(None, gt=0)


class BookResponse(BookBase):
    id: int


@app.post(
    "/books",
    response_model=BookResponse,
    status_code=status.HTTP_201_CREATED
)
def create_book(book_in: BookCreate):
    global id_counter
    book_id = id_counter
    id_counter += 1

    stored_book = book_in.model_dump()
    stored_book["id"] = book_id
    fake_db[book_id] = stored_book

    return stored_book


@app.get(
    "/books",
    response_model=list[BookResponse]
)
def list_books():
    return list(fake_db.values())


@app.get(
    "/books/{book_id}",
    response_model=BookResponse
)
def get_book(book_id: int):
    if book_id not in fake_db:
        raise HTTPException(status_code=404, detail="Book not found")
    return fake_db[book_id]


@app.put(
    "/books/{book_id}",
    response_model=BookResponse
)
def update_book(book_id: int, book_update: BookUpdate):
    if book_id not in fake_db:
        raise HTTPException(status_code=404, detail="Book not found")

    existing_book = fake_db[book_id]
    update_data = book_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        existing_book[key] = value

    return existing_book


@app.delete(
    "/books/{book_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_book(book_id: int):
    if book_id not in fake_db:
        raise HTTPException(status_code=404, detail="Book not found")
    del fake_db[book_id]
    return None


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
