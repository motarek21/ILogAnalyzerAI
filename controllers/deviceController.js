const logModel = require('../models/logModel');

class DeviceController {
  // Get all unique devices for a user
  async getUserDevices(userId) {
    try {
      // Get all logs for the user
      const logs = await logModel.getLogsByUserId(userId);
      
      // Extract unique devices
      const uniqueDevices = {};
      logs.forEach(log => {
        const deviceKey = `${log.device_name}-${log.device_mac}`;
        if (!uniqueDevices[deviceKey]) {
          uniqueDevices[deviceKey] = {
            id: deviceKey,
            name: log.device_name,
            mac: log.device_mac,
            ip: log.device_ip,
            lastSeen: log.time,
            logs: []
          };
        }
        
        // Add log to device's logs
        uniqueDevices[deviceKey].logs.push({
          id: log.log_id,
          content: log.log,
          status: log.status,
          time: log.time
        });
        
        // Update lastSeen if this log is more recent
        if (new Date(log.time) > new Date(uniqueDevices[deviceKey].lastSeen)) {
          uniqueDevices[deviceKey].lastSeen = log.time;
        }
      });
      
      // Convert to array and calculate risk status for each device
      const devices = Object.values(uniqueDevices).map(device => {
        return {
          ...device,
          riskStatus: this.calculateRiskStatus(device.logs)
        };
      });
      
      return {
        success: true,
        count: devices.length,
        devices
      };
    } catch (error) {
      console.error('Error fetching user devices:', error);
      return {
        success: false,
        message: 'Server error while fetching devices'
      };
    }
  }
  
  // Calculate risk status (anomaly if 50% or more logs are anomalies)
  calculateRiskStatus(logs) {
    const totalLogs = logs.length;
    if (totalLogs === 0) return 'normal';
    
    // Count logs with anomaly status
    const anomalyLogs = logs.filter(log => log.status === 'anomaly').length;
    
    // Calculate percentage
    const anomalyPercentage = (anomalyLogs / totalLogs) * 100;
    
    // Determine risk status
    return anomalyPercentage >= 50 ? 'risk' : 'normal';
  }
  
  // Get detailed information for a specific device
  async getDeviceDetails(userId, deviceMac) {
    try {
      // Get all logs for the user
      const logs = await logModel.getLogsByUserId(userId);
      
      // Filter logs for the specific device
      const deviceLogs = logs.filter(log => log.device_mac === deviceMac);
      
      if (deviceLogs.length === 0) {
        return {
          success: false,
          message: 'Device not found'
        };
      }
      
      // Extract device info from the first log
      const deviceInfo = {
        name: deviceLogs[0].device_name,
        mac: deviceLogs[0].device_mac,
        ip: deviceLogs[0].device_ip,
        logs: deviceLogs.map(log => ({
          id: log.log_id,
          content: log.log,
          status: log.status,
          time: log.time
        }))
      };
      
      // Calculate risk status
      deviceInfo.riskStatus = this.calculateRiskStatus(deviceInfo.logs);
      
      // Calculate statistics for charts
      deviceInfo.statistics = this.calculateDeviceStatistics(deviceInfo.logs);
      
      return {
        success: true,
        device: deviceInfo
      };
    } catch (error) {
      console.error('Error fetching device details:', error);
      return {
        success: false,
        message: 'Server error while fetching device details'
      };
    }
  }
  
  // Calculate statistics for device charts
  calculateDeviceStatistics(logs) {
    // Count logs by status
    const statusCounts = {
      'anomaly': 0,
      'non-anomaly': 0
    };
    
    logs.forEach(log => {
      statusCounts[log.status]++;
    });
    
    // Group logs by day for time-based chart
    const logsByDay = {};
    logs.forEach(log => {
      const date = new Date(log.time).toISOString().split('T')[0];
      if (!logsByDay[date]) {
        logsByDay[date] = {
          date,
          total: 0,
          anomaly: 0,
          'non-anomaly': 0
        };
      }
      
      logsByDay[date].total++;
      logsByDay[date][log.status]++;
    });
    
    return {
      statusCounts,
      logsByDay: Object.values(logsByDay).sort((a, b) => new Date(a.date) - new Date(b.date))
    };
  }
}

module.exports = new DeviceController(); 