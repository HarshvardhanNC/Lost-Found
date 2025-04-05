import React from 'react';
import {
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIdwBelWplaDSIan6Fy-lELvYPZ_5EgD9BzA&s)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 'bold',
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Welcome to College Buddy
        </Typography>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 4,
            fontSize: { xs: '1.5rem', md: '2rem' },
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          Your All-in-One Campus Companion
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/register')}
          sx={{
            fontSize: '1.2rem',
            padding: '12px 40px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          GET STARTED
        </Button>
      </Box>
    </Box>
  );
};

export default Home; 