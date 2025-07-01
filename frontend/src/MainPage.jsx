import React from 'react'
import Navbar01 from './Navbar01';
import Welcome from './Welcome';
import Features from './Features';
import Trendingbooks from './Trendingbooks';
import Popularauthors from './Popularauthors';
import LoginModal from './LoginModal.jsx';
import SignupModal from './SignupModal.jsx';

function MainPage({ setIsLoginOpen, setIsSignupOpen, isLoginOpen, isSignupOpen }) {
  return (
    <div className={`relative bg-zinc-200 min-h-screen ${isLoginOpen ? "backdrop-blur-sm" : ""}`}>
      <Navbar01 onLoginClick={() => setIsLoginOpen(true)} onSignupClick={() => setIsSignupOpen(true)} />
      <Welcome onSignupClick={() => setIsSignupOpen(true)} />
      <Features /> 
      <Trendingbooks />
      <Popularauthors />
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
    </div>
  );
}

export default MainPage
