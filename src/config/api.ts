// API Configuration
// Ensure we have a fallback URL that works
const getApiBaseUrl = (): string => {
  const envUrl = process.env.REACT_APP_API_BASE_URL;
  const fallbackUrl = 'https://forensic-analysis-backend.onrender.com';
  
  console.log('Environment check:', {
    envUrl,
    fallbackUrl,
    nodeEnv: process.env.NODE_ENV
  });
  
  return envUrl || fallbackUrl;
};

export const API_BASE_URL = getApiBaseUrl();

// API endpoints
export const API_ENDPOINTS = {
  health: 'health',
  models: 'models/info',
  docs: 'docs',
  evidence: {
    analyze: (type: string) => `api/unstructured/${type}/analyze`
  },
  crime: {
    predictRate: 'predict/crime-rate',
    classifyTypes: 'classify/crime-types',
    predictSpatial: 'predict/spatial',
    analyzeNetwork: 'analyze/criminal-network',
    analyzeTemporalPatterns: 'analyze/temporal-patterns'
  }
}; 