import React, { useState, useEffect } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { Spinner } from "@/components/ui/spinner";

const DeviceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [device, setDevice] = useState<any>(null);
  
  useEffect(() => {
    const fetchDeviceDetails = async () => {
      if (!user || !id) return;
      
      try {
        setLoading(true);
        const result = await api.devices.getDeviceDetails(user.id, id);
        
        if (result.success && result.device) {
          setDevice(result.device);
        } else {
          setError(result.message || "Failed to fetch device details");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDeviceDetails();
  }, [id, user]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (error || !device) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-navy mb-2">Error</h2>
          <p className="text-red-500">{error || "Device not found"}</p>
          <Link to="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Format data for pie chart
  const pieData = [
    { name: "Anomaly Logs", value: device.statistics.statusCounts.anomaly },
    { name: "Non-Anomaly Logs", value: device.statistics.statusCounts["non-anomaly"] }
  ];

  // Calculate percentages for display
  const totalLogs = device.logs.length;
  const anomalyPercentage = totalLogs > 0 
    ? Math.round((device.statistics.statusCounts.anomaly / totalLogs) * 100) 
    : 0;
  const normalPercentage = totalLogs > 0 
    ? Math.round((device.statistics.statusCounts["non-anomaly"] / totalLogs) * 100) 
    : 0;

  // Format data for bar chart from logsByDay
  const hourlyData = device.statistics.logsByDay.map((dayData: any) => ({
    day: new Date(dayData.date).toLocaleDateString(),
    logs: dayData.total
  }));

  const COLORS = ["#ea384c", "#4CAF50"];
  
  const chartConfig = {
    "anomaly": {
      label: "Anomaly Logs",
      color: "#ea384c",
    },
    "non-anomaly": {
      label: "Non-Anomaly Logs", 
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
                <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${device.riskStatus === "risk" ? "bg-risk-red text-white" : "bg-normal-green text-white"}`}>
                  {device.riskStatus === "risk" ? "At Risk" : "Normal"}
                </span>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy">Log Summary</h3>
              <p className="text-gray-700">Total Logs: {device.logs.length}</p>
              <p className="text-gray-700">
                Anomaly Ratio: {anomalyPercentage}%
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
              <h3 className="text-lg font-semibold mb-4">Logs per Day</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={hourlyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
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
                  {device.logs.map((log: any) => (
                    <TableRow key={log.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                      <TableCell className="py-4 px-6 font-medium border-l border-r border-gray-200">{device.name}</TableCell>
                      <TableCell className="py-4 px-6 font-medium border-l border-r border-gray-200">{device.ip}</TableCell>
                      <TableCell className="py-4 px-6 font-medium border-l border-r border-gray-200">{log.id}</TableCell>
                      <TableCell className="py-4 px-6 font-medium border-l border-r border-gray-200">{new Date(log.time).toLocaleString()}</TableCell>
                      <TableCell className="py-4 px-6 font-medium border-l border-r border-gray-200">{log.content}</TableCell>
                      <TableCell className="py-4 px-6 border-l border-r border-gray-200">
                        {log.status === "anomaly" ? (
                          <Badge variant="anomaly" className="px-4 py-1 font-bold">
                            anomaly
                          </Badge>
                        ) : (
                          <Badge variant="normal" className="px-4 py-1 font-bold">
                            non-anomaly
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
