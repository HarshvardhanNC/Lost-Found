import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleFeatureClick = (featurePath) => {
        console.log('Navigating to:', featurePath);
        navigate(featurePath);
    };

    const features = [
        {
            name: 'Dashboard',
            image: '/images/dashboard.jpg',
            description: 'Access your personalized dashboard to track your academic progress and activities',
            path: '/student/dashboard'
        },
        {
            name: 'Classes',
            image: '/images/classes.jpg',
            description: 'View your class schedule, assignments, and course materials',
            path: '/student/classes'
        },
        {
            name: 'Cafeteria',
            image: '/images/cafeteria.jpg',
            description: 'Check cafeteria menu, timings, and make online orders',
            path: '/student/cafeteria'
        },
        {
            name: 'Lost & Found',
            image: '/images/lost-found.jpg',
            description: 'Report lost items or check found items in the campus',
            path: '/student/lost-found'
        },
        {
            name: 'Emergency',
            image: '/images/emergency.jpg',
            description: 'Quick access to emergency contacts and services',
            path: '/student/emergency'
        }
    ];

    console.log('Current user:', user);

    return (
        <div className="student-dashboard">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="nav-left">
                    <h1>College Buddy</h1>
                </div>
                <div className="nav-center">
                    {features.map((feature) => (
                        <button 
                            key={feature.name} 
                            className="nav-button"
                            onClick={() => handleFeatureClick(feature.path)}
                        >
                            {feature.name}
                        </button>
                    ))}
                </div>
                <div className="nav-right">
                    <div className="profile-section">
                        <span className="user-name">{user?.name}</span>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Welcome Section */}
            <div className="welcome-section">
                <h1>Welcome, {user?.name}!</h1>
                <p>Explore our features designed to enhance your college experience</p>
            </div>

            {/* Feature Cards */}
            <div className="features-grid">
                {features.map((feature) => (
                    <div 
                        key={feature.name} 
                        className="feature-card"
                        onClick={() => handleFeatureClick(feature.path)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="feature-content">
                            <div className="feature-front">
                                <img src={feature.image} alt={feature.name} />
                                <h3>{feature.name}</h3>
                            </div>
                            <div className="feature-back">
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <p>Email: support@collegebuddy.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li>About Us</li>
                            <li>Help & Support</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <div className="social-links">
                            <span>Facebook</span>
                            <span>Twitter</span>
                            <span>Instagram</span>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 College Buddy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default StudentDashboard; 