import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Headphones,
  Users,
  CheckCircle,
  AlertCircle,
  Globe,
  Calendar,
  Video,
  FileText
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    farmSize: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare email data
      const emailData = {
        to: 'mugai.agritech@gmail.com',
        subject: `Contact Form: ${formData.subject}`,
        body: `
New contact form submission:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company/Farm: ${formData.company || 'Not provided'}
Farm Size: ${formData.farmSize || 'Not provided'}
Inquiry Type: ${formData.inquiryType}
Subject: ${formData.subject}

Message:
${formData.message}

---
Submitted at: ${new Date().toLocaleString()}
        `.trim()
      };

      // Send to webhook service
      const webhookData = {
        type: 'contact_form' as const,
        email: 'mugai.agritech@gmail.com',
        name: 'Contact Form',
        provider: 'email' as const,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        contactData: {
          ...formData,
          submittedAt: new Date().toISOString()
        },
        emailData
      };

      // Try to send via webhook (for email automation)
      try {
        const response = await fetch('https://kishovarmam.app.n8n.cloud/webhook-test/Credentials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        });

        if (!response.ok) {
          throw new Error('Webhook failed');
        }
      } catch (webhookError) {
        console.warn('Webhook service unavailable, using fallback email method');
        
        // Fallback: Create mailto link with form data
        const mailtoLink = `mailto:mugai.agritech@gmail.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
        
        // Open email client
        window.open(mailtoLink, '_blank');
      }

      setSubmitStatus('success');
      
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        farmSize: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: "mugai.agritech@gmail.com",
      description: "Send us an email anytime",
      action: "mailto:mugai.agritech@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: "+91 6385891759",
      description: "Mon-Fri 9AM-6PM IST",
      action: "tel:+916385891759"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: "Coimbatore, Tamil Nadu, India",
      description: "Our headquarters",
      action: "#"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      details: "Available 24/7",
      description: "Instant support",
      action: "#"
    }
  ];

  const supportOptions = [
    {
      icon: <Headphones className="h-8 w-8 text-blue-600" />,
      title: "Technical Support",
      description: "Get help with installation, configuration, and troubleshooting",
      availability: "24/7 Support Available",
      action: "Get Support"
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Sales Consultation",
      description: "Speak with our experts about the best solution for your farm",
      availability: "Mon-Fri 9AM-6PM IST",
      action: "Schedule Call"
    },
    {
      icon: <Video className="h-8 w-8 text-purple-600" />,
      title: "Product Demo",
      description: "See our IoT irrigation system in action with a live demonstration",
      availability: "Book anytime",
      action: "Book Demo"
    },
    {
      icon: <FileText className="h-8 w-8 text-orange-600" />,
      title: "Documentation",
      description: "Access user manuals, API docs, and technical specifications",
      availability: "Always available",
      action: "View Docs"
    }
  ];

  const offices = [
    {
      city: "Coimbatore",
      country: "India",
      address: "Technology Park, Coimbatore, Tamil Nadu 641014",
      phone: "+91 6385891759",
      email: "coimbatore@mugai.com",
      type: "Headquarters"
    },
    {
      city: "Bangalore",
      country: "India",
      address: "Electronic City, Bangalore, Karnataka 560100",
      phone: "+91 80 4567 8901",
      email: "bangalore@mugai.com",
      type: "R&D Center"
    },
    {
      city: "Pune",
      country: "India",
      address: "Hinjewadi IT Park, Pune, Maharashtra 411057",
      phone: "+91 20 2345 6789",
      email: "pune@mugai.com",
      type: "Operations"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get in Touch with
              <span className="text-green-600"> Our Experts</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to transform your farm with smart irrigation? Our team is here to help you 
              every step of the way, from consultation to implementation and ongoing support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center group">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <div className="text-green-600">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-900 font-medium mb-1">{info.details}</p>
                <p className="text-gray-600 text-sm mb-4">{info.description}</p>
                <a
                  href={info.action}
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Contact Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-700 font-medium">Message sent successfully!</p>
                    <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-700 font-medium">Failed to send message</p>
                    <p className="text-red-600 text-sm">Please try again or contact us directly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your email"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your phone"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Farm Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter company name"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Size (acres)
                    </label>
                    <input
                      type="text"
                      value={formData.farmSize}
                      onChange={(e) => handleInputChange('farmSize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 10 acres"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      disabled={isSubmitting}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales & Pricing</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="demo">Product Demo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Brief subject of your inquiry"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Tell us more about your requirements..."
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose mugAI?</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Expert Support</h3>
                      <p className="text-gray-600">24/7 technical support from agricultural IoT specialists</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Proven Results</h3>
                      <p className="text-gray-600">10,000+ farms already benefiting from our technology</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Easy Installation</h3>
                      <p className="text-gray-600">Professional installation and training included</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">ROI Guarantee</h3>
                      <p className="text-gray-600">Guaranteed return on investment within 12 months</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Response Times</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Email Inquiries</span>
                    <span className="font-medium text-green-600">{'< 2 hours'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Phone Support</span>
                    <span className="font-medium text-green-600">Immediate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Technical Issues</span>
                    <span className="font-medium text-green-600">{'< 30 minutes'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">On-site Support</span>
                    <span className="font-medium text-green-600">{'< 24 hours'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Can We Help You?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the support option that best fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold text-center mb-3">{option.title}</h3>
                <p className="text-gray-600 text-sm text-center mb-4">{option.description}</p>
                <div className="text-center mb-4">
                  <span className="text-xs text-gray-500">{option.availability}</span>
                </div>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit us at any of our offices across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{office.city}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {office.type}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <span className="text-gray-700 text-sm">{office.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 text-sm">{office.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 text-sm">{office.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our IoT irrigation systems
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">How long does installation take?</h3>
              <p className="text-gray-600">
                Typical installation takes 1-3 days depending on farm size and complexity. 
                Our certified technicians handle everything from sensor placement to system configuration.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">What's included in the support package?</h3>
              <p className="text-gray-600">
                24/7 technical support, regular system updates, preventive maintenance, 
                and access to our mobile app and web dashboard are all included.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Can the system work without internet?</h3>
              <p className="text-gray-600">
                Yes, our systems have offline capabilities and can operate autonomously. 
                Internet connectivity enhances features like remote monitoring and weather integration.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">What's the typical ROI timeframe?</h3>
              <p className="text-gray-600">
                Most farmers see return on investment within 8-12 months through water savings, 
                increased yields, and reduced labor costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Transform your farm today with our smart irrigation technology. 
            Our experts are standing by to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/farm-registration"
              className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="tel:+916385891759"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;