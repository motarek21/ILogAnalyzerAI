import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-navy text-white py-4 relative z-50">
      <div className="container mx-auto px-4">
        {isHomePage ? (
          // Home page layout
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center flex-grow space-x-8">
              <Link to="/" className="font-medium hover:text-light-blue transition-colors">Home</Link>
              <a href="#features" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('features');
                }} 
                className="font-medium hover:text-light-blue transition-colors">Features</a>
              <a href="#how-it-works" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('how-it-works');
                }} 
                className="font-medium hover:text-light-blue transition-colors">How It Works</a>
              <a href="#pricing" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('pricing');
                }} 
                className="font-medium hover:text-light-blue transition-colors">Pricing</a>
              <Link to="/contact" className="font-medium hover:text-light-blue transition-colors">Contact Us</Link>
              <Link to="/about" className="font-medium hover:text-light-blue transition-colors">About</Link>
            </div>
            <div className="flex items-center gap-8 mr-8">
              <Link to="/signin">
                <Button 
                  variant="premium"
                  className="hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <LogIn size={16} className="mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  variant="premium"
                  className="hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <UserPlus size={16} className="mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // Other pages layout - three sections
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            {/* Navigation - Middle */}
            <div className="hidden md:flex items-center justify-center space-x-8">
              <Link to="/" className="font-medium hover:text-light-blue transition-colors">Home</Link>
              <Link to="/contact" className="font-medium hover:text-light-blue transition-colors">Contact Us</Link>
              <Link to="/about" className="font-medium hover:text-light-blue transition-colors">About</Link>
            </div>
            
            {/* Auth Buttons - Right */}
            <div className="hidden md:flex items-center gap-8 mr-8">
              <Link to="/signin">
                <Button 
                  variant="premium"
                  className="hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <LogIn size={16} className="mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  variant="premium"
                  className="hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <UserPlus size={16} className="mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Mobile menu button */}
        <div className={`md:hidden absolute top-4 right-4`}>
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-navy p-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="font-medium text-white hover:text-light-blue transition-colors">Home</Link>
              {isHomePage ? (
                <>
                  <a href="#features" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('features');
                    }} 
                    className="font-medium text-white hover:text-light-blue transition-colors">Features</a>
                  <a href="#how-it-works" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('how-it-works');
                    }} 
                    className="font-medium text-white hover:text-light-blue transition-colors">How It Works</a>
                  <a href="#pricing" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('pricing');
                    }} 
                    className="font-medium text-white hover:text-light-blue transition-colors">Pricing</a>
                  <Link to="/contact" className="font-medium text-white hover:text-light-blue transition-colors">Contact Us</Link>
                  <Link to="/about" className="font-medium text-white hover:text-light-blue transition-colors">About</Link>
                </>
              ) : (
                <>
                  <Link to="/contact" className="font-medium text-white hover:text-light-blue transition-colors">Contact Us</Link>
                  <Link to="/about" className="font-medium text-white hover:text-light-blue transition-colors">About</Link>
                </>
              )}
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/signin">
                  <Button 
                    variant="premium"
                    className="w-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <LogIn size={16} className="mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant="premium"
                    className="w-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <UserPlus size={16} className="mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
