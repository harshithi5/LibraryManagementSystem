import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Search from './assets/searchorange.svg';
import Calendar from './assets/calendarorange.svg';
import Avatar from './assets/avatar.svg';
import DD from './assets/dropdown.svg';

function Navbar02() {
  const [query, setQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const avatarRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toLocaleDateString();
      setCurrentTime(`${dateStr} • ${timeStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/dashboard/queryresult?q=${encodeURIComponent(query)}`);
    }
  };

  const handleProfile = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowDropdown(false);
    alert('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="h-20 w-full flex items-center justify-between sticky top-0 z-10 bg-zinc-200 px-6">
      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white rounded-full px-4 py-2 w-md shadow-md"
      >
        <img src={Search} className="w-5 h-5 mr-2" alt="search" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none placeholder-gray-400 text-sm text-gray-600"
        />
      </form>

      {/* Time & Date */}
      <div className="text-zinc-600 text-sm font-medium bg-white rounded-full px-4 py-2 w-max shadow-md flex items-center gap-3">
        <img src={Calendar} className='h-5' alt="calendar" />
        {currentTime}
      </div>

      {/* Avatar + Dropdown */}
      <div className="relative" ref={avatarRef}>
        <div
          className='flex bg-white rounded-3xl pl-0.5 pr-2 py-0.5 items-center gap-3 shadow-md cursor-pointer'
          onClick={() => setShowDropdown(prev => !prev)}
        >
          <div className='h-8 w-8 rounded-full bg-red-800 flex items-center justify-center'>
            <img src={Avatar} className='h-full' alt="avatar" />
          </div>
          <div className='text-zinc-600 text-sm font-medium'>Harshit</div>
          <div><img src={DD} className='h-8' alt="dropdown" /></div>
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-20">
            <div
              className="px-4 py-2 hover:bg-zinc-100 cursor-pointer text-zinc-700 text-sm rounded-lg"
              onClick={handleProfile}
            >
              Profile
            </div>
            <div
              className="px-4 py-2 hover:bg-zinc-100 cursor-pointer text-zinc-700 text-sm rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar02;
