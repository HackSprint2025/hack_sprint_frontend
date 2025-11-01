import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUserMd, 
  FaVideo, 
  FaHospital, 
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHeart,
  FaBrain,
  FaEye,
  FaLungs,
  FaStethoscope,
  FaBone,
  FaBaby,
  FaFemale,
  FaSearch
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ScheduleConsultationPage = () => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [consultationType, setConsultationType] = useState('video');
  const [isBooked, setIsBooked] = useState(false);
  
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    reason: '',
    symptoms: '',
    medications: '',
    allergies: ''
  });

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      experience: "15+ years",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      icon: FaHeart,
      color: "bg-pink-500",
      about: "Specialized in heart disease prediction and prevention with advanced AI diagnostics.",
      availability: ["Monday", "Wednesday", "Friday"],
      consultationFee: "$150"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology", 
      experience: "12+ years",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      icon: FaBrain,
      color: "bg-green-500",
      about: "Expert in neurological disorders and brain health monitoring using machine learning.",
      availability: ["Tuesday", "Thursday", "Saturday"],
      consultationFee: "$175"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Ophthalmology",
      experience: "10+ years", 
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1594824483764-e446e04023c8?w=300&h=300&fit=crop&crop=face",
      icon: FaEye,
      color: "bg-blue-500",
      about: "Pioneer in early eye disease detection through AI-powered retinal analysis.",
      availability: ["Monday", "Tuesday", "Friday"],
      consultationFee: "$140"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "General Medicine",
      experience: "18+ years",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      icon: FaStethoscope,
      color: "bg-green-600",
      about: "Comprehensive healthcare with focus on preventive medicine and early diagnosis.",
      availability: ["Monday", "Wednesday", "Thursday", "Friday"],
      consultationFee: "$120"
    }
  ];

  // Generate next 14 days for date selection
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = generateDates();

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM"
  ];

  const handleInputChange = (e) => {
    setPatientInfo({
      ...patientInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleBookAppointment = () => {
    // Handle appointment booking
    console.log('Booking appointment:', {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      type: consultationType,
      patient: patientInfo
    });
    setIsBooked(true);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl p-8 shadow-2xl text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-4xl text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Appointment Confirmed!</h2>
          <div className="space-y-3 mb-6 text-left">
            <p className="text-gray-600"><strong>Doctor:</strong> {selectedDoctor?.name}</p>
            <p className="text-gray-600"><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
            <p className="text-gray-600"><strong>Time:</strong> {selectedTime}</p>
            <p className="text-gray-600"><strong>Type:</strong> {consultationType === 'video' ? 'Video Call' : 'In-Person'}</p>
          </div>
          <p className="text-gray-600 mb-8">
            You will receive a confirmation email with meeting details shortly.
          </p>
          <div className="space-y-3">
            <Link to="/patient-dashboard">
              <button className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-300">
                Go to Dashboard
              </button>
            </Link>
            <button 
              onClick={() => {
                setIsBooked(false);
                setStep(1);
                setSelectedDoctor(null);
                setSelectedDate(null);
                setSelectedTime(null);
              }}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
            >
              Book Another Appointment
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-pink-600 text-white py-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCalendarAlt className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Schedule Consultation</h1>
          <p className="text-xl opacity-90">
            Book an appointment with our expert healthcare professionals
          </p>
        </div>
      </motion.section>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= stepNum ? 'bg-pink-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepNum ? 'bg-pink-600' : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          {/* Step 1: Select Doctor */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Choose Your Doctor</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {doctors.map((doctor) => {
                  const DoctorIcon = doctor.icon;
                  return (
                    <motion.div
                      key={doctor.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedDoctor(doctor)}
                      className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                        selectedDoctor?.id === doctor.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
                          <p className="text-pink-600 font-medium">{doctor.specialty}</p>
                          <p className="text-sm text-gray-600">{doctor.experience}</p>
                        </div>
                        <div className={`w-12 h-12 ${doctor.color} rounded-full flex items-center justify-center`}>
                          <DoctorIcon className="text-white text-xl" />
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-4">{doctor.about}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="font-semibold ml-1">{doctor.rating}</span>
                        </div>
                        <span className="font-bold text-green-600">{doctor.consultationFee}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && selectedDoctor && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Select Date & Time</h2>
              <p className="text-gray-600 text-center mb-8">Choose a convenient date and time for your consultation</p>
              
              {/* Consultation Type */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Consultation Type</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setConsultationType('video')}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all duration-300 ${
                      consultationType === 'video'
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-300 hover:border-pink-300'
                    }`}
                  >
                    <FaVideo className="text-2xl text-pink-600 mx-auto mb-2" />
                    <p className="font-semibold">Video Call</p>
                    <p className="text-sm text-gray-600">Online consultation</p>
                  </button>
                  <button
                    onClick={() => setConsultationType('in-person')}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all duration-300 ${
                      consultationType === 'in-person'
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-300 hover:border-pink-300'
                    }`}
                  >
                    <FaHospital className="text-2xl text-green-600 mx-auto mb-2" />
                    <p className="font-semibold">In-Person</p>
                    <p className="text-sm text-gray-600">Visit our clinic</p>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
                <div className="grid grid-cols-7 gap-2">
                  {availableDates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg text-center transition-all duration-300 ${
                        selectedDate?.toDateString() === date.toDateString()
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <div className="text-xs">{date.toLocaleDateString('en', { weekday: 'short' })}</div>
                      <div className="font-bold">{date.getDate()}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Time</h3>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg font-medium transition-all duration-300 ${
                          selectedTime === time
                            ? 'bg-pink-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Patient Information */}
          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Patient Information</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={patientInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={patientInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={patientInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      required
                      value={patientInfo.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Consultation *</label>
                  <input
                    type="text"
                    name="reason"
                    required
                    value={patientInfo.reason}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Brief description of your concern"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Symptoms</label>
                  <textarea
                    name="symptoms"
                    rows={3}
                    value={patientInfo.symptoms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                    placeholder="Describe your current symptoms (optional)"
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                    <textarea
                      name="medications"
                      rows={2}
                      value={patientInfo.medications}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                      placeholder="List current medications"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Known Allergies</label>
                    <textarea
                      name="allergies"
                      rows={2}
                      value={patientInfo.allergies}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                      placeholder="List any known allergies"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Review & Confirm</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Doctor</p>
                      <p className="font-medium">{selectedDoctor?.name}</p>
                      <p className="text-sm text-pink-600">{selectedDoctor?.specialty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                      <p className="font-medium">{selectedDate?.toLocaleDateString()}</p>
                      <p className="text-sm text-gray-700">{selectedTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Consultation Type</p>
                      <p className="font-medium">{consultationType === 'video' ? 'Video Call' : 'In-Person Visit'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Consultation Fee</p>
                      <p className="font-medium text-green-600">{selectedDoctor?.consultationFee}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name: <span className="font-medium text-gray-800">{patientInfo.name}</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email: <span className="font-medium text-gray-800">{patientInfo.email}</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone: <span className="font-medium text-gray-800">{patientInfo.phone}</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth: <span className="font-medium text-gray-800">{patientInfo.dateOfBirth}</span></p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Reason: <span className="font-medium text-gray-800">{patientInfo.reason}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={prevStep}
                className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <FaArrowLeft className="mr-2" />
                Previous
              </motion.button>
            ) : (
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Contact
                </motion.button>
              </Link>
            )}

            {step < 4 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                disabled={
                  (step === 1 && !selectedDoctor) ||
                  (step === 2 && (!selectedDate || !selectedTime)) ||
                  (step === 3 && (!patientInfo.name || !patientInfo.email || !patientInfo.phone || !patientInfo.dateOfBirth || !patientInfo.reason))
                }
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  (step === 1 && selectedDoctor) ||
                  (step === 2 && selectedDate && selectedTime) ||
                  (step === 3 && patientInfo.name && patientInfo.email && patientInfo.phone && patientInfo.dateOfBirth && patientInfo.reason)
                    ? 'bg-pink-600 text-white hover:bg-pink-700 hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
                <FaArrowRight className="ml-2" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookAppointment}
                className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 hover:shadow-lg transition-all duration-300"
              >
                <FaCheckCircle className="mr-2" />
                Confirm Booking
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScheduleConsultationPage;