const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /books — fetch all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// get 15 top rated books
router.get('/recommended', async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ rating: -1 }) // highest rated first
      .limit(15);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recommended books' });
  }
});

// query route
router.get('/queryresult', async (req, res) => {
  const query = req.query.q || '';
  console.log("Incoming search query:", query);

  try {
    const titleMatches = await Book.find({ title: { $regex: query, $options: 'i' } });
    const authorMatches = await Book.find({ 
      author: { $regex: query, $options: 'i' },
      _id: { $nin: titleMatches.map(b => b._id) }
    });
    const categoryMatches = await Book.find({ 
      category: { $regex: query, $options: 'i' },
      _id: { $nin: [...titleMatches, ...authorMatches].map(b => b._id) }
    });

    const results = [...titleMatches, ...authorMatches, ...categoryMatches];

    console.log(`Found ${results.length} books`);
    res.json(results);
  } catch (error) {
    console.error('Error during query search:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
