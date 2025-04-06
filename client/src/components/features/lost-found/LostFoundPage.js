import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LostFound.css';
import LostFoundForm from './LostFoundForm';
import { useNavigate } from 'react-router-dom';

const LostFoundPage = () => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'lost', 'found'
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('http://localhost:5000/api/lost-found');
            
            // Sort items by date, newest first
            const sortedItems = response.data.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            
            console.log('Fetched items:', sortedItems.length);
            console.log('Items by type:', {
                lost: sortedItems.filter(item => item.type === 'lost').length,
                found: sortedItems.filter(item => item.type === 'found').length
            });
            
            setItems(sortedItems);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching items:', error);
            setError('Failed to load items. Please try again later.');
            setLoading(false);
        }
    };

    const handleAddItem = async (itemData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to report an item');
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/lost-found',
                {
                    ...itemData,
                    reportedBy: currentUser?.id
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Add the new item to the beginning of the list
            setItems(prevItems => [response.data, ...prevItems]);
            setShowAddForm(false);
            alert('Item reported successfully!');
        } catch (error) {
            console.error('Error adding item:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Failed to add item. Please try again.');
        }
    };

    const handleMarkAsClaimed = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            
            if (!token || !user) {
                alert('Please log in to mark items as claimed');
                return;
            }

            const response = await axios.post(
                `http://localhost:5000/api/lost-found/${itemId}/mark-claimed`,
                { userId: user.id },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                // Update the item in the local state
                setItems(prevItems => 
                    prevItems.map(item => 
                        item._id === itemId 
                            ? { ...item, claimed: true }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error('Error marking item as claimed:', error);
            alert('Failed to mark item as claimed. Please try again.');
        }
    };

    const handleGoToDashboard = () => {
        navigate('/student/dashboard');
    };

    const filteredItems = items.filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    });

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="lost-found-container">
            <div className="page-header">
                <h1>Lost & Found</h1>
                <button className="dashboard-btn" onClick={handleGoToDashboard}>
                    Go to Dashboard
                </button>
                <div className="filter-buttons">
                    <button 
                        className={`filter-btn all ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Items
                    </button>
                    <button 
                        className={`filter-btn lost ${filter === 'lost' ? 'active' : ''}`}
                        onClick={() => setFilter('lost')}
                    >
                        Lost Items
                    </button>
                    <button 
                        className={`filter-btn found ${filter === 'found' ? 'active' : ''}`}
                        onClick={() => setFilter('found')}
                    >
                        Found Items
                    </button>
                </div>
                <button 
                    className="add-item-btn"
                    onClick={() => setShowAddForm(true)}
                >
                    Report Item
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div className="items-grid">
                    {filteredItems.length === 0 ? (
                        <div className="no-items">No items found</div>
                    ) : (
                        filteredItems.map(item => (
                            <div key={item._id} className={`item-card ${item.type}`}>
                                {item.imageUrl && (
                                    <img src={item.imageUrl} alt={item.title} className="item-image" />
                                )}
                                <div className="item-content">
                                    <h3>{item.title}</h3>
                                    <p className="item-description">{item.description}</p>
                                    <div className="item-details">
                                        <span>Location: {item.location}</span>
                                        <span>Date: {new Date(item.date).toLocaleDateString()}</span>
                                    </div>
                                    <p className="item-contact">
                                        Contact: {item.contact}
                                    </p>
                                    {currentUser && 
                                     item.reportedBy && 
                                     item.reportedBy.toString() === currentUser.id && 
                                     item.type === 'found' && 
                                     !item.claimed && (
                                        <button 
                                            className="mark-claimed-btn"
                                            onClick={() => handleMarkAsClaimed(item._id)}
                                        >
                                            Mark as Claimed
                                        </button>
                                    )}
                                    {item.claimed && (
                                        <div className="claimed-badge">
                                            <span>Claimed</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {showAddForm && (
                <LostFoundForm 
                    onSubmit={handleAddItem}
                    onClose={() => setShowAddForm(false)}
                />
            )}
        </div>
    );
};

export default LostFoundPage; 