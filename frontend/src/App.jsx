import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Submit from './pages/Submit'
import Success from './pages/Success'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/submit" element={<Submit/>} />
          <Route path="/success" element={<Success/>} />

          <Route path="/admin/login" element={<AdminLogin/>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}
