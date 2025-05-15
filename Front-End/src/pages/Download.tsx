
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";

const Download = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-navy text-center mb-6">Download Log Collector Tool</h1>
          
          <p className="text-gray-600 text-center mb-8">
            This tool is used by client-side administrators to collect Windows PC logs in JSON format and send them securely to the Log Analyzer AI processing server.
          </p>

          <div className="flex justify-center mb-10">
            <Button className="bg-navy text-white text-lg px-8 py-6 rounded-md hover:bg-opacity-90 transition-all">
              Download for Windows
            </Button>
          </div>

          <hr className="my-8" />

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-navy">Instructions:</h2>
            
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>Install this tool on each monitored device.</li>
              <li>The tool will run in the background and collect logs automatically.</li>
              <li>Logs are securely sent to the central server via HTTPS.</li>
              <li>Make sure each device has internet access and is authenticated.</li>
            </ul>

            <div className="bg-light-blue/20 p-4 rounded-lg mt-6">
              <p className="font-medium text-navy">Note: You must be an authenticated admin to use this tool effectively.</p>
            </div>
          </div>
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

export default Download;
