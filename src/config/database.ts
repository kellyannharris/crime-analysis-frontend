// Database Configuration
export const DATABASE_CONFIG = {
  // Database connection URL - use environment variable in production
  url: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_yji3hvzQLW4w@ep-floral-mode-aev0idze-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  
  // Connection pool settings
  pool: {
    min: 2,
    max: 10,
    idle: 10000,
    acquire: 30000,
  },
  
  // SSL configuration for Neon
  ssl: {
    require: true,
    rejectUnauthorized: false
  },
  
  // Database schemas for Crime Analysis
  schemas: {
    crime_data: 'crime_analytics',
    evidence: 'forensic_evidence', 
    users: 'user_management',
    reports: 'analysis_reports'
  },
  
  // Table configurations
  tables: {
    crime_incidents: 'crime_incidents',
    evidence_analysis: 'evidence_analysis_results',
    blood_splatter: 'blood_splatter_analysis',
    ballistics: 'ballistics_analysis',
    handwriting: 'handwriting_analysis',
    user_sessions: 'user_sessions',
    system_logs: 'system_activity_logs'
  }
};

// Database utility functions
export const getDatabaseUrl = (): string => {
  return DATABASE_CONFIG.url;
};

export const isProductionDatabase = (): boolean => {
  return DATABASE_CONFIG.url.includes('neon.tech');
};

export const getTableName = (table: keyof typeof DATABASE_CONFIG.tables): string => {
  return DATABASE_CONFIG.tables[table];
}; 