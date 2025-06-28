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
    const fetchRecentReads = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // Step 1: Get logged-in user's ID
        const userRes = await axios.get('http://localhost:5000/users/me/id', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userId = userRes.data.userId;

        // Step 2: Fetch recent reads for that user
        const res = await axios.get(`http://localhost:5000/users/${userId}/recent-reads`);
        setRecentReads(res.data);

      } catch (err) {
        console.error("Error fetching recent reads:", err);
      }
    };

    fetchRecentReads();
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
