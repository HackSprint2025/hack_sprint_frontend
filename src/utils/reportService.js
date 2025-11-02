import apiClient from './api.js';

class ReportService {
  // Patient report methods
  async getPatientReports() {
    try {
      const response = await apiClient.get('/report/my-reports');
      
      return {
        success: true,
        data: response.data.data || [],
        count: response.data.count || 0,
        message: response.data.message || 'Reports retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching patient reports:', error);
      if (error.message.includes('403') || error.message.includes('Only patients')) {
        throw new Error('Only patients can view their reports');
      }
      if (error.message.includes('401')) {
        throw new Error('Please log in to view your reports');
      }
      throw new Error(error.message || 'Failed to fetch reports');
    }
  }

  async getReportById(reportId) {
    try {
      const response = await apiClient.get(`/report/${reportId}`);
      
      return {
        success: true,
        data: response.data.data,
        message: 'Report retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching report by ID:', error);
      if (error.message.includes('404')) {
        throw new Error('Report not found');
      }
      if (error.message.includes('403')) {
        throw new Error('You do not have permission to view this report');
      }
      if (error.message.includes('401')) {
        throw new Error('Please log in to view report details');
      }
      throw new Error(error.message || 'Failed to fetch report');
    }
  }

  async uploadReport(formData) {
    try {
      // FormData should contain:
      // - reportFile: PDF file
      // - notes: Optional notes about the report
      
      const response = await apiClient.post('/report/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Report uploaded successfully'
      };
    } catch (error) {
      console.error('Error uploading report:', error);
      if (error.message.includes('403')) {
        throw new Error('Only patients can upload reports');
      }
      if (error.message.includes('400') && error.message.includes('No file')) {
        throw new Error('Please select a PDF file to upload');
      }
      if (error.message.includes('401')) {
        throw new Error('Please log in to upload reports');
      }
      throw new Error(error.message || 'Failed to upload report');
    }
  }

  async deleteReport(reportId) {
    try {
      const response = await apiClient.delete(`/report/${reportId}`);
      
      return {
        success: true,
        message: response.data.message || 'Report deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting report:', error);
      if (error.message.includes('404')) {
        throw new Error('Report not found');
      }
      if (error.message.includes('403')) {
        throw new Error('You do not have permission to delete this report');
      }
      if (error.message.includes('401')) {
        throw new Error('Please log in to delete reports');
      }
      throw new Error(error.message || 'Failed to delete report');
    }
  }

  // Doctor methods - for viewing patient reports through bookings
  // Note: These methods would require additional backend endpoints
  async getPatientReportsForDoctor(patientId) {
    try {
      // This endpoint doesn't exist in backend yet
      // Would need: GET /api/doctor/patients/:patientId/reports
      console.warn('Doctor access to patient reports not implemented in backend yet');
      
      return {
        success: false,
        data: [],
        message: 'Doctor access to patient reports not yet implemented'
      };
    } catch (error) {
      console.error('Error fetching patient reports for doctor:', error);
      throw new Error('Failed to fetch patient reports');
    }
  }

  async getDoctorPatients() {
    try {
      // This would get patients who have appointments with this doctor
      // Endpoint doesn't exist in backend yet
      // Would need: GET /api/doctor/patients
      console.warn('Doctor patients endpoint not implemented in backend yet');
      
      return {
        success: false,
        data: [],
        message: 'Doctor patients endpoint not yet implemented'
      };
    } catch (error) {
      console.error('Error fetching doctor patients:', error);
      throw new Error('Failed to fetch patients');
    }
  }

  // Utility methods
  getStatusColor(status) {
    switch (status) {
      case 'uploaded': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'analyzed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  getStatusIcon(status) {
    // Return appropriate icons for each status
    const icons = {
      uploaded: 'FaUpload',
      processing: 'FaSpinner',
      analyzed: 'FaCheckCircle',
      failed: 'FaTimesCircle'
    };
    return icons[status] || 'FaFile';
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  validateReportFile(file) {
    const errors = [];
    
    if (!file) {
      errors.push('Please select a file');
      return { isValid: false, errors };
    }
    
    // Check file type
    if (file.type !== 'application/pdf') {
      errors.push('Only PDF files are allowed');
    }
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      errors.push('File size must be less than 10MB');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  createFormData(file, notes = '') {
    const formData = new FormData();
    formData.append('reportFile', file);
    if (notes.trim()) {
      formData.append('notes', notes.trim());
    }
    return formData;
  }
}

const reportService = new ReportService();
export default reportService;