import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUpload, 
  FaFilePdf, 
  FaChartLine, 
  FaHeart, 
  FaBrain, 
  FaEye, 
  FaLungs,
  FaUser,
  FaCalendar,
  FaClock,
  FaDownload,
  FaTrash,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle
} from 'react-icons/fa';

const PatientDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedReports, setUploadedReports] = useState([
    {
      id: 1,
      name: "Blood_Test_Report_2025.pdf",
      uploadDate: "2025-10-28",
      status: "analyzed",
      predictions: [
        { disease: "Diabetes Type 2", risk: "High", probability: "85%", category: "Metabolic" },
        { disease: "Hypertension", risk: "Medium", probability: "65%", category: "Cardiovascular" }
      ]
    },
    {
      id: 2,
      name: "ECG_Report_October.pdf",
      uploadDate: "2025-10-25",
      status: "analyzed",
      predictions: [
        { disease: "Atrial Fibrillation", risk: "Low", probability: "25%", category: "Cardiovascular" }
      ]
    },
    {
      id: 3,
      name: "Chest_Xray_2025.pdf",
      uploadDate: "2025-10-20",
      status: "processing",
      predictions: []
    }
  ]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newReport = {
        id: uploadedReports.length + 1,
        name: selectedFile.name,
        uploadDate: new Date().toISOString().split('T')[0],
        status: "processing",
        predictions: []
      };
      setUploadedReports([newReport, ...uploadedReports]);
      setSelectedFile(null);
      // Reset file input
      document.getElementById('file-upload').value = '';
    }
  };

  const handleDeleteReport = (id) => {
    setUploadedReports(uploadedReports.filter(report => report.id !== id));
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Cardiovascular': return FaHeart;
      case 'Neurological': return FaBrain;
      case 'Ophthalmological': return FaEye;
      case 'Respiratory': return FaLungs;
      default: return FaInfoCircle;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'analyzed': return FaCheckCircle;
      case 'processing': return FaClock;
      case 'error': return FaExclamationTriangle;
      default: return FaInfoCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'analyzed': return 'text-green-600';
      case 'processing': return 'text-blue-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-linear-to-r from-blue-600 to-teal-600 rounded-full mr-4">
              <FaUser className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Patient Dashboard</h1>
              <p className="text-gray-600">Welcome back, John Doe</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaUpload className="mr-3 text-blue-600" />
                Upload Report
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors duration-300">
                <FaFilePdf className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Drop your medical reports here or click to browse
                </p>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300"
                >
                  Choose File
                </label>
              </div>
              
              {selectedFile && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-blue-50 rounded-lg"
                >
                  <p className="text-sm text-blue-800">
                    Selected: {selectedFile.name}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpload}
                    className="mt-3 w-full bg-linear-to-r from-blue-600 to-teal-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Upload & Analyze
                  </motion.button>
                </motion.div>
              )}

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{uploadedReports.length}</div>
                  <div className="text-sm text-blue-800">Total Reports</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {uploadedReports.filter(r => r.status === 'analyzed').length}
                  </div>
                  <div className="text-sm text-green-800">Analyzed</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reports and Analysis */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Recent Reports */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaChartLine className="mr-3 text-blue-600" />
                Your Reports & Predictions
              </h2>
              
              <div className="space-y-4">
                {uploadedReports.map((report, index) => {
                  const StatusIcon = getStatusIcon(report.status);
                  
                  return (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <FaFilePdf className="text-red-500 text-xl mr-3" />
                          <div>
                            <h3 className="font-semibold text-gray-800">{report.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <FaCalendar className="mr-1" />
                              {new Date(report.uploadDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className={`flex items-center ${getStatusColor(report.status)}`}>
                            <StatusIcon className="mr-1" />
                            <span className="text-sm capitalize">{report.status}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors duration-300"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      
                      {report.predictions.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-700">AI Predictions:</h4>
                          {report.predictions.map((prediction, idx) => {
                            const CategoryIcon = getCategoryIcon(prediction.category);
                            
                            return (
                              <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                  <CategoryIcon className="text-blue-600 mr-3" />
                                  <div>
                                    <div className="font-medium text-gray-800">{prediction.disease}</div>
                                    <div className="text-sm text-gray-600">{prediction.category}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(prediction.risk)}`}>
                                    {prediction.risk} Risk
                                  </span>
                                  <div className="text-sm text-gray-600 mt-1">{prediction.probability}</div>
                                </div>
                              </div>
                            );
                          })}
                          
                          <div className="flex space-x-3 mt-4">
                            <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                              <FaDownload className="mr-1" />
                              Download Report
                            </button>
                            <button className="flex items-center text-green-600 hover:text-green-700 text-sm">
                              <FaInfoCircle className="mr-1" />
                              View Recommendations
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {report.status === 'processing' && (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                          <span className="text-blue-600">Analyzing your report...</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
                
                {uploadedReports.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <FaFilePdf className="text-4xl mx-auto mb-4 opacity-50" />
                    <p>No reports uploaded yet. Upload your first medical report to get started!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Health Summary */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Health Summary</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Risk Categories</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <FaHeart className="text-red-500 mr-2" />
                        Cardiovascular
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">Medium</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <FaBrain className="text-purple-500 mr-2" />
                        Neurological
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Low</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <FaEye className="text-blue-500 mr-2" />
                        Vision
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Low</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Recommendations</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mr-2 mt-0.5 shrink-0" />
                      Schedule regular cardiology check-up
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mr-2 mt-0.5 shrink-0" />
                      Monitor blood glucose levels weekly
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mr-2 mt-0.5 shrink-0" />
                      Maintain heart-healthy diet
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;