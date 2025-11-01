import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaBars, FaTimes, FaUserMd, FaUser, FaHome, FaInfoCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'About', path: '/about', icon: FaInfoCircle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-linear-to-r from-blue-600 to-teal-600 rounded-full mr-3">
                <FaHeart className="text-white text-lg" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Health<span className="text-blue-600">Predict</span>
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <IconComponent className="mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
              >
                Sign In
              </motion.button>
            </Link>
            
            <div className="flex space-x-2">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-linear-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center"
                >
                  <FaUser className="mr-2 text-sm" />
                  Patient
                </motion.button>
              </Link>
              
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 flex items-center"
                >
                  <FaUserMd className="mr-2 text-sm" />
                  Doctor
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2 transition-colors duration-300"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? 'auto' : 0, 
          opacity: isMenuOpen ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-100"
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <IconComponent className="mr-3" />
                {item.name}
              </Link>
            );
          })}
          
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Sign In
            </Link>
            
            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center px-3 py-2 bg-linear-to-r from-blue-600 to-teal-600 text-white rounded-lg"
            >
              <FaUser className="mr-3" />
              Join as Patient
            </Link>
            
            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center px-3 py-2 border-2 border-blue-600 text-blue-600 rounded-lg"
            >
              <FaUserMd className="mr-3" />
              Join as Doctor
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;