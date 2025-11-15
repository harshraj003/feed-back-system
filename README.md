# 🚀 Client Feedback Management System

A full-stack web application for collecting and managing client feedback about IT services. Built with Node.js, Express, MongoDB, React, and TailwindCSS.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-required-green.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Usage Guide](#-usage-guide)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

### 🌐 Public Features
- ✅ Submit feedback without authentication
- ✅ Clean, responsive UI with TailwindCSS
- ✅ Form validation and error handling
- ✅ Success confirmation page

### 🔐 Admin Features
- ✅ Secure JWT authentication
- ✅ Protected admin dashboard
- ✅ View all submitted feedback
- ✅ Update feedback status (Pending → Reviewed → Completed)
- ✅ Delete feedback records
- ✅ Role-based access control

### 🎨 UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states and error messages
- ✅ Color-coded status indicators
- ✅ Intuitive navigation

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing
- **Environment:** dotenv for configuration

### Frontend
- **Library:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** TailwindCSS
- **State Management:** React Context API

---

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Install locally](https://www.mongodb.com/try/download/community) OR use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Git** (optional) for version control

---

## 🚀 Quick Start

### 1. Clone or Navigate to Project

```powershell
cd 'c:\Users\Harsh raj\client-feedback-system'
```

### 2. Backend Setup

```powershell
# Navigate to backend
cd backend

# Install dependencies (already done)
# npm install

# Environment is already configured in .env
# Start the server
npm start
```

✅ **Backend running at:** `http://localhost:5000`

### 3. Frontend Setup

```powershell
# Open NEW terminal
# Navigate to frontend
cd frontend

# Install dependencies (already done)
# npm install

# Start development server
npm run dev
```

✅ **Frontend running at:** `http://localhost:5173`

### 4. Create Admin User

Run this PowerShell command:

```powershell
$body = @{
    name = "Admin User"
    email = "admin@example.com"
    password = "admin123"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/register" -Body $body -ContentType "application/json"
```

### 5. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Admin Login:** Use `admin@example.com` / `admin123`

---

## 📁 Project Structure

```
client-feedback-system/
│
├── backend/                 # Node.js + Express backend
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Auth logic
│   │   └── feedbackController.js  # Feedback CRUD
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Feedback.js     # Feedback schema
│   ├── routes/
│   │   ├── authRoutes.js   # Auth endpoints
│   │   └── feedbackRoutes.js      # Feedback endpoints
│   ├── .env                # Environment variables
│   ├── .env.example        # Example env file
│   ├── server.js           # Entry point
│   ├── package.json        # Dependencies
│   └── README.md
│
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── ProtectedRoute.jsx  # Route guard
│   │   │   ├── FeedbackForm.jsx    # Submission form
│   │   │   └── FeedbackItem.jsx    # Feedback card
│   │   ├── pages/
│   │   │   ├── Landing.jsx         # Homepage
│   │   │   ├── Submit.jsx          # Submit page
│   │   │   ├── Success.jsx         # Success page
│   │   │   ├── AdminLogin.jsx      # Login page
│   │   │   └── Dashboard.jsx       # Admin dashboard
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state
│   │   ├── services/
│   │   │   ├── api.js              # Axios instance
│   │   │   ├── authService.js      # Auth API calls
│   │   │   └── feedbackService.js  # Feedback API calls
│   │   ├── App.jsx         # Root component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind configuration
│   ├── postcss.config.cjs  # PostCSS configuration
│   ├── .env                # Environment variables
│   ├── .env.example        # Example env file
│   └── package.json        # Dependencies
│
├── SETUP_INSTRUCTIONS.md   # Detailed setup guide
├── FEATURES_GUIDE.md       # Complete feature documentation
├── CREATE_ADMIN.md         # Admin user creation guide
└── README.md               # This file
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Public Endpoints

#### Submit Feedback
```http
POST /api/feedback
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great service!"
}
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "securepassword",
  "role": "admin"  // or "client"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "securepassword"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Protected Admin Endpoints
(Requires `Authorization: Bearer <token>` header)

#### Get All Feedback
```http
GET /api/feedback
Authorization: Bearer <your-jwt-token>
```

#### Update Feedback Status
```http
PUT /api/feedback/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "status": "Reviewed"  // "Pending" | "Reviewed" | "Completed"
}
```

#### Delete Feedback
```http
DELETE /api/feedback/:id
Authorization: Bearer <your-jwt-token>
```

---

## 📖 Usage Guide

### For Clients (Public)

1. **Visit Homepage:** Go to http://localhost:5173
2. **Submit Feedback:** Click "Submit Feedback"
3. **Fill Form:** Enter name, email, and message
4. **Submit:** Click "Send Feedback"
5. **Confirmation:** View success message

### For Administrators

1. **Login:** Navigate to Admin Login page
2. **Enter Credentials:** Use admin email and password
3. **Dashboard:** View all submitted feedback
4. **Manage:**
   - Click "Mark Reviewed" to update status
   - Click "Mark Completed" when resolved
   - Click "Delete" to remove feedback
5. **Logout:** Click logout in navigation bar

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT token-based authentication
- ✅ Protected routes with middleware
- ✅ Role-based access control (RBAC)
- ✅ Input validation on server-side
- ✅ CORS configuration
- ✅ Environment variable protection
- ✅ Token expiration (8 hours)

---

## 🌐 Deployment

### Backend → Render

1. Create new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** (leave empty for Node.js)
   - **Start Command:** `node server.js`
4. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key
   - `PORT`: (optional, Render provides)
5. Deploy

### Frontend → Netlify

1. Create new site on [Netlify](https://netlify.com)
2. Connect your repository
3. Configure:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Add Environment Variable:
   - `VITE_API_URL`: Your Render backend URL + `/api`
5. Deploy

### Frontend → Vercel (Alternative)

1. Import project on [Vercel](https://vercel.com)
2. Framework Preset: Vite
3. Configure:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL + `/api`
5. Deploy

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Submit feedback as public user
- [ ] Verify feedback saved in database
- [ ] Login with admin credentials
- [ ] View all feedback in dashboard
- [ ] Update feedback status
- [ ] Delete feedback
- [ ] Logout and verify redirect
- [ ] Try accessing dashboard without login
- [ ] Test on mobile device/view

### API Testing with Postman

Import the provided Postman collection (see documentation) or use these examples:

```bash
# Test feedback submission
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service or use MongoDB Atlas

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in backend/.env or kill process on that port

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Run `npm install` in the respective folder

### Frontend Cannot Connect to Backend
**Solution:** Check VITE_API_URL in frontend/.env matches backend URL

---

## 📚 Additional Resources

- **Setup Instructions:** See `SETUP_INSTRUCTIONS.md`
- **Feature Guide:** See `FEATURES_GUIDE.md`
- **Admin Creation:** See `CREATE_ADMIN.md`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is created for educational purposes.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by real-world IT service management needs
- Created as a full-stack demonstration project

---

## 📊 Project Status

✅ **READY TO USE** - Both servers running successfully!

- Backend: http://localhost:5000 ✅
- Frontend: http://localhost:5173 ✅
- MongoDB: Connected ✅

---

**Happy Coding! 🎉**
