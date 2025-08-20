import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm'
import SignUpForm from './components/auth/SignUpForm'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Pricing from './pages/Pricing'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { VideoProvider } from './contexts/VideoContext' // Add this import
import LoadingSpinner from './components/common/LoadingSpinner'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }
  
  return user ? children : <Navigate to="/login" replace />
}

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }
  
  return !user ? children : <Navigate to="/dashboard" replace />
}

// Main App Component
function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Home page - accessible to all */}
        <Route path="/" element={<Home />} />
        
        {/* Auth pages - only accessible when not logged in */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
                <LoginForm />
              </div>
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <div className="min-h-screen bg极狐-100 flex items-center justify-center py-8">
                <SignUpForm />
              </div>
            </PublicRoute>
          } 
        />
        
        {/* Protected pages - only accessible when logged in */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pricing" 
          element={
            <ProtectedRoute>
              <Pricing />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

// Main App Wrapper
function App() {
  return (
    <AuthProvider>
      <VideoProvider>
        <AppContent />
      </VideoProvider>
    </AuthProvider>
  )
}

export default App;