import React from 'react';

function GM() {
  const hour = new Date().getHours();

  let greeting = 'Good Evening'; // default

  if (hour < 12) {
    greeting = 'Good Morning';
  } else if (hour < 17) {
    greeting = 'Good Afternoon';
  }

  return (
    <div className='text-2xl font-semibold text-zinc-800 py-6 px-6'>
      {greeting}
    </div>
  );
}

export default GM;
