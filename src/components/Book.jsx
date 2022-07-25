function Book({ book, changeShelf }) {
  const bookCoverStyle = {
    width: "128px",
    height: "193px",
    backgroundImage: `url(${book?.imageLinks?.thumbnail})`,
  };

  function handleChange(e) {
    const targetShelf = e.target.value;
    if (book.shelf === targetShelf) return;
    console.log("change", book.id, " to ", targetShelf);
    changeShelf(book.id, targetShelf);
  }
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={bookCoverStyle}></div>
        <div className="book-shelf-changer">
          <select onChange={handleChange}>
            <option value="move" disabled="">
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book?.authors?.join(" ,")}</div>
    </div>
  );
}

export default Book;
