import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";

function Search() {
  const [query, setQuery] = useState("");
  const isCalled = useRef(false);

  const [books, setBooks] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);

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
  const debounceTimer = useRef(null);

  async function handleChange(e) {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (!newQuery || !newQuery.trim()) {
      setBooks([]);
      setResultsCount(0);
      return;
    }
    console.log(newQuery);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      getBooks();
    }, 800);
  }

  async function getBooks() {
    isCalled.current = true;
    const json = await fetch(
      `http://localhost:3004/books?title_like=${query.split(/\s+/).join("|")}`
    );
    const booksResponse = await json.json();
    setResultsCount(booksResponse.length);
    console.log({ booksResponse });
    setBooks(booksResponse);
  }

  // useEffect(() => {
  //   if (isCalled.current) {
  //     return;
  //   }
  //   if (!query || !query.trim()) return;
  //   getBooks();
  // }, [books]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={"/"} className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <div className="results-quantity">
          {resultsCount ? `Your search returned ${resultsCount} results.` : ""}
        </div>
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} changeShelf={changeBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Search;
