import React from 'react';
import {
  Typography,
  Button,
  Box,
  styled
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#ffffff',
  padding: '12px 36px',
  fontSize: '1.2rem',
  fontWeight: 600,
  borderRadius: '30px',
  textTransform: 'none',
  border: '2px solid transparent',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.05) translateY(-3px)',
    boxShadow: '0 8px 25px rgba(25, 118, 210, 0.4)',
    backgroundColor: '#1565c0',
    '&:before': {
      transform: 'translateX(100%)',
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)',
    transition: 'transform 0.6s',
  },
  '&:active': {
    transform: 'scale(0.98)',
  }
}));

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/campus.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        textAlign: 'center',
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
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '0 20px',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom
          sx={{
            color: '#ffffff',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            marginBottom: '1.5rem',
            letterSpacing: '0.5px'
          }}
        >
          Welcome to College Buddy
        </Typography>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{
            color: '#e0e7ff',
            marginBottom: '2.5rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            lineHeight: 1.6,
            fontWeight: 500
          }}
        >
          Your All-in-One Campus Companion
        </Typography>
        <StyledButton 
          onClick={() => navigate('/login')}
          variant="contained"
        >
          Start Your Journey
        </StyledButton>
      </Box>
    </Box>
  );
};

export default Home; 