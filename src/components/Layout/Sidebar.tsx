import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Box
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Science as ScienceIcon,
  Analytics as AnalyticsIcon,
  Assessment as ReportsIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// Simple sidebar for my crime analysis application
// Kelly-Ann Harris - Capstone Project

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Simple menu items for my application
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Evidence Analysis', icon: <ScienceIcon />, path: '/evidence' },
    { text: 'Crime Analysis', icon: <AnalyticsIcon />, path: '/crime-analysis' },
    { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#2563eb', // Simple blue background
          color: 'white'
        },
      }}
    >
      {/* Simple header */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
          Crime Analysis
        </Typography>
        <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
          Student Project
        </Typography>
      </Box>
      
      {/* Simple navigation menu */}
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} sx={{ px: 1 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: '#1d4ed8', // Darker blue when selected
                },
                '&:hover': {
                  backgroundColor: '#1e40af', // Hover effect
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    fontSize: '0.9rem'
                  } 
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Simple footer */}
      <Box sx={{ mt: 'auto', p: 2, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
          Kelly-Ann Harris
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
          Capstone Project 2024
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 