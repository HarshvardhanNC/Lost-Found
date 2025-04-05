import React, { useState } from 'react';
import './LostFound.css';

const ClaimFormModal = ({ item, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        claimerName: '',
        contact: '',
        proof: ''
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
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Claim Item: {item.title}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit} className="claim-form">
                    <div className="form-group">
                        <label>Your Name:</label>
                        <input
                            type="text"
                            name="claimerName"
                            value={formData.claimerName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contact Information:</label>
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
                        <label>Proof of Ownership:</label>
                        <textarea
                            name="proof"
                            value={formData.proof}
                            onChange={handleChange}
                            placeholder="Describe details about the item that only the owner would know..."
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Submit Claim
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClaimFormModal; 