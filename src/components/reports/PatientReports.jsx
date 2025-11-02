import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUpload, 
  FaFilePdf, 
  FaDownload, 
  FaEye, 
  FaTrash,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaPlus,
  FaCalendarAlt,
  FaClock,
  FaNotesMedical
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import reportService from '../../utils/reportService';

const PatientReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadNotes, setUploadNotes] = useState('');
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await reportService.getPatientReports();
      
      if (response.success) {
        setReports(response.data || []);
      } else {
        setError(response.message || 'Failed to load reports');
      }
    } catch (error) {
      setError(error.message || 'Failed to load reports');
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setUploadError('');
    
    if (!file) {
      setUploadFile(null);
      return;
    }

    const validation = reportService.validateReportFile(file);
    if (!validation.isValid) {
      setUploadError(validation.errors.join(', '));
      setUploadFile(null);
      return;
    }

    setUploadFile(file);
  };

  const handleUploadReport = async () => {
    if (!uploadFile) {
      setUploadError('Please select a file');
      return;
    }

    try {
      setUploading(true);
      setUploadError('');
      
      const formData = reportService.createFormData(uploadFile, uploadNotes);
      const response = await reportService.uploadReport(formData);
      
      if (response.success) {
        setShowUploadModal(false);
        setUploadFile(null);
        setUploadNotes('');
        await loadReports(); // Refresh reports list
      }
    } catch (error) {
      setUploadError(error.message || 'Failed to upload report');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      return;
    }

    try {
      await reportService.deleteReport(reportId);
      await loadReports(); // Refresh reports list
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Failed to delete report: ' + error.message);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded': return FaUpload;
      case 'processing': return FaSpinner;
      case 'analyzed': return FaCheckCircle;
      case 'failed': return FaTimesCircle;
      default: return FaFilePdf;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <FaSpinner className="animate-spin text-4xl text-pink-600 mr-4" />
        <span className="text-gray-600">Loading your reports...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <FaExclamationTriangle className="text-red-600 text-4xl mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Reports</h3>
        <p className="text-red-700 mb-4">{error}</p>
        <button 
          onClick={loadReports}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">My Medical Reports</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{reports.length} reports</span>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300"
          >
            <FaPlus className="mr-2" />
            Upload Report
          </button>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaFilePdf className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reports Yet</h3>
          <p className="text-gray-500 mb-6">Upload your medical reports to keep track of your health records.</p>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300"
          >
            <FaUpload className="mr-2" />
            Upload Your First Report
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {reports.map((report) => {
            const StatusIcon = getStatusIcon(report.status);
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                      <FaFilePdf className="text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Medical Report</h3>
                      <p className="text-sm text-gray-600">
                        Uploaded on {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${reportService.getStatusColor(report.status)}`}>
                    <StatusIcon className={`mr-1 text-xs ${report.status === 'processing' ? 'animate-spin' : ''}`} />
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </div>
                </div>

                {report.notes && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <FaNotesMedical className="text-gray-600 mr-2 mt-1 shrink-0" />
                      <p className="text-sm text-gray-700">{report.notes}</p>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    <span>Uploaded: {new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2" />
                    <span>Status: {report.status}</span>
                  </div>
                </div>

                {report.status === 'failed' && (
                  <div className="bg-red-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center text-red-700">
                      <FaExclamationTriangle className="mr-2" />
                      <span className="text-sm">
                        Report processing failed. The file was uploaded but text extraction encountered an error.
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center"
                  >
                    <FaEye className="mr-1" />
                    View Details
                  </button>
                  
                  {report.file && (
                    <a
                      href={report.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center"
                    >
                      <FaDownload className="mr-1" />
                      Download
                    </a>
                  )}
                  
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-300 flex items-center"
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Upload Medical Report</h3>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadFile(null);
                    setUploadNotes('');
                    setUploadError('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={uploading}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select PDF File *
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    disabled={uploading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                  {uploadFile && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {uploadFile.name} ({reportService.formatFileSize(uploadFile.size)})
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={uploadNotes}
                    onChange={(e) => setUploadNotes(e.target.value)}
                    disabled={uploading}
                    placeholder="Add any notes about this report..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
                    rows="3"
                  />
                </div>

                {uploadError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-700">{uploadError}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setUploadFile(null);
                      setUploadNotes('');
                      setUploadError('');
                    }}
                    disabled={uploading}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadReport}
                    disabled={uploading || !uploadFile}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300 disabled:opacity-50 flex items-center"
                  >
                    {uploading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaUpload className="mr-2" />
                        Upload Report
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Report Details Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Report Details</h3>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Upload Date</h4>
                      <p className="text-gray-600">{new Date(selectedReport.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Status</h4>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${reportService.getStatusColor(selectedReport.status)}`}>
                        {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
                      </div>
                    </div>
                  </div>

                  {selectedReport.notes && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Notes</h4>
                      <p className="text-gray-600 bg-gray-50 rounded-lg p-4">{selectedReport.notes}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">File Information</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Patient ID:</strong> {selectedReport.patientId}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Report ID:</strong> {selectedReport.id}
                      </p>
                      {selectedReport.file && (
                        <p className="text-sm text-gray-600">
                          <strong>File URL:</strong>{' '}
                          <a 
                            href={selectedReport.file} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 underline break-all"
                          >
                            View File
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatientReports;