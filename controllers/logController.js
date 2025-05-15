const logModel = require('../models/logModel');

class LogController {
  // Create a new log entry
  async createLog(logData) {
    try {
      const { userId, deviceName, deviceMAC, deviceIP, log, status } = logData;
      
      // Create new log
      const newLog = await logModel.createLog(userId, deviceName, deviceMAC, deviceIP, log, status);
      
      return {
        success: true,
        log: newLog
      };
    } catch (error) {
      console.error('Error creating log:', error);
      return {
        success: false,
        message: 'Server error while creating log'
      };
    }
  }
  
  // Get all logs for a user
  async getUserLogs(userId) {
    try {
      // Get logs by user ID
      const logs = await logModel.getLogsByUserId(userId);
      
      return {
        success: true,
        count: logs.length,
        logs
      };
    } catch (error) {
      console.error('Error fetching user logs:', error);
      return {
        success: false,
        message: 'Server error while fetching logs'
      };
    }
  }
  
  // Get log by ID
  async getLogById(logId) {
    try {
      // Get log by ID
      const log = await logModel.getLogById(logId);
      
      if (!log) {
        return {
          success: false,
          message: 'Log not found'
        };
      }
      
      return {
        success: true,
        log
      };
    } catch (error) {
      console.error('Error fetching log:', error);
      return {
        success: false,
        message: 'Server error while fetching log'
      };
    }
  }
  
  // Get logs for a specific device
  async getDeviceLogs(userId, deviceMac) {
    try {
      // Get all logs for the user
      const logs = await logModel.getLogsByUserId(userId);
      
      // Filter logs for the specific device
      const deviceLogs = logs.filter(log => log.device_mac === deviceMac);
      
      return {
        success: true,
        count: deviceLogs.length,
        logs: deviceLogs
      };
    } catch (error) {
      console.error('Error fetching device logs:', error);
      return {
        success: false,
        message: 'Server error while fetching device logs'
      };
    }
  }
  
  // Get logs statistics for charts
  async getLogsStatistics(userId) {
    try {
      // Get all logs for the user
      const logs = await logModel.getLogsByUserId(userId);
      
      // Calculate log statistics
      const statistics = {
        totalLogs: logs.length,
        statusCounts: {
          Normal: 0,
          Risk: 0
        },
        deviceCounts: {},
        logsByDay: {}
      };
      
      logs.forEach(log => {
        // Count by status
        const status = log.status === 'Risk' || log.status === 'Anomaly' ? 'Risk' : 'Normal';
        statistics.statusCounts[status]++;
        
        // Count by device
        const deviceKey = `${log.device_name}-${log.device_mac}`;
        if (!statistics.deviceCounts[deviceKey]) {
          statistics.deviceCounts[deviceKey] = {
            name: log.device_name,
            mac: log.device_mac,
            count: 0
          };
        }
        statistics.deviceCounts[deviceKey].count++;
        
        // Group by day
        const date = new Date(log.time).toISOString().split('T')[0];
        if (!statistics.logsByDay[date]) {
          statistics.logsByDay[date] = {
            date,
            total: 0,
            Risk: 0,
            Normal: 0
          };
        }
        
        statistics.logsByDay[date].total++;
        statistics.logsByDay[date][status]++;
      });
      
      // Convert device counts object to array
      statistics.deviceCountsList = Object.values(statistics.deviceCounts);
      
      // Convert logs by day object to sorted array
      statistics.logsByDayList = Object.values(statistics.logsByDay)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      
      return {
        success: true,
        statistics
      };
    } catch (error) {
      console.error('Error calculating log statistics:', error);
      return {
        success: false,
        message: 'Server error while calculating statistics'
      };
    }
  }
}

module.exports = new LogController(); 