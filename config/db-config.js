require('dotenv').config();

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'log_analyzer',
  password: process.env.DB_PASSWORD || 'logai',
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

// Check if we have a DATABASE_URL (for Heroku or other PaaS)
if (process.env.DATABASE_URL) {
  // Parse the DATABASE_URL
  const url = new URL(process.env.DATABASE_URL);
  
  // Override config with values from DATABASE_URL
  dbConfig.user = url.username;
  dbConfig.password = url.password;
  dbConfig.host = url.hostname;
  dbConfig.port = url.port;
  dbConfig.database = url.pathname.substring(1); // Remove leading '/'
  dbConfig.ssl = process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false;
}

module.exports = dbConfig; 