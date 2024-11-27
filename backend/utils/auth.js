// utils/auth.js
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'my-32-character-ultra-secure-and-ultra-long-secret';

// Function to generate JWT
const generateToken = (user) => {
    const payload = {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    };

    // Token expires in 1 hour
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '5d' });
};

module.exports = { generateToken, JWT_SECRET };
