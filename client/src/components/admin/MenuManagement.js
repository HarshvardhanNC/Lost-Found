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
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label="Today's Menu" />
                    <Tab label="Master Menu Items" />
                </Tabs>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {activeTab === 0 && (
                <Box>
                    <Typography variant="h5" gutterBottom>
                        Today's Available Items
                    </Typography>
                    <Grid container spacing={3}>
                        {dailyMenu?.items?.map(({ menuItem, isAvailable }) => (
                            <Grid item xs={12} sm={6} md={4} key={menuItem._id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{menuItem.name}</Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            {menuItem.description}
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                            ₹{menuItem.price}
                                        </Typography>
                                        <Typography color="textSecondary">
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
                        <Typography variant="h5">Master Menu Items</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenDialog()}
                        >
                            Add New Item
                        </Button>
                    </Box>

                    <Grid container spacing={3}>
                        {masterItems.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item._id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            {item.description}
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                            ₹{item.price}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Category: {item.category}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton onClick={() => handleOpenDialog(item)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(item._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
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
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            value={formData.description}
                            onChange={handleChange}
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
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Breakfast">Breakfast</MenuItem>
                                <MenuItem value="Lunch">Lunch</MenuItem>
                                <MenuItem value="Dinner">Dinner</MenuItem>
                                <MenuItem value="Snacks">Snacks</MenuItem>
                                <MenuItem value="Beverages">Beverages</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            {editingItem ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default MenuManagement; 