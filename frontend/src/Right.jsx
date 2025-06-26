import React from 'react';
import Navbar02 from './Navbar02';

function Right({ children }) {
  return (
    <div className='bg-zinc-200 h-full w-full px-6 overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
      <Navbar02 />
      {children}
    </div>
  );
}

export default Right;
