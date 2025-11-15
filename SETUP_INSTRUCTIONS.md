# 🚀 Client Feedback Management System - Setup Guide

## ✅ Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running locally OR MongoDB Atlas account
- npm or yarn

---

## 📦 Installation & Running Instructions

### 1️⃣ Backend Setup

```powershell
# Navigate to backend
cd 'c:\Users\Harsh raj\client-feedback-system\backend'

# Install dependencies
npm install

# The .env file is already created with default values
# If MongoDB is not running locally, update MONGO_URI in .env

# Start the backend server
npm start
```

**Backend will run on:** `http://localhost:5000`

---

### 2️⃣ Frontend Setup

```powershell
# Open a NEW terminal
# Navigate to frontend
cd 'c:\Users\Harsh raj\client-feedback-system\frontend'

# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

---

## 🎯 Quick Start (After Installation)

### Start Backend:
```powershell
cd 'c:\Users\Harsh raj\client-feedback-system\backend'
npm start
```

### Start Frontend (in separate terminal):
```powershell
cd 'c:\Users\Harsh raj\client-feedback-system\frontend'
npm run dev
```

---

## 🔧 Important Notes

1. **MongoDB**: Make sure MongoDB is running on `mongodb://127.0.0.1:27017` or update the `MONGO_URI` in `backend/.env`

2. **Create Admin User**: Use Postman or any API client to register an admin:
   ```
   POST http://localhost:5000/api/auth/register
   Body: {
     "name": "Admin User",
     "email": "admin@example.com",
     "password": "admin123",
     "role": "admin"
   }
   ```

3. **Environment Files**: 
   - `backend/.env` - Backend configuration
   - `frontend/.env` - Frontend API URL configuration

---

## 🧪 Testing the Application

1. **Open Browser**: Go to `http://localhost:5173`
2. **Submit Feedback**: Click "Submit Feedback" and fill the form (no login required)
3. **Admin Login**: Click "Admin Login" and use admin credentials
4. **Dashboard**: View, update status, and delete feedback items

---

## 📝 Default Configuration

- **Backend Port**: 5000
- **Frontend Port**: 5173
- **MongoDB**: `mongodb://127.0.0.1:27017/client-feedback`
- **JWT Secret**: Change in production!

---

## ❌ Troubleshooting

### MongoDB Connection Error
- Start MongoDB: `mongod` (or start MongoDB service)
- Or use MongoDB Atlas and update MONGO_URI

### Port Already in Use
- Change PORT in `backend/.env`
- Update VITE_API_URL in `frontend/.env` accordingly

### Module Not Found
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
