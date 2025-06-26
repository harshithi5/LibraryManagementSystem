import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Searchcard from './Searchcard';

function Shelf() {
  const [likedBooks, setLikedBooks] = useState([]);
  const userId = '685b694ba353bd8aeb09f6db'; // Replace with actual logged-in user ID

  useEffect(() => {
    const fetchLikedBooks = async () => {
      try {
        // Step 1: Get user and their liked book IDs
        const userRes = await axios.get(`http://localhost:5000/users/${userId}`);
        const likedBookIds = userRes.data.likedBooks.map(id => id.toString());

        // Step 2: Get all books
        const booksRes = await axios.get('http://localhost:5000/books');
        const allBooks = booksRes.data;

        // Step 3: Filter liked books
        const filtered = allBooks.filter(book => likedBookIds.includes(book._id));
        setLikedBooks(filtered);
      } catch (err) {
        console.error("Error fetching liked books:", err);
      }
    };

    fetchLikedBooks();
  }, []);

  const handleUnlike = (bookId) => {
    setLikedBooks(prev => prev.filter(book => book._id !== bookId));
  };

  return (
    <div className="p-10 px-0 flex flex-col overflow-y-auto h-full mt-5" style={{ scrollbarWidth: 'none' }}>
      {likedBooks.map(book => (
        <Searchcard
          key={book._id}
          bookId={book._id}
          cover={book.coverImage}
          title={book.title}
          writer={book.author}
          rating={book.rating}
          category={book.category}
          avail={book.quantity > 0 ? "In-Shelf" : "Out of Stock"}
          color={book.quantity > 0 ? "bg-green-500" : "bg-red-500"}
          location={book.shelf}
          isLiked={true}
          userId={userId}
          onUnlike={handleUnlike}
        />
      ))}
    </div>
  );
}

export default Shelf;
