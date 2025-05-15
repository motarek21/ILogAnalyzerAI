const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'log_analyzer',
  password: process.env.DB_PASSWORD || 'logai',
  port: process.env.DB_PORT || 5432,
};

async function createTables() {
  const pool = new Pool(dbConfig);
  
  try {
    console.log('Creating tables with lowercase names...');
    
    // Drop and recreate tables with lowercase names
    await pool.query(`
      DROP TABLE IF EXISTS logs CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS contact CASCADE;

      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        user_name VARCHAR(255) NOT NULL
      );

      CREATE TABLE logs (
        log_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        device_name VARCHAR(255),
        device_mac VARCHAR(255),
        device_ip VARCHAR(255),
        log TEXT,
        status VARCHAR(50),
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE contact (
        message_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        message TEXT NOT NULL
      );
    `);

    // Insert sample users
    await pool.query(`
      INSERT INTO users (email, password, company, user_name) VALUES
      ('admin@loganalyzer.ai', 'admin1234', 'logai', 'admin'),
      ('mohamed@logai.com', 'pass123', 'softtech', 'mohamed'),
      ('samy@soviet.ai', 'Samy1234', 'soviet.ai', 'samyMohsen');
    `);

    // Insert sample logs
    await pool.query(`
      INSERT INTO logs (user_id, device_name, device_mac, device_ip, log, status, time) VALUES
      (1, 'Workstation-01', '00:1B:44:11:3A:B7', '192.168.1.10', 'Login successful', 'non-anomaly', '2025-01-03 08:12:32'),
      (1, 'Workstation-01', '00:1B:44:11:3A:B7', '192.168.1.10', 'Port scan detected', 'anomaly', '2025-01-04 13:22:10'),
      (1, 'Server-01', '00:1B:44:11:3A:B8', '192.168.1.20', 'Failed login attempt', 'anomaly', '2025-02-15 18:45:09'),
      (1, 'Server-01', '00:1B:44:11:3A:B8', '192.168.1.20', 'Antivirus updated', 'non-anomaly', '2025-02-20 09:17:55'),
      (1, 'Workstation-02', '00:1B:44:11:3A:B9', '192.168.1.11', 'Firewall rule added', 'non-anomaly', '2025-03-01 14:30:44'),
      (1, 'Workstation-02', '00:1B:44:11:3A:B9', '192.168.1.11', 'Multiple failed logins', 'anomaly', '2025-03-10 07:12:12'),
      (1, 'Workstation-03', '00:1B:44:11:3A:BA', '192.168.1.12', 'Unusual traffic pattern detected', 'anomaly', '2025-04-05 22:47:39'),
      (1, 'Server-02', '00:1B:44:11:3A:BB', '192.168.1.21', 'Log cleared by admin', 'anomaly', '2025-04-20 12:05:03'),
      (1, 'Workstation-04', '00:1B:44:11:3A:BC', '192.168.1.13', 'Software installed', 'non-anomaly', '2025-05-02 16:21:09'),
      (1, 'Workstation-04', '00:1B:44:11:3A:BC', '192.168.1.13', 'System rebooted', 'non-anomaly', '2025-05-10 03:33:25'),

      (2, 'Laptop-01', '00:1B:44:11:3A:C1', '10.0.0.5', 'Login successful', 'non-anomaly', '2025-01-05 08:45:11'),
      (2, 'Laptop-01', '00:1B:44:11:3A:C1', '10.0.0.5', 'Suspicious IP connection', 'anomaly', '2025-01-15 12:01:48'),
      (2, 'Desktop-01', '00:1B:44:11:3A:C2', '10.0.0.6', 'Failed login attempt', 'anomaly', '2025-02-12 14:23:56'),
      (2, 'Desktop-01', '00:1B:44:11:3A:C2', '10.0.0.6', 'Antivirus updated', 'non-anomaly', '2025-02-28 09:17:02'),
      (2, 'Laptop-02', '00:1B:44:11:3A:C3', '10.0.0.7', 'Firewall configuration changed', 'anomaly', '2025-03-08 22:15:33'),
      (2, 'Laptop-02', '00:1B:44:11:3A:C3', '10.0.0.7', 'System rebooted', 'non-anomaly', '2025-03-15 18:22:10'),
      (2, 'Desktop-02', '00:1B:44:11:3A:C4', '10.0.0.8', 'Multiple failed logins', 'anomaly', '2025-04-01 07:11:56'),
      (2, 'Desktop-02', '00:1B:44:11:3A:C4', '10.0.0.8', 'Software installed', 'non-anomaly', '2025-04-12 10:44:22'),
      (2, 'Server-03', '00:1B:44:11:3A:C5', '10.0.0.9', 'Admin privileges escalated', 'anomaly', '2025-05-03 13:55:09'),
      (2, 'Server-03', '00:1B:44:11:3A:C5', '10.0.0.9', 'Antivirus scan completed', 'non-anomaly', '2025-05-15 06:29:49');
    `);

    console.log('Tables created and sample data inserted successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await pool.end();
  }
}

createTables().then(() => {
  console.log('Script completed');
  process.exit(0);
}); 