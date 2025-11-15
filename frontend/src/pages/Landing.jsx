import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Client Feedback System
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Your voice matters! Share your experience with our IT services.
          </p>
          <p className="text-gray-500 mb-8">
            Help us improve by submitting feedback. Our admin team reviews every submission to enhance your experience.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="font-semibold text-lg mb-2">Easy Submission</h3>
            <p className="text-gray-600 text-sm">Submit feedback quickly without any registration</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="font-semibold text-lg mb-2">Rate Your Experience</h3>
            <p className="text-gray-600 text-sm">Share your rating and categorize feedback</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="font-semibold text-lg mb-2">Quick Response</h3>
            <p className="text-gray-600 text-sm">Admin team reviews and acts on your feedback</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/submit" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Submit Feedback
          </Link>
          <Link 
            to="/admin/login" 
            className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 hover:shadow-md transition-all duration-200"
          >
            Admin Login
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600 text-sm">Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">Instant</div>
              <div className="text-gray-600 text-sm">Submission</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">Secure</div>
              <div className="text-gray-600 text-sm">& Private</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">Fast</div>
              <div className="text-gray-600 text-sm">Response</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
