import React from 'react';
import { 
  Droplets, 
  Smartphone, 
  BarChart3, 
  Zap, 
  Shield, 
  Cloud,
  Thermometer,
  Wifi,
  Battery,
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Leaf,
  Target,
  Activity,
  Database
} from 'lucide-react';

const Features: React.FC = () => {
  const coreFeatures = [
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      title: "Smart Water Management",
      description: "AI-powered irrigation scheduling based on soil moisture, weather data, and crop requirements.",
      benefits: ["30% water savings", "Optimal soil moisture", "Automated scheduling"]
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-600" />,
      title: "Remote Monitoring & Control",
      description: "Monitor and control your irrigation system from anywhere using our mobile app or web dashboard.",
      benefits: ["24/7 remote access", "Real-time alerts", "Multi-device support"]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Advanced Analytics",
      description: "Comprehensive data analytics to optimize water usage, track crop health, and improve yields.",
      benefits: ["Yield predictions", "Usage reports", "Performance insights"]
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Automated Precision Irrigation",
      description: "Zone-specific irrigation control with precision timing and water distribution.",
      benefits: ["Zone-based control", "Precision timing", "Uniform distribution"]
    },
    {
      icon: <Cloud className="h-8 w-8 text-indigo-600" />,
      title: "Weather Integration",
      description: "Real-time weather data integration for intelligent irrigation decisions and forecasting.",
      benefits: ["Weather-based scheduling", "Rain detection", "Frost protection"]
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "System Protection",
      description: "Advanced protection against system failures, leaks, and environmental hazards.",
      benefits: ["Leak detection", "System diagnostics", "Emergency shutoff"]
    }
  ];

  const technicalSpecs = [
    {
      category: "Sensors & Hardware",
      icon: <Thermometer className="h-6 w-6 text-orange-500" />,
      specs: [
        "Soil moisture sensors (0-100% accuracy)",
        "Temperature & humidity monitoring",
        "pH and nutrient level detection",
        "Weather-resistant IP67 rating",
        "Solar-powered with battery backup",
        "Wireless mesh network connectivity"
      ]
    },
    {
      category: "Connectivity & Communication",
      icon: <Wifi className="h-6 w-6 text-blue-500" />,
      specs: [
        "4G/LTE cellular connectivity",
        "Wi-Fi 802.11 b/g/n support",
        "LoRaWAN long-range communication",
        "Bluetooth for local configuration",
        "Satellite backup connectivity",
        "Edge computing capabilities"
      ]
    },
    {
      category: "Control Systems",
      icon: <Settings className="h-6 w-6 text-gray-600" />,
      specs: [
        "Multi-zone valve control (up to 32 zones)",
        "Variable flow rate management",
        "Pressure monitoring and regulation",
        "Pump control and protection",
        "Fertilizer injection systems",
        "Emergency manual override"
      ]
    },
    {
      category: "Software & Analytics",
      icon: <Database className="h-6 w-6 text-green-500" />,
      specs: [
        "AI-powered irrigation algorithms",
        "Machine learning crop optimization",
        "Predictive analytics and forecasting",
        "Historical data analysis",
        "Custom reporting and dashboards",
        "API integration capabilities"
      ]
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="h-12 w-12 text-green-500" />,
      title: "Increase Crop Yield",
      description: "Up to 40% increase in crop yield through optimized irrigation and nutrient management.",
      metric: "40%",
      metricLabel: "Yield Increase"
    },
    {
      icon: <Droplets className="h-12 w-12 text-blue-500" />,
      title: "Water Conservation",
      description: "Reduce water consumption by 30% while maintaining optimal crop health and growth.",
      metric: "30%",
      metricLabel: "Water Savings"
    },
    {
      icon: <Target className="h-12 w-12 text-purple-500" />,
      title: "Precision Farming",
      description: "Zone-specific irrigation ensures each area gets exactly what it needs, when it needs it.",
      metric: "95%",
      metricLabel: "Precision Rate"
    },
    {
      icon: <Clock className="h-12 w-12 text-orange-500" />,
      title: "Time Efficiency",
      description: "Automated systems reduce manual labor by 60%, freeing up time for other farm activities.",
      metric: "60%",
      metricLabel: "Labor Reduction"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Advanced IoT Features for
              <span className="text-green-600"> Smart Farming</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover how our cutting-edge IoT technology transforms traditional farming 
              into precision agriculture with intelligent automation and data-driven insights.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive IoT solutions designed to revolutionize your farming operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-world impact on farms using our IoT irrigation systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{benefit.metric}</div>
                <div className="text-sm text-gray-500 mb-3">{benefit.metricLabel}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade hardware and software built for agricultural environments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {spec.icon}
                  <h3 className="text-xl font-semibold ml-3">{spec.category}</h3>
                </div>
                <ul className="space-y-3">
                  {spec.specs.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple setup, intelligent automation, powerful results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Install Sensors</h3>
              <p className="text-gray-600">
                Deploy IoT sensors across your farm to monitor soil moisture, temperature, and environmental conditions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI algorithms analyze sensor data, weather forecasts, and crop requirements to optimize irrigation.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Control</h3>
              <p className="text-gray-600">
                System automatically controls irrigation valves and pumps while you monitor everything remotely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who have already upgraded to smart irrigation technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/farm-registration"
              className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;