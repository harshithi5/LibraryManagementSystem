import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Searchcard from './Searchcard';
import Loader from './Loader';

function Shelf() {
  const [likedBooks, setLikedBooks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedBooks = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // Step 1: Get logged-in user ID
        const userRes = await axios.get('http://localhost:5000/users/me/id', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const id = userRes.data.userId;
        setUserId(id);

        // Step 2: Get user and their liked book IDs
        const likedRes = await axios.get(`http://localhost:5000/users/${id}`);
        const likedBookIds = likedRes.data.likedBooks.map(book => book._id.toString());

        // Step 3: Get all books
        const booksRes = await axios.get('http://localhost:5000/books');
        const allBooks = booksRes.data;

        // Step 4: Filter liked books
        const filtered = allBooks.filter(book => likedBookIds.includes(book._id));
        setLikedBooks(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching liked books:", err);
      }
    };

    fetchLikedBooks();
  }, []);

  const handleUnlike = (bookId) => {
    setLikedBooks(prev => prev.filter(book => book._id !== bookId));
  };

  if (loading) return <Loader />; 

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
