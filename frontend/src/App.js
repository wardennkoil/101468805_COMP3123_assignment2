// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeList from './pages/EmployeeList';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import EditEmployee from './pages/EditEmployee';



function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <EmployeeList />
                        </ProtectedRoute>
                    }
                />
                {/* Redirect root to /emp if authenticated */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <EmployeeList />
                        </ProtectedRoute>
                    }
                />
                {/* Add more routes as needed */}
                <Route
                    path="/employees/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditEmployee />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
