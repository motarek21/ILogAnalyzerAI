import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    username?: string;
    company?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      username?: string;
      company?: string;
    } = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!company) {
      newErrors.company = "Company is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // This would connect to your registration API
      toast({
        title: "Account created successfully",
        description: "Welcome to Log Analyzer",
      });
      // In a real app, you'd redirect to the dashboard or signin here
    }
  };

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full bg-navy px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-medium text-white hover:text-light-blue transition-colors">Home</Link>
          <Link to="/contact" className="font-medium text-white hover:text-light-blue transition-colors">Contact Us</Link>
          <Link to="/about" className="font-medium text-white hover:text-light-blue transition-colors">About Us</Link>
          <Link to="/download" className="font-medium text-white hover:text-light-blue transition-colors">Download Tool</Link>
        </div>
      </nav>
      <div className="flex-1 flex flex-col items-center justify-center w-full mt-4">
        <div className="max-w-lg w-full mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold text-center text-navy mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-700">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-risk-red w-full" : "w-full"}
                />
                {errors.email && (
                  <p className="text-risk-red text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "border-risk-red w-full" : "w-full"}
                />
                {errors.password && (
                  <p className="text-risk-red text-sm">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="block text-gray-700">
                  Company
                </label>
                <Input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={errors.company ? "border-risk-red w-full" : "w-full"}
                />
                {errors.company && (
                  <p className="text-risk-red text-sm">{errors.company}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="username" className="block text-gray-700">
                  User Name
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={errors.username ? "border-risk-red w-full" : "w-full"}
                />
                {errors.username && (
                  <p className="text-risk-red text-sm">{errors.username}</p>
                )}
              </div>

              <Button 
                type="submit" 
                variant="premium"
                className="w-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Submit
              </Button>
            </form>
            <div className="text-center mt-4">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/signin" className="text-navy font-medium hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-navy text-white py-4 mt-auto mb-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Log Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
