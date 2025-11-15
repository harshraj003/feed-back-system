import React, { useEffect, useState } from 'react'
import { getAllFeedback, getStatistics, updateFeedback, deleteFeedback } from '../services/feedbackService'
import FeedbackItem from '../components/FeedbackItem'

export default function Dashboard(){
  const [items, setItems] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    search: '',
    page: 1
  })

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const params = {}
      if (filters.status) params.status = filters.status
      if (filters.category) params.category = filters.category
      if (filters.search) params.search = filters.search
      params.page = filters.page
      params.limit = 10

      const [feedbackRes, statsRes] = await Promise.all([
        getAllFeedback(params),
        getStatistics()
      ])
      setItems(feedbackRes.feedback || [])
      setStats(statsRes)
    } catch (err) { 
      setError(err?.response?.data?.message || 'Error loading data') 
    } finally { 
      setLoading(false) 
    }
  }

  useEffect(()=>{ load() }, [filters])

  const handleUpdate = async (id, status) => {
    try { 
      await updateFeedback(id, status)
      load() 
    } catch (err) { 
      alert('Update failed') 
    }
  }

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this feedback?')) return
    try { 
      await deleteFeedback(id)
      load() 
    } catch (err) { 
      alert('Delete failed') 
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }))
  }

  const clearFilters = () => {
    setFilters({ status: '', category: '', search: '', page: 1 })
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-spin">⚙️</div>
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Feedback Dashboard</h1>
        <p className="text-gray-600">Manage and respond to client feedback</p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-3xl font-bold mb-1">{stats.total}</div>
            <div className="text-blue-100">Total Feedback</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-2">⏳</div>
            <div className="text-3xl font-bold mb-1">
              {stats.statusCounts.find(s => s._id === 'Pending')?.count || 0}
            </div>
            <div className="text-yellow-100">Pending</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-3xl font-bold mb-1">
              {stats.statusCounts.find(s => s._id === 'Completed')?.count || 0}
            </div>
            <div className="text-green-100">Completed</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-3xl font-bold mb-1">{stats.averageRating.toFixed(1)}</div>
            <div className="text-purple-100">Avg Rating</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Name, email, or message..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="">All Categories</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="General Feedback">General Feedback</option>
              <option value="Complaint">Complaint</option>
              <option value="Compliment">Compliment</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Feedback Items ({items.length})
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <div className="text-6xl mb-4">📭</div>
          <div className="text-xl text-gray-600 mb-2">No feedback found</div>
          <div className="text-gray-500">Try adjusting your filters or check back later</div>
        </div>
      ) : (
        <div>
          {items.map(it => (
            <FeedbackItem 
              key={it._id} 
              item={it} 
              onUpdate={handleUpdate} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  )
}
