import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Alert,
    Switch,
    FormControlLabel,
    Tabs,
    Tab,
    CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MenuManagement = () => {
    const [masterItems, setMasterItems] = useState([]);
    const [dailyMenu, setDailyMenu] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    });

    useEffect(() => {
        fetchMasterItems();
        fetchDailyMenu();
    }, []);

    const fetchMasterItems = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/menu/items', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch menu items');
            }

            const data = await response.json();
            setMasterItems(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchDailyMenu = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/menu/today', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch daily menu');
            }

            const data = await response.json();
            setDailyMenu(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                description: item.description || '',
                price: item.price,
                category: item.category
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                category: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingItem(null);
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? (value === '' ? '' : parseFloat(value)) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const url = editingItem 
                ? `http://localhost:5000/api/menu/items/${editingItem._id}`
                : 'http://localhost:5000/api/menu/items';

            const response = await fetch(url, {
                method: editingItem ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to save menu item');
            }

            await fetchMasterItems();
            await fetchDailyMenu();
            handleCloseDialog();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/menu/items/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            await fetchMasterItems();
            await fetchDailyMenu();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAvailabilityChange = async (menuItemId, currentAvailability) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/menu/today/availability', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    itemUpdates: [{
                        menuItemId,
                        isAvailable: !currentAvailability
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update availability');
            }

            const data = await response.json();
            setDailyMenu(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setError('');
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box mb={3}>
                <Tabs 
                    value={activeTab} 
                    onChange={handleTabChange}
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'primary.main',
                            height: 3,
                        },
                        '& .MuiTab-root': {
                            color: 'rgba(0, 0, 0, 0.6)',
                            '&.Mui-selected': {
                                color: 'rgba(0, 0, 0, 0.87)',
                                fontWeight: 'bold'
                            }
                        },
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <Tab label="Today's Menu" />
                    <Tab label="Master Menu Items" />
                </Tabs>
            </Box>

            {error && (
                <Alert 
                    severity="error" 
                    sx={{ 
                        mb: 2,
                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(211, 47, 47, 0.3)',
                        color: '#ff5252',
                        '& .MuiAlert-icon': {
                            color: '#ff5252'
                        }
                    }}
                >
                    {error}
                </Alert>
            )}

            {activeTab === 0 && (
                <Box>
                    <Typography variant="h5" gutterBottom sx={{ color: 'rgba(0, 0, 0, 0.87)', mb: 3 }}>
                        Today's Available Items
                    </Typography>
                    <Grid container spacing={4} sx={{ px: 2 }}>
                        {dailyMenu?.items?.map(({ menuItem, isAvailable }) => (
                            <Grid item xs={12} sm={6} md={4} key={menuItem._id}>
                                <Card sx={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
                                    }
                                }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" sx={{ color: 'rgba(0, 0, 0, 0.87)', mb: 1 }}>
                                            {menuItem.name}
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', mb: 2 }}>
                                            {menuItem.description}
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
                                            ₹{menuItem.price}
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', mb: 2 }}>
                                            Category: {menuItem.category}
                                        </Typography>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={isAvailable}
                                                    onChange={() => handleAvailabilityChange(menuItem._id, isAvailable)}
                                                    color="primary"
                                                />
                                            }
                                            label={isAvailable ? 'Available' : 'Unavailable'}
                                            sx={{
                                                color: isAvailable ? 'success.main' : 'text.secondary'
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {activeTab === 1 && (
                <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h5" sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                            Master Menu Items
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenDialog()}
                            sx={{
                                background: 'rgba(25, 118, 210, 0.9)',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    background: 'rgba(25, 118, 210, 1)',
                                }
                            }}
                        >
                            Add New Item
                        </Button>
                    </Box>

                    <Grid container spacing={4} sx={{ px: 2 }}>
                        {masterItems.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item._id}>
                                <Card sx={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
                                    }
                                }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" sx={{ color: 'rgba(0, 0, 0, 0.87)', mb: 1 }}>
                                            {item.name}
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', mb: 2 }}>
                                            {item.description}
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
                                            ₹{item.price}
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', mb: 2 }}>
                                            Category: {item.category}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton 
                                            onClick={() => handleOpenDialog(item)}
                                            sx={{ 
                                                color: 'primary.main',
                                                '&:hover': { color: 'primary.dark' }
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            onClick={() => handleDelete(item._id)}
                                            sx={{ 
                                                color: 'error.main',
                                                '&:hover': { color: 'error.dark' }
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            <Dialog 
                open={openDialog} 
                onClose={handleCloseDialog}
                PaperProps={{
                    sx: {
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    }
                }}
            >
                <DialogTitle sx={{ 
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    fontWeight: 'bold'
                }}>
                    {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Item Name"
                            type="text"
                            fullWidth
                            value={formData.name}
                            onChange={handleChange}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(0, 0, 0, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(25, 118, 210, 0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    }
                                }
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            value={formData.description}
                            onChange={handleChange}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(0, 0, 0, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(25, 118, 210, 0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    }
                                }
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="price"
                            label="Price"
                            type="number"
                            fullWidth
                            value={formData.price}
                            onChange={handleChange}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(0, 0, 0, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(25, 118, 210, 0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    }
                                }
                            }}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(0, 0, 0, 0.2)',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(25, 118, 210, 0.5)',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'primary.main',
                                    }
                                }}
                            >
                                <MenuItem value="Breakfast">Breakfast</MenuItem>
                                <MenuItem value="Lunch">Lunch</MenuItem>
                                <MenuItem value="Dinner">Dinner</MenuItem>
                                <MenuItem value="Snacks">Snacks</MenuItem>
                                <MenuItem value="Beverages">Beverages</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{ 
                        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                        padding: 2
                    }}>
                        <Button 
                            onClick={handleCloseDialog}
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            sx={{
                                background: 'rgba(25, 118, 210, 0.9)',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    background: 'rgba(25, 118, 210, 1)',
                                }
                            }}
                        >
                            {editingItem ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default MenuManagement; 