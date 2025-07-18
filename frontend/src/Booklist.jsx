import React from 'react';
import { useNavigate } from 'react-router-dom';

function Booklist({ heading, books = [] }) {
  const navigate = useNavigate();

  const handleBookClick = (title) => {
    navigate(`/dashboard/queryresult?q=${encodeURIComponent(title)}`);
  };

  return (
    <div className='w-[calc(100vw-12rem)] lg:w-[calc(100vw-20rem)] p-2 lg:px-6'>
      <div className='text-lg text-zinc-700'>{heading}</div>
      <div className='h-70 flex gap-8 py-3 w-full overflow-x-auto' style={{ scrollbarWidth: 'none' }}>
        {books.map((book, index) => (
          <div
            key={index}
            className='w-39 p-2 flex flex-col gap-2 rounded-lg bg-white cursor-pointer hover:scale-105 transition-transform duration-300'
            onClick={() => handleBookClick(book.title)}
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className='h-50 w-35 rounded-lg object-cover object-top'
            />
            <div className='text-xs w-35 h-8 overflow-hidden text-ellipsis text-zinc-600'>
              {book.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booklist;
