import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Searchcard from './Searchcard';
import Loader from './Loader';

function Search() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedBooks, setLikedBooks] = useState([]);
  const [userId, setUserId] = useState(null);

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

        // Step 2: Fetch liked books using that ID
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        const liked = res.data.likedBooks.map(book => book._id.toString());
        setLikedBooks(liked);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching liked books:", err);
      }
    };

    fetchLikedBooks();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error("Error:", err));
  }, []);

  if (loading) return <Loader />;  

  return (
    <div className="p-10 px-2 lg:px-6 flex flex-col overflow-y-auto h-full mt-5" style={{ scrollbarWidth: 'none' }}>
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
