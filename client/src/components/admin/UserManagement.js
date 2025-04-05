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
    Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: 'calc(100vh - 250px)',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    '& .MuiTableCell-head': {
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        fontWeight: 'bold',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    '& .MuiTableCell-body': {
        color: 'rgba(0, 0, 0, 0.87)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    '& .MuiTableRow-root:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease'
    }
}));

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/users', {
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
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'white' }}>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id} hover>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        {user.role === 'admin' ? (
                                            <AdminPanelSettingsIcon sx={{ color: 'primary.main' }} />
                                        ) : (
                                            <PersonIcon sx={{ color: 'text.secondary' }} />
                                        )}
                                        {user.name}
                                    </Box>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role}
                                        color={user.role === 'admin' ? 'primary' : 'default'}
                                        size="small"
                                        sx={{
                                            backgroundColor: user.role === 'admin' 
                                                ? 'rgba(25, 118, 210, 0.2)' 
                                                : 'rgba(0, 0, 0, 0.08)',
                                            backdropFilter: 'blur(10px)',
                                            color: user.role === 'admin' ? '#1976d2' : 'text.secondary'
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
                                                ? 'rgba(46, 125, 50, 0.2)' 
                                                : 'rgba(211, 47, 47, 0.2)',
                                            backdropFilter: 'blur(10px)',
                                            color: user.active ? '#2e7d32' : '#d32f2f'
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Box>
    );
};

export default UserManagement; 