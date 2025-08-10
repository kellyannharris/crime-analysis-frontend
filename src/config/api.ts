// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://forensic-analysis-backend.onrender.com';

// API endpoints
export const API_ENDPOINTS = {
  health: '/health',
  models: '/models/info',
  docs: '/docs',
  evidence: {
    analyze: (type: string) => `/api/unstructured/${type}/analyze`
  },
  crime: {
    predictRate: '/predict/crime-rate',
    classifyTypes: '/classify/crime-types',
    predictSpatial: '/predict/spatial',
    analyzeNetwork: '/analyze/criminal-network',
    analyzeTemporalPatterns: '/analyze/temporal-patterns'
  }
}; 