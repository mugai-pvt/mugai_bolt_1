import React from 'react';
import { 
  Users, 
  Target, 
  Award, 
  Globe,
  Leaf,
  Lightbulb,
  Heart,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  MapPin,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { number: "10,000+", label: "Farms Connected", icon: <Globe className="h-6 w-6" /> },
    { number: "50M+", label: "Liters Water Saved", icon: <Leaf className="h-6 w-6" /> },
    { number: "40%", label: "Average Yield Increase", icon: <TrendingUp className="h-6 w-6" /> },
    { number: "15+", label: "Countries Served", icon: <MapPin className="h-6 w-6" /> }
  ];

  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Sustainability",
      description: "We're committed to sustainable farming practices that preserve our planet for future generations while maximizing agricultural productivity."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-600" />,
      title: "Innovation",
      description: "Continuous research and development drive our cutting-edge IoT solutions, keeping farmers at the forefront of agricultural technology."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Farmer-Centric",
      description: "Every solution we develop is designed with farmers in mind, ensuring ease of use, reliability, and real-world applicability."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Reliability",
      description: "Our systems are built to withstand harsh agricultural environments while providing consistent, dependable performance year-round."
    }
  ];

  const team = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Agricultural Engineer with 15+ years in precision farming and IoT development."
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "IoT specialist and software architect with expertise in agricultural automation systems."
    },
    {
      name: "Dr. Amit Patel",
      role: "Head of Research",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "PhD in Agricultural Sciences, leading our AI and machine learning initiatives."
    },
    {
      name: "Sunita Reddy",
      role: "VP of Operations",
      image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Operations expert ensuring seamless deployment and support across all regions."
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "mugAI was established with a vision to revolutionize agriculture through IoT technology."
    },
    {
      year: "2020",
      title: "First Product Launch",
      description: "Launched our first smart irrigation system, serving 100 farms in Tamil Nadu."
    },
    {
      year: "2021",
      title: "AI Integration",
      description: "Introduced AI-powered analytics and predictive irrigation scheduling."
    },
    {
      year: "2022",
      title: "National Expansion",
      description: "Expanded operations across India, serving over 5,000 farms nationwide."
    },
    {
      year: "2023",
      title: "International Growth",
      description: "Entered international markets, now serving farmers in 15+ countries."
    },
    {
      year: "2024",
      title: "10K Milestone",
      description: "Reached 10,000+ connected farms and 50M+ liters of water saved."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Empowering Farmers with
              <span className="text-green-600"> Smart Technology</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Founded in 2019, mugAI is pioneering the future of agriculture through innovative 
              IoT solutions that make farming more efficient, sustainable, and profitable.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To democratize precision agriculture by making advanced IoT technology accessible 
                to farmers of all sizes, helping them increase productivity while conserving natural resources.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Sustainable Farming</h3>
                    <p className="text-gray-600">Promoting eco-friendly agricultural practices</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Technology Access</h3>
                    <p className="text-gray-600">Making advanced tech affordable for all farmers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Global Impact</h3>
                    <p className="text-gray-600">Contributing to global food security</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                To create a world where every farm is smart, sustainable, and profitable through 
                the power of IoT technology and data-driven agriculture.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2030 Goals</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Target className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">1 Million farms connected globally</span>
                  </li>
                  <li className="flex items-center">
                    <Target className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">1 Billion liters of water saved</span>
                  </li>
                  <li className="flex items-center">
                    <Target className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">50% reduction in agricultural waste</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at mugAI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our mission to transform agriculture
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="text-green-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-md"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate experts dedicated to revolutionizing agriculture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry recognition for our innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AgTech Innovation Award 2023</h3>
              <p className="text-gray-600">Best IoT Solution for Sustainable Agriculture</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Startup of the Year 2022</h3>
              <p className="text-gray-600">National Agriculture Technology Awards</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Green Technology Excellence</h3>
              <p className="text-gray-600">Environmental Impact Recognition 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of the agricultural revolution. Let's build a sustainable future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/farm-registration"
              className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Journey
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;