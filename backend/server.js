require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/client-feedback';
connectDB(MONGO_URI);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health
app.get('/', (req, res) => res.send({ status: 'ok' }));

// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

