// src/pages/EditEmployee.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import {SERVER_URL} from "../config";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchEmployee();
        // eslint-disable-next-line
    }, []);

    const fetchEmployee = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${SERVER_URL}/api/v1/emp/employees/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Failed to fetch employee details.');
            } else {
                setEmployee(data);
            }
        } catch (err) {
            setError('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSuccess = () => {
        navigate('/employees');
    };

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-4">{error}</div>;
    }

    return (
        <>
            {employee && (
                <EmployeeForm
                    employee={employee}
                    onClose={() => navigate('/employees')}
                    onSuccess={handleSuccess}
                />
            )}
        </>
    );
}

export default EditEmployee;
