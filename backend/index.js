const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//all book route
const bookRoutes = require('./routes/bookRoutes');
app.use('/books', bookRoutes);

//user route
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);


// Sample route
app.get("/", (req, res) => {
  res.send("Backend server is running...");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB Atlas");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
