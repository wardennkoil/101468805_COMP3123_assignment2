// middleware/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/auth'); // Adjust the path as necessary

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('Authorization');

    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        // Verify token
        // The token is usually sent as "Bearer <token>", so split and get the token part
        const tokenParts = token.split(' ');
        if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
            return res.status(401).json({ message: 'Token format is invalid.' });
        }

        const decoded = jwt.verify(tokenParts[1], JWT_SECRET);

        // Attach user to request object
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};
