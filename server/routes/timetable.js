const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Timetable = require('../models/Timetable');

// Get user's timetable
router.get('/', auth, async (req, res) => {
    try {
        let timetable = await Timetable.findOne({ userId: req.user.id });
        
        if (!timetable) {
            timetable = new Timetable({
                userId: req.user.id,
                timetable: {}
            });
            await timetable.save();
        }

        res.json({ timetable: timetable.timetable || {} });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update timetable entry
router.post('/', auth, async (req, res) => {
    try {
        const { day, time, subject } = req.body;

        let timetable = await Timetable.findOne({ userId: req.user.id });
        
        if (!timetable) {
            timetable = new Timetable({
                userId: req.user.id,
                timetable: {}
            });
        }

        // Update using plain objects
        const updatedTimetable = {
            ...timetable.timetable,
            [day]: {
                ...(timetable.timetable[day] || {}),
                [time]: subject
            }
        };

        timetable.timetable = updatedTimetable;
        await timetable.save();

        res.json({ timetable: timetable.timetable });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 