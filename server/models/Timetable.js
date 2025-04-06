const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timetable: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema); 