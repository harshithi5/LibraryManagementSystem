import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Searchcard from './Searchcard';

function Search({ likedBooks, userId }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="p-10 px-0 flex flex-col overflow-y-auto h-full mt-5" style={{ scrollbarWidth: 'none' }}>
      {books.map((book, index) => (
        <Searchcard
          key={index}
          bookId={book._id}
          cover={book.coverImage}
          title={book.title}
          writer={book.author}
          rating={book.rating}
          category={book.category}
          avail={book.available > 0 ? "In-Shelf" : "Out of Stock"}
          color={book.available > 0 ? "bg-green-500" : "bg-red-500"}
          location={book.shelf}
          isLiked={likedBooks.includes(book._id.toString())}
          userId={userId}
        />
      ))}
    </div>
  );
}

export default Search;
