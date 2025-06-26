const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose.connect('mongodb+srv://harshitkumarsingh2609:7LsNvSDEaABCbPFy@cluster0.b3ykpbb.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const updates = [
  { _id: '685b694ba353bd8aeb09f6dd', category: 'Philosophy' },
  { _id: '685b694ba353bd8aeb09f6de', category: 'Dystopian' },
  { _id: '685b694ba353bd8aeb09f6df', category: 'Classic' },
  { _id: '685b694ba353bd8aeb09f6e0', category: 'Romance' },
  { _id: '685b694ba353bd8aeb09f6e1', category: 'Classic' },
  { _id: '685b694ba353bd8aeb09f6e2', category: 'Adventure' },
  { _id: '685b694ba353bd8aeb09f6e3', category: 'Historical' },
  { _id: '685b694ba353bd8aeb09f6e4', category: 'Dystopian' },
  { _id: '685b694ba353bd8aeb09f6e5', category: 'Coming-of-age' },
  { _id: '685b694ba353bd8aeb09f6e6', category: 'Gothic' },
  { _id: '685b694ba353bd8aeb09f6e7', category: 'Psychological' },
  { _id: '685b694ba353bd8aeb09f6e8', category: 'Gothic' },
  { _id: '685b694ba353bd8aeb09f6e9', category: 'Epic' },
  { _id: '685b694ba353bd8aeb09f6ea', category: 'Epic' },
  { _id: '685b694ba353bd8aeb09f6eb', category: 'Historical' },
  { _id: '685b694ba353bd8aeb09f6ec', category: 'Historical' },
  { _id: '685b694ba353bd8aeb09f6ed', category: 'Horror' },
  { _id: '685b694ba353bd8aeb09f6ee', category: 'Fantasy' },
  { _id: '685b694ba353bd8aeb09f6ef', category: 'Dystopian' },
  { _id: '685b694ba353bd8aeb09f6f0', category: 'Philosophical' }
];

(async () => {
  for (const { _id, category } of updates) {
    await Book.findByIdAndUpdate(_id, { $set: { category } });
    console.log(`✅ Updated ${_id} with category "${category}"`);
  }

  console.log('🎉 All books updated successfully.');
  mongoose.disconnect();
})();
