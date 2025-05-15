import React from "react";
import { Shield } from "lucide-react";

interface LogoProps {
  variant?: "light" | "dark";
}

const Logo = ({ variant = "light" }: LogoProps) => {
  const textColor = variant === "light" ? "text-white" : "text-navy";
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Shield className="h-8 w-8 text-light-blue" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-navy font-bold text-xs">LA</span>
        </div>
      </div>
      <span className={`font-bold text-xl ${textColor}`}>Log Analyzer</span>
    </div>
  );
};

export default Logo;
