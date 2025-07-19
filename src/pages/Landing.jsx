import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Smartphone, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight,
  CheckCircle,
  Leaf,
  Globe,
  Clock
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Smart Irrigation for
              <span className="text-green-600"> Modern Farming</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Transform your agricultural operations with our AI-powered IoT irrigation system. 
              Monitor, control, and optimize water usage remotely from anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                to="/farm-registration"
                className="bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/features"
                className="border-2 border-green-600 text-green-600 px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose mugAI?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Our intelligent irrigation system combines cutting-edge IoT technology with AI-driven insights 
              to maximize crop yield while minimizing water waste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Smartphone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Remote Control</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                Control your irrigation system from anywhere using our mobile app or web dashboard.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Smart Analytics</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                Get detailed insights about soil moisture, weather patterns, and water usage optimization.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Automated Scheduling</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                AI-powered scheduling system that adapts to weather conditions and crop requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Boost Your Farm's Efficiency
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Our IoT irrigation system has helped thousands of farmers increase their crop yield 
                by up to 40% while reducing water consumption by 30%.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Water Conservation</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Reduce water waste by up to 30% with precision irrigation.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Increased Yield</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Optimize growing conditions for up to 40% better harvest.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Cost Savings</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Reduce operational costs through automated efficiency.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">30%</h3>
                <p className="text-gray-600 text-sm sm:text-base">Water Savings</p>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">40%</h3>
                <p className="text-gray-600 text-sm sm:text-base">Yield Increase</p>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mb-2 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">24/7</h3>
                <p className="text-gray-600 text-sm sm:text-base">Monitoring</p>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 mb-2 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">10K+</h3>
                <p className="text-gray-600 text-sm sm:text-base">Farms Connected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Technology Stack
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Built with cutting-edge IoT sensors, AI algorithms, and cloud infrastructure 
              to deliver reliable and scalable irrigation solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-lg">
              <Shield className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">IoT Sensors</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Weather-resistant sensors for soil moisture, temperature, and humidity monitoring.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-lg">
              <Zap className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">AI Analytics</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Machine learning algorithms that predict optimal irrigation schedules and water needs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Cloud Platform</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Secure, scalable cloud infrastructure for data storage and real-time processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of farmers who have already revolutionized their irrigation systems with mugAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              to="/farm-registration"
              className="bg-white text-green-600 px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;