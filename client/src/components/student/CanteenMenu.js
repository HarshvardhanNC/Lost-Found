import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Alert,
    Container,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Food category images mapping
const categoryImages = {
    'Breakfast': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    'Lunch': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    'Dinner': 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=80',
    'Snacks': 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=800&q=80',
    'Beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80'
};

// Food item images mapping
const itemImages = {
    'Masala Dosa': 'https://images.unsplash.com/photo-1668236543090-82d193c45ede?auto=format&fit=crop&w=800&q=80',
    'Idli Sambar': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    'Poha': 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=800&q=80',
    'Aloo Paratha': 'https://images.unsplash.com/photo-1619057527958-1d860bf4e83b?auto=format&fit=crop&w=800&q=80',
    'Upma': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
    'Veg Thali': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    'Paneer Butter Masala': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    'Dal Makhani': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    'Jeera Rice': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    'Mixed Veg Curry': 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80',
    'Veg Biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    'Chole Bhature': 'https://images.unsplash.com/photo-1626132647523-66c7ee96c902?auto=format&fit=crop&w=800&q=80',
    'Palak Paneer': 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80',
    'Butter Naan': 'https://images.unsplash.com/photo-1617692855027-33b06e91f29c?auto=format&fit=crop&w=800&q=80',
    'Samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    'Vada Pav': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
    'Pav Bhaji': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
    'Masala Chai': 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80',
    'Cold Coffee': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    'Fresh Lime Soda': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
};

const HeroSection = styled(Paper)(({ theme }) => ({
    position: 'relative',
    backgroundColor: '#1a237e',
    color: '#fff',
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: theme.spacing(6),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0
}));

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[4]
    }
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
    position: 'relative',
    marginBottom: theme.spacing(3),
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: -8,
        left: 0,
        width: 60,
        height: 4,
        backgroundColor: theme.palette.primary.main
    }
}));

const CanteenMenu = () => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/menu/today', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch menu');
                }

                const data = await response.json();
                setMenu(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg">
                <Box py={3}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            </Container>
        );
    }

    if (!menu || !menu.items || menu.items.length === 0) {
        return (
            <Container maxWidth="lg">
                <Box py={3}>
                    <Alert severity="info">No menu items available for today</Alert>
                </Box>
            </Container>
        );
    }

    // Group only available items by category
    const itemsByCategory = menu.items.reduce((acc, { menuItem, isAvailable }) => {
        if (!menuItem || !isAvailable) return acc;
        
        const category = menuItem.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(menuItem);
        return acc;
    }, {});

    // Check if there are any available items
    const hasAvailableItems = Object.keys(itemsByCategory).length > 0;

    if (!hasAvailableItems) {
        return (
            <Container maxWidth="lg">
                <Box py={3}>
                    <Alert severity="info">No items are available right now</Alert>
                </Box>
            </Container>
        );
    }

    return (
        <Box>
            <HeroSection>
                <Typography variant="h2" align="center" gutterBottom>
                    Today's Menu
                </Typography>
            </HeroSection>

            <Container maxWidth="lg">
                {Object.entries(itemsByCategory).map(([category, items]) => (
                    <Box key={category} mb={6}>
                        <CategoryTitle variant="h4" gutterBottom>
                            {category}
                        </CategoryTitle>
                        <Grid container spacing={3}>
                            {items.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item._id}>
                                    <StyledCard>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={item.image || itemImages[item.name] || categoryImages[category]}
                                            alt={item.name}
                                            sx={{
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" gutterBottom>
                                                {item.name}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="textSecondary" 
                                                paragraph
                                                sx={{ mb: 2 }}
                                            >
                                                {item.description}
                                            </Typography>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Typography 
                                                    variant="h6" 
                                                    color="primary"
                                                    sx={{ fontWeight: 'bold' }}
                                                >
                                                    ₹{item.price}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </Container>
        </Box>
    );
};

export default CanteenMenu; 