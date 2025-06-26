import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Left from './Left';
import Right from './Right';
import Home from './Home';
import Search from './Search';
import Shelf from './Shelf';
import History from './History';
import Queryresult from './Queryresult';

function Dashboard() {
  const [likedBooks, setLikedBooks] = useState([]);
  const [userId] = useState('685b694ba353bd8aeb09f6db'); // hardcoded for now

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${userId}`)
      .then(res => {
        const liked = res.data.likedBooks.map(bookId => bookId.toString());
        setLikedBooks(liked);
      })
      .catch(err => console.error("Error fetching liked books:", err));
  }, [userId]);

  return ( 
    <div className="flex">
      <div className="h-screen w-80">
        <Left />
      </div>

      <div className="h-screen flex-1">
        <Routes>
          <Route path="/" element={<Right><Home /></Right>} />
          <Route path="/search" element={<Right><Search likedBooks={likedBooks} userId={userId} /></Right>} />
          <Route path="/shelf" element={<Right><Shelf /></Right>} />
          <Route path="/history" element={<Right><History /></Right>} />
          <Route path="/queryresult" element={<Right><Queryresult likedBooks={likedBooks} userId={userId} /></Right>} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
