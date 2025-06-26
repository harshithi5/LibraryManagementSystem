const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  rating: Number,
  shelf: String,
  quantity: Number,
  available: Number,
  coverImage: String,
  category: String,
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema);
