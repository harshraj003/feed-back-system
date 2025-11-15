import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  const nav = useNavigate()

  const onLogout = () => { logout(); nav('/') }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">💬</span>
            <span className="font-bold text-xl text-white">FeedbackHub</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/submit" className="text-white hover:text-gray-200 transition-colors font-medium">
              Submit Feedback
            </Link>
            {user && user.role === 'admin' ? (
              <>
                <Link to="/admin/dashboard" className="text-white hover:text-gray-200 transition-colors font-medium">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-white text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {user.email}
                  </span>
                  <button 
                    onClick={onLogout} 
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/admin/login" 
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
