import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Searchcard from './Searchcard';
import axios from 'axios';
import Loader from './Loader';

function Queryresult() {
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

        // Step 2: Fetch liked books using that ID
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        const liked = res.data.likedBooks.map(book => book._id.toString());
        setLikedBooks(liked);
      } catch (err) {
        console.error("Error fetching liked books:", err);
      }
    };

    fetchLikedBooks();
  }, []);

    const [books, setBooks] = useState([]);
    const location = useLocation();

    const query = new URLSearchParams(location.search).get('q') || '';

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                console.log("Sending query:", query);
                const res = await axios.get(`http://localhost:5000/books/queryresult?q=${encodeURIComponent(query)}`);;
                console.log("Response data:", res.data);
                setBooks(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching search results:', err);
            }
        };

        fetchBooks();
    }, [query]);

    if (loading) return <Loader />;  

    return (
        <div className="p-10 px-2 lg:px-6 flex flex-col overflow-y-auto h-full mt-5" style={{ scrollbarWidth: 'none' }}>
            {Array.isArray(books) && books.length > 0 ? (
                books.map((book, index) => (
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
                        isLiked={likedBooks?.includes(book._id.toString())}
                        userId={userId}
                    />
                ))
            ) : (
                <p className="text-red-500">No books found.</p>
            )}

        </div>
    );
}

export default Queryresult;
