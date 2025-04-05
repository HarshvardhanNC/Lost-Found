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
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

const StudentDashboard = () => {
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
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="Cafeteria Menu" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Class Schedule" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Lost & Found" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
        </List>
      </Paper>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: '240px', // Same as sidebar width
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Welcome, Student!
          </Typography>
          
          <Grid container spacing={3}>
            {/* Quick access cards */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Today's Menu
                </Typography>
                <Typography variant="body1">
                  View today's cafeteria menu and meal options.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Upcoming Classes
                </Typography>
                <Typography variant="body1">
                  Check your class schedule and assignments.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Notifications
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="New Menu Update" 
                      secondary="The cafeteria menu has been updated for next week."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Lost Item Report" 
                      secondary="A new item has been reported in lost & found."
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

export default StudentDashboard; 