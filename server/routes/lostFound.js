const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

// Define the schema
const lostFoundSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['lost', 'found'], required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    contact: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    reportedBy: { type: String, required: true },
    claimed: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Create the model if it doesn't exist
const LostFound = mongoose.models.LostFound || mongoose.model('LostFound', lostFoundSchema);

// Get all lost and found items
router.get('/', async (req, res) => {
    try {
        console.log('GET /api/lost-found - Fetching all items');
        const items = await LostFound.find().sort({ createdAt: -1 });
        console.log(`Found ${items.length} items`);
        res.json(items);
    } catch (error) {
        console.error('Error in GET /api/lost-found:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new lost or found item
router.post('/', async (req, res) => {
    try {
        console.log('POST /api/lost-found - Adding new item');
        console.log('Request body:', req.body);
        
        const { title, description, type, location, date, contact, imageUrl, reportedBy } = req.body;
        
        // Validate required fields
        if (!title || !description || !type || !location || !date || !contact) {
            console.log('Validation failed - missing required fields');
            return res.status(400).json({ message: 'All required fields must be provided' });
        }
        
        // Create new item
        const newItem = new LostFound({
            title,
            description,
            type,
            location,
            date,
            contact,
            imageUrl: imageUrl || '',
            reportedBy: reportedBy || 'anonymous',
            claimed: false
        });
        
        // Save to database
        await newItem.save();
        console.log('Created new item:', newItem);
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error in POST /api/lost-found:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark an item as claimed
router.post('/:id/mark-claimed', async function(req, res) {
    try {
        console.log('POST /api/lost-found/:id/mark-claimed - Marking item as claimed');
        const itemId = req.params.id;
        const userId = req.body.userId;

        console.log('Item ID:', itemId);
        console.log('User ID:', userId);
        
        // Find the item
        const item = await LostFound.findById(itemId);
        
        if (!item) {
            console.log('Item not found');
            return res.status(404).json({ message: 'Item not found' });
        }
        
        // Check if the user is the one who reported the item
        console.log('Item reportedBy:', item.reportedBy);
        console.log('Request userId:', userId);

        if (item.reportedBy !== userId) {
            console.log('User not authorized');
            return res.status(403).json({ 
                message: 'Not authorized to mark this item as claimed'
            });
        }
        
        // Update the item
        item.claimed = true;
        await item.save();
        
        console.log('Item marked as claimed successfully');
        res.json({ 
            success: true,
            message: 'Item marked as claimed successfully',
            claimed: true
        });
    } catch (error) {
        console.error('Error marking item as claimed:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 