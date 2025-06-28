const mongoose = require('mongoose');

const borrowedBookSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  borrowDate: {
    type: Date,
    default: Date.now
  },
  returnDate: {
    type: Date,
    default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days ahead
  },
  returned: {
    type: Boolean,
    default: false
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // 🔐 added this
  contact: String,
  address: String,
  borrowedBooks: [borrowedBookSchema],
  likedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
