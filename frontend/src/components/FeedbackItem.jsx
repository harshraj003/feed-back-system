import React from 'react'

export default function FeedbackItem({ item, onUpdate, onDelete }){
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className="text-yellow-400">
        {i < rating ? '⭐' : '☆'}
      </span>
    ))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Reviewed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Bug Report': return '🐛'
      case 'Feature Request': return '✨'
      case 'Complaint': return '😞'
      case 'Compliment': return '🎉'
      default: return '💬'
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 mb-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        {/* Left Side - Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getCategoryIcon(item.category)}</span>
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {item.category}
              </span>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
          </div>

          <div className="mb-3">
            <div className="font-bold text-lg text-gray-800 mb-1">{item.name}</div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>

          <div className="flex items-center gap-1 mb-3">
            {renderStars(item.rating)}
            <span className="text-sm text-gray-600 ml-2">({item.rating}/5)</span>
          </div>

          <p className="text-gray-700 mb-3 leading-relaxed">{item.message}</p>

          <div className="text-xs text-gray-400">
            Submitted on {formatDate(item.createdAt)}
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex md:flex-col gap-2 md:min-w-[140px]">
          {item.status !== 'Reviewed' && (
            <button 
              onClick={()=>onUpdate(item._id, 'Reviewed')} 
              className="flex-1 md:w-full text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Mark Reviewed
            </button>
          )}
          {item.status !== 'Completed' && (
            <button 
              onClick={()=>onUpdate(item._id, 'Completed')} 
              className="flex-1 md:w-full text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Mark Completed
            </button>
          )}
          <button 
            onClick={()=>onDelete(item._id)} 
            className="flex-1 md:w-full text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
