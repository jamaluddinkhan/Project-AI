import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm'
import SignUpForm from './components/auth/SignUpForm'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Pricing from './pages/Pricing'
import Home from './pages/Home'
import { AuthProvider, useAuth } from './contexts/AuthContext'
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
  
  return user ? children : <Navigate to="/" replace />
}

// Auth Forms Container Component
const AuthFormsContainer = () => {
  const [isLogin, setIsLogin] = useState(() => {
    const savedState = localStorage.getItem('authFormState')
    return savedState ? JSON.parse(savedState) : true
  })

  useEffect(() => {
    localStorage.setItem('authFormState', JSON.stringify(isLogin))
  }, [isLogin])

  const handleLogin = (formData) => {
    console.log('Login data:', formData)
  }

  const handleSignup = (formData) => {
    console.log('Signup data:', formData)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      {isLogin ? (
        <LoginForm 
          onLogin={handleLogin} 
          switchToSignup={() => setIsLogin(false)} 
        />
      ) : (
        <SignUpForm 
          onSignup={handleSignup} 
          switchToLogin={() => setIsLogin(true)} 
        />
      )}
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
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <AuthFormsContainer />} 
        />
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
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

// Main App Wrapper
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App;