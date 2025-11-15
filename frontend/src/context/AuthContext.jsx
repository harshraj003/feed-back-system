import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('auth');
      return raw ? JSON.parse(raw).user : null;
    } catch (e) { return null }
  })
  const [token, setToken] = useState(() => {
    try { const raw = localStorage.getItem('auth'); return raw ? JSON.parse(raw).token : null } catch (e) { return null }
  })

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }, [token])

  const login = ({ token, user }) => {
    setToken(token)
    setUser(user)
    localStorage.setItem('auth', JSON.stringify({ token, user }))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('auth')
  }

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
}
