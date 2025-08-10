import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import SimpleDashboard from './components/Dashboard/SimpleDashboard';
import EvidenceAnalysis from './components/EvidenceAnalysis/EvidenceAnalysis';
import CrimeAnalysis from './components/CrimeAnalysis/CrimeAnalysis';
import Reports from './components/Reports/Reports';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

/*
  Crime Analysis Application
  Student: Kelly-Ann Harris
  This is my capstone project - a simple web app for crime data analysis
*/

// Simple theme for my application
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Blue color
    },
    secondary: {
      main: '#dc2626', // Red color for alerts
    },
    background: {
      default: '#f8fafc', // Light gray background
      paper: '#ffffff'     // White for cards
    }
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Simple font
  }
});

function App() {
  // Force cache clear - Version: 2025-08-10-17:40
  console.log('🚀 App loaded - Cache clear version: 2025-08-10-17:40');
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This resets CSS for consistency */}
      <Router>
        <Box sx={{ display: 'flex' }}>
          {/* Left sidebar for navigation */}
          <Sidebar />
          
          {/* Main content area */}
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              bgcolor: 'background.default',
              minHeight: '100vh'
            }}
          >
            {/* Top header */}
            <Header />
            
            {/* Page content based on the current route */}
            <Box sx={{ p: 3 }}>
              <Routes>
                <Route path="/" element={<SimpleDashboard />} />
                <Route path="/evidence" element={<EvidenceAnalysis />} />
                <Route path="/crime-analysis" element={<CrimeAnalysis />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
