import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import MainPage from './MainPage.jsx';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);  

  return (
    <Routes>
      <Route path="/" element={
        <MainPage
          isLoginOpen={isLoginOpen}
          isSignupOpen={isSignupOpen}
          setIsLoginOpen={setIsLoginOpen}
          setIsSignupOpen={setIsSignupOpen}
        />
      } />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
