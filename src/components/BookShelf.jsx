import Book from "./Book";

function BookShelf({ books, shelfTitle, changeShelf }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} changeShelf={changeShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
