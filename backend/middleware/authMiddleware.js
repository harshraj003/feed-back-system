const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provided' });

	const token = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Token invalid or expired' });
	}
};

exports.adminOnly = (req, res, next) => {
	if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
	if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
	next();
};
