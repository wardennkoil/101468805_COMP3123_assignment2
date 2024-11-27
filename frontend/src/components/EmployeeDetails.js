// src/components/EmployeeDetails.js
import React from 'react';

function EmployeeDetails({ employee, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md overflow-auto max-h-full">
                <h2 className="text-xl font-bold mb-4">Employee Details</h2>
                <div className="space-y-2">
                    <div>
                        <strong>ID:</strong> {employee.id}
                    </div>
                    <div>
                        <strong>First Name:</strong> {employee.first_name}
                    </div>
                    <div>
                        <strong>Last Name:</strong> {employee.last_name}
                    </div>
                    <div>
                        <strong>Email:</strong> {employee.email}
                    </div>
                    <div>
                        <strong>Department:</strong> {employee.department}
                    </div>
                    <div>
                        <strong>Position:</strong> {employee.position}
                    </div>
                    <div>
                        <strong>Salary:</strong> {employee.salary}
                    </div>
                    <div>
                        <strong>Date of Joining:</strong> {employee.date_of_joining}
                    </div>
                    {/* Add more fields as necessary */}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetails;
