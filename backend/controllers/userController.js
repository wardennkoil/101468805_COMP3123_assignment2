const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { generateToken } = require('../utils/auth'); // Adjust the path as necessary

exports.signup = [
    // Validation and Sanitization
    body('username').notEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),

    async (req, res) => {
        // Handle Validation Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract Data
        const { username, email, password } = req.body;

        try {
            // Check if User Exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists.' });
            }

            // Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create New User
            user = new User({
                username,
                email,
                password: hashedPassword,
            });

            await user.save();

            // Generate JWT
            const token = generateToken(user);

            res.status(201).json({
                message: 'User created successfully.',
                user_id: user._id,
                token, // Return the token
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
];

exports.login = [
    // Validation and Sanitization
    body('email').isEmail().normalizeEmail(),
    body('password').exists(),

    async (req, res) => {
        // Handle Validation Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract Data
        const { email, password } = req.body;

        try {
            // Check if User Exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'Invalid email or password.',
                });
            }

            // Compare Passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    status: false,
                    message: 'Invalid email or password.',
                });
            }

            // Generate JWT
            const token = generateToken(user);

            res.status(200).json({
                message: 'Login successful.',
                token, // Return the token
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
];
