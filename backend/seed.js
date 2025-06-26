const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Book = require('./models/Book');

const MONGO_URI = process.env.MONGO_URI;

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("🌱 Connected to MongoDB");

    // 1. Clear old data (optional)
    await User.deleteMany();
    await Book.deleteMany();

    // 2. Add default user
    const user = await User.create({
      name: "Harshit Kumar Singh",
      email: "harshit@example.com",
      contact: "+91-9876543210",
      address: "Patna, Bihar",
      borrowedBooks: [] // empty initially
    });

    console.log("✅ Default user created:", user.name);

    // 3. Add some books
    const books = await Book.insertMany([
        { title: "The Alchemist", author: "Paulo Coelho", rating: 4.5, shelf: "A1", quantity: 5, available: 5, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "1984", author: "George Orwell", rating: 4.7, shelf: "A2", quantity: 4, available: 4, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "To Kill a Mockingbird", author: "Harper Lee", rating: 4.8, shelf: "A3", quantity: 3, available: 3, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "Pride and Prejudice", author: "Jane Austen", rating: 4.6, shelf: "A4", quantity: 4, available: 4, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: 4.4, shelf: "B1", quantity: 6, available: 6, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "Moby Dick", author: "Herman Melville", rating: 3.9, shelf: "B2", quantity: 2, available: 2, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "War and Peace", author: "Leo Tolstoy", rating: 4.2, shelf: "B3", quantity: 5, available: 5, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "Brave New World", author: "Aldous Huxley", rating: 4.3, shelf: "B4", quantity: 3, available: 3, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "The Catcher in the Rye", author: "J.D. Salinger", rating: 4.1, shelf: "C1", quantity: 4, available: 4, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "Jane Eyre", author: "Charlotte Brontë", rating: 4.5, shelf: "C2", quantity: 5, available: 5, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "Crime and Punishment", author: "Fyodor Dostoevsky", rating: 4.7, shelf: "C3", quantity: 3, available: 3, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "Wuthering Heights", author: "Emily Brontë", rating: 4.0, shelf: "C4", quantity: 4, available: 4, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "The Odyssey", author: "Homer", rating: 4.6, shelf: "D1", quantity: 5, available: 5, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "The Iliad", author: "Homer", rating: 4.4, shelf: "D2", quantity: 5, available: 5, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "Les Misérables", author: "Victor Hugo", rating: 4.8, shelf: "D3", quantity: 2, available: 2, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "A Tale of Two Cities", author: "Charles Dickens", rating: 4.3, shelf: "D4", quantity: 6, available: 6, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "Frankenstein", author: "Mary Shelley", rating: 4.2, shelf: "E1", quantity: 4, available: 4, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "The Hobbit", author: "J.R.R. Tolkien", rating: 4.9, shelf: "E2", quantity: 7, available: 7, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "Fahrenheit 451", author: "Ray Bradbury", rating: 4.4, shelf: "E3", quantity: 3, available: 3, coverImage: "http://localhost:3000/images/bookcover01.jpg" },
        { title: "The Picture of Dorian Gray", author: "Oscar Wilde", rating: 4.5, shelf: "E4", quantity: 4, available: 4, coverImage: "http://localhost:3000/images/bookcover01.jpg" }
        ]);


    console.log("✅ Books added:", books.length);

    mongoose.disconnect();
    console.log("🚪 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
}

seedDatabase();
