# Crime Analysis Web Application

A comprehensive web-based platform for crime data analysis and forensic evidence processing, developed as a capstone project by Kelly-Ann Harris. This application provides law enforcement and forensic analysts with advanced tools for crime pattern analysis, evidence processing, and predictive modeling.

## 🚀 Features

### Dashboard & Analytics
- **Real-time Crime Statistics**: Live monitoring of crime analytics with accuracy rates and prediction confidence
- **System Health Monitoring**: Track model performance and system status
- **Interactive Hotspot Mapping**: Visual crime hotspot identification using Los Angeles crime data
- **Comprehensive Metrics**: Track cases analyzed, evidence processed, and model performance

### Evidence Analysis Suite
- **Blood Splatter Analysis**: Advanced pattern recognition for blood evidence
- **Ballistics Analysis**: Cartridge case examination and matching
- **Handwriting Analysis**: Document and signature verification
- **Interactive Image Processing**: Upload, crop, and analyze evidence images
- **Detailed Reporting**: Generate comprehensive analysis reports

### Crime Analysis Tools
- **Hotspot Mapping**: Interactive maps showing crime concentration areas
- **Temporal Pattern Analysis**: Time-based crime trend identification
- **Network Analysis**: Criminal network visualization and relationship mapping
- **Predictive Modeling**: Advanced algorithms for crime prediction
- **Real-time Analytics**: Live crime data processing and analysis

### Advanced Capabilities
- **Machine Learning Integration**: Custom-trained models for evidence analysis
- **Interactive Visualizations**: Charts, graphs, and maps for data representation
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Updates**: Live data synchronization and notifications

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Professional component library
- **React Router** - Client-side routing
- **Leaflet & React-Leaflet** - Interactive mapping
- **Recharts & Plotly.js** - Data visualization
- **Axios** - HTTP client for API communication

### UI/UX Libraries
- **@mui/x-charts** - Advanced charting components
- **@mui/x-data-grid** - Data table management
- **react-dropzone** - File upload handling
- **react-image-crop** - Image manipulation tools

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (version 16 or higher)
- **npm** (version 7 or higher) or **yarn**
- **Git** for version control
- A modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/crime-analysis-frontend.git
cd crime-analysis-frontend
```

### 2. Install Dependencies

```bash
npm install
```

or with yarn:

```bash
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory (or copy the existing one):

```env
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_MAP_API_KEY=your_map_api_key_here
```

**Note**: The `REACT_APP_API_BASE_URL` environment variable is required and should point to your backend API server. The default value points to localhost:8000.

### 4. Start the Development Server

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard/           # Main dashboard with analytics
│   │   └── SimpleDashboard.tsx
│   ├── EvidenceAnalysis/    # Evidence processing tools
│   │   └── EvidenceAnalysis.tsx
│   ├── CrimeAnalysis/       # Crime pattern analysis
│   │   └── CrimeAnalysis.tsx
│   ├── CrimeMap/            # Interactive mapping
│   │   └── LACrimeHotspotMap.tsx
│   ├── Reports/             # Report generation
│   │   └── Reports.tsx
│   └── Layout/              # Navigation and layout
│       ├── Header.tsx
│       └── Sidebar.tsx
├── App.tsx                  # Main application component
├── index.tsx               # Application entry point
└── App.css                 # Global styles
```

## 🎯 Available Scripts

### Development
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (⚠️ irreversible)

### Testing
- `npm test` - Run all tests
- `npm test -- --coverage` - Run tests with coverage report

## 🔧 Configuration

### API Integration
The application expects a backend API running on `http://localhost:8000`. Key endpoints include:

- `/api/system/status` - System health and model status
- `/api/dashboard/stats` - Dashboard statistics
- `/api/evidence/analyze` - Evidence analysis endpoints
- `/api/crime/analyze` - Crime analysis endpoints

### Environment Variables
- `REACT_APP_API_BASE_URL` - Backend API URL
- `REACT_APP_MAP_API_KEY` - Map service API key (if required)

## 🚀 Deployment

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deployment Options

#### Vercel (Recommended)
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy
4. Set environment variables in Vercel dashboard:
   - `REACT_APP_API_BASE_URL`: Your backend API URL

#### Other Options
- **Netlify**: Connect your GitHub repository for automatic deployments
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repositories

#### Environment Variables for Production
Create these environment variables in your deployment platform:
```
REACT_APP_API_BASE_URL=https://forensic-analysis-backend.onrender.com
```

**Note**: The backend API is already deployed and running at https://forensic-analysis-backend.onrender.com/

## 🧪 Testing

The application includes comprehensive testing setup:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🎨 Customization

### Theme Configuration
The application uses Material-UI theming. Customize colors and typography in `src/App.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#2563eb' },
    secondary: { main: '#dc2626' },
    // ... customize colors
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    // ... customize typography
  }
});
```

### Adding New Features
1. Create new components in the appropriate directory
2. Add routes in `App.tsx`
3. Update navigation in `Sidebar.tsx`
4. Implement API integration with axios

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of a capstone project by Kelly-Ann Harris. Please contact the author for usage permissions.

## 👤 Author

**Kelly-Ann Harris**
- Capstone Project - Crime Analysis Application
- Student Project focusing on forensic science and crime data analysis

## 🔗 Related Projects

This frontend application is designed to work with a corresponding backend API that provides:
- Machine learning models for evidence analysis
- Crime data processing algorithms
- Database management for case files
- Real-time analytics processing

## 📞 Support

For questions or support regarding this application:
1. Check the documentation in this README
2. Review the component-level comments in the source code
3. Contact the project author

## 🚀 Future Enhancements

- Advanced machine learning model integration
- Real-time collaboration features
- Mobile application development
- Enhanced security and user authentication
- Integration with law enforcement databases
- Advanced reporting and export capabilities

---

*This application represents a comprehensive approach to modern crime analysis, combining cutting-edge web technologies with forensic science principles to create a powerful tool for law enforcement professionals.*
