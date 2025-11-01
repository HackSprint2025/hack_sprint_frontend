import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaBars, FaTimes, FaUserMd, FaUser, FaHome, FaInfoCircle, FaPlusCircle, FaUserAlt, FaEnvelope } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'About', path: '/about', icon: FaInfoCircle },
    { name: 'Contact', path: '/contact', icon: FaEnvelope },
    { name: 'Profile', path: '/profile', icon: FaUserAlt },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="font-lato bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-1">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <div className="flex items-center justify-center w-10 h-10  rounded-full mr-1">
                <FaPlusCircle className="text-pink-800 text-lg" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Health<span className="text-pink-800">Predict</span>
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-pink-500'
                        : 'text-gray-600 hover:text-pink-400'
                    }`}
                  >
                    <IconComponent className="mr-2" size={18} />
                    <p className='text-md'>{item.name}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-2">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center cursor-pointer"
                >
                  <FaUser className="mr-2 text-sm" />
                  Login
                </motion.button>
              </Link>
              
              <Link to="/patient-dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="hover:border-green-600 border-2 border-green-500 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center cursor-pointer"
                >
                  <FaUserMd className="mr-2 text-sm text-green-500" />
                  <p className='text-green-500'>Dashboard</p>
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
                    ? 'text-pink-500'
                    : 'text-gray-600 hover:text-pink-400'
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
              className="flex items-center px-3 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors duration-300"
            >
              <FaUser className="mr-3" />
              Login
            </Link>
            
            <Link
              to="/patient-dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300"
            >
              <FaUserMd className="mr-3" />
              Dashboard
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;