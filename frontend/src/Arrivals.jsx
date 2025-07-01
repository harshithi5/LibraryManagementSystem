import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Arrivals() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(res => {
        const allBooks = res.data;

        // Group books by date (yyyy-mm-dd)
        const grouped = {};
        allBooks.forEach(book => {
          const dateOnly = new Date(book.registeredAt).toISOString().split('T')[0];
          if (!grouped[dateOnly]) grouped[dateOnly] = [];
          grouped[dateOnly].push(book);
        });

        // Get 3 most recent dates
        const latestDates = Object.keys(grouped)
          .sort((a, b) => new Date(b) - new Date(a))
          .slice(0, 3);

        // Collect books from these 3 dates
        const recentBooks = latestDates.flatMap(date => grouped[date]);

        setBooks(recentBooks);
      })
      .catch(err => {
        console.error("Error fetching books:", err);
      });
  }, []);

  const handleBookClick = (title) => {
    navigate(`/dashboard/queryresult?q=${encodeURIComponent(title)}`);
  };

  return (
    <div className='w-full max-w-[calc(100vw-12rem)] lg:max-w-[calc(100vw-20rem)] h-50 flex gap-4 lg:gap-10 px-2 lg:px-6 overflow-hidden'>
      {/* Quote Section */}
      <div className='w-[180px] md:w-[220px] lg:w-[350px] flex-shrink-0 bg-gradient-to-r from-[#ff7f56] to-[#5352ed] p-5 flex flex-col gap-2 lg:gap-8 rounded-xl text-white relative'>
        <h1 className='text-lg lg:text-2xl font-semibold'>Today's Quote</h1>
        <h3 className='text-sm lg:text-base font-normal'>
          "There is more treasure in books than in all the pirate's loot on Treasure Island."
        </h3>
        <h4 className='text-sm font-light w-max absolute right-3 bottom-2'>- Walt Disney</h4>
      </div>

      {/* New Arrivals Section */}
      <div className='flex flex-1 min-w-0 overflow-hidden'>
        <div
          className="h-full w-14 text-white bg-gradient-to-b from-[#ff7f56] to-[#5352ed] text-center grid place-content-center rounded-l-xl font-medium p-3"
          style={{
            writingMode: 'vertical-lr',
            textOrientation: 'upright',
          }}
        >
          New Arrivals
        </div>
        <div className='py-0.5 px-0.5 rounded-r-xl bg-gradient-to-b from-[#ff7f56] to-[#5352ed]'>
          <div className='h-full flex gap-5 overflow-x-auto bg-zinc-200 p-3 rounded-r-xl' style={{ scrollbarWidth: 'thin' }}>
            {books.map((book, index) => (
              <img
                key={index}
                src={book.coverImage}
                alt={book.title}
                onClick={() => handleBookClick(book.title)}
                className='h-full rounded-xl cursor-pointer border-1 hover:scale-105 transition-transform duration-300'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Arrivals;
