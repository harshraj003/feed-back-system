import api from './api'

export const submitFeedback = async (payload) => {
  const res = await api.post('/feedback', payload)
  return res.data
}

export const getAllFeedback = async (params = {}) => {
  const res = await api.get('/feedback', { params })
  return res.data
}

export const getStatistics = async () => {
  const res = await api.get('/feedback/statistics')
  return res.data
}

export const updateFeedback = async (id, status) => {
  const res = await api.put(`/feedback/${id}`, { status })
  return res.data
}

export const deleteFeedback = async (id) => {
  const res = await api.delete(`/feedback/${id}`)
  return res.data
}
