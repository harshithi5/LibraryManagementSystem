import React from 'react';
import BookCover01 from './assets/bookcover01.jpg';

function Historycard(props) {
  const today = new Date();
  const dueDate = new Date(props.submitdate);
  const isOverdue = today > dueDate;

  // 🟩 Determine the status and corresponding background color
  let statusLabel = 'Borrowed';
  let statusClass = 'bg-zinc-700';

  if (props.returned) {
    statusLabel = 'Returned';
    statusClass = 'bg-green-600';
  } else if (isOverdue) {
    statusLabel = 'Overdue';
    statusClass = 'bg-red-600';
  }

  console.log("Returned prop:", props.returned);


  return (
    <div className='bg-white rounded-xl w-80 flex'>
      <div className='w-40 flex flex-col items-start justify-center p-3'>
        <div className='h-40 w-30'>
          <img src={BookCover01} className='h-full w-full rounded object-center' />
        </div>
        <div className='text-zinc-800 text-[0.78rem] w-30'>
          {props.title}
        </div>
        <div className='text-gray-600 text-xs w-40'>{props.writer}</div>
        <div className='flex items-center'>
          <div className='text-sm text-zinc-700'>{props.rating}</div>
          <div className='text-xs text-zinc-500'>/5</div>
        </div>
      </div>
      <div className='flex-1 p-3 flex flex-col justify-around'>
        <div className='flex flex-col gap-2'>
          <div className='text-zinc-600 text-sm'>Borrowed on</div>
          <div className='text-gray-600 text-xs'>{props.borrowdate}</div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-zinc-600 text-sm'>Submission Due</div>
          <div className='text-gray-600 text-xs'>{props.submitdate}</div>
        </div>
        <div className={`${statusClass} text-white w-max px-5 py-2 rounded text-sm`}>
          {statusLabel}
        </div>
      </div>
    </div>
  );
}

export default Historycard;
