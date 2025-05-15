import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-navy text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in md:pl-8 lg:pl-12" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Protect Your Network With Advanced Log Analysis
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Our AI-powered system detects security threats in real-time, providing actionable insights for your SOC and incident response teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signin">
                <Button 
                  variant="premium"
                  className="hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="premium"
                  className="hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl w-full max-w-lg">
              <div className="bg-light-blue/10 backdrop-blur-sm p-6 rounded-xl border border-light-blue/30">
                <h3 className="text-xl font-medium mb-4">Device Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Devices</span>
                    <span className="font-bold">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Devices at Risk</span>
                    <span className="font-bold text-risk-red">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Anomalies Detected</span>
                    <span className="font-bold text-risk-red">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Healthy Devices</span>
                    <span className="font-bold text-normal-green">3</span>
                  </div>
                  
                  <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-normal-green rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <div className="text-sm flex justify-between">
                    <span>Network Health</span>
                    <span>75%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
