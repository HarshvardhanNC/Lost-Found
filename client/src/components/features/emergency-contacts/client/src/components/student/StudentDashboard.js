import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleFeatureClick = (feature) => {
        switch (feature) {
            case 'Cafeteria':
                navigate('/student/canteen');
                break;
            case 'Lost & Found':
                navigate('/student/lost-found');
                break;
            case 'Emergency':
                navigate('/student/emergency');
                break;
            default:
                // Handle other features as they are implemented
                break;
        }
    };

    const features = [
        {
            name: 'Classes',
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
            description: 'View and edit your weekly class timetable'
        },
        {
            name: 'Cafeteria',
            image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
            description: 'View today\'s cafeteria menu'
        },
        {
            name: 'Lost & Found',
            image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=800&q=80',
            description: 'Report lost items or check found items in the campus'
        },
        {
            name: 'Emergency',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
            description: 'Quick access to emergency contacts and services'
        }
    ];

    return (
        <div>
            {/* Render your component content here */}
        </div>
    );
};

export default StudentDashboard; 