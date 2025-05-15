import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, AlertTriangle, Activity, Bell, Lock, BarChart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-navy" />,
      title: "Real-time Monitoring",
      description: "Continuous monitoring of system logs and network activity for immediate threat detection."
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-navy" />,
      title: "Anomaly Detection",
      description: "AI-powered analysis to identify unusual patterns and potential security breaches."
    },
    {
      icon: <Activity className="w-8 h-8 text-navy" />,
      title: "Performance Tracking",
      description: "Monitor system performance and resource utilization across all devices."
    },
    {
      icon: <Bell className="w-8 h-8 text-navy" />,
      title: "Instant Alerts",
      description: "Immediate notifications for security incidents and system anomalies."
    },
    {
      icon: <Lock className="w-8 h-8 text-navy" />,
      title: "Secure Data Handling",
      description: "End-to-end encryption for all log data transmission and storage."
    },
    {
      icon: <BarChart className="w-8 h-8 text-navy" />,
      title: "Advanced Analytics",
      description: "Detailed insights and reporting for better decision-making."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-navy mb-8 text-center">Features</h1>
          
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Discover the powerful features that make Log Analyzer the leading choice for network security monitoring and threat detection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Features; 