import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/Logo";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

// Mock device data - would come from your API
const mockDevices = {
  1: {
    id: 1,
    name: "Device A",
    ip: "192.168.0.101",
    mac: "AA:BB:CC:DD:EE:01",
    status: "Normal",
    logs: [
      { id: "LOG123", time: "2025-04-29 12:45", message: "Port scan detected", status: "Anomaly" },
      { id: "LOG124", time: "2025-04-29 13:05", message: "Normal access", status: "Non Anomaly" },
      { id: "LOG125", time: "2025-04-29 13:25", message: "Suspicious login", status: "Anomaly" },
      { id: "LOG126", time: "2025-04-29 14:10", message: "System heartbeat", status: "Non Anomaly" },
    ],
    chartData: {
      anomalyPercentage: 30,
      normalPercentage: 70,
      hourlyData: [
        { hour: "12PM", logs: 5 },
        { hour: "1PM", logs: 12 },
        { hour: "2PM", logs: 8 },
        { hour: "3PM", logs: 15 },
        { hour: "4PM", logs: 9 },
      ]
    }
  },
  2: {
    id: 2,
    name: "Device B",
    ip: "10.0.0.55",
    mac: "11:22:33:44:55:66",
    status: "Risk",
    logs: [
      { id: "LOG223", time: "2025-04-29 10:15", message: "Suspicious login attempt", status: "Anomaly" },
      { id: "LOG224", time: "2025-04-29 10:25", message: "File access violation", status: "Anomaly" },
      { id: "LOG225", time: "2025-04-29 11:30", message: "Normal system update", status: "Non Anomaly" },
      { id: "LOG226", time: "2025-04-29 12:45", message: "Firewall rule triggered", status: "Anomaly" },
    ],
    chartData: {
      anomalyPercentage: 75,
      normalPercentage: 25,
      hourlyData: [
        { hour: "10AM", logs: 8 },
        { hour: "11AM", logs: 5 },
        { hour: "12PM", logs: 6 },
        { hour: "1PM", logs: 3 },
        { hour: "2PM", logs: 7 },
      ]
    }
  },
  3: {
    id: 3,
    name: "Device C",
    ip: "172.16.23.8",
    mac: "77:88:99:AA:BB:CC",
    status: "Normal",
    logs: [
      { id: "LOG323", time: "2025-04-29 09:15", message: "System startup", status: "Non Anomaly" },
      { id: "LOG324", time: "2025-04-29 10:05", message: "Scheduled backup", status: "Non Anomaly" },
      { id: "LOG325", time: "2025-04-29 11:25", message: "User login", status: "Non Anomaly" },
      { id: "LOG326", time: "2025-04-29 15:10", message: "Unexpected restart", status: "Anomaly" },
    ],
    chartData: {
      anomalyPercentage: 15,
      normalPercentage: 85,
      hourlyData: [
        { hour: "9AM", logs: 3 },
        { hour: "10AM", logs: 5 },
        { hour: "11AM", logs: 4 },
        { hour: "12PM", logs: 6 },
        { hour: "3PM", logs: 2 },
      ]
    }
  },
  4: {
    id: 4,
    name: "Device D",
    ip: "192.168.1.42",
    mac: "DE:AD:BE:EF:CA:FE",
    status: "Risk",
    logs: [
      { id: "LOG423", time: "2025-04-29 08:30", message: "Malware detected", status: "Anomaly" },
      { id: "LOG424", time: "2025-04-29 09:05", message: "Suspicious outbound connection", status: "Anomaly" },
      { id: "LOG425", time: "2025-04-29 09:45", message: "System scan", status: "Non Anomaly" },
      { id: "LOG426", time: "2025-04-29 11:10", message: "Breach attempt", status: "Anomaly" },
    ],
    chartData: {
      anomalyPercentage: 68,
      normalPercentage: 32,
      hourlyData: [
        { hour: "8AM", logs: 7 },
        { hour: "9AM", logs: 9 },
        { hour: "10AM", logs: 4 },
        { hour: "11AM", logs: 6 },
        { hour: "12PM", logs: 3 },
      ]
    }
  }
};

const DeviceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const deviceId = id ? parseInt(id) : 1;
  const device = mockDevices[deviceId as keyof typeof mockDevices];
  
  if (!device) {
    return <div>Device not found</div>;
  }

  const pieData = [
    { name: "Anomaly Logs", value: device.chartData.anomalyPercentage },
    { name: "Normal Logs", value: device.chartData.normalPercentage }
  ];

  const COLORS = ["#ea384c", "#4CAF50"];
  
  const chartConfig = {
    "anomaly": {
      label: "Anomaly Logs",
      color: "#ea384c",
    },
    "normal": {
      label: "Normal Logs", 
      color: "#4CAF50",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-navy text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-white hover:text-light-blue transition-colors">Dashboard</Link>
            <Link to="/download" className="text-white hover:text-light-blue transition-colors">Download Tool</Link>
            <Link to="/contact" className="text-white hover:text-light-blue transition-colors">Contact Us</Link>
            <Link to="/about" className="text-white hover:text-light-blue transition-colors">About</Link>
            <Button 
              variant="premium"
              className="hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => window.location.href = "/"}
            >
              Sign Out
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-navy">Device Details</h1>
            <p className="text-lg text-gray-700">Analyzing Device: {device.name}</p>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" className="border-navy text-navy hover:bg-navy/10 transition-all duration-300">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="bg-light-blue/20 rounded-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-navy">Device Info</h3>
              <p className="text-gray-700">IP: {device.ip}</p>
              <p className="text-gray-700">MAC: {device.mac}</p>
              <p className="text-gray-700">
                Status: 
                <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${device.status === "Risk" ? "bg-risk-red text-white" : "bg-normal-green text-white"}`}>
                  {device.status}
                </span>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy">Log Summary</h3>
              <p className="text-gray-700">Total Logs: {device.logs.length}</p>
              <p className="text-gray-700">
                Anomaly Ratio: {device.chartData.anomalyPercentage}%
              </p>
            </div>
            
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Anomaly Distribution</h3>
              <div className="h-64">
                <ChartContainer config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Logs per Hour</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={device.chartData.hourlyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="logs" fill="#3f4d71" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold text-navy mb-6">Device Logs</h2>
        <Card className="overflow-hidden border-0 shadow-md">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-100 border-b border-gray-200">
                  <TableRow>
                    <TableHead className="py-4 px-6 text-navy font-bold text-base">Device Name</TableHead>
                    <TableHead className="py-4 px-6 text-navy font-bold text-base">IP Address</TableHead>
                    <TableHead className="py-4 px-6 text-navy font-bold text-base">Log ID</TableHead>
                    <TableHead className="py-4 px-6 text-navy font-bold text-base">Time</TableHead>
                    <TableHead className="py-4 px-6 text-navy font-bold text-base">Log</TableHead>
                    <TableHead className="py-4 px-6 text-navy font-bold text-base">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {device.logs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                      <TableCell className="py-4 px-6 font-medium border-l border-r border-gray-200">{device.name}</TableCell>
                      <TableCell className="py-4 px-6 font-medium border-l border-r border-gray-200">{device.ip}</TableCell>
                      <TableCell className="py-4 px-6 font-medium border-l border-r border-gray-200">{log.id}</TableCell>
                      <TableCell className="py-4 px-6 font-medium border-l border-r border-gray-200">{log.time}</TableCell>
                      <TableCell className="py-4 px-6 font-medium border-l border-r border-gray-200">{log.message}</TableCell>
                      <TableCell className="py-4 px-6 border-l border-r border-gray-200">
                        {log.status === "Anomaly" ? (
                          <Badge variant="anomaly" className="px-4 py-1 font-bold">
                            {log.status}
                          </Badge>
                        ) : (
                          <Badge variant="normal" className="px-4 py-1 font-bold">
                            {log.status}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-navy text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Log Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DeviceDetails;
