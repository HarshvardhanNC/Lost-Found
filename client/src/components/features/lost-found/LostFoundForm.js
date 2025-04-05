import React, { useState } from 'react';
import './LostFound.css';

const LostFoundForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'lost',
        location: '',
        date: new Date().toISOString().split('T')[0],
        contact: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Report {formData.type === 'lost' ? 'Lost' : 'Found'} Item</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <form className="lost-found-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Type</label>
                        <select 
                            name="type" 
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="lost">Lost Item</option>
                            <option value="found">Found Item</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Blue Backpack, Student ID Card"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide detailed description of the item..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Where was it lost/found?"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contact Information</label>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="Your phone number or email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Image URL (Optional)</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="Link to image of the item"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Submit Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LostFoundForm; 