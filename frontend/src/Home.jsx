import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Arrivals from './Arrivals';
import GM from './GM';
import Booklist from './Booklist';

function Home() {
  const [recommended, setRecommended] = useState([]);
  const [recentReads, setRecentReads] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books/recommended')
      .then(res => setRecommended(res.data))
      .catch(err => console.error("Error fetching recommended books:", err));
  }, []);

  useEffect(() => {
    const userId = '685b694ba353bd8aeb09f6db';

    axios.get(`http://localhost:5000/users/${userId}/recent-reads`)
      .then(res => setRecentReads(res.data))
      .catch(err => console.error("Error fetching recent reads:", err));
  }, []);

  return (
    <div>
      <Arrivals />
      <GM />
      <Booklist heading="Recommended For You" books={recommended} />
      {recentReads.length > 0 && (
        <Booklist heading="Recent Reads" books={recentReads} />
      )}
    </div>
  );
}

export default Home;
