import React, { useState } from 'react';

// LoginForm Component
const LoginForm = ({ onLogin, switchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(formData);
      setIsLoading(false);
    }, 1500);
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
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
              />
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
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
              />
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
            <button className="w-1/2 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition">Google</button>
            <button className="w-1/2 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition">GitHub</button>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">Don't have an account? <button onClick={switchToSignup} className="font-semibold text-gray-800 hover:text-black">Sign up</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
