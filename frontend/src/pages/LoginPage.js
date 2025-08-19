import React from 'react';
import Login from '../components/Auth/Login';
import './LoginPage.css';

const LoginPage = ({ onLogin, switchToSignup }) => {
  return (
    <div className="login-page">
      <Login onLogin={onLogin} switchToSignup={switchToSignup} />
    </div>
  );
};

export default LoginPage;