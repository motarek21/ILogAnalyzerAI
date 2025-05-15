import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Database, Brain, Bell } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Download className="w-12 h-12 text-navy" />,
      title: "1. Install the Agent",
      description: "Download and install our lightweight monitoring agent on your devices. The setup process is quick and straightforward."
    },
    {
      icon: <Database className="w-12 h-12 text-navy" />,
      title: "2. Collect Logs",
      description: "The agent automatically collects system logs and sends them securely to our processing servers."
    },
    {
      icon: <Brain className="w-12 h-12 text-navy" />,
      title: "3. AI Analysis",
      description: "Our advanced AI algorithms analyze the logs in real-time to detect anomalies and potential security threats."
    },
    {
      icon: <Bell className="w-12 h-12 text-navy" />,
      title: "4. Get Notified",
      description: "Receive instant alerts and detailed reports about any security incidents or system anomalies."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-navy mb-8 text-center">How It Works</h1>
          
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Log Analyzer uses a simple yet powerful process to keep your network secure. Here's how our system works to protect your devices.
          </p>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-lg shadow-sm"
              >
                <div className="flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-navy mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-navy text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6">
              Join hundreds of companies already using Log Analyzer to protect their networks.
            </p>
            <button className="bg-light-blue text-navy px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
              Download Now
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks; 