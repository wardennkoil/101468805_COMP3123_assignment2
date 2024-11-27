// src/pages/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeDetails from '../components/EmployeeDetails';
import { toast } from 'react-toastify';
import {SERVER_URL} from "../config";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({
        department: '',
        position: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const token = localStorage.getItem('token');

    // Fetch employees only once when the component mounts
    useEffect(() => {
        fetchEmployees();
// eslint-disable-next-line
    }, []);


    const fetchEmployees = async () => {
        setLoading(true);
        setError('');
        try {
            // Build query params based on search criteria
            const queryParams = new URLSearchParams();
            if (searchCriteria.department) {
                queryParams.append('department', searchCriteria.department);
            }
            if (searchCriteria.position) {
                queryParams.append('position', searchCriteria.position);
            }

            const response = await fetch(
                `${SERVER_URL}/api/v1/emp/employees?${queryParams.toString()}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            console.log('API Response:', data); // Debugging

            if (!response.ok) {
                setError(data.message || 'Failed to fetch employees.');
                setEmployees([]); // Ensure employees is an array
            } else {
                setEmployees(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            setError('Network error. Please try again later.');
            setEmployees([]); // Ensure employees is an array
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${SERVER_URL}/api/v1/emp/employees/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                toast.error('Failed to delete employee.');
            } else {
                toast.success('Employee deleted successfully!');
                // Refresh the employee list
                fetchEmployees();
            }
        } catch (err) {
            toast.error('Network error. Please try again later.');
        }
    };

    const handleSearchChange = (e) => {
        setSearchCriteria({
            ...searchCriteria,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Employee List</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add Employee
                </button>
            </div>

            {/* Search Form */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Search Employees</h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        name="department"
                        value={searchCriteria.department}
                        onChange={handleSearchChange}
                        placeholder="Department"
                        className="w-1/3 px-4 py-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="position"
                        value={searchCriteria.position}
                        onChange={handleSearchChange}
                        placeholder="Position"
                        className="w-1/3 px-4 py-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={fetchEmployees}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 text-red-500 text-center">
                    {error}
                </div>
            )}

            {/* Loading Indicator */}
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">First Name</th>
                            <th className="py-2 px-4 border-b">Last Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Department</th>
                            <th className="py-2 px-4 border-b">Position</th>
                            <th className="py-2 px-4 border-b">Salary</th>
                            <th className="py-2 px-4 border-b">Date of Joining</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(employees) && employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr key={employee._id} className="text-center">
                                    <td className="py-2 px-4 border-b">{employee._id}</td>
                                    <td className="py-2 px-4 border-b">{employee.first_name}</td>
                                    <td className="py-2 px-4 border-b">{employee.last_name}</td>
                                    <td className="py-2 px-4 border-b">{employee.email}</td>
                                    <td className="py-2 px-4 border-b">{employee.department}</td>
                                    <td className="py-2 px-4 border-b">{employee.position}</td>
                                    <td className="py-2 px-4 border-b">{employee.salary}</td>
                                    <td className="py-2 px-4 border-b">{employee.date_of_joining}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => setSelectedEmployee(employee)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                                        >
                                            View
                                        </button>
                                        <Link
                                            to={`/employees/edit/${employee._id}`}
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(employee._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="py-4">
                                    {loading ? 'Loading...' : 'No employees found.'}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Employee Modal */}
            {showAddForm && (
                <EmployeeForm
                    onClose={() => setShowAddForm(false)}
                    onSuccess={() => {
                        setShowAddForm(false);
                        fetchEmployees();
                    }}
                />
            )}

            {/* View Employee Details Modal */}
            {selectedEmployee && (
                <EmployeeDetails
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                />
            )}
        </div>
    );
}

export default EmployeeList;
