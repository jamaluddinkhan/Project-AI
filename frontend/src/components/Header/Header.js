import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Project - AI</h1>
        <div className="header-user">
          {user && (
            <>
              <span className="header-welcome">Welcome, {user.name}</span>
              <button 
                onClick={onLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;