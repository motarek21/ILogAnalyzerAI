const { Pool } = require('pg');
require('dotenv').config();

// Predefined log data with varied timestamps
const mockLogs = {
  // User 1 logs (mohamed@logai.com)
  1: [
    {
      log_id: 1,
      user_id: 1,
      device_name: 'Router',
      device_mac: 'AA:BB:CC:DD:EE:01',
      device_ip: '192.168.0.1',
      log: 'Unusual outbound traffic',
      status: 'Anomaly',
      time: new Date('2023-12-10T08:23:15')
    },
    // Other log entries remain the same...
  ],
  
  // User 2 logs (admin@loganalyzer.ai)
  2: [
    // Log entries remain the same...
  ]
};

// Statistics for each user
const mockStats = {
  1: {
    total_logs: 10,
    anomaly_count: 4,
    normal_count: 6
  },
  2: {
    total_logs: 10,
    anomaly_count: 5,
    normal_count: 5
  }
};

// Mock database for testing when PostgreSQL is not available
const mockDB = {
  query: async (text, params) => {
    console.log('MOCK DB QUERY:', { text, params });
    
    // Mock implementations for different queries...
    if (text.includes('FROM users WHERE email')) {
      const email = params[0];
      if (email === 'admin@loganalyzer.ai') {
        return {
          rows: [{
            user_id: 2,
            email: 'admin@loganalyzer.ai',
            password: 'admin1234',
            company: 'logai',
            user_name: 'admin'
          }]
        };
      } else if (email === 'mohamed@logai.com') {
        return {
          rows: [{
            user_id: 1,
            email: 'mohamed@logai.com',
            password: 'pass123',
            company: 'softtech',
            user_name: 'mohamed'
          }]
        };
      }
      return { rows: [] };
    }
    
    // For device queries - return predefined logs
    if (text.includes('FROM Logs WHERE User_ID')) {
      const userId = parseInt(params[0]);
      
      // Return the predefined logs for the user
      if (mockLogs[userId]) {
        return { rows: mockLogs[userId] };
      }
      
      return { rows: [] };
    }
    
    // Handle device statistics queries
    if (text.includes('SELECT COUNT') && text.includes('FROM Logs')) {
      const userId = parseInt(params[0]);
      
      // Return predefined statistics
      if (mockStats[userId]) {
        return { rows: [mockStats[userId]] };
      }
      
      return { rows: [{ total_logs: 0, anomaly_count: 0, normal_count: 0 }] };
    }
    
    // Handle registration
    if (text.includes('INSERT INTO Users')) {
      return {
        rows: [{
          user_id: 3,
          email: params[0], // Email is the first parameter
          password: params[1], // Password
          company: params[2], // Company
          user_name: params[3] // User name
        }]
      };
    }
    
    // Mock for creating tables - always return success
    if (text.includes('CREATE TABLE IF NOT EXISTS')) {
      return { rows: [] };
    }
    
    // Default empty response for other queries
    return { rows: [] };
  }
};

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'log_analyzer',
  password: process.env.DB_PASSWORD || 'logai',
  port: process.env.DB_PORT || 5432,
};

// Initialize DB client
let pool = null;

const initializeDatabase = async () => {
  try {
    console.log('Connecting to PostgreSQL with:', {
      user: dbConfig.user,
      host: dbConfig.host,
      database: dbConfig.database,
      port: dbConfig.port
    });

    // Create a connection to postgres database
    const tempPool = new Pool({
      ...dbConfig,
      database: 'postgres'
    });

    try {
      // Check if our database exists
      const dbCheck = await tempPool.query(
        "SELECT datname FROM pg_database WHERE datname = $1",
        [dbConfig.database]
      );

      // Create database if it doesn't exist
      if (dbCheck.rows.length === 0) {
        await tempPool.query(`CREATE DATABASE ${dbConfig.database}`);
        console.log(`Database ${dbConfig.database} created`);
      }
    } finally {
      // Close the temporary connection
      await tempPool.end();
    }

    // Create the real connection pool
    pool = new Pool(dbConfig);

    // Test the connection
    const now = await pool.query('SELECT NOW()');
    console.log('PostgreSQL connected successfully!', now.rows[0]);
    console.log('✅ USING REAL DATABASE');

    return true;
  } catch (error) {
    console.error('PostgreSQL connection failed, using mock database:', error.message);
    
    // Mock database implementation
    pool = {
      query: async (text, params) => {
        console.log('MOCK DB QUERY:', { text, params });
        return mockQuery(text, params);
      }
    };
    
    return false;
  }
};

// Mock query implementation
const mockQuery = (text, params) => {
  // Mock implementations for different queries...
  if (text.includes('SELECT NOW()')) {
    return { rows: [{ now: new Date() }] };
  }
  
  if (text.includes('FROM users WHERE email')) {
    const email = params[0];
    if (email === 'admin@loganalyzer.ai') {
      return {
        rows: [{
          user_id: 2,
          email: 'admin@loganalyzer.ai',
          password: 'admin1234',
          company: 'logai',
          user_name: 'admin'
        }]
      };
    }
  }
  
  if (text.includes('FROM logs WHERE user_id')) {
    return { rows: [] };
  }
  
  return { rows: [] };
};

// Query wrapper
const query = async (text, params) => {
  if (!pool) {
    throw new Error('Database not initialized');
  }
  return pool.query(text, params);
};

module.exports = {
  query,
  initializeDatabase
};