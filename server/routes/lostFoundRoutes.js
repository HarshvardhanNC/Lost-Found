const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const LostFoundItem = require('../models/LostFoundItem');

// Get all items
router.get('/items', async (req, res) => {
    try {
        const items = await LostFoundItem.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new item
router.post('/items', auth, async (req, res) => {
    try {
        const item = new LostFoundItem({
            ...req.body,
            reportedBy: req.user.id
        });
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Mark item as claimed
router.post('/items/:id/mark-claimed', auth, async (req, res) => {
    try {
        const item = await LostFoundItem.findById(req.params.id);
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check if the user is the one who posted the item
        if (item.reportedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Only the person who posted the item can mark it as claimed' });
        }

        // Check if the item is of type 'found'
        if (item.type !== 'found') {
            return res.status(400).json({ message: 'Only found items can be marked as claimed' });
        }

        // Check if the item is already claimed
        if (item.claimed) {
            return res.status(400).json({ message: 'Item has already been claimed' });
        }

        // Mark the item as claimed
        item.claimed = true;
        item.claimedDate = new Date();
        
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get item by ID
router.get('/items/:id', async (req, res) => {
    try {
        const item = await LostFoundItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 