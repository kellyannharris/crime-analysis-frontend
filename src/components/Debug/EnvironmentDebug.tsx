import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { API_BASE_URL } from '../../config/api';

const EnvironmentDebug: React.FC = () => {
  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <Card sx={{ mb: 2, bgcolor: '#f5f5f5', border: '1px solid #ddd' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🔧 Debug Info (Development Only)
        </Typography>
        <Box sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
          <div><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</div>
          <div><strong>REACT_APP_API_BASE_URL:</strong> {process.env.REACT_APP_API_BASE_URL || 'undefined'}</div>
          <div><strong>API_BASE_URL (config):</strong> {API_BASE_URL}</div>
          <div><strong>Window location:</strong> {window.location.href}</div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EnvironmentDebug; 