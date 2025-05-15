
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Log Analyzer has completely transformed our security operations. We can now detect threats in real-time that would have gone unnoticed before.",
      name: "Sarah Johnson",
      title: "CTO, TechSolutions Inc.",
      initials: "SJ"
    },
    {
      quote: "The anomaly detection is incredibly accurate. We've reduced false positives by 90% and our team can focus on real threats.",
      name: "Michael Chen",
      title: "Security Manager, DataCore Systems",
      initials: "MC"
    },
    {
      quote: "Setting up Log Analyzer across our 100+ device network was surprisingly easy. The insights we've gained have been invaluable.",
      name: "Rebecca Williams",
      title: "IT Director, Global Enterprises",
      initials: "RW"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">What Our Clients Say</h2>
        <p className="section-subtitle text-center">
          Companies of all sizes trust Log Analyzer to secure their networks
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: `${0.2 * index}s` }}>
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center mt-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarFallback className="bg-navy text-white">{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-navy">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-light-blue/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-navy">Ready to secure your network?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join hundreds of companies already using Log Analyzer to protect their critical infrastructure
          </p>
          <Link to="/signup">
            <Button className="bg-navy text-white hover:bg-opacity-90">Get Started Today</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
