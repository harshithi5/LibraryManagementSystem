import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Historycard from './Historycard';

function History() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const userId = '685b694ba353bd8aeb09f6db'; // Replace with actual logged-in user ID

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${userId}/borrowed`)
      .then(res => setBorrowedBooks(res.data))
      .catch(err => console.error("Error fetching borrowed books:", err));
  }, []);

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
