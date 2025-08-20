import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
    
    if (errors.general) {
      setErrors({
        ...errors,
        general: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const result = await login(formData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ general: result.error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm0 8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6z" />
            </svg>
            <span className="text-2xl font-bold">Project - AI</span>
          </div>
          <h2 className="text-4xl font-extrabold mb-3">Welcome Back</h2>
          <p className="text-gray-300">Sign in to your account to continue your journey with us.</p>
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h3>
          
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errors.general}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gray-800 transition`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gray-800 transition`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between mb-6 text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-700" />
                Remember me
              </label>
              <a href="#forgot" className="font-semibold text-gray-800 hover:text-black">Forgot password?</a>
            </div>

            <button
              type="submit"
              className={`w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-black transition-all duration-300 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex gap-4">
            <button className="w-1/2 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 14h-2v-2h-2v2h-2v-2h-2v2H7v-4.18c1.13-.61 2-1.73 2-3.07 0-1.93-1.57-3.5-3.5-3.5S2 8.82 2 10.75s1.57 3.5 3.5 3.5c.5 0 .97-.1 1.4-.28.03.17.05.35.05.53v3h8v-2z"/>
              </svg>
              Google
            </button>
            <button className="w-1/2 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition">
             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12 2C6.477 2 2 6.484 2 12.012c0 4.422 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482
       0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608
       1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943
       0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115
       2.504.337 1.909-1.293 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683
       0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852
       0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48
       A10.013 10.013 0 0022 12.012C22 6.484 17.523 2 12 2z"
  />
</svg>

              GitHub
            </button>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">Don't have an account? <Link to="/signup" className="font-semibold text-gray-800 hover:text-black">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;