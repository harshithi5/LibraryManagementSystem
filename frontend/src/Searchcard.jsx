import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';

import Location from './assets/location.svg';
import Redheart from './assets/redheart.svg';
import Whiteheart from './assets/whiteheart.svg';

function Searchcard(props) {
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiFadeOut, setConfettiFadeOut] = useState(false);
  const [liked, setLiked] = useState(props.isLiked);
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(props.avail === 'Out of Stock');

  // Sync liked state with props.isLiked
  useEffect(() => {
    setLiked(props.isLiked);
  }, [props.isLiked]);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${props.userId}`)
      .then(res => {
        const borrowed = res.data.borrowedBooks.find(b => b.bookId === props.bookId && !b.returned);
        if (borrowed) {
          setIsBorrowed(true);
        }
      })
      .catch(err => console.error("Error checking borrowed status:", err));
  }, [props.userId, props.bookId]);

  const handleBorrowClick = () => {
    if (isBorrowed || isUnavailable) return;
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    setShowConfetti(true);
    setConfettiFadeOut(false);
    setShowModal(false);

    setTimeout(() => setConfettiFadeOut(true), 3000);
    setTimeout(() => setShowConfetti(false), 4750);

    try {
      await axios.post(`http://localhost:5000/users/${props.userId}/borrow/${props.bookId}`);
      setIsBorrowed(true);
      setIsUnavailable(props.avail === 'In-Shelf' && props.availCount - 1 === 0);
    } catch (err) {
      console.error("Error borrowing book:", err);
    }
  };

  const handleLikeToggle = async () => {
    const userId = props.userId;

    try {
      if (liked) {
        await axios.post(`http://localhost:5000/users/${userId}/unlike/${props.bookId}`);
        if (props.onUnlike) props.onUnlike(props.bookId);
      } else {
        await axios.post(`http://localhost:5000/users/${userId}/like/${props.bookId}`);
      }
      setLiked(!liked);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  return (
    <>
      {showConfetti && (
        <div style={{
          transition: 'opacity 0.75s ease-out',
          opacity: confettiFadeOut ? 0 : 1,
          position: 'fixed', inset: 0,
          pointerEvents: 'none',
          zIndex: 1000,
        }}>
          <Confetti numberOfPieces={400} recycle={false} gravity={0.2} />
        </div>
      )}

      <div className='bg-white h-40 p-5 flex justify-between rounded'>
        <div><img src={props.cover} className='h-30 w-25 rounded' /></div>

        <div className='flex flex-col gap-3 justify-center'>
          <div className='w-50 text-lg text-zinc-600'>{props.title}</div>
          <div className='text-sm text-gray-600'>{props.writer}</div>
        </div>

        <div className='flex items-center'>
          <div className='text-xl text-zinc-800'>{props.rating}</div>
          <div className='text-xs text-zinc-500'>/5</div>
        </div>

        <div className='text-zinc-600 items-center flex'>
          {props.category}
        </div>

        <div className='flex flex-col justify-center gap-3 items-center'>
          <div className='flex'>
            <img src={Location} className='h-5' />
            <div className='text-zinc-600'>{props.location}</div>
          </div>
          <div className={`px-4 py-1 rounded-lg text-white ${props.color}`}>
            {props.avail}
          </div>
        </div>

        <div className='flex items-center cursor-pointer' onClick={handleLikeToggle}>
          <img src={liked ? Redheart : Whiteheart} className='h-5' alt="heart" />
        </div>

        <div className='items-center flex'>
          <button
            className={`px-4 py-1 rounded border text-white bg-[#ff7f56] cursor-pointer ${
              isBorrowed || isUnavailable
                ? 'bg-gray-500 border-gray-500 cursor-not-allowed'
                : 'text-[#ff7f56] border-[#ff7f56]'
            }`}
            onClick={handleBorrowClick}
            disabled={isBorrowed || isUnavailable}
          >
            {isBorrowed ? 'Borrowed' : 'Borrow'}
          </button>
        </div>
      </div>

      <hr className="w-3/4 mx-auto border-[#ff7f56]" />

      {showModal && (
        <div className="fixed inset-0 bg-opacity-0 backdrop-blur-xs flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg border-2">
            <h2 className="text-lg font-semibold mb-4">Confirm Borrow</h2>
            <p>Are you sure you want to borrow <strong>{props.title}</strong>?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer" onClick={handleCloseModal}>Cancel</button>
              <button className="bg-[#ff7f56] text-white px-4 py-2 rounded hover:bg-[#e86b41] cursor-pointer" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Searchcard;
