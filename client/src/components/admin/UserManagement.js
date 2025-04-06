import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: 'calc(100vh - 250px)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    '& .MuiTableCell-head': {
        backgroundColor: '#1976d2',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '1rem',
        borderBottom: '2px solid rgba(255, 255, 255, 0.2)'
    },
    '& .MuiTableCell-body': {
        color: '#000000',
        fontSize: '0.95rem',
        fontWeight: 500,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
    },
    '& .MuiTableRow-root:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.08)',
        transition: 'all 0.3s ease'
    }
}));

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/auth/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/auth/users/${userToDelete._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers(users.filter(user => user._id !== userToDelete._id));
            setDeleteDialogOpen(false);
            setUserToDelete(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={2}>
                <Alert severity="error" sx={{ 
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(211, 47, 47, 0.3)',
                    color: '#ff5252',
                    '& .MuiAlert-icon': {
                        color: '#ff5252'
                    }
                }}>
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#000000', fontWeight: 'bold' }}>
                User Management
            </Typography>

            <StyledTableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Last Login</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id} hover>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        {user.role === 'admin' ? (
                                            <AdminPanelSettingsIcon sx={{ color: '#1976d2' }} />
                                        ) : (
                                            <PersonIcon sx={{ color: '#666666' }} />
                                        )}
                                        <span style={{ color: '#000000', fontWeight: 500 }}>{user.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell style={{ color: '#000000', fontWeight: 500 }}>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role}
                                        color={user.role === 'admin' ? 'primary' : 'default'}
                                        size="small"
                                        sx={{
                                            backgroundColor: user.role === 'admin' 
                                                ? '#1976d2' 
                                                : '#f5f5f5',
                                            color: user.role === 'admin' ? '#ffffff' : '#000000',
                                            fontWeight: 'medium'
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.active ? 'Active' : 'Inactive'}
                                        color={user.active ? 'success' : 'error'}
                                        size="small"
                                        sx={{
                                            backgroundColor: user.active 
                                                ? '#4caf50' 
                                                : '#f44336',
                                            color: '#ffffff',
                                            fontWeight: 'medium'
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{ color: '#000000', fontWeight: 500 }}>
                                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                                </TableCell>
                                <TableCell align="center">
                                    {user.role !== 'admin' && (
                                        <IconButton 
                                            onClick={() => handleDeleteClick(user)}
                                            color="error"
                                            size="small"
                                            title="Delete User"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-dialog-title"
            >
                <DialogTitle id="delete-dialog-title" sx={{ color: '#000000' }}>
                    Confirm Delete User
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: '#000000' }}>
                        Are you sure you want to delete user "{userToDelete?.name}"? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserManagement;