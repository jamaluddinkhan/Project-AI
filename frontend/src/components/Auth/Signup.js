import React, { useState } from 'react';
import './Signup.css';

const Signup = ({ onSignup, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        onSignup(formData);
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card split-layout">
        {/* Left Side */}
        <div className="signup-left">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm0 8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6z"/>
            </svg>
            <span>Project - AI</span>
          </div>
          <h2>Create Account</h2>
          <p>Join us to start creating amazing AI videos</p>
        </div>

        {/* Right Side */}
        <div className="signup-right">
          <form onSubmit={handleSubmit} className="signup-form">
            {['name','email','password','confirmPassword'].map((field,index)=>{
              const type = field.includes('password') ? 'password' : 'text';
              const placeholder = field==='name' ? 'Enter your full name' : field==='email' ? 'Enter your email' : field==='password' ? 'Create a password' : 'Confirm your password';
              return (
                <div className="input-group" key={index}>
                  <label htmlFor={field}>{field==='name' ? 'Full Name' : field==='confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={type}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={errors[field] ? 'error' : ''}
                  />
                  <div className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      {field==='name' ? 
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        :
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                      }
                    </svg>
                  </div>
                  {errors[field] && <span className="error-message">{errors[field]}</span>}
                </div>
              )
            })}

            <div className="terms-agreement">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a></span>
              </label>
            </div>

            <button 
              type="submit" 
              className={`signup-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="signup-divider">
            <span>Or sign up with</span>
          </div>

          <div className="social-signup">
            <button className="social-btn google-btn">Google</button>
            <button className="social-btn github-btn">GitHub</button>
          </div>

          <div className="signup-footer">
            <p>Already have an account? <button onClick={switchToLogin} className="login-link">Sign in</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
