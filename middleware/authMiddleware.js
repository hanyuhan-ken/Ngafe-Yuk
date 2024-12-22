const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.authenticate = (req, res, next) => {
    const token = req.cookies.authToken;
    console.log('Token:', token);
    if (!token) {
        return res.status(401).json({ message: 'Anda tidak memiliki akses!' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user data to the request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token tidak valid!' });
    }
};