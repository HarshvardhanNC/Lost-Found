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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Navigation Bar */}
      <Box
        component="nav"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'primary.main',
          color: 'white',
          boxShadow: 1
        }}
      >
        <Typography variant="h5">Admin Dashboard</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Welcome, {user?.name}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Menu Management" />
            <Tab label="User Management" />
            <Tab label="Reports" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {activeTab === 0 && <MenuManagement />}
          {activeTab === 1 && <UserManagement />}
          {activeTab === 2 && (
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
              Reports - Coming Soon
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboard; 