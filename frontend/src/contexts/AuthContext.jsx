import React, { createContext, useContext, useState, useEffect } from 'react';
import { getConsistentAvatar } from '../utils/avatarUtils';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersDB, setUsersDB] = useState([]);

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    const storedUsers = localStorage.getItem('usersDB');
    
    if (token && userData) {
      const userDataObj = JSON.parse(userData);
      setUser(userDataObj);
    }
    
    if (storedUsers) {
      setUsersDB(JSON.parse(storedUsers));
    }
    
    setLoading(false);
  }, []);

  const login = async (formData) => {
    try {
      // Simulate API call with validation against stored users
      const response = await new Promise((resolve, reject) => 
        setTimeout(() => {
          // Check against all registered users
          const foundUser = usersDB.find(
            u => u.email === formData.email && u.password === formData.password
          );
          
          if (foundUser) {
            resolve({
              data: {
                user: {
                  id: foundUser.id,
                  email: foundUser.email,
                  firstName: foundUser.firstName,
                  lastName: foundUser.lastName,
                  avatar: foundUser.avatar || getConsistentAvatar(foundUser),
                  credits: foundUser.credits || 5,
                  bio: foundUser.bio || '',
                  website: foundUser.website || '',
                  createdAt: foundUser.createdAt,
                  updatedAt: new Date().toISOString(),
                  hasCustomAvatar: foundUser.hasCustomAvatar || false
                },
                token: 'mock-jwt-token-' + Date.now()
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
      const response = await new Promise((resolve, reject) => 
        setTimeout(() => {
          // Check if email already exists
          const existingUser = usersDB.find(u => u.email === formData.email);
          
          if (existingUser) {
            reject(new Error('Email already registered'));
            return;
          }
          
          const newUserId = Date.now();
          
          // Create new user with consistent avatar based on ID
          const newUser = {
            id: newUserId,
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            avatar: getConsistentAvatar({ id: newUserId }),
            credits: 5,
            bio: '',
            website: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            hasCustomAvatar: false
          };
          
          // Add new user to database
          const updatedUsersDB = [...usersDB, newUser];
          setUsersDB(updatedUsersDB);
          localStorage.setItem('usersDB', JSON.stringify(updatedUsersDB));
          
          resolve({
            data: {
              user: newUser,
              token: 'mock-jwt-token-' + newUserId
            }
          });
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
    
    // Update in database
    const updatedUsersDB = usersDB.map(u => 
      u.id === user.id ? { ...u, ...updates } : u
    );
    setUsersDB(updatedUsersDB);
    localStorage.setItem('usersDB', JSON.stringify(updatedUsersDB));
    
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    
    return updatedUser;
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};