const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes Middleware
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// MongoDB Connection
mongoose.connect('mongodb://admin:adminpassword@mongodb:27017/mydatabase?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
