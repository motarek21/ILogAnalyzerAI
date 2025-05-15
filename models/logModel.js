const db = require('./db');

// Create Logs table
const createLogsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS logs (
        log_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        device_name VARCHAR(255),
        device_mac VARCHAR(255),
        device_ip VARCHAR(255),
        log TEXT,
        status VARCHAR(50),
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Logs table created or already exists');
    return true;
  } catch (error) {
    console.error('Error creating Logs table:', error);
    return false;
  }
};

// Create a new log
const createLog = async (userId, deviceName, deviceMAC, deviceIP, log, status) => {
  try {
    const result = await db.query(
      'INSERT INTO logs (user_id, device_name, device_mac, device_ip, log, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, deviceName, deviceMAC, deviceIP, log, status]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating log:', error);
    throw error;
  }
};

// Get logs by user ID
const getLogsByUserId = async (userId) => {
  try {
    const result = await db.query('SELECT * FROM logs WHERE user_id = $1 ORDER BY time DESC', [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error getting logs by user ID:', error);
    throw error;
  }
};

// Get log by ID
const getLogById = async (logId) => {
  try {
    const result = await db.query('SELECT * FROM logs WHERE log_id = $1', [logId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error getting log by ID:', error);
    throw error;
  }
};

// Update log
const updateLog = async (logId, logData) => {
  const { deviceName, deviceMAC, deviceIP, log, status } = logData;
  try {
    const result = await db.query(
      'UPDATE logs SET device_name = $1, device_mac = $2, device_ip = $3, log = $4, status = $5 WHERE log_id = $6 RETURNING *',
      [deviceName, deviceMAC, deviceIP, log, status, logId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating log:', error);
    throw error;
  }
};

// Delete log
const deleteLog = async (logId) => {
  try {
    await db.query('DELETE FROM logs WHERE log_id = $1', [logId]);
    return true;
  } catch (error) {
    console.error('Error deleting log:', error);
    throw error;
  }
};

module.exports = {
  createLogsTable,
  createLog,
  getLogsByUserId,
  getLogById,
  updateLog,
  deleteLog
}; 