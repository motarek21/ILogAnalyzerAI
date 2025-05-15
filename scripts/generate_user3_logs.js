const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'log_analyzer',
  password: process.env.DB_PASSWORD || 'logai',
  port: process.env.DB_PORT || 5432,
};

async function generateUser3Logs() {
  const pool = new Pool(dbConfig);
  
  try {
    console.log('Generating logs for user ID 3...');
    
    // Define device configurations
    const devices = [
      { name: 'Server-Alpha', mac: '00:1A:2B:3C:4D:5E', ip: '192.168.10.1' },
      { name: 'Server-Beta', mac: '00:1A:2B:3C:4D:5F', ip: '192.168.10.2' },
      { name: 'Workstation-1', mac: '00:1A:2B:3C:4D:60', ip: '192.168.10.101' },
      { name: 'Workstation-2', mac: '00:1A:2B:3C:4D:61', ip: '192.168.10.102' },
      { name: 'Router-Main', mac: '00:1A:2B:3C:4D:62', ip: '192.168.10.254' },
      { name: 'Firewall-Edge', mac: '00:1A:2B:3C:4D:63', ip: '192.168.10.253' },
      { name: 'Database-Primary', mac: '00:1A:2B:3C:4D:64', ip: '192.168.10.10' },
      { name: 'Database-Secondary', mac: '00:1A:2B:3C:4D:65', ip: '192.168.10.11' },
      { name: 'IoT-Gateway', mac: '00:1A:2B:3C:4D:66', ip: '192.168.10.100' },
      { name: 'Network-Storage', mac: '00:1A:2B:3C:4D:67', ip: '192.168.10.20' }
    ];
    
    // Define log templates
    const anomalyLogs = [
      'Suspicious outbound connection detected to {ip}',
      'Brute force login attempt detected',
      'Multiple failed login attempts',
      'Unauthorized access to restricted file system',
      'Port scanning activity detected',
      'Unusual outbound data transfer ({size} MB)',
      'Potential data exfiltration detected',
      'Suspicious process execution',
      'Malware signature detected',
      'Known malicious IP connection: {ip}',
      'Unusual login time detected',
      'Access attempt with expired credentials',
      'Failed user privilege elevation',
      'Security certificate validation failure',
      'Cross-site scripting attempt detected',
      'SQL injection attempt detected',
      'Abnormal system resource usage (CPU: {cpu}%)',
      'Abnormal system resource usage (RAM: {ram}%)',
      'Suspicious registry modification',
      'Unusual user account activity',
      'File integrity check failed',
      'Unsecured protocol usage detected',
      'Potential DoS attack detected',
      'Unauthorized configuration change',
      'Unusual API call pattern detected'
    ];
    
    const nonAnomalyLogs = [
      'System startup completed',
      'Scheduled security scan completed',
      'User login successful',
      'User logout event',
      'System update installed successfully',
      'Firewall rule updated',
      'Backup operation completed',
      'Password changed successfully',
      'Routine system maintenance performed',
      'Security patch applied',
      'Database optimization completed',
      'User added to group',
      'Service restarted after update',
      'Regular health check passed',
      'Configuration file updated',
      'Log rotation completed',
      'Disk cleanup task completed',
      'Virus definition update completed',
      'User account created',
      'Software installed successfully',
      'Scheduled task executed',
      'TLS certificate renewed',
      'DNS cache flushed',
      'IP configuration updated',
      'Network interface reset'
    ];
    
    // Generate dates ranging from 60 days ago to today
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date);
    }
    
    // Generate log entries
    const logValues = [];
    const logCount = 60;
    
    // Create varied logs across dates with multiple entries on the same day
    // Make anomaly percentage significant to trigger "risk" status 
    for (let i = 0; i < logCount; i++) {
      const device = devices[Math.floor(Math.random() * devices.length)];
      const dateIndex = Math.floor(Math.random() * dates.length);
      const date = dates[dateIndex];
      
      // Set hours, minutes, seconds randomly
      date.setHours(Math.floor(Math.random() * 24));
      date.setMinutes(Math.floor(Math.random() * 60));
      date.setSeconds(Math.floor(Math.random() * 60));
      
      // About 60% anomaly to ensure risk status for most devices
      const isAnomaly = Math.random() < 0.6;
      
      // Select log message
      let logMessage;
      if (isAnomaly) {
        logMessage = anomalyLogs[Math.floor(Math.random() * anomalyLogs.length)];
      } else {
        logMessage = nonAnomalyLogs[Math.floor(Math.random() * nonAnomalyLogs.length)];
      }
      
      // Replace placeholders with values
      logMessage = logMessage
        .replace('{ip}', `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`)
        .replace('{size}', Math.floor(Math.random() * 1000))
        .replace('{cpu}', Math.floor(Math.random() * 100))
        .replace('{ram}', Math.floor(Math.random() * 100));
      
      // Create log entry
      logValues.push(`(3, '${device.name}', '${device.mac}', '${device.ip}', '${logMessage}', '${isAnomaly ? 'anomaly' : 'non-anomaly'}', '${date.toISOString()}')`);
    }
    
    // Insert all logs for user 3
    await pool.query(`
      INSERT INTO logs (user_id, device_name, device_mac, device_ip, log, status, time) VALUES
      ${logValues.join(',\n      ')}
    `);
    
    console.log(`Successfully added ${logCount} logs for user ID 3`);
  } catch (error) {
    console.error('Error generating logs:', error);
  } finally {
    await pool.end();
  }
}

generateUser3Logs().then(() => {
  console.log('Script completed');
  process.exit(0);
});