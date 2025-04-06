const express = require('express');
const router = express.Router();
const { MenuItem, DailyMenu } = require('../models/Menu');
const { auth } = require('../middleware/auth');

// Get all menu items (master list)
router.get('/items', auth, async (req, res) => {
    try {
        const items = await MenuItem.find().sort({ category: 1, name: 1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add new menu item to master list (admin only)
router.post('/items', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const menuItem = new MenuItem({
            ...req.body,
            createdBy: req.user._id
        });

        await menuItem.save();
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update menu item in master list (admin only)
router.put('/items/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const menuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );

        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.json(menuItem);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete menu item from master list (admin only)
router.delete('/items/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        // Also remove this item from any daily menus
        await DailyMenu.updateMany(
            {},
            { $pull: { items: { menuItem: req.params.id } } }
        );

        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get today's menu with availability
router.get('/today', auth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        console.log('Searching for daily menu for date:', today);
        
        let dailyMenu = await DailyMenu.findOne({
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        }).populate('items.menuItem');

        console.log('Found existing daily menu:', dailyMenu ? 'yes' : 'no');
        console.log('Initial daily menu items:', dailyMenu?.items?.length || 0);
        
        // Get all master menu items
        const allMasterItems = await MenuItem.find();
        console.log('Found master items:', allMasterItems.length);
        console.log('Master items:', allMasterItems.map(item => item.name));

        // If no menu exists, create it with all master items
        if (!dailyMenu) {
            console.log('Creating new daily menu...');
            const items = allMasterItems.map(item => ({
                menuItem: item._id,
                isAvailable: false
            }));

            dailyMenu = new DailyMenu({
                date: today,
                items,
                updatedBy: req.user._id
            });
            await dailyMenu.save();
            console.log('New daily menu saved');
            dailyMenu = await DailyMenu.findById(dailyMenu._id).populate('items.menuItem');
            console.log('New daily menu items:', dailyMenu.items.length);
        } else {
            // Check if all master items are in the daily menu
            const dailyMenuItemIds = dailyMenu.items.map(item => item.menuItem._id.toString());
            const missingItems = allMasterItems.filter(item => 
                !dailyMenuItemIds.includes(item._id.toString())
            );

            console.log('Current daily menu items:', dailyMenuItemIds.length);
            console.log('Missing items:', missingItems.length);

            // If there are missing items, add them to the daily menu
            if (missingItems.length > 0) {
                console.log('Adding missing items to daily menu:', missingItems.length);
                console.log('Missing item names:', missingItems.map(item => item.name));
                const newItems = missingItems.map(item => ({
                    menuItem: item._id,
                    isAvailable: false
                }));

                dailyMenu.items.push(...newItems);
                dailyMenu.updatedBy = req.user._id;
                await dailyMenu.save();
                console.log('Updated daily menu saved');
                dailyMenu = await DailyMenu.findById(dailyMenu._id).populate('items.menuItem');
                console.log('Updated daily menu items:', dailyMenu.items.length);
            }
        }

        // Verify the final menu items
        console.log('Final daily menu items:', dailyMenu.items.length);
        console.log('Item names:', dailyMenu.items.map(item => item.menuItem.name));
        
        res.json(dailyMenu);
    } catch (error) {
        console.error('Error in /today:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update today's menu availability (admin only)
router.put('/today/availability', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get the daily menu with populated items
        let dailyMenu = await DailyMenu.findOne({
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        }).populate('items.menuItem');

        // If no menu exists, create one with all master items
        if (!dailyMenu) {
            const allItems = await MenuItem.find();
            const items = allItems.map(item => ({
                menuItem: item._id,
                isAvailable: false
            }));

            dailyMenu = new DailyMenu({
                date: today,
                items,
                updatedBy: req.user._id
            });
        }

        // Update availability for specified items
        const { itemUpdates } = req.body;
        if (Array.isArray(itemUpdates)) {
            itemUpdates.forEach(update => {
                const item = dailyMenu.items.find(
                    i => i.menuItem._id.toString() === update.menuItemId
                );
                if (item) {
                    item.isAvailable = update.isAvailable;
                }
            });
        }

        // Save the changes
        dailyMenu.updatedBy = req.user._id;
        await dailyMenu.save();
        
        // Fetch the updated menu with populated items
        dailyMenu = await DailyMenu.findById(dailyMenu._id).populate('items.menuItem');
        
        // Log the final state
        console.log('Updated daily menu items:', dailyMenu.items.length);
        console.log('Available items:', dailyMenu.items.filter(i => i.isAvailable).length);
        console.log('Item availability:', dailyMenu.items.map(i => ({
            name: i.menuItem.name,
            available: i.isAvailable
        })));
        
        res.json(dailyMenu);
    } catch (error) {
        console.error('Error in /today/availability:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router; 