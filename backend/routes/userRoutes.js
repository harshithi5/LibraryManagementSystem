const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');

// Get user by ID (required for likedBooks fetching)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent reads (returned books sorted by borrow date)
router.get('/:id/recent-reads', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('borrowedBooks.bookId');

    if (!user) return res.status(404).json({ error: 'User not found' });

    const returnedBooks = user.borrowedBooks
      .filter(entry => entry.returned && entry.bookId)
      .sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate));

    const seen = new Set();
    const recentBooks = [];

    for (let entry of returnedBooks) {
      const id = entry.bookId._id.toString();
      if (!seen.has(id)) {
        seen.add(id);
        recentBooks.push(entry.bookId);
        if (recentBooks.length === 15) break;
      }
    }

    res.json(recentBooks);
  } catch (err) {
    console.error('Error fetching recent reads:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Like a book
router.post('/:userId/like/:bookId', async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    await User.findByIdAndUpdate(userId, { $addToSet: { likedBooks: bookId } });
    res.json({ message: 'Book liked successfully' });
  } catch (err) {
    console.error('Error liking book:', err);
    res.status(500).json({ error: 'Failed to like book' });
  }
});

// Unlike a book
router.post('/:userId/unlike/:bookId', async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    await User.findByIdAndUpdate(userId, { $pull: { likedBooks: bookId } });
    res.json({ message: 'Book unliked successfully' });
  } catch (err) {
    console.error('Error unliking book:', err);
    res.status(500).json({ error: 'Failed to unlike book' });
  }
});

//borrow button post request
router.post('/:userId/borrow/:bookId', async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) return res.status(404).send("User or Book not found");

    const alreadyBorrowed = user.borrowedBooks.find(b => b.bookId.equals(bookId) && !b.returned);
    if (alreadyBorrowed) return res.status(400).send("Book already borrowed");

    if (book.available === 0) return res.status(400).send("Book not available");

    user.borrowedBooks.push({ bookId });
    await user.save();

    book.available -= 1;
    await book.save();

    res.status(200).send("Book borrowed successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// borrowed books
router.get('/:userId/borrowed', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('borrowedBooks.bookId');

    const borrowed = user.borrowedBooks.map(entry => ({
      book: entry.bookId,
      borrowDate: entry.borrowDate,
      returnDate: entry.returnDate,
      returned: entry.returned
    }));

    res.json(borrowed);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch borrowed books' });
  }
});






module.exports = router;
