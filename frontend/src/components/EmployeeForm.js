// src/components/EmployeeForm.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {SERVER_URL} from "../config";

function EmployeeForm({ onClose, onSuccess, employee = null }) {
    const isEdit = !!employee;
    const [formData, setFormData] = useState({
        first_name: employee ? employee.first_name : '',
        last_name: employee ? employee.last_name : '',
        email: employee ? employee.email : '',
        salary: employee ? employee.salary : '',
        date_of_joining: employee ? employee.date_of_joining : '',
        position: employee ? employee.position : '',
        department: employee ? employee.department : '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');

    const { first_name, last_name, email, salary, date_of_joining, position, department } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        // Frontend Validation
        const newErrors = {};
        if (!first_name.trim()) newErrors.first_name = 'First name is required.';
        if (!last_name.trim()) newErrors.last_name = 'Last name is required.';
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!salary || isNaN(salary) || Number(salary) < 0) {
            newErrors.salary = 'Valid salary is required.';
        }
        if (!date_of_joining) newErrors.date_of_joining = 'Date of joining is required.';
        if (!position.trim()) newErrors.position = 'Position is required.';
        if (!department.trim()) newErrors.department = 'Department is required.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            const url = isEdit
                ? `${SERVER_URL}/api/v1/emp/employees/${employee._id}`
                : SERVER_URL + '/api/v1/emp/employees';
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    salary: parseFloat(salary),
                    date_of_joining,
                    position,
                    department,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle Backend Validation Errors
                const backendErrors = {};
                if (data.errors && Array.isArray(data.errors)) {
                    data.errors.forEach((error) => {
                        if (error.path && error.msg) {
                            backendErrors[error.path] = error.msg;
                        }
                    });
                } else {
                    backendErrors.general = data.message || 'Something went wrong.';
                }
                setErrors(backendErrors);
                toast.error(backendErrors.general || 'Failed to submit the form.');
            } else {
                toast.success(isEdit ? 'Employee updated successfully!' : 'Employee added successfully!');
                onSuccess();
            }
        } catch (err) {
            setErrors({ general: 'Network error. Please try again later.' });
            toast.error('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md overflow-auto max-h-full">
                <h2 className="text-xl font-bold mb-4">
                    {isEdit ? 'Edit Employee' : 'Add Employee'}
                </h2>
                {errors.general && (
                    <div className="mb-4 text-red-500 text-center">
                        {errors.general}
                    </div>
                )}
                <form onSubmit={onSubmit} className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            value={first_name}
                            onChange={onChange}
                            required
                            className={`mt-1 w-full px-4 py-2 border ${
                                errors.first_name ? 'border-red-500' : 'border-gray-300'
                            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.first_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={last_name}
                            onChange={onChange}
                            required
                            className={`mt-1 w-full px-4 py-2 border ${
                                errors.last_name ? 'border-red-500' : 'border-gray-300'
                            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.last_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className={`mt-1 w-full px-4 py-2 border ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Salary
                        </label>
                        <input
                            type="number"
                            name="salary"
                            value={salary}
                            onChange={onChange}
                            required
                            min="0"
                            step="0.01"
                            className={`mt-1 w-full px-4 py-2 border ${
                                errors.salary ? 'border-red-500' : 'border-gray-300'
                            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.salary && (
                            <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                        )}
                    </div>

                    {/* Date of Joining */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Date of Joining
                        </label>
                        <input
                            type="date"
                            name="date_of_joining"
                            value={date_of_joining}
                            onChange={onChange}
                            required
                            className={`mt-1 w-full px-4 py-2 border ${
                                errors.date_of_joining ? 'border-red-500' : 'border-gray-300'
                            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.date_of_joining && (
                            <p className="text-red-500 text-sm mt-1">{errors.date_of_joining}</p>
                        )}
                    </div>

                    {/* Position */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Position
                        </label>
                        <input
                            type="text"
                            name="position"
                            value={position}
                            onChange={onChange}
                            required
                            className={`mt-1 w-full px-4 py-2 border ${
                                errors.position ? 'border-red-500' : 'border-gray-300'
                            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.position && (
                            <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                        )}
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Department
                        </label>
                        <input
                            type="text"
                            name="department"
                            value={department}
                            onChange={onChange}
                            required
                            className={`mt-1 w-full px-4 py-2 border ${
                                errors.department ? 'border-red-500' : 'border-gray-300'
                            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.department && (
                            <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? (isEdit ? 'Updating...' : 'Adding...') : isEdit ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmployeeForm;
