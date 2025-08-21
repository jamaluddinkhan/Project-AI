import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm'
import SignUpForm from './components/auth/SignUpForm'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { VideoProvider } from './contexts/VideoContext'
import LoadingSpinner from './components/common/LoadingSpinner'
import Footer from './components/common/Footer'

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

// Public Route Component
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

// Layout Component with Footer
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
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
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        
        <Route path="/login" element={
          <PublicRoute>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
              <LoginForm />
            </div>
          </PublicRoute>
        } />
        
        <Route path="/signup" element={
          <PublicRoute>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
              <SignUpForm />
            </div>
          </PublicRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/history" element={
          <ProtectedRoute>
            <Layout>
              <History />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        } />
        
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