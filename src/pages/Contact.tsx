import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-navy text-center mb-12">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8 animate-fade-in">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="bg-light-blue/20 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Email Us</h3>
                  <p className="text-gray-600 mb-2">Our friendly team is here to help</p>
                  <a href="mailto:info@loganalyzer.com" className="text-navy font-medium hover:underline">
                    info@loganalyzer.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="bg-light-blue/20 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Office</h3>
                  <p className="text-gray-600 mb-2">Come visit our headquarters</p>
                  <address className="text-navy font-medium not-italic">
                    123 Security Ave<br />
                    Alexandria, Egypt
                  </address>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="bg-light-blue/20 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Phone</h3>
                  <p className="text-gray-600 mb-2">Mon-Fri from 8am to 5pm</p>
                  <a href="tel:+1234567890" className="text-navy font-medium hover:underline">
                    +20 (100) 123-456
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-navy">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <Input id="company" placeholder="Your company name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Tell us how we can help..." rows={5} />
                </div>
                <Button className="bg-navy text-white hover:bg-opacity-90 w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section with Alexandria, Egypt location */}
        <div className="mt-16 rounded-lg overflow-hidden shadow-md">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108720.61929001076!2d29.845556687720834!3d31.205753147013766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c49126710fd3%3A0xb4e0cda629ee6bb9!2sAlexandria%2C%20Alexandria%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1715107164593!5m2!1sen!2sus" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Log Analyzer Office Location - Alexandria, Egypt"
            className="rounded-lg"
          />
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

export default Contact;
