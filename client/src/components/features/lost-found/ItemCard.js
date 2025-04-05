import React from 'react';
import './LostFound.css';

const ItemCard = ({ item, onClaim }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className={`item-card ${item.type}`}>
            {item.imageUrl && (
                <div className="item-image">
                    <img src={item.imageUrl} alt={item.title} />
                </div>
            )}
            <div className="item-content">
                <h3>{item.title}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-details">
                    <span className="item-location">📍 {item.location}</span>
                    <span className="item-date">📅 {formatDate(item.date)}</span>
                </div>
                <div className="item-contact">
                    <span>📞 Contact: {item.contact}</span>
                </div>
                {item.type === 'found' && !item.claimed && (
                    <button 
                        className="claim-button"
                        onClick={() => onClaim(item)}
                    >
                        Claim This Item
                    </button>
                )}
                {item.claimed && (
                    <div className="claimed-badge">
                        ✅ Claimed
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemCard; 