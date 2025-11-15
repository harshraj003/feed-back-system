import React from 'react'
import { Link } from 'react-router-dom'

export default function Success(){
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <div className="text-8xl mb-4 animate-bounce">✅</div>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Thank You!</h2>
          <p className="text-xl text-gray-600 mb-6">
            Your feedback has been successfully submitted.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              Our admin team will review your feedback and take appropriate action. We appreciate your time and input!
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Link 
            to="/" 
            className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Back to Home
          </Link>
          <Link 
            to="/submit" 
            className="block bg-white text-gray-700 border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all"
          >
            Submit Another Feedback
          </Link>
        </div>
      </div>
    </div>
  )
}
