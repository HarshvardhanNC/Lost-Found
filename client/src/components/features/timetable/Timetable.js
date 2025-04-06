import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Timetable.css';

const Timetable = () => {
    const navigate = useNavigate();
    const [timetable, setTimetable] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [editData, setEditData] = useState({
        day: '',
        time: '',
        subject: ''
    });

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = [
        '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM',
        '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM'
    ];

    useEffect(() => {
        fetchTimetable();
    }, []);

    const fetchTimetable = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/timetable', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch timetable');
            }

            const data = await response.json();
            setTimetable(data.timetable || {});
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (day, time) => {
        const currentSubject = timetable[day]?.[time] || '';
        setEditData({ day, time, subject: currentSubject });
        setOpenDialog(true);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/timetable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    day: editData.day,
                    time: editData.time,
                    subject: editData.subject
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update timetable');
            }

            // Update local state
            setTimetable(prev => ({
                ...prev,
                [editData.day]: {
                    ...(prev[editData.day] || {}),
                    [editData.time]: editData.subject
                }
            }));

            setOpenDialog(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleBack = () => {
        navigate('/student/dashboard');
    };

    return (
        <div className="timetable-container">
            <Box className="header-section">
                <Button
                    className="back-button"
                    onClick={handleBack}
                    startIcon={<ArrowBackIcon />}
                >
                    Back to Dashboard
                </Button>
                <Typography variant="h4" className="page-title">
                    Weekly Class Timetable
                </Typography>
            </Box>

            <Container maxWidth="lg" className="timetable-content">
                <TableContainer component={Paper} className="table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                {days.map(day => (
                                    <TableCell key={day}>{day}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timeSlots.map(time => (
                                <TableRow key={time}>
                                    <TableCell>{time}</TableCell>
                                    {days.map(day => (
                                        <TableCell key={`${day}-${time}`}>
                                            <div className="cell-content">
                                                <span>{timetable[day]?.[time] || ''}</span>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEdit(day, time)}
                                                    className="edit-button"
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Edit Class</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Subject"
                            fullWidth
                            value={editData.subject}
                            onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleSave} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );
};

export default Timetable; 