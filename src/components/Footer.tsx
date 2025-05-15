import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Logo />
            <p className="text-gray-300 mt-6 mb-6 max-w-md">
              Advanced cybersecurity monitoring for organizations of all sizes. Protect your network with AI-powered anomaly detection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-light-blue transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-light-blue transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-light-blue transition-colors">Contact</Link></li>
              <li><Link to="/download" className="text-gray-300 hover:text-light-blue transition-colors">Download Tool</Link></li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/product" className="text-gray-300 hover:text-light-blue transition-colors">Product</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-light-blue transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-light-blue transition-colors">How It Works</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-light-blue transition-colors">Contact Sales</Link></li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Log Analyzer. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-light-blue transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-light-blue transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
