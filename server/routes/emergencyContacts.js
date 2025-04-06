const express = require('express');
const router = express.Router();

// GET /api/emergency-contacts
router.get('/', function emergencyContactsHandler(req, res) {
    const contacts = [
        {
            id: 1,
            name: "Campus Security Office",
            designation: "Head of Security",
            department: "Security",
            phoneNumber: "123-456-7890",
            email: "security@college.edu",
            category: "Security",
            description: "24/7 campus security services"
        },
        {
            id: 2,
            name: "College Health Center",
            designation: "Medical Director",
            department: "Health Services",
            phoneNumber: "123-456-7891",
            email: "health@college.edu",
            category: "Medical",
            description: "Emergency medical assistance"
        },
        {
            id: 3,
            name: "Fire Emergency",
            designation: "Fire Safety Officer",
            department: "Campus Safety",
            phoneNumber: "123-456-7892",
            email: "fire@college.edu",
            category: "Emergency",
            description: "Fire emergency response"
        },
        {
            id: 4,
            name: "Student Affairs Office",
            designation: "Student Affairs Director",
            department: "Student Services",
            phoneNumber: "123-456-7893",
            email: "studentaffairs@college.edu",
            category: "Student Services",
            description: "Student emergency assistance"
        }
    ];
    
    res.json(contacts);
});

module.exports = router; 