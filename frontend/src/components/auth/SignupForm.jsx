import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      const result = await signup(formData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ general: result.error || 'Signup failed. Please try again.' });
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
          <h2 className="text-4xl font-extrabold mb-3">Join Us Today</h2>
          <p className="text-gray-300">Create an account to unlock all the features and start your journey with us.</p>
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h3>
          
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errors.general}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  placeholder='First Name'
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gray-800 transition`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  placeholder='Last Name'
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gray-800 transition`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@gmail.com"
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

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gray-800 transition`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="mb-6">
              <label className="flex items-start gap-2 text-gray-600 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-700 mt-1" 
                />
                <span>I agree to the <a href="#terms" className="font-semibold text-gray-800 hover:text-black">Terms and Conditions</a> and <a href="#privacy" className="font-semibold text-gray-800 hover:text-black">Privacy Policy</a></span>
              </label>
              {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1 ml-6">{errors.agreeToTerms}</p>}
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
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

       <div className="flex gap-4">
  {/* Google Button */}
  <button className="w-1/2 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition">
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M21.35 11.1h-9.17v2.94h5.23c-.23 1.26-.94 2.32-2.02 3.03v2.5h3.26c1.9-1.75 2.99-4.34 2.99-7.47 0-.7-.07-1.38-.2-2z"/>
      <path fill="#34A853" d="M12.18 22c2.7 0 4.96-.9 6.62-2.43l-3.26-2.5c-.9.6-2.04.97-3.36.97-2.58 0-4.77-1.74-5.56-4.07H3.27v2.56A9.82 9.82 0 0 0 12.18 22z"/>
      <path fill="#FBBC05" d="M6.62 13.97a5.86 5.86 0 0 1 0-3.94V7.47H3.27a9.82 9.82 0 0 0 0 9.06l3.35-2.56z"/>
      <path fill="#EA4335" d="M12.18 5.9c1.47 0 2.79.5 3.83 1.48l2.86-2.86C16.95 2.8 14.68 2 12.18 2A9.82 9.82 0 0 0 3.27 7.47l3.35 2.56c.79-2.33 2.98-4.07 5.56-4.07z"/>
    </svg>
    Google
  </button>

  {/* GitHub Button */}
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
            <p className="text-gray-600">Already have an account? <Link to="/login" className="font-semibold text-gray-800 hover:text-black">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
