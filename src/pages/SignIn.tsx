import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { useToast } from "@/components/ui/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email) && email !== "admin") {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Demo login logic for admin/admin1234
      if ((email === "admin" || email === "admin@loganalyzer.ai") && password === "admin1234") {
        toast({
          title: "Sign In Successful",
          description: "Welcome back to Log Analyzer",
        });
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        toast({
          title: "Sign In Failed",
          description: "Invalid credentials. Try admin/admin1234",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <Link to="/">
            <Logo />
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-light-blue transition-colors">Home</Link>
            <Link to="/contact" className="text-white hover:text-light-blue transition-colors">Contact Us</Link>
            <Link to="/about" className="text-white hover:text-light-blue transition-colors">About Us</Link>
            <Link to="/download" className="text-white hover:text-light-blue transition-colors">Download Tool</Link>
          </div>
        </div>

        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-navy mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700">
                Username or Email
              </label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-risk-red" : ""}
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
                className={errors.password ? "border-risk-red" : ""}
              />
              {errors.password && (
                <p className="text-risk-red text-sm">{errors.password}</p>
              )}
            </div>

            <Button 
              type="submit" 
              variant="premium"
              className="w-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign In
            </Button>
          </form>
          
          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="text-navy font-medium hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      
      <footer className="bg-navy text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Log Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
