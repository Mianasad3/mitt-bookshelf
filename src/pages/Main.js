import BookShelf from "../components/BookShelf";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Main() {
  const [books, setBooks] = useState([]);
  const isCalled = useRef(false);

  async function changeBookShelf(id, targetShelf) {
    const bookIndex = books.findIndex((item) => item.id === id);
    if (bookIndex === -1) {
      console.error("no book found");
      return;
    }
    const book = books[bookIndex];
    console.log({ book, targetShelf });
    book.shelf = targetShelf;

    const patchResponse = await fetch(`http://localhost:3004/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shelf: targetShelf,
      }),
    });
    isCalled.current = false;
    console.log(patchResponse);
    const updatedBooks = [
      ...books.slice(0, bookIndex),
      book,
      ...books.slice(bookIndex + 1),
    ];

    setBooks(updatedBooks);
  }
  useEffect(() => {
    if (isCalled.current) {
      return;
    }
    async function getBooks() {
      isCalled.current = true;
      const json = await fetch(
        "http://localhost:3004/books?shelf=read&shelf=currentlyReading&shelf=wantToRead"
      );
      const booksResponse = await json.json();
      setBooks(booksResponse);

      console.log(json);
    }
    getBooks();
  }, [books]);
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MITTReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            books={books.filter((item) => item.shelf === "currentlyReading")}
            shelfTitle={"Currently Reading"}
            changeShelf={changeBookShelf}
          />
          <BookShelf
            books={books.filter((item) => item.shelf === "wantToRead")}
            shelfTitle={"Want To Read"}
            changeShelf={changeBookShelf}
          />
          <BookShelf
            books={books.filter((item) => item.shelf === "read")}
            shelfTitle={"Read"}
            changeShelf={changeBookShelf}
          />
        </div>
        <div className="open-search">
          <Link to="/search"></Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
