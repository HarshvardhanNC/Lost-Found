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

    const handleFeatureClick = (feature) => {
        if (feature === 'Cafeteria') {
            navigate('/student/canteen');
        }
        // Add other feature routes here as they are implemented
    };

    const features = [
        {
            name: 'Dashboard',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            description: 'Access your personalized dashboard to track your academic progress and activities'
        },
        {
            name: 'Classes',
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
            description: 'View your class schedule, assignments, and course materials'
        },
        {
            name: 'Cafeteria',
            image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
            description: 'Check cafeteria menu, timings, and make online orders'
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
                            onClick={() => handleFeatureClick(feature.name)}
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
                        onClick={() => handleFeatureClick(feature.name)}
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
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StudentDashboard; 