import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Droplets, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Ruler, 
  Wheat, 
  TreePine,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { sendToWebhook } from '../utils/webhookService';

interface FormData {
  // Personal Information
  farmerName: string;
  email: string;
  phone: string;
  address: string;
  
  // Farm Details
  farmName: string;
  farmLocation: string;
  farmSize: string;
  farmSizeUnit: 'acres' | 'hectares';
  soilType: string;
  cropTypes: string[];
  
  // Water Resources
  waterSources: string[];
  wellDepth: string;
  waterQuality: string;
  currentIrrigationMethod: string;
  dailyWaterUsage: string;
  
  // Additional Information
  farmingExperience: string;
  challenges: string;
  expectations: string;
}

const FarmRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    farmerName: '',
    email: '',
    phone: '',
    address: '',
    farmName: '',
    farmLocation: '',
    farmSize: '',
    farmSizeUnit: 'acres',
    soilType: '',
    cropTypes: [],
    waterSources: [],
    wellDepth: '',
    waterQuality: '',
    currentIrrigationMethod: '',
    dailyWaterUsage: '',
    farmingExperience: '',
    challenges: '',
    expectations: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  const totalSteps = 4;

  const cropOptions = [
    'Rice', 'Wheat', 'Corn', 'Cotton', 'Sugarcane', 'Vegetables', 
    'Fruits', 'Pulses', 'Spices', 'Flowers', 'Other'
  ];

  const waterSourceOptions = [
    'Bore Well', 'Open Well', 'River', 'Canal', 'Pond', 
    'Rainwater Harvesting', 'Government Supply', 'Other'
  ];

  const soilTypeOptions = [
    'Clay', 'Sandy', 'Loamy', 'Silt', 'Peaty', 'Chalky', 'Mixed'
  ];

  const irrigationMethods = [
    'Flood Irrigation', 'Sprinkler', 'Drip Irrigation', 
    'Manual Watering', 'Furrow Irrigation', 'None'
  ];

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayToggle = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleInputChange(field, newArray);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.farmerName.trim()) newErrors.farmerName = 'Farmer name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        break;
      case 2:
        if (!formData.farmName.trim()) newErrors.farmName = 'Farm name is required';
        if (!formData.farmLocation.trim()) newErrors.farmLocation = 'Farm location is required';
        if (!formData.farmSize.trim()) newErrors.farmSize = 'Farm size is required';
        if (!formData.soilType) newErrors.soilType = 'Soil type is required';
        if (formData.cropTypes.length === 0) newErrors.cropTypes = 'Select at least one crop type';
        break;
      case 3:
        if (formData.waterSources.length === 0) newErrors.waterSources = 'Select at least one water source';
        if (!formData.waterQuality) newErrors.waterQuality = 'Water quality information is required';
        if (!formData.currentIrrigationMethod) newErrors.currentIrrigationMethod = 'Current irrigation method is required';
        break;
      case 4:
        if (!formData.farmingExperience.trim()) newErrors.farmingExperience = 'Farming experience is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    // Check if user is authenticated before proceeding
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send farm registration data to webhook
      const farmRegistrationData = {
        type: 'farm_registration' as const,
        email: user.email,
        name: user.name,
        provider: user.provider,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        farmData: formData
      };
      
      await sendToWebhook(farmRegistrationData);
      
      // Show success message
      const successToast = document.createElement('div');
      successToast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
      successToast.textContent = 'Farm registration data saved successfully!';
      document.body.appendChild(successToast);
      
      setTimeout(() => {
        if (document.body.contains(successToast)) {
          document.body.removeChild(successToast);
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting farm registration:', error);
      
      // Show error message
      const errorToast = document.createElement('div');
      errorToast.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
      errorToast.textContent = 'Failed to save registration data. Please try again.';
      document.body.appendChild(errorToast);
      
      setTimeout(() => {
        if (document.body.contains(errorToast)) {
          document.body.removeChild(errorToast);
        }
      }, 5000);
    }
    
    setIsSubmitting(false);
    
    // Navigate to dashboard after successful submission
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handleGetStarted = () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }
    // If user is authenticated, proceed with form
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication prompt if user is not logged in
  if (!user || showAuthPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Droplets className="h-10 w-10 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">mugAI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Get Started with Smart Irrigation</h1>
            <p className="text-gray-600 mb-6">
              To register your farm and access our intelligent IoT irrigation system, 
              you need to create an account or sign in first.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <div className="text-center mb-6">
              <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
              <p className="text-gray-600 text-sm">
                Please sign in to your account or create a new one to continue with farm registration.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Sign In to Existing Account
              </button>
              
              <button
                onClick={() => navigate('/signup')}
                className="w-full border-2 border-green-600 text-green-600 py-3 px-4 rounded-md hover:bg-green-50 transition-colors font-medium"
              >
                Create New Account
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-green-600 hover:text-green-500 text-sm font-medium transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <React.Fragment key={i}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            i + 1 <= currentStep 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {i + 1 < currentStep ? <CheckCircle className="h-5 w-5" /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`w-12 h-1 mx-2 ${
              i + 1 < currentStep ? 'bg-green-600' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={formData.farmerName}
            onChange={(e) => handleInputChange('farmerName', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your full name"
          />
        </div>
        {errors.farmerName && <p className="mt-1 text-sm text-red-600">{errors.farmerName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your email address"
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your phone number"
          />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your complete address"
          />
        </div>
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Farm Details</h2>
        <p className="text-gray-600">Information about your farm</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Farm Name *
        </label>
        <input
          type="text"
          value={formData.farmName}
          onChange={(e) => handleInputChange('farmName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Enter your farm name"
        />
        {errors.farmName && <p className="mt-1 text-sm text-red-600">{errors.farmName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Farm Location *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={formData.farmLocation}
            onChange={(e) => handleInputChange('farmLocation', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter farm location (Village, District, State)"
          />
        </div>
        {errors.farmLocation && <p className="mt-1 text-sm text-red-600">{errors.farmLocation}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Farm Size *
          </label>
          <div className="relative">
            <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={formData.farmSize}
              onChange={(e) => handleInputChange('farmSize', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter size"
            />
          </div>
          {errors.farmSize && <p className="mt-1 text-sm text-red-600">{errors.farmSize}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit
          </label>
          <select
            value={formData.farmSizeUnit}
            onChange={(e) => handleInputChange('farmSizeUnit', e.target.value as 'acres' | 'hectares')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="acres">Acres</option>
            <option value="hectares">Hectares</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Soil Type *
        </label>
        <select
          value={formData.soilType}
          onChange={(e) => handleInputChange('soilType', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select soil type</option>
          {soilTypeOptions.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.soilType && <p className="mt-1 text-sm text-red-600">{errors.soilType}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Crop Types * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {cropOptions.map(crop => (
            <label key={crop} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.cropTypes.includes(crop)}
                onChange={() => handleArrayToggle('cropTypes', crop)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{crop}</span>
            </label>
          ))}
        </div>
        {errors.cropTypes && <p className="mt-1 text-sm text-red-600">{errors.cropTypes}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Water Resources</h2>
        <p className="text-gray-600">Information about your water sources and irrigation</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Water Sources * (Select all that apply)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {waterSourceOptions.map(source => (
            <label key={source} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.waterSources.includes(source)}
                onChange={() => handleArrayToggle('waterSources', source)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{source}</span>
            </label>
          ))}
        </div>
        {errors.waterSources && <p className="mt-1 text-sm text-red-600">{errors.waterSources}</p>}
      </div>

      {formData.waterSources.some(source => source.includes('Well')) && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Well Depth (in feet)
          </label>
          <div className="relative">
            <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={formData.wellDepth}
              onChange={(e) => handleInputChange('wellDepth', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter well depth"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Water Quality *
        </label>
        <select
          value={formData.waterQuality}
          onChange={(e) => handleInputChange('waterQuality', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select water quality</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="poor">Poor</option>
          <option value="unknown">Unknown</option>
        </select>
        {errors.waterQuality && <p className="mt-1 text-sm text-red-600">{errors.waterQuality}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Irrigation Method *
        </label>
        <select
          value={formData.currentIrrigationMethod}
          onChange={(e) => handleInputChange('currentIrrigationMethod', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select irrigation method</option>
          {irrigationMethods.map(method => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
        {errors.currentIrrigationMethod && <p className="mt-1 text-sm text-red-600">{errors.currentIrrigationMethod}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Daily Water Usage (in liters)
        </label>
        <div className="relative">
          <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="number"
            value={formData.dailyWaterUsage}
            onChange={(e) => handleInputChange('dailyWaterUsage', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Approximate daily water usage"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Information</h2>
        <p className="text-gray-600">Help us understand your farming background and needs</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Farming Experience *
        </label>
        <select
          value={formData.farmingExperience}
          onChange={(e) => handleInputChange('farmingExperience', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select experience level</option>
          <option value="beginner">Beginner (0-2 years)</option>
          <option value="intermediate">Intermediate (3-10 years)</option>
          <option value="experienced">Experienced (11-20 years)</option>
          <option value="expert">Expert (20+ years)</option>
        </select>
        {errors.farmingExperience && <p className="mt-1 text-sm text-red-600">{errors.farmingExperience}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Challenges in Farming
        </label>
        <textarea
          value={formData.challenges}
          onChange={(e) => handleInputChange('challenges', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Describe any challenges you face in farming (water scarcity, pest control, weather, etc.)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expectations from mugAI System
        </label>
        <textarea
          value={formData.expectations}
          onChange={(e) => handleInputChange('expectations', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="What do you expect from our smart irrigation system? How do you think it will help your farming?"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Droplets className="h-10 w-10 text-green-600" />
            <span className="text-3xl font-bold text-gray-900">mugAI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Farm Registration</h1>
          <p className="text-gray-600">Join the smart irrigation revolution</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          {renderStepIndicator()}

          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            <div className="flex justify-between mt-8">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>
                )}
              </div>

              <div>
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Account Setup</span>
                        <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <Link to="/contact" className="text-green-600 hover:text-green-500 font-medium transition-colors">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmRegistration;