import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { saveUserSession, getUserSession, clearUserSession } from './utils/sessionUtils';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);

  // Check if user session exists when component mounts
  useEffect(() => {
    const savedUser = getUserSession();
    if (savedUser) {
      setUser(savedUser);
      setCurrentPage('home');
    }
  }, []);

  const handleLogin = (loginData) => {
    // Mock login - in a real app, this would call your backend API
    const userData = {
      name: 'Demo User',
      email: loginData.email
    };
    
    setUser(userData);
    saveUserSession(userData);
    setCurrentPage('home');
  };

  const handleSignup = (signupData) => {
    // Mock signup - in a real app, this would call your backend API
    const userData = {
      name: signupData.name,
      email: signupData.email
    };
    
    setUser(userData);
    saveUserSession(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    clearUserSession();
    setCurrentPage('login');
  };

  const switchToSignup = () => {
    setCurrentPage('signup');
  };

  const switchToLogin = () => {
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {currentPage === 'home' && user ? (
        <Home user={user} onLogout={handleLogout} />
      ) : currentPage === 'signup' ? (
        <SignupPage onSignup={handleSignup} switchToLogin={switchToLogin} />
      ) : (
        <LoginPage onLogin={handleLogin} switchToSignup={switchToSignup} />
      )}
    </div>
  );
}

export default App;