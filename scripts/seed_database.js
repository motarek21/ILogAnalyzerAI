const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function seedDatabase() {
  try {
    console.log('Attempting to seed database with test data...');
    
    // PostgreSQL connection configuration
    const pool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'log_analyzer',
      password: process.env.DB_PASSWORD || 'logai',
      port: process.env.DB_PORT || 5432,
    });

    // Test connection
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');
    
    try {
      // Read SQL file
      const sqlFilePath = path.join(__dirname, 'insert_test_logs.sql');
      const sql = fs.readFileSync(sqlFilePath, 'utf8');
      
      // Execute SQL statements
      console.log('Executing SQL seed script...');
      await client.query(sql);
      console.log('Test data seeded successfully!');
    } catch (error) {
      console.error('Error executing SQL:', error);
    } finally {
      // Release client
      client.release();
    }
    
    // Close pool
    await pool.end();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}

// Run the seeding function
seedDatabase(); 