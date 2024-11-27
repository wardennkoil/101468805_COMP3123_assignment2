const express = require('express');
const router = express.Router();
const {
    getEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employeeController');
const authMiddleware = require('../middleware/auth'); // Adjust the path as necessary


// Get all employees
router.get('/employees', authMiddleware, getEmployees);

// Create new employee
router.post('/employees', authMiddleware, createEmployee);

// Get employee by ID
router.get('/employees/:eid', authMiddleware, getEmployeeById);

// Update employee by ID
router.put('/employees/:eid', authMiddleware, updateEmployee);

// Delete employee by ID (using query parameter)
router.delete('/employees/:eid', authMiddleware, deleteEmployee);

module.exports = router;
