import React, { useState } from 'react'
import { submitFeedback } from '../services/feedbackService'
import { useNavigate } from 'react-router-dom'

export default function FeedbackForm(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [category, setCategory] = useState('General Feedback')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const nav = useNavigate()

  const categories = ['Bug Report', 'Feature Request', 'General Feedback', 'Complaint', 'Compliment']

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!name || !email || !message) return setError('All fields required')
    if (rating === 0) return setError('Please select a rating')
    setLoading(true)
    try {
      await submitFeedback({ name, email, message, rating, category })
      nav('/success')
    } catch (err) {
      setError(err?.response?.data?.message || 'Error submitting feedback')
    } finally { setLoading(false) }
  }

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        onMouseEnter={() => setHoveredRating(star)}
        onMouseLeave={() => setHoveredRating(0)}
        className="text-4xl focus:outline-none transition-transform hover:scale-110"
      >
        {star <= (hoveredRating || rating) ? '⭐' : '☆'}
      </button>
    ))
  }

  return (
    <form onSubmit={submit} className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">Share Your Feedback</h2>
      <p className="text-gray-600 mb-6">We value your opinion and appreciate your time.</p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <div className="space-y-5">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Your Name *</label>
          <input 
            value={name} 
            onChange={e=>setName(e.target.value)} 
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
          <input 
            type="email"
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Feedback Category *</label>
          <select 
            value={category} 
            onChange={e=>setCategory(e.target.value)}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Rate Your Experience *</label>
          <div className="flex space-x-2">
            {renderStars()}
          </div>
          {rating > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {rating === 1 && 'Very Poor'}
              {rating === 2 && 'Poor'}
              {rating === 3 && 'Average'}
              {rating === 4 && 'Good'}
              {rating === 5 && 'Excellent'}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Your Message *</label>
          <textarea 
            value={message} 
            onChange={e=>setMessage(e.target.value)} 
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none" 
            rows={6}
            placeholder="Tell us about your experience..."
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Submit Feedback'}
        </button>
      </div>
    </form>
  )
}
