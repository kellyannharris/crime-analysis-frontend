import React, { useState, useCallback, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Paper,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Science as ScienceIcon,
  Edit as EditIcon,
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ExpandMore as ExpandMoreIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Speed as SpeedIcon,
  Fingerprint as FingerprintIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line
} from 'recharts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`evidence-tabpanel-${index}`}
      aria-labelledby={`evidence-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface UploadedFile {
  file: File;
  preview: string;
  id: string;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
  progress: number;
  results?: any;
}

// Forensic Analytics Dashboard Component
const ForensicAnalyticsDashboard: React.FC<{
  systemMetrics: any;
  analysisHistory: any[];
  uploadedFiles: UploadedFile[];
}> = ({ systemMetrics, analysisHistory, uploadedFiles }) => {

  // Calculate analysis statistics
  const analysisStats = {
    totalAnalyses: analysisHistory.length,
    bloodspatterAnalyses: analysisHistory.filter(a => a.type === 'bloodsplatter').length,
    handwritingAnalyses: analysisHistory.filter(a => a.type === 'handwriting').length,
    cartridgeAnalyses: analysisHistory.filter(a => a.type === 'cartridge').length,
    successRate: analysisHistory.length > 0 
      ? (analysisHistory.filter(a => a.results).length / analysisHistory.length * 100).toFixed(1) 
      : '0'
  };

  // Forensic feature importance data (based on project objectives)
  const featureImportanceData = [
    { feature: 'Droplet Count', importance: 85, category: 'Blood Spatter' },
    { feature: 'Impact Angle', importance: 78, category: 'Blood Spatter' },
    { feature: 'Surface Texture', importance: 92, category: 'Ballistics' },
    { feature: 'Firing Pin Marks', importance: 88, category: 'Ballistics' },
    { feature: 'Letter Spacing', importance: 75, category: 'Handwriting' },
    { feature: 'Stroke Pressure', importance: 82, category: 'Handwriting' }
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <AssessmentIcon />
        Forensic Analytics Dashboard
      </Typography>

      {/* System Metrics Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#4caf50' }}>
              {systemMetrics?.uptime || '99.9%'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              API Uptime
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#2196f3' }}>
              {systemMetrics?.loaded_models || 8}/8
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Models Loaded
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#ff9800' }}>
              {uploadedFiles.filter(f => f.status === 'analyzing').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Analyses
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#9c27b0' }}>
              {systemMetrics?.total_processed || analysisStats.totalAnalyses}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Processed
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Analysis Summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Forensic Analysis Summary
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
              <Typography variant="h4">{analysisStats.totalAnalyses}</Typography>
              <Typography variant="body2">Total Analyses</Typography>
            </Paper>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }}>
              <Typography variant="h4">{analysisStats.successRate}%</Typography>
              <Typography variant="body2">Success Rate</Typography>
            </Paper>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'error.light', color: 'error.contrastText' }}>
              <Typography variant="h4">{analysisStats.bloodspatterAnalyses}</Typography>
              <Typography variant="body2">Blood Spatter</Typography>
            </Paper>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light', color: 'warning.contrastText' }}>
              <Typography variant="h4">{analysisStats.handwritingAnalyses + analysisStats.cartridgeAnalyses}</Typography>
              <Typography variant="body2">Other Evidence</Typography>
            </Paper>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body2" color="text.secondary">
            This integrated forensic analysis system demonstrates the capstone project's core objectives: 
            combining macro-level crime analytics with micro-level forensic evidence analysis using 
            custom-built machine learning models including Random Forest classifiers, CNNs for image analysis, 
            and feature extraction algorithms for blood spatter, ballistics, and handwriting analysis.
          </Typography>
        </CardContent>
      </Card>

      {/* Feature Importance Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Forensic Feature Importance
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Key features extracted by our custom models for evidence analysis
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={featureImportanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="feature" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Importance"
                dataKey="importance"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <RechartsTooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

const EvidenceAnalysis: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [previewDialog, setPreviewDialog] = useState<{ open: boolean; file?: UploadedFile }>({ open: false });
  const [analysisHistory, setAnalysisHistory] = useState<any[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<any>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Load system metrics and analysis history
  useEffect(() => {
    const loadSystemMetrics = async () => {
      try {
        const response = await fetch('http://localhost:8000/dashboard/statistics');
        if (response.ok) {
          const data = await response.json();
          setSystemMetrics(data);
        }
      } catch (error) {
        console.error('Failed to load system metrics:', error);
      }
    };

    loadSystemMetrics();
    const interval = setInterval(loadSystemMetrics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const onDrop = useCallback((acceptedFiles: File[], analysisType: string) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending' as const,
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Auto-analyze files
    newFiles.forEach(uploadedFile => {
      handleFileUpload(uploadedFile, analysisType);
    });
  }, []);

  const handleFileUpload = async (uploadedFile: UploadedFile, analysisType: string) => {
    setLoading(true);
    
    // Update file status to analyzing
    setUploadedFiles(prev => 
      prev.map(f => f.id === uploadedFile.id ? { ...f, status: 'analyzing', progress: 0 } : f)
    );

    try {
      const formData = new FormData();
      formData.append('image', uploadedFile.file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => {
            if (f.id === uploadedFile.id) {
              const newProgress = Math.min(f.progress + Math.random() * 20, 90);
              return { ...f, progress: newProgress };
            }
            return f;
          })
        );
      }, 500);

      const response = await fetch(`http://localhost:8000/api/unstructured/${analysisType}/analyze`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (response.ok) {
        const result = await response.json();
        
        setUploadedFiles(prev => 
          prev.map(f => f.id === uploadedFile.id ? 
            { ...f, status: 'completed', progress: 100, results: result } : f
          )
        );
        
        setResults(result);

        // Add to analysis history for visualizations
        setAnalysisHistory(prev => [...prev, {
          id: uploadedFile.id,
          timestamp: new Date(),
          type: analysisType,
          fileName: uploadedFile.file.name,
          results: result
        }]);
      } else {
        setUploadedFiles(prev => 
          prev.map(f => f.id === uploadedFile.id ? 
            { ...f, status: 'error', progress: 0 } : f
          )
        );
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      setUploadedFiles(prev => 
        prev.map(f => f.id === uploadedFile.id ? 
          { ...f, status: 'error', progress: 0 } : f
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === fileId);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const FileUploadComponent = ({ 
    analysisType, 
    acceptedTypes, 
    title, 
    description,
    icon 
  }: {
    analysisType: string;
    acceptedTypes: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (files) => onDrop(files, analysisType),
      accept: {
        'image/*': acceptedTypes.split(',').map(ext => ext.trim())
      },
      multiple: true
    });

    const relevantFiles = uploadedFiles.filter(f => 
      analysisType === 'bloodsplatter' ? f.file.type.includes('image') :
      analysisType === 'handwriting' ? f.file.type.includes('image') :
      analysisType === 'cartridge' ? f.file.type.includes('image') : true
    );

    return (
      <Box>
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              {icon}
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>
        
            <Paper
              {...getRootProps()}
              sx={{
                p: 4,
                border: 2,
                borderStyle: 'dashed',
                borderColor: isDragActive ? 'primary.main' : 'grey.300',
                backgroundColor: isDragActive ? 'action.hover' : 'background.default',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <input {...getInputProps()} />
              <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                or click to select files
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Accepted formats: {acceptedTypes}
              </Typography>
            </Paper>

            {/* File List */}
            {relevantFiles.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Uploaded Files ({relevantFiles.length})
                </Typography>
                {relevantFiles.map((uploadedFile) => (
                  <Card key={uploadedFile.id} sx={{ mb: 2, border: 1, borderColor: 'divider' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img 
                          src={uploadedFile.preview} 
                          alt={uploadedFile.file.name}
                          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {uploadedFile.file.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {(uploadedFile.file.size / 1024).toFixed(1)} KB
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Chip 
                              label={uploadedFile.status} 
                              size="small"
                              color={
                                uploadedFile.status === 'completed' ? 'success' :
                                uploadedFile.status === 'error' ? 'error' :
                                uploadedFile.status === 'analyzing' ? 'warning' : 'default'
                              }
                              icon={
                                uploadedFile.status === 'completed' ? <CheckCircleIcon /> :
                                uploadedFile.status === 'error' ? <ErrorIcon /> :
                                uploadedFile.status === 'analyzing' ? <CircularProgress size={16} /> : undefined
                              }
                            />
                            {uploadedFile.status === 'analyzing' && (
                              <LinearProgress 
                                variant="determinate" 
                                value={uploadedFile.progress} 
                                sx={{ flex: 1, ml: 1 }}
                              />
                            )}
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Preview">
                            <IconButton 
                              size="small" 
                              onClick={() => setPreviewDialog({ open: true, file: uploadedFile })}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          {uploadedFile.results && (
                            <Tooltip title="Download Results">
                              <IconButton size="small">
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Remove">
                            <IconButton size="small" onClick={() => removeFile(uploadedFile.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
          </Box>
        )}
      </CardContent>
    </Card>

        {/* Results Section */}
        {relevantFiles.some(f => f.results) && (
          <ResultsDisplay 
            results={relevantFiles.filter(f => f.results)} 
            type={analysisType} 
          />
        )}
      </Box>
  );
  };

  const ResultsDisplay = ({ results, type }: { results: UploadedFile[]; type: string }) => {
    if (!results.length) return null;

    const latestResult = results[results.length - 1].results;

    return (
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimelineIcon />
            Analysis Results
            <Chip label={`${results.length} files analyzed`} size="small" color="primary" />
          </Typography>
          
          {type === 'bloodsplatter' && latestResult && (
            <Box>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Pattern Analysis</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="error.main">
                        {latestResult.rule_based_pattern || 'Unknown'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Spatter Pattern
                      </Typography>
                    </Card>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary.main">
                        {latestResult.confidence || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Confidence Level
                      </Typography>
                    </Card>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="warning.main">
                        {latestResult.features?.length || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Features Detected
                      </Typography>
                    </Card>
              </Box>
              
                  {latestResult.analysis_details && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        {latestResult.analysis_details}
              </Typography>
                    </Alert>
                  )}

                  {latestResult.features && latestResult.features.length > 0 && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Detected Features:</strong><br/>
                        {latestResult.features.map((feature: string, index: number) => (
                          <span key={index}>
                            • {feature}
                            {index < latestResult.features.length - 1 ? <br/> : ''}
                          </span>
                        ))}
                      </Typography>
                    </Alert>
                  )}

                  {latestResult.forensic_insights && latestResult.forensic_insights.length > 0 && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Forensic Insights:</strong><br/>
                        {latestResult.forensic_insights.map((insight: string, index: number) => (
                          <span key={index}>
                            • {insight}
                            {index < latestResult.forensic_insights.length - 1 ? <br/> : ''}
                          </span>
                        ))}
                      </Typography>
                    </Alert>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          )}

          {type === 'handwriting' && latestResult && (
            <Box>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Writer Identification</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary.main">
                        {latestResult.writer_id || 'Unknown'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Writer ID
                      </Typography>
                    </Card>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main">
                        {latestResult.confidence ? `${(latestResult.confidence * 100).toFixed(1)}%` : 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Confidence
                      </Typography>
                    </Card>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="warning.main">
                        {latestResult.features_extracted || 0}
              </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Features
                      </Typography>
                    </Card>
                  </Box>

                  {latestResult.similar_writers && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 2 }}>Similar Writers</Typography>
                      {latestResult.similar_writers.slice(0, 5).map((writer: any, index: number) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">{writer.id}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {(writer.similarity * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      ))}
                      </Box>
                    )}
                </AccordionDetails>
              </Accordion>
            </Box>
          )}

          {type === 'cartridge' && latestResult && (
            <Box>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Ballistics Analysis</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="error.main">
                        {latestResult.cartridge_class || 'Unknown'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Cartridge Class
                      </Typography>
                    </Card>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary.main">
                        {latestResult.confidence ? `${(latestResult.confidence * 100).toFixed(1)}%` : 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Classification Confidence
                      </Typography>
                    </Card>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="warning.main">
                        {latestResult.features?.length || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ballistic Features
                      </Typography>
                    </Card>
              </Box>
              
                  {latestResult.measurements && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        Surface measurements completed: {Object.keys(latestResult.measurements).length} parameters analyzed
              </Typography>
                    </Alert>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          )}

          {/* Analysis History */}
          {results.length > 1 && (
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Analysis History ({results.length} analyses)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {results.map((result, index) => (
                    <Card key={result.id} variant="outlined" sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">{result.file.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={
                              type === 'bloodsplatter' ? result.results?.rule_based_pattern :
                              type === 'handwriting' ? result.results?.writer_id :
                              type === 'cartridge' ? result.results?.cartridge_class :
                              'Processed'
                            } 
                            size="small" 
                            color="primary"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {new Date().toLocaleTimeString()}
              </Typography>
            </Box>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
          Forensic Evidence Analysis
        </Typography>

      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="evidence analysis tabs">
          <Tab 
            label="Blood Spatter Analysis" 
            icon={<ScienceIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Handwriting Analysis" 
            icon={<EditIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Cartridge Case Analysis" 
            icon={<SecurityIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Analytics Dashboard" 
            icon={<AssessmentIcon />} 
            iconPosition="start"
          />
        </Tabs>
      </Paper>

        <TabPanel value={tabValue} index={0}>
          <FileUploadComponent
            analysisType="bloodsplatter"
          acceptedTypes=".jpg, .jpeg, .png, .bmp"
          title="Blood Spatter Pattern Analysis"
          description="Upload crime scene photos containing blood spatter patterns for automated analysis. Our system will identify impact patterns, directionality, and spatter characteristics."
          icon={<ScienceIcon color="error" />}
        />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <FileUploadComponent
            analysisType="handwriting"
          acceptedTypes=".jpg, .jpeg, .png"
          title="Handwriting Recognition & Writer Identification"
          description="Upload handwriting samples for writer identification and text analysis. The system will extract unique writing characteristics and match against known writers."
          icon={<EditIcon color="primary" />}
        />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <FileUploadComponent
            analysisType="cartridge"
          acceptedTypes=".jpg, .jpeg, .png"
            title="Cartridge Case Analysis"
          description="Upload cartridge case images for ballistics analysis. The system will extract firing pin marks, breech face marks, and other ballistic signatures."
          icon={<SecurityIcon color="warning" />}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <ForensicAnalyticsDashboard 
            systemMetrics={systemMetrics}
            analysisHistory={analysisHistory}
            uploadedFiles={uploadedFiles}
          />
        </TabPanel>

      {/* Preview Dialog */}
      <Dialog 
        open={previewDialog.open} 
        onClose={() => setPreviewDialog({ open: false })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          File Preview
          {previewDialog.file && (
            <Typography variant="subtitle2" color="text.secondary">
              {previewDialog.file.file.name}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          {previewDialog.file && (
            <Box sx={{ textAlign: 'center' }}>
              <img 
                src={previewDialog.file.preview} 
                alt={previewDialog.file.file.name}
                style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog({ open: false })}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EvidenceAnalysis; 