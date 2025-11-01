import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHeart, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaShieldAlt,
  FaUserMd,
  FaHospital
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Patient Portal', path: '/login' },
    { name: 'Doctor Portal', path: '/login' },
  ];

  const services = [
    'Disease Prediction',
    'Health Analytics',
    'Medical Reports',
    'AI Diagnostics',
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-linear-to-r from-gray-900 via-blue-900 to-teal-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-linear-to-r from-blue-500 to-teal-500 rounded-full mr-3">
                <FaHeart className="text-white text-lg" />
              </div>
              <h2 className="text-2xl font-bold">
                Health<span className="text-teal-400">Predict</span>
              </h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Pioneering AI-powered healthcare solutions for early disease prediction and better patient outcomes.
            </p>
            <div className="flex items-center space-x-3">
              <FaShieldAlt className="text-teal-400" />
              <span className="text-sm text-gray-300">HIPAA Compliant & Secure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-teal-400">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 opacity-60"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-teal-400">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 flex items-center">
                  <FaUserMd className="text-blue-400 mr-3 text-sm" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-teal-400">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-400 mr-3 mt-1 shrink-0" />
                <div className="text-gray-300">
                  <p>123 Healthcare Ave</p>
                  <p>Medical District, MD 12345</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="text-blue-400 mr-3 shrink-0" />
                <span className="text-gray-300">+1 (555) 123-HEALTH</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-400 mr-3 shrink-0" />
                <span className="text-gray-300">support@healthpredict.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="bg-linear-to-r from-blue-800 to-teal-800 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <FaHeart className="text-2xl text-teal-300" />
              </div>
              <h4 className="font-semibold mb-2">AI-Powered Predictions</h4>
              <p className="text-sm text-gray-300">Advanced machine learning for accurate health forecasting</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <FaHospital className="text-2xl text-teal-300" />
              </div>
              <h4 className="font-semibold mb-2">Expert Medical Team</h4>
              <p className="text-sm text-gray-300">Certified doctors and healthcare professionals</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <FaShieldAlt className="text-2xl text-teal-300" />
              </div>
              <h4 className="font-semibold mb-2">Secure & Private</h4>
              <p className="text-sm text-gray-300">Enterprise-grade security for your health data</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-300 mb-4 md:mb-0">
              <p>&copy; 2025 HealthPredict Clinic. All rights reserved.</p>
              <p className="text-sm">Designed with <FaHeart className="inline text-red-400 mx-1" /> for better healthcare</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-opacity-20 transition-all duration-300"
                  >
                    <IconComponent />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 mt-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">HIPAA Compliance</a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;