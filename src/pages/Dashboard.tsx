import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

// This would come from your API in a real app
const mockDevices = [
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
];

const Dashboard = () => {
  // This would come from your authentication context in a real app
  const userName = "Admin";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-navy text-white py-4 relative z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
          
          {/* Desktop Nav */}
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
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed left-0 right-0 top-[72px] bg-navy z-50 px-4 py-6 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link to="/dashboard" className="text-white hover:text-light-blue transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <Link to="/download" className="text-white hover:text-light-blue transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Download Tool</Link>
              <Link to="/contact" className="text-white hover:text-light-blue transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
              <Link to="/about" className="text-white hover:text-light-blue transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Button 
                variant="premium"
                className="mt-2 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = "/";
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-light-blue/20 rounded-lg p-6 mb-10">
          <h1 className="text-3xl font-bold text-navy">Overview</h1>
          <p className="text-2xl text-gray-700">Welcome Back, {userName}</p>
        </div>

        <h2 className="text-xl font-semibold text-navy mb-6">
          Number Of Registered Devices ({mockDevices.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {mockDevices.map((device) => (
            <Link to={`/device/${device.id}`} key={device.id}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-gray-100 p-8 flex justify-center">
                    <Laptop size={80} className="text-navy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{device.name}</h3>
                    <p className="text-gray-600">IP: {device.ip}</p>
                    <p className="text-gray-600">MAC: {device.mac}</p>
                    <div className="mt-3">
                      {device.status === "Risk" ? (
                        <span className="bg-risk-red text-white px-3 py-1 rounded-full text-xs font-medium">Risk</span>
                      ) : (
                        <span className="bg-normal-green text-white px-3 py-1 rounded-full text-xs font-medium">Normal</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-navy text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Log Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
