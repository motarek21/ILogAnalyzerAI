import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Product = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-navy mb-8">Our Product</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">Log Analyzer Overview</h2>
            <p className="text-lg text-gray-700 mb-6">
              Log Analyzer is a comprehensive security monitoring solution that helps organizations protect their networks and systems through advanced log analysis and AI-powered threat detection.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">Key Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-navy mb-4">Log Collection Agent</h3>
                <p className="text-gray-700">
                  Lightweight agent that securely collects and transmits system logs from your devices.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-navy mb-4">AI Analysis Engine</h3>
                <p className="text-gray-700">
                  Advanced machine learning algorithms that detect anomalies and potential security threats.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-navy mb-4">Real-time Dashboard</h3>
                <p className="text-gray-700">
                  Interactive visualization of your network's security status and device health.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-navy mb-4">Alert System</h3>
                <p className="text-gray-700">
                  Instant notifications for security incidents and anomalous behavior.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product; 