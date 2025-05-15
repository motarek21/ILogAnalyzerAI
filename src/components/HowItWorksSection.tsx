
import React from "react";
import { Laptop, AlertTriangle } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">How It Works</h2>
        <p className="section-subtitle text-center">
          Our simple yet powerful system keeps your network secure with minimal setup
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-light-blue/20 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-navy">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-navy">Install Our Tool</h3>
            <p className="text-gray-600">Download and install our monitoring tool on all devices in your network.</p>
          </div>

          <div className="text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="bg-light-blue/20 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-navy">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-navy">Collect & Analyze</h3>
            <p className="text-gray-600">Our system collects logs and analyzes them using advanced AI algorithms to detect anomalies.</p>
          </div>

          <div className="text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="bg-light-blue/20 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-navy">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-navy">Act on Insights</h3>
            <p className="text-gray-600">Receive alerts and detailed reports to take immediate action against security threats.</p>
          </div>
        </div>

        <div className="mt-20 bg-navy text-white rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4">See It In Action</h3>
              <p className="mb-6">
                Our dashboard provides a clear overview of all devices and potential security threats in your network.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-light-blue/20 flex items-center justify-center">
                    <Laptop className="h-5 w-5 text-light-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium">Device Monitoring</h4>
                    <p className="text-sm text-gray-300">Track all connected devices in real-time</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-risk-red/20 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-risk-red" />
                  </div>
                  <div>
                    <h4 className="font-medium">Anomaly Detection</h4>
                    <p className="text-sm text-gray-300">AI-powered system flags suspicious activities</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 h-full">
              <div className="border border-white/10 rounded-lg p-4 bg-black/30">
                <h4 className="font-medium text-light-blue mb-3">Device Logs</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between pb-2 border-b border-white/10">
                    <span>Device A</span>
                    <span className="status-normal">Normal</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/10">
                    <span>Device B</span>
                    <span className="status-anomaly">Risk</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/10">
                    <span>Device C</span>
                    <span className="status-normal">Normal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Device D</span>
                    <span className="status-normal">Normal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
