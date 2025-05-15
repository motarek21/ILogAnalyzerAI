import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Menu, X, AlertTriangle } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

// Device type
interface Device {
  id: string;
  name: string;
  ip: string;
  mac: string;
  riskStatus: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Fetch devices when component mounts
  useEffect(() => {
    const fetchDevices = async () => {
      if (!user) {
        navigate('/signin');
        return;
      }
      
      setLoading(true);
      try {
        const response = await api.devices.getUserDevices(user.id);
        if (response.success) {
          setDevices(response.devices);
        } else {
          setError(response.message || 'Failed to fetch devices');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching devices');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDevices();
  }, [user, navigate]);
  
  const handleSignOut = () => {
    logout();
    navigate('/');
  };
  
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
              onClick={handleSignOut}
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
                  handleSignOut();
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
          <p className="text-2xl text-gray-700">Welcome Back, {user?.userName || 'User'}</p>
        </div>

        <h2 className="text-xl font-semibold text-navy mb-6">
          Number Of Registered Devices ({loading ? '...' : devices.length})
        </h2>

        {error && (
          <div className="bg-risk-red/10 border border-risk-red rounded-lg p-4 mb-6 flex items-center">
            <AlertTriangle className="text-risk-red mr-2" size={20} />
            <p className="text-risk-red">{error}</p>
          </div>
        )}

        {loading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-gray-100 p-8 flex justify-center">
                    <Skeleton className="h-20 w-20 rounded-md" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-6 w-28 mb-2" />
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-4 w-40 mb-3" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : devices.length > 0 ? (
          // Devices list
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {devices.map((device) => (
              <Link to={`/device/${device.mac}`} key={device.id}>
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
                        {device.riskStatus === "risk" ? (
                          <span className="bg-risk-red text-white px-3 py-1 rounded-full text-xs font-medium">At Risk</span>
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
        ) : (
          // No devices found
          <div className="text-center p-8 border border-gray-200 rounded-lg bg-white">
            <Laptop size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No Devices Found</h3>
            <p className="text-gray-500 mt-2">
              You haven't added any devices yet. Use the Log Analyzer Tool to detect devices on your network.
            </p>
            <Button 
              variant="premium" 
              className="mt-4 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => navigate('/download')}
            >
              Download Tool
            </Button>
          </div>
        )}
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
