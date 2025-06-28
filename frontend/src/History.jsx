import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Historycard from './Historycard';

function History() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [userId, setUserId] = useState(null);

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
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:5000/users/${userId}/borrowed`)
      .then(res => setBorrowedBooks(res.data))
      .catch(err => console.error("Error fetching borrowed books:", err));
  }, [userId]);

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-6 pt-5">
      {borrowedBooks.map((item, index) => (
        <Historycard
          key={index}
          title={item.book.title}
          writer={item.book.author}
          rating={item.book.rating}
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
