import React from 'react';
import Signup from '../components/Auth/Signup';
import './SignupPage.css';

const SignupPage = ({ onSignup, switchToLogin }) => {
  return (
    <div className="signup-page">
      <Signup onSignup={onSignup} switchToLogin={switchToLogin} />
    </div>
  );
};

export default SignupPage;