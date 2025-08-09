import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Description as DescriptionIcon,
  GetApp as DownloadIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Science as ScienceIcon,
  AccountTree as NetworkIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
      id={`reports-tabpanel-${index}`}
      aria-labelledby={`reports-tab-${index}`}
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

interface Report {
  id: string;
  title: string;
  type: 'evidence' | 'crime' | 'network' | 'summary';
  date: string;
  status: 'completed' | 'processing' | 'error';
  author: string;
  caseId?: string;
  summary: string;
  confidence?: number;
  priority: 'high' | 'medium' | 'low';
}

const Reports: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterDialog, setFilterDialog] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: 30,
    priority: 'all'
  });
  const [loading, setLoading] = useState(false);

  // Sample reports data
  const [reports] = useState<Report[]>([
    {
      id: 'RPT-2025-001',
      title: 'Blood Spatter Analysis - Case HOMICIDE-2025-001',
      type: 'evidence',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      author: 'Detective Martinez',
      caseId: 'HOMICIDE-2025-001',
      summary: 'High velocity impact spatter pattern identified. Trajectory analysis suggests weapon wielded from 5-6 feet height.',
      confidence: 94.2,
      priority: 'high'
    },
    {
      id: 'RPT-2025-002',
      title: 'Handwriting Analysis - Ransom Note Examination',
      type: 'evidence',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      author: 'Forensic Analyst Chen',
      caseId: 'KIDNAP-2025-003',
      summary: 'Writer identified with 96.8% confidence. Match found in database: suspect ID W2447.',
      confidence: 96.8,
      priority: 'high'
    },
    {
      id: 'RPT-2025-003',
      title: 'Crime Hotspot Analysis - Pacific Division Q1',
      type: 'crime',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      author: 'Crime Analyst Johnson',
      summary: 'Identified 3 major hotspots. 23% increase in vehicle burglaries near commercial areas.',
      priority: 'medium'
    },
    {
      id: 'RPT-2025-004',
      title: 'Criminal Network Analysis - Drug Distribution Ring',
      type: 'network',
      date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      status: 'processing',
      author: 'Intelligence Unit',
      summary: 'Network analysis in progress. 15 nodes identified, 3 central figures detected.',
      priority: 'high'
    },
    {
      id: 'RPT-2025-005',
      title: 'Weekly Crime Summary Report',
      type: 'summary',
      date: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      author: 'Captain Rodriguez',
      summary: 'Overall crime rates down 8% from previous week. Solved case rate at 73%.',
      priority: 'low'
    },
    {
      id: 'RPT-2025-006',
      title: 'Ballistics Analysis - Multiple Shooting Incidents',
      type: 'evidence',
      date: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
      status: 'error',
      author: 'Ballistics Expert Williams',
      caseId: 'SHOOTING-2025-012',
      summary: 'Analysis failed due to insufficient cartridge case quality. Requesting additional samples.',
      priority: 'medium'
    }
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
  };

  const handleDownloadReport = (reportType: string, caseId: string) => {
    setLoading(true);
    // Simulate download
    setTimeout(() => {
      setLoading(false);
      alert(`${reportType} report downloaded successfully!`);
    }, 2000);
  };

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('New report generated successfully!');
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'processing':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <ScheduleIcon color="disabled" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'evidence':
        return <ScienceIcon color="primary" />;
      case 'crime':
        return <TrendingUpIcon color="warning" />;
      case 'network':
        return <NetworkIcon color="error" />;
      case 'summary':
        return <AssessmentIcon color="info" />;
      default:
        return <DescriptionIcon color="action" />;
    }
  };

  const filteredReports = reports.filter(report => {
    if (filters.type !== 'all' && report.type !== filters.type) return false;
    if (filters.status !== 'all' && report.status !== filters.status) return false;
    if (filters.priority !== 'all' && report.priority !== filters.priority) return false;
    
    const reportDate = new Date(report.date);
    const cutoffDate = new Date(Date.now() - filters.dateRange * 24 * 60 * 60 * 1000);
    if (reportDate < cutoffDate) return false;
    
    return true;
  });

  // Chart data for analytics
  const reportTypeData = [
    { name: 'Evidence', value: reports.filter(r => r.type === 'evidence').length },
    { name: 'Crime Analysis', value: reports.filter(r => r.type === 'crime').length },
    { name: 'Network Analysis', value: reports.filter(r => r.type === 'network').length },
    { name: 'Summary', value: reports.filter(r => r.type === 'summary').length }
  ];

  const statusData = [
    { name: 'Completed', value: reports.filter(r => r.status === 'completed').length },
    { name: 'Processing', value: reports.filter(r => r.status === 'processing').length },
    { name: 'Error', value: reports.filter(r => r.status === 'error').length }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Box>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
              Forensic Reports & Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
              Comprehensive reporting system for all forensic analyses and crime investigations.
        </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Filters">
              <IconButton onClick={() => setFilterDialog(true)}>
                <FilterIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh">
              <IconButton>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button 
              variant="contained" 
              startIcon={<AssessmentIcon />}
              onClick={handleGenerateReport}
              disabled={loading}
            >
              Generate Report
            </Button>
          </Box>
      </Box>

      <Paper sx={{ width: '100%' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="reports tabs">
            <Tab 
              label="All Reports" 
            icon={<DescriptionIcon />} 
            iconPosition="start"
          />
            <Tab 
              label="Evidence Analysis" 
              icon={<ScienceIcon />} 
              iconPosition="start"
            />
          <Tab 
            label="Crime Analytics" 
              icon={<TrendingUpIcon />} 
            iconPosition="start"
          />
          <Tab 
              label="Report Analytics" 
              icon={<AssessmentIcon />} 
            iconPosition="start"
          />
        </Tabs>
        </Paper>

        <TabPanel value={tabValue} index={0}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  All Reports ({filteredReports.length})
          </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label={`${reports.filter(r => r.status === 'completed').length} Completed`} 
                    color="success" 
                    size="small" 
                  />
                  <Chip 
                    label={`${reports.filter(r => r.status === 'processing').length} Processing`} 
                    color="warning" 
                    size="small" 
                  />
                  <Chip 
                    label={`${reports.filter(r => r.status === 'error').length} Error`} 
                    color="error" 
                    size="small" 
                  />
                </Box>
              </Box>

              <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                      <TableCell>Report</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {getTypeIcon(report.type)}
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {report.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {report.id} {report.caseId && `• ${report.caseId}`}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                    <TableCell>
                      <Chip 
                            label={report.type} 
                        size="small"
                            variant="outlined"
                            color={
                              report.type === 'evidence' ? 'primary' :
                              report.type === 'crime' ? 'warning' :
                              report.type === 'network' ? 'error' : 'info'
                            }
                      />
                    </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusIcon(report.status)}
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {report.status}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(report.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(report.date).toLocaleTimeString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                              {report.author.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            <Typography variant="body2">
                              {report.author}
                            </Typography>
                          </Box>
                        </TableCell>
                    <TableCell>
                          <Chip 
                            label={report.priority} 
                        size="small" 
                            color={
                              report.priority === 'high' ? 'error' :
                              report.priority === 'medium' ? 'warning' : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="View Report">
                              <IconButton size="small" onClick={() => handleViewReport(report)}>
                                <ViewIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Download">
                              <IconButton 
                        size="small" 
                                onClick={() => handleDownloadReport(report.type, report.id)}
                                disabled={report.status !== 'completed'}
                              >
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Print">
                              <IconButton size="small" disabled={report.status !== 'completed'}>
                                <PrintIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Share">
                              <IconButton size="small" disabled={report.status !== 'completed'}>
                                <ShareIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
            <Card>
              <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
                  Evidence Analysis Reports
          </Typography>
          
                {reports.filter(r => r.type === 'evidence').map((report) => (
                  <Accordion key={report.id} sx={{ mb: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                        {getTypeIcon(report.type)}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1">{report.title}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {report.id} • {new Date(report.date).toLocaleDateString()}
                    </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {getStatusIcon(report.status)}
                          {report.confidence && (
                    <Chip 
                              label={`${report.confidence}%`} 
                              size="small" 
                      color="success"
                    />
                          )}
                        </Box>
                  </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {report.summary}
                  </Typography>
                      
                      {report.confidence && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                            Confidence Level
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={report.confidence} 
                            sx={{ mt: 1 }}
                          />
                        </Box>
                      )}
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      size="small" 
                      startIcon={<ViewIcon />}
                          onClick={() => handleViewReport(report)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<DownloadIcon />}
                          disabled={report.status !== 'completed'}
                        >
                          Download
                    </Button>
                  </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Evidence Summary
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <ScienceIcon color="error" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Blood Analysis"
                      secondary={`${reports.filter(r => r.title.includes('Blood')).length} reports`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <DescriptionIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Handwriting Analysis"
                      secondary={`${reports.filter(r => r.title.includes('Handwriting')).length} reports`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Ballistics Analysis"
                      secondary={`${reports.filter(r => r.title.includes('Ballistics')).length} reports`}
                    />
                  </ListItem>
                </List>
                </CardContent>
              </Card>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
            <Card>
              <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
                  Crime Analytics Reports
          </Typography>
          
                {reports.filter(r => r.type === 'crime' || r.type === 'network' || r.type === 'summary').map((report) => (
                  <Card key={report.id} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getTypeIcon(report.type)}
                          <Typography variant="subtitle2" fontWeight={600}>
                            {report.title}
                          </Typography>
                        </Box>
                        {getStatusIcon(report.status)}
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {report.summary}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          {report.author} • {new Date(report.date).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" onClick={() => handleViewReport(report)}>
                            <ViewIcon />
                          </IconButton>
                          <IconButton 
                        size="small"
                            disabled={report.status !== 'completed'}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Analytics Overview
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h3" color="primary.main">
                      {reports.filter(r => r.type === 'crime').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Crime Reports
                    </Typography>
                  </Paper>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h3" color="warning.main">
                      {reports.filter(r => r.type === 'network').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Network Analysis
                    </Typography>
                  </Paper>
                </Box>

                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Crime rates are down 8% this week compared to last week. Continue monitoring Pacific Division hotspots.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Reports by Type
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={reportTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    >
                      {reportTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Status Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>

        {/* Report Detail Dialog */}
      <Dialog 
          open={!!selectedReport} 
          onClose={() => setSelectedReport(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {selectedReport && getTypeIcon(selectedReport.type)}
              Report Details
            </Box>
        </DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedReport.title}
              </Typography>
              
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
                  <TextField
                    label="Report ID"
                    value={selectedReport.id}
                    disabled
                    size="small"
                  />
                  <TextField
                    label="Status"
                    value={selectedReport.status}
                    disabled
                    size="small"
                  />
                  <TextField
                    label="Author"
                    value={selectedReport.author}
                    disabled
                    size="small"
                  />
                  <TextField
                    label="Date"
                    value={new Date(selectedReport.date).toLocaleDateString()}
                    disabled
                    size="small"
                  />
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Summary:</Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  {selectedReport.summary}
                </Typography>

                {selectedReport.confidence && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Confidence Level: {selectedReport.confidence}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={selectedReport.confidence} 
                      color="success"
                    />
                  </Box>
                )}

                <Alert severity="info">
                  <Typography variant="body2">
                    This report has been verified and approved for distribution.
                  </Typography>
                </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setSelectedReport(null)}>Close</Button>
            <Button variant="contained" startIcon={<DownloadIcon />}>
              Download PDF
            </Button>
          </DialogActions>
        </Dialog>

        {/* Filter Dialog */}
        <Dialog open={filterDialog} onClose={() => setFilterDialog(false)}>
          <DialogTitle>Report Filters</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="evidence">Evidence Analysis</MenuItem>
                  <MenuItem value="crime">Crime Analysis</MenuItem>
                  <MenuItem value="network">Network Analysis</MenuItem>
                  <MenuItem value="summary">Summary Reports</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="error">Error</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={filters.priority}
                  onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <MenuItem value="all">All Priorities</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Date Range (days)"
                type="number"
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: parseInt(e.target.value) }))}
                inputProps={{ min: 1, max: 365 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFilterDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setFilterDialog(false)}>
              Apply Filters
          </Button>
        </DialogActions>
      </Dialog>

        {loading && (
          <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
            <Alert severity="info" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinearProgress sx={{ width: 200, mr: 1 }} />
              Processing...
            </Alert>
          </Box>
        )}
    </Box>
  );
};

export default Reports; 