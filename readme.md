Library Management System  
Setup Instructions

This is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) for managing library operations.  
Users can browse, like, borrow, and return books, while admins can manage the inventory.  
The app includes user authentication, real-time book availability updates, and borrow history tracking.

1. Clone the repo:

   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system

2. Install dependencies:

   cd backend
   npm install

   Open a new terminal tab/window:
   cd frontend
   npm install

3. Create a .env file inside the backend/ folder:

   PORT=5000  
   MONGO_URI=your_mongodb_connection_string  
   JWT_SECRET=your_jwt_secret_key

4. Start the app:

   In the backend folder:
   npm run dev

   In the frontend folder:
   npm run dev

5. Make sure there's an uploads/ folder at the root level:

   Create it manually if it’s missing. This folder is used to store uploaded book images or files.
