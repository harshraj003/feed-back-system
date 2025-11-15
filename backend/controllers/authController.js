const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
	try {
		const { name, email, password, role } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Name, email and password are required' });
		}

		const existing = await User.findOne({ email });
		if (existing) return res.status(400).json({ message: 'Email already registered' });

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const user = await User.create({ name, email, password: hashed, role: role || 'client' });

		res.status(201).json({ message: 'User registered', user: { id: user._id, email: user.email, role: user.role } });
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: 'Invalid credentials' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

		const payload = { id: user._id, role: user.role, email: user.email };
		const token = jwt.sign(payload, process.env.JWT_SECRET || 'changeme', { expiresIn: '8h' });

		res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
	} catch (err) {
		next(err);
	}
};
