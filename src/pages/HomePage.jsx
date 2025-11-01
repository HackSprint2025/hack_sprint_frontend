import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHeartbeat, 
  FaBrain, 
  FaEye, 
  FaLungs, 
  FaUserMd, 
  FaUpload, 
  FaChartLine, 
  FaShieldAlt,
  FaArrowRight,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaUsers
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      icon: FaHeartbeat,
      title: "Heart Disease Prediction",
      description: "Advanced AI algorithms analyze your cardiovascular health data to predict potential heart conditions.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: FaBrain,
      title: "Neurological Analysis",
      description: "Early detection of neurological disorders through comprehensive brain health assessment.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: FaEye,
      title: "Vision Health Monitoring",
      description: "Eye disease prediction using retinal imaging and advanced computer vision technology.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaLungs,
      title: "Respiratory Health",
      description: "Pulmonary function analysis to detect early signs of respiratory conditions.",
      color: "from-teal-500 to-green-500"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Patients Served", icon: FaUsers },
    { number: "95%", label: "Accuracy Rate", icon: FaCheckCircle },
    { number: "24/7", label: "AI Monitoring", icon: FaClock },
    { number: "50+", label: "Disease Types", icon: FaChartLine }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      rating: 5,
      comment: "HealthPredict detected early signs of heart disease that my regular checkups missed. It saved my life!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      rating: 5,
      comment: "The AI predictions are incredibly accurate. It's revolutionizing how we approach preventive medicine.",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Patient",
      rating: 5,
      comment: "The dashboard is intuitive and the predictions helped me make informed health decisions early.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-20 px-4 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-blue-700 to-teal-600 opacity-10"></div>
        <div className="relative max-w-6xl mx-auto">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
          >
            Predict Your Health,
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-600"> Prevent Disease</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            Revolutionary AI-powered healthcare platform that analyzes your medical reports to predict potential diseases before they become critical. Take control of your health journey today.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-linear-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center"
              >
                Get Started as Patient
                <FaArrowRight className="ml-2" />
              </motion.button>
            </Link>
            
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center"
              >
                Join as Doctor
                <FaUserMd className="ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Advanced Disease Prediction</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI technology analyzes multiple health parameters to provide accurate predictions across various medical domains
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`flex items-center justify-center w-16 h-16 bg-linear-to-r ${feature.color} rounded-full mb-6 mx-auto`}>
                  <feature.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-linear-to-r from-gray-50 to-blue-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to revolutionize your healthcare</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-linear-to-r from-blue-500 to-teal-500 rounded-full mb-6 mx-auto">
                <FaUpload className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">1. Upload Reports</h3>
              <p className="text-gray-600 leading-relaxed">
                Securely upload your medical reports, lab results, and health data to our HIPAA-compliant platform.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-linear-to-r from-purple-500 to-pink-500 rounded-full mb-6 mx-auto">
                <FaBrain className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">2. AI Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced machine learning algorithms analyze your data using the latest medical research and patterns.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-linear-to-r from-green-500 to-blue-500 rounded-full mb-6 mx-auto">
                <FaChartLine className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">3. Get Predictions</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive detailed health predictions, risk assessments, and personalized recommendations for prevention.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-linear-to-r from-blue-600 via-blue-700 to-teal-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">Trusted by Healthcare Professionals</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <stat.icon className="text-4xl mb-4 mx-auto opacity-90" />
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-linear-to-r from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real stories from patients and doctors</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">{testimonial.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Ready to Transform Your Healthcare?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of patients and doctors who are already using AI-powered disease prediction to save lives and improve health outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-linear-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Start Your Health Journey
              </motion.button>
            </Link>
            
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;