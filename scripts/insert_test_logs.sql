-- Insert test users if they don't already exist
INSERT INTO Users (Email, Password, Company, User_Name)
SELECT 'mohamed@logai.com', 'pass123', 'softtech', 'mohamed'
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'mohamed@logai.com');

INSERT INTO Users (Email, Password, Company, User_Name)
SELECT 'admin@loganalyzer.ai', 'admin1234', 'logai', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'admin@loganalyzer.ai');

-- Insert test logs for Mohamed (User_ID 1)
INSERT INTO Logs (Log_ID, User_ID, Device_Name, Device_MAC, Device_IP, Log, Status, Time)
VALUES
  (1, 1, 'Router', 'AA:BB:CC:DD:EE:01', '192.168.0.1', 'Unusual outbound traffic', 'Anomaly', '2023-12-10 08:23:15'),
  (2, 1, 'Workstation', 'FF:EE:DD:CC:BB:AA', '192.168.0.101', 'Port scan detected', 'Anomaly', '2023-12-09 15:42:30'),
  (3, 1, 'Server', '11:22:33:44:55:66', '10.0.0.5', 'Normal system access', 'Normal', '2023-12-08 12:15:45'),
  (4, 1, 'IoT Gateway', '00:11:22:33:44:55', '10.0.0.10', 'Routine system update', 'Normal', '2023-12-07 09:30:00'),
  (5, 1, 'Workstation', 'FF:EE:DD:CC:BB:AA', '192.168.0.101', 'Unauthorized access attempt', 'Anomaly', '2023-12-06 18:22:10'),
  (6, 1, 'Server', '11:22:33:44:55:66', '10.0.0.5', 'User login', 'Normal', '2023-12-05 11:05:33'),
  (7, 1, 'Router', 'AA:BB:CC:DD:EE:01', '192.168.0.1', 'Data backup completed', 'Normal', '2023-12-04 23:45:12'),
  (8, 1, 'IoT Gateway', '00:11:22:33:44:55', '10.0.0.10', 'Brute force login attempt', 'Anomaly', '2023-12-03 14:18:27'),
  (9, 1, 'Workstation', 'FF:EE:DD:CC:BB:AA', '192.168.0.101', 'Scheduled maintenance', 'Normal', '2023-12-02 10:11:55'),
  (10, 1, 'Server', '11:22:33:44:55:66', '10.0.0.5', 'Suspicious file download', 'Anomaly', '2023-12-01 16:37:20')
ON CONFLICT (Log_ID) DO NOTHING;

-- Insert test logs for Admin (User_ID 2)
INSERT INTO Logs (Log_ID, User_ID, Device_Name, Device_MAC, Device_IP, Log, Status, Time)
VALUES
  (11, 2, 'Firewall', 'AA:BB:CC:00:11:22', '192.168.1.1', 'Configuration changed', 'Normal', '2023-12-10 10:15:00'),
  (12, 2, 'Database Server', 'DD:EE:FF:11:22:33', '10.0.1.5', 'SQL Injection attempt', 'Anomaly', '2023-12-09 18:22:43'),
  (13, 2, 'Web Server', '11:22:33:AA:BB:CC', '10.0.1.10', 'DDoS attack detected', 'Anomaly', '2023-12-08 14:05:30'),
  (14, 2, 'Admin Workstation', '44:55:66:77:88:99', '192.168.1.100', 'Normal admin login', 'Normal', '2023-12-07 09:30:15'),
  (15, 2, 'Firewall', 'AA:BB:CC:00:11:22', '192.168.1.1', 'Unusual port activity', 'Anomaly', '2023-12-06 23:11:05'),
  (16, 2, 'Database Server', 'DD:EE:FF:11:22:33', '10.0.1.5', 'Backup completed', 'Normal', '2023-12-05 04:00:00'),
  (17, 2, 'Web Server', '11:22:33:AA:BB:CC', '10.0.1.10', 'System patch applied', 'Normal', '2023-12-04 15:45:22'),
  (18, 2, 'Admin Workstation', '44:55:66:77:88:99', '192.168.1.100', 'Malware detected', 'Anomaly', '2023-12-03 20:18:11'),
  (19, 2, 'Firewall', 'AA:BB:CC:00:11:22', '192.168.1.1', 'Policy update', 'Normal', '2023-12-02 11:33:40'),
  (20, 2, 'Database Server', 'DD:EE:FF:11:22:33', '10.0.1.5', 'Unauthorized schema modification attempt', 'Anomaly', '2023-12-01 17:25:08')
ON CONFLICT (Log_ID) DO NOTHING; 