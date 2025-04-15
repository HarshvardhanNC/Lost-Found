import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleFeatureClick = () => {
        navigate('/student/lost-found');
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const feature = {
        name: 'Lost & Found',
        image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=800&q=80',
        description: 'Report lost items or check found items in the campus'
    };

    return (
        <div className="student-dashboard">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="nav-left">
                    <h1 
                        onClick={handleLogoClick}
                        style={{ cursor: 'pointer' }}
                        className="logo-text"
                    >
                        College Buddy
                    </h1>
                </div>
                <div className="nav-center">
                    <button 
                        className="nav-button"
                        onClick={handleFeatureClick}
                    >
                        {feature.name}
                    </button>
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
            </div>

            {/* Mission and Introduction Section */}
            <div className="mission-section">
                <div className="mission-content">
                    <h2>Our Mission</h2>
                    <p>To help students find and recover their lost items on campus through an efficient and user-friendly platform.</p>
                    
                    <h2>About College Buddy</h2>
                    <p>College Buddy's Lost & Found system is designed to make it easy for students to report lost items and find items that have been found on campus. 
                    Our platform ensures that lost belongings can be quickly reunited with their owners through a simple and efficient process.</p>
                    
                    <div className="mission-highlights">
                        <div className="highlight">
                            <h3>Easy Reporting</h3>
                            <p>Simple process to report lost items or submit found items</p>
                        </div>
                        <div className="highlight">
                            <h3>Quick Recovery</h3>
                            <p>Efficient system to match lost items with found ones</p>
                        </div>
                        <div className="highlight">
                            <h3>Campus-Wide</h3>
                            <p>Covering all areas of the campus</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="features-container">
                <h2 className="features-heading">Lost & Found System</h2>
                <p className="features-intro">Our comprehensive lost and found system helps you track and recover lost items efficiently.</p>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-content">
                            <div className="feature-image">
                                <img src={feature.image} alt={feature.name} />
                            </div>
                            <div className="feature-info">
                                <h3>{feature.name}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="team-section">
                <h2 className="team-heading">Meet Our Team</h2>
                <p className="team-intro">The brilliant minds behind College Buddy</p>
                <div className="team-grid">
                    <div className="team-member">
                        <div className="member-image">
                            <img src="/images/harshvardhan.jpg" alt="Harshvardhan Chinchkhedkar" />
                        </div>
                        <h3>Harshvardhan Chinchkhedkar</h3>
                        <p>Team Lead</p>
                        <div className="member-social">
                            <a href="https://github.com/harshvardhan-ch" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com/in/harshvardhan-ch" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="https://instagram.com/harshvardhan.ch" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                    <div className="team-member">
                        <div className="member-image">
                            <img src="/images/Aryan Kale.jpg" alt="Aryan Kale" />
                        </div>
                        <h3>Aryan Kale</h3>
                        <p>Full Stack Developer</p>
                        <div className="member-social">
                            <a href="https://github.com/aryankale" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com/in/aryan-kale" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="https://instagram.com/aryan.kale" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard; 