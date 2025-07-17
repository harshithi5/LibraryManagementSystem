# Library Management System

## Problem Statement:
In my hometown, there is a library used by many, but the librarian always struggled due to the overwhelming number of books and the tedious task of manually registering every entry of readers and books in physical registers. This manual process made it difficult to track and verify entries throughout the day.

## The Solution:
I decided to solve this problem using the skills I've gained. I built a Library Management System app that eliminates the hassle of manual updates while engaging users and saving their time.

This app, built using the MERN Stack (MongoDB, Express, React, Node.js), simplifies the day-to-day life of anyone who loves borrowing and reading books regularly.

## Features:

### 1. Secure Authentication:
Uses bcrypt for password hashing and JWT for authentication to ensure your privacy and secure logins. Your reading history stays yours.

### 2. Newly Arrived Books:
Displays newly added books so readers can easily find fresh content they might have missed before.

### 3. Trending Books:
Highlights trending books to help readers stay updated with popular and recommended reads.

### 4. Recent Reads:
Easily revisit important or heart-touching books through the recent reads feature.

### 5. Search Functionality:
Find books quickly by searching for them by title, author, or category.

### 6. Shelf & Availability Management:
Displays book shelf information to ease physical searching. Prevents borrowing the same book more than once and shows real-time availability.

### 7. Favorites Collection:
Users can mark and collect their favorite books in one convenient place.

### 8. Borrow History Tracking:
Track borrowed books, see which ones were returned on time, and check any overdue books.

## Setup Instructions

### 1. Clone the repository:
```bash
git clone https://github.com/harshithi5/LibraryManagementSystem.git
cd LibraryManagementSystem
```

### 2. Install Dependencies:
#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

### 3. Create a .env file inside the backend/ folder:
```bash
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the application:
#### Backend:
```bash
cd backend
npm run dev
```

#### Frontend:
```bash
cd frontend
npm run dev
```
