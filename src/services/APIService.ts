
// This is a mock API service that would be replaced by real API calls in production

// Mock user data
const users = [
  { username: "admin", email: "admin@loganalyzer.ai", password: "admin1234", role: "admin" },
  { username: "user1", email: "user1@example.com", password: "password123", role: "user" },
];

// API endpoints
const API = {
  // Authentication
  signIn: (username: string, password: string) => {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => 
          (u.username === username || u.email === username) && u.password === password
        );
        
        if (user) {
          resolve({
            success: true,
            user: {
              username: user.username,
              email: user.email,
              role: user.role
            }
          });
        } else {
          reject({ success: false, message: "Invalid credentials" });
        }
      }, 300);
    });
  },
  
  // Devices
  getDevices: () => {
    // This would be a real API call to fetch devices
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          devices: [
            {
              id: 1,
              name: "Device A",
              ip: "192.168.0.101",
              mac: "AA:BB:CC:DD:EE:01",
              status: "Normal"
            },
            {
              id: 2,
              name: "Device B",
              ip: "10.0.0.55",
              mac: "11:22:33:44:55:66",
              status: "Risk"
            },
            {
              id: 3,
              name: "Device C",
              ip: "172.16.23.8",
              mac: "77:88:99:AA:BB:CC",
              status: "Normal"
            },
            {
              id: 4,
              name: "Device D",
              ip: "192.168.1.42",
              mac: "DE:AD:BE:EF:CA:FE",
              status: "Risk"
            }
          ]
        });
      }, 300);
    });
  },
  
  getDeviceDetails: (id: number) => {
    // This would be a real API call to fetch device details
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          device: {
            id,
            name: `Device ${String.fromCharCode(64 + id)}`, // A, B, C, D based on id
            ip: id === 1 ? "192.168.0.101" : id === 2 ? "10.0.0.55" : id === 3 ? "172.16.23.8" : "192.168.1.42",
            mac: id === 1 ? "AA:BB:CC:DD:EE:01" : id === 2 ? "11:22:33:44:55:66" : id === 3 ? "77:88:99:AA:BB:CC" : "DE:AD:BE:EF:CA:FE",
            status: id % 2 === 0 ? "Risk" : "Normal",
            logs: [
              { id: `LOG${id}23`, time: "2025-04-29 12:45", message: id % 2 === 0 ? "Suspicious activity" : "Port scan detected", status: "Anomaly" },
              { id: `LOG${id}24`, time: "2025-04-29 13:05", message: "Normal access", status: "Non Anomaly" },
              { id: `LOG${id}25`, time: "2025-04-29 13:25", message: id % 2 === 0 ? "Brute force attempt" : "Suspicious login", status: "Anomaly" },
              { id: `LOG${id}26`, time: "2025-04-29 14:10", message: "System heartbeat", status: "Non Anomaly" },
            ],
            chartData: {
              anomalyPercentage: id % 2 === 0 ? 70 : 30,
              normalPercentage: id % 2 === 0 ? 30 : 70,
              hourlyData: [
                { hour: "12PM", logs: 5 },
                { hour: "1PM", logs: 12 },
                { hour: "2PM", logs: 8 },
                { hour: "3PM", logs: 15 },
                { hour: "4PM", logs: 9 },
              ]
            }
          }
        });
      }, 300);
    });
  },
  
  // System stats
  getSystemStats: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          stats: {
            totalDevices: 4,
            devicesAtRisk: 2,
            anomaliesDetected: 8,
            healthyDevices: 2,
            networkHealth: 75
          }
        });
      }, 300);
    });
  }
};

export default API;
