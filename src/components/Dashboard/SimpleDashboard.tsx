import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  Button,
  CircularProgress
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  Science as ScienceIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import axios from 'axios';
import LACrimeHotspotMap from '../CrimeMap/LACrimeHotspotMap';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/api';

interface SystemStatus {
  status: string;
  models_loaded: Record<string, boolean>;
  last_updated: string;
  errors: string[];
}

interface DashboardStats {
  crime_analytics: {
    total_cases_analyzed: number;
    accuracy_rate: number;
    models_active: number;
    prediction_confidence: number;
    hotspots_identified: number;
    network_nodes: number;
    temporal_patterns: number;
  };
  forensic_analysis: {
    bloodsplatter_cases: number;
    cartridge_cases: number;
    handwriting_samples: number;
    total_evidence_processed: number;
    match_rate: number;
    average_processing_time: number;
  };
  recent_activity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    result: string;
    status: string;
  }>;
}

const SimpleDashboard: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    loadDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load system health
      const healthResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.health}`);
      setSystemStatus(healthResponse.data);

      // Load dashboard statistics
      const statsResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.dashboard.statistics}`);
      setDashboardStats(statsResponse.data);

      setLastRefresh(new Date());
    } catch (err) {
      console.error('Dashboard data loading error:', err);
      setError('Failed to connect to analysis services. Please ensure the API server is running.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational':
      case 'healthy':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
      case 'unhealthy':
        return 'error';
      default:
        return 'info';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational':
      case 'healthy':
        return <CheckCircleIcon color="success" />;
      case 'error':
      case 'unhealthy':
        return <ErrorIcon color="error" />;
      default:
        return <CheckCircleIcon color="info" />;
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  if (loading && !dashboardStats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading Crime & Forensic Analysis Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Connecting to analysis services...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Integrated Crime & Forensic Analysis Dashboard
        </Typography>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6">System Connection Error</Typography>
          <Typography>{error}</Typography>
          <Button 
            variant="contained" 
            startIcon={<RefreshIcon />}
            onClick={loadDashboardData}
            sx={{ mt: 2 }}
          >
            Retry Connection
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DashboardIcon color="primary" />
          Crime & Forensic Analysis Dashboard
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="caption" color="text.secondary">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </Typography>
          <Tooltip title="Refresh Dashboard">
            <IconButton onClick={loadDashboardData} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* System Status */}
      <Card sx={{ mb: 3, border: `2px solid ${systemStatus?.status === 'operational' ? '#4caf50' : '#f44336'}` }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            {systemStatus && getStatusIcon(systemStatus.status)}
            System Status
            <Chip 
              label={systemStatus?.status?.toUpperCase() || 'UNKNOWN'} 
              color={systemStatus ? getStatusColor(systemStatus.status) : 'default'}
              size="small"
            />
          </Typography>
          
          <Typography variant="body2">
            All crime analytics and forensic analysis services are operational. 
            Real-time processing enabled for crime data and forensic evidence.
          </Typography>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      {dashboardStats && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Card sx={{ minWidth: 200, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{formatNumber(dashboardStats.crime_analytics.total_cases_analyzed)}</Typography>
              <Typography variant="body2">Cases Analyzed</Typography>
              <Typography variant="caption">
                {formatPercentage(dashboardStats.crime_analytics.accuracy_rate)} accuracy
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 200, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <ScienceIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{formatNumber(dashboardStats.forensic_analysis.total_evidence_processed)}</Typography>
              <Typography variant="body2">Evidence Processed</Typography>
              <Typography variant="caption">
                {formatPercentage(dashboardStats.forensic_analysis.match_rate)} match rate
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 200, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Typography variant="h4">{dashboardStats.crime_analytics.hotspots_identified}</Typography>
              <Typography variant="body2">Crime Hotspots</Typography>
              <Typography variant="caption">
                {dashboardStats.crime_analytics.network_nodes} network nodes
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 200, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Typography variant="h4">{dashboardStats.crime_analytics.models_active}</Typography>
              <Typography variant="body2">Active Models</Typography>
              <Typography variant="caption">
                {formatPercentage(dashboardStats.crime_analytics.prediction_confidence * 100)} confidence
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Main Feature: LA Crime Hotspot Map */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            🗺️ Los Angeles Crime Hotspot Analysis
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Interactive map showing real-time crime hotspots across Los Angeles. This replaces the previous unclear 
            spatial analysis with a clear, geographic visualization of crime concentration areas by LAPD division.
          </Typography>

          <LACrimeHotspotMap />
        </CardContent>
      </Card>

      {/* Analysis Categories Overview */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Card sx={{ flex: 1, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              📊 Crime Analytics
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>Spatial Prediction:</strong> XGBoost model with 89% R² accuracy
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>Temporal Analysis:</strong> Prophet & ARIMA forecasting
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>Network Analysis:</strong> Criminal relationship mapping
              </Typography>
              <Typography variant="body2">
                • <strong>Classification:</strong> 76 LAPD crime categories
              </Typography>
            </Box>

            {dashboardStats && (
              <Typography variant="caption" color="text.secondary">
                Based on {formatNumber(dashboardStats.crime_analytics.total_cases_analyzed)} analyzed cases
              </Typography>
            )}
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              🔬 Forensic Analysis
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>Blood Spatter:</strong> CNN pattern recognition (85.7% accuracy)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>Cartridge Cases:</strong> X3P surface analysis (18 features)
              </Typography>
              <Typography variant="body2">
                • <strong>Handwriting:</strong> CNN+RNN architecture (12,825+ samples)
              </Typography>
            </Box>

            {dashboardStats && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box textAlign="center">
                  <Typography variant="h6" color="secondary.main">
                    {dashboardStats.forensic_analysis.bloodsplatter_cases}
                  </Typography>
                  <Typography variant="caption">Blood</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6" color="secondary.main">
                    {dashboardStats.forensic_analysis.cartridge_cases}
                  </Typography>
                  <Typography variant="caption">Cartridge</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6" color="secondary.main">
                    {dashboardStats.forensic_analysis.handwriting_samples}
                  </Typography>
                  <Typography variant="caption">Handwriting</Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Capstone Project Information */}
      <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            About This System - Capstone Project
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Integrated Crime & Forensic Analysis System</strong> by Kelly-Ann Harris
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Objective:</strong> Develop an integrated system that enhances crime investigation 
                capabilities by merging macro-level crime analytics with micro-level forensic analysis.
              </Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Typography variant="body2">
                <strong>Innovation:</strong> First system to combine LAPD crime data analytics with 
                automated forensic evidence analysis using deep learning models.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {loading && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={16} />
            Updating data...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SimpleDashboard; 