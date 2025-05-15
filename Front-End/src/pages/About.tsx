import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h1 className="text-3xl font-bold text-navy mb-6">Our Mission</h1>
            <p className="text-lg text-gray-700">
              We aim to provide companies with an intelligent log analysis system to enhance cybersecurity through anomaly detection using cutting-edge AI technologies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">What is Log Analyzer?</h2>
            <p className="text-lg text-gray-700">
              Log Analyzer is a standalone tool designed to collect, process, and analyze device logs using machine learning and deep learning models. It helps IT teams detect potential threats, security breaches, or performance issues through intuitive dashboards and alerts.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">Core Components</h2>
            <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
              <li>Monitoring Agent for log collection</li>
              <li>Central Server for log processing and storage</li>
              <li>AI Engine for anomaly classification</li>
              <li>Admin Dashboard for log visualization</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">Technology Stack</h2>
            <p className="text-lg text-gray-700">
              Our system is built using modern technologies including Node.js (backend), PostgreSQL (database), and React.js (frontend). AI components are developed using advanced models.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-navy mb-6">System Highlights</h2>
            <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
              <li>Real-time anomaly detection</li>
              <li>Secure log transmission</li>
              <li>Scalable infrastructure</li>
              <li>Interactive and professional dashboards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy mb-6">Our Values</h2>
            <p className="text-lg text-gray-700">
              We believe in empowering organizations with secure, intelligent tools that enable informed decision-making and foster safer digital environments.
            </p>
          </section>
        </div>
      </main>

      <footer className="bg-navy text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Log Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
