import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Historycard from './Historycard';
import Loader from './Loader';

function History() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:5000/users/me/id', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserId(res.data.userId);
      } catch (err) {
        console.error("Error fetching user ID:", err);
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:5000/users/${userId}/borrowed`)
      .then(res => {
        setBorrowedBooks(res.data);
        setLoading(false); 
      })
      .catch(err => {
        console.error("Error fetching borrowed books:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-6 pt-5 px-2 lg:px-6">
      {borrowedBooks.map((item, index) => (
        <Historycard
          key={index}
          title={item.book.title}
          writer={item.book.author}
          rating={item.book.rating}
          cover={item.book.coverImage}
          borrowdate={new Date(item.borrowDate).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
          })}
          submitdate={new Date(item.returnDate).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
          })}
          returned={item.returned}
        />
      ))}
    </div>
  );
}

export default History;
