// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        // Optionally remove other stored data like user info
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">
                    Employee Management
                </Link>
                {token && (
                    <button
                        onClick={handleLogout}
                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
