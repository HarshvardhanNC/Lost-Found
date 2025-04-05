import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Paper
        sx={{
          width: 240,
          minHeight: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          borderRadius: 0,
        }}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <RestaurantMenuIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Menu" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <NotificationsActiveIcon />
            </ListItemIcon>
            <ListItemText primary="Send Notifications" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Paper>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: '240px',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Admin Dashboard
          </Typography>
          
          <Grid container spacing={3}>
            {/* Management Cards */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Cafeteria Menu Management
                </Typography>
                <Typography variant="body1" paragraph>
                  Update and manage the cafeteria menu items.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  sx={{ mr: 1 }}
                >
                  Edit Menu
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  User Management
                </Typography>
                <Typography variant="body1" paragraph>
                  Manage student and admin accounts.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PeopleIcon />}
                  sx={{ mr: 1 }}
                >
                  Manage Users
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Broadcast Notifications
                </Typography>
                <Typography variant="body1" paragraph>
                  Send important announcements to all users.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<NotificationsActiveIcon />}
                >
                  Create Announcement
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Menu Updated" 
                      secondary="Cafeteria menu was updated for next week"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="New User Registration" 
                      secondary="5 new students registered today"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Announcement Sent" 
                      secondary="Emergency notification sent to all users"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 