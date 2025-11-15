import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } })

// Optional: response interceptor to handle auth errors globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      // If needed, broadcast logout or similar
    }
    return Promise.reject(err)
  }
)

export default api
