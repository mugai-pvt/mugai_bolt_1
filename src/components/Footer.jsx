import React from 'react';
import { Droplets, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Droplets className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold">mugAI</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Revolutionizing agriculture through intelligent IoT-based irrigation systems. 
              Enable remote control and monitoring of your farm fields with cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-green-500 transition-colors">Home</a></li>
              <li><a href="/features" className="text-gray-400 hover:text-green-500 transition-colors">Features</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-green-500 transition-colors">About</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-green-500 transition-colors">Contact</a></li>
              <li><a href="/login" className="text-gray-400 hover:text-green-500 transition-colors">Login</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-500" />
                <span className="text-gray-400 text-sm">mugai.agritech@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-500" />
                <span className="text-gray-400 text-sm">+91 6385891759</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="text-gray-400 text-sm">Coimbatore, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 mugAI. All rights reserved. Empowering farmers with intelligent irrigation solutions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;