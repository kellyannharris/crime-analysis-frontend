import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Avatar,
  Chip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const Header: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      elevation={1}
      sx={{ 
        backgroundColor: 'white', 
        color: 'text.primary',
        borderBottom: '1px solid #e0e4e7'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
            Detective Dashboard
          </Typography>
          <Chip 
            icon={<SecurityIcon />}
            label="SECURE SESSION" 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon sx={{ color: '#546e7a' }} />
            </Badge>
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, backgroundColor: '#1565c0' }}>
              <PersonIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Det. Sarah Martinez
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Badge #4721
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 