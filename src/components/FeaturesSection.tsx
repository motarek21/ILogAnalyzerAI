
import React from "react";
import { Shield, AlertTriangle, Database, Server } from "lucide-react";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="feature-card animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-light-blue/20 p-3 rounded-full">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-navy">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Advanced Security Features</h2>
        <p className="section-subtitle text-center">
          Our Log Analyzer SAAS provides comprehensive security monitoring with cutting-edge AI analysis
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <FeatureCard
            icon={<Shield className="text-navy h-6 w-6" />}
            title="Real-time Threat Detection"
            description="Analyze logs in real-time to identify and alert on potential security threats before they cause damage."
          />
          <FeatureCard
            icon={<AlertTriangle className="text-risk-red h-6 w-6" />}
            title="Anomaly Detection"
            description="AI-powered analysis identifies unusual patterns and behaviors that could indicate a security breach."
          />
          <FeatureCard
            icon={<Database className="text-chart-blue h-6 w-6" />}
            title="Comprehensive Logging"
            description="Collect and store logs from all devices across your organization for complete visibility."
          />
          <FeatureCard
            icon={<Server className="text-navy h-6 w-6" />}
            title="Device Monitoring"
            description="Monitor all connected devices and get instant alerts when suspicious activity is detected."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
