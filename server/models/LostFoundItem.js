const mongoose = require('mongoose');

const lostFoundItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    claimed: {
        type: Boolean,
        default: false
    },
    claimedDate: {
        type: Date
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('LostFoundItem', lostFoundItemSchema); 