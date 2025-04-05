import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import MenuManagement from './MenuManagement';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80)', // Modern office interior
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)', // Slightly lighter overlay
        zIndex: 0
      }
    }}>
      {/* Navigation Bar */}
      <Box
        component="nav"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'rgba(25, 118, 210, 0.85)', // More transparent nav bar
          color: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Admin Dashboard</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Welcome, {user?.name}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{
              backgroundColor: 'rgba(156, 39, 176, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(156, 39, 176, 1)'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Container sx={{ mt: 4, position: 'relative', zIndex: 1 }}>
        <Paper sx={{ 
          p: 3, 
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            sx={{ 
              mb: 3,
              '& .MuiTab-root': {
                color: 'rgba(0, 0, 0, 0.7)',
                '&.Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 'bold'
                }
              }
            }}
          >
            <Tab label="Menu Management" />
            <Tab label="User Management" />
            <Tab label="Reports" />
          </Tabs>

          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '8px',
            p: 2
          }}>
            {activeTab === 0 && <MenuManagement />}
            {activeTab === 1 && <UserManagement />}
            {activeTab === 2 && (
              <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                Reports - Coming Soon
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard; 