import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      const parsedUser = JSON.parse(userData)
      // Ensure user object has all required fields
      const completeUser = {
        ...parsedUser,
        bio: parsedUser.bio || '',
        website: parsedUser.website || '',
        createdAt: parsedUser.createdAt || new Date().toISOString(),
        updatedAt: parsedUser.updatedAt || new Date().toISOString(),
        avatarUpdatedAt: parsedUser.avatarUpdatedAt || null
      }
      setUser(completeUser)
    }
    
    setLoading(false)
  }, [])

  const login = async (formData) => {
    try {
      // Simulate API call with validation
      const response = await new Promise((resolve, reject) => 
        setTimeout(() => {
          // Mock validation - in real app, this would be an API call
          if (formData.email === 'demo@example.com' && formData.password === 'password') {
            resolve({
              data: {
                user: {
                  id: 1,
                  email: formData.email,
                  firstName: 'Demo',
                  lastName: 'User',
                  avatar: '/assets/images/avatars/default.jpg',
                  credits: 10,
                  bio: 'AI video enthusiast and creative explorer',
                  website: 'https://demo.example.com',
                  createdAt: new Date('2023-01-15').toISOString(),
                  updatedAt: new Date().toISOString(),
                  avatarUpdatedAt: null
                },
                token: 'mock-jwt-token'
              }
            });
          } else {
            reject(new Error('Invalid email or password'));
          }
        }, 1500)
      );

      setUser(response.data.user);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (formData) => {
    try {
      // Simulate API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({
          data: {
            user: {
              id: Date.now(),
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              avatar: '/assets/images/avatars/default.jpg',
              credits: 5, // New users get 5 free credits
              bio: '',
              website: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              avatarUpdatedAt: null
            },
            token: 'mock-jwt-token'
          }
        }), 1500)
      );

      setUser(response.data.user);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  const updateUser = (updates) => {
    const updatedUser = { 
      ...user, 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const addCredits = (amount) => {
    if (!user) return null;
    
    const updatedUser = {
      ...user,
      credits: user.credits + amount,
      updatedAt: new Date().toISOString()
    };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const deductCredits = (amount) => {
    if (!user || user.credits < amount) return null;
    
    const updatedUser = {
      ...user,
      credits: user.credits - amount,
      updatedAt: new Date().toISOString()
    };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const getRemainingCredits = () => {
    return user ? user.credits : 0;
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    addCredits,
    deductCredits,
    getRemainingCredits,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};