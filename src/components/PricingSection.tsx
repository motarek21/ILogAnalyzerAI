
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  highlighted = false 
}: { 
  name: string; 
  price: string; 
  description: string; 
  features: string[]; 
  highlighted?: boolean;
}) => {
  return (
    <div className={`rounded-xl p-1 animate-fade-in ${highlighted ? 'bg-gradient-to-br from-navy to-chart-blue' : ''}`}>
      <div className={`h-full rounded-lg bg-white p-8 flex flex-col ${highlighted ? 'border-0' : 'border border-gray-200'}`}>
        <h3 className={`text-xl font-bold mb-2 ${highlighted ? 'text-navy' : 'text-gray-800'}`}>{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-gray-500">/month</span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="space-y-3 mb-8 flex-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${highlighted ? 'text-navy' : 'text-chart-blue'}`} />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
        <Button className={`w-full mt-auto ${highlighted ? 'bg-navy hover:bg-opacity-90' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
          Choose Plan
        </Button>
      </div>
    </div>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Simple, Transparent Pricing</h2>
        <p className="section-subtitle text-center">
          Choose the plan that fits your organization's needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <PricingTier
            name="Starter"
            price="299"
            description="Perfect for small businesses"
            features={[
              "Up to 10 devices",
              "Basic anomaly detection",
              "7-day log retention",
              "Email alerts",
              "Standard support"
            ]}
          />
          <PricingTier
            name="Business"
            price="599"
            description="Ideal for growing companies"
            features={[
              "Up to 50 devices",
              "Advanced AI detection",
              "30-day log retention",
              "Email & SMS alerts",
              "Priority support",
              "Custom dashboard"
            ]}
            highlighted={true}
          />
          <PricingTier
            name="Enterprise"
            price="999"
            description="For large organizations"
            features={[
              "Unlimited devices",
              "Enterprise-grade security",
              "90-day log retention",
              "24/7 incident response",
              "Dedicated support team",
              "Custom integration"
            ]}
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need a custom solution?</p>
          <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
