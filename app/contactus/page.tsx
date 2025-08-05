"use client";


import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Clock, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  action: () => void;
}

const ContactUsPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods: ContactMethod[] = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      value: "support@perpenny.com",
      description: "Get in touch via email for detailed inquiries",
      action: () => window.open('mailto:support@perpenny.com')
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      value: "+91 98765 43210",
      description: "Speak directly with our support team",
      action: () => window.open('tel:+919876543210')
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp",
      value: "+91 98765 43210",
      description: "Quick support via WhatsApp messaging",
      action: () => window.open('https://wa.me/919876543210?text=Hello%20PerPenny%20Support')
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 sm:mb-8 leading-tight">
            Get in touch<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>with us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Have questions about our services? Need help with your booking? 
            We&apos;re here to assist you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Contact Methods */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8">Contact Methods</h2>
            
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                onClick={method.action}
                className="group bg-gray-900/30 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-gray-800/40 hover:border-gray-700 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start space-x-4 sm:space-x-6">
                  <div className="flex-shrink-0 p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl group-hover:bg-white/20 transition-colors">
                    <div className="w-6 h-6 sm:w-8 sm:h-8">
                      {method.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">{method.title}</h3>
                    <p className="text-xl sm:text-2xl font-light text-white mb-1 sm:mb-2 break-all sm:break-normal">{method.value}</p>
                    <p className="text-sm sm:text-base text-gray-400">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Info */}
            <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-8">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-base sm:text-lg font-medium mb-1">Support Hours</h4>
                  <p className="text-sm sm:text-base text-gray-300">Monday - Sunday: 8:00 AM - 10:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-base sm:text-lg font-medium mb-1">Service Areas</h4>
                  <p className="text-sm sm:text-base text-gray-300">Available in major metropolitan cities across India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-2 text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500 text-sm sm:text-base"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-2 text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-2 text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500 text-sm sm:text-base"
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-2 text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500 resize-none text-sm sm:text-base"
                  placeholder="Tell us more about your inquiry..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-white text-black py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2 group text-sm sm:text-base"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <h3 className="text-xl sm:text-2xl font-light mb-6 sm:mb-8">Need immediate assistance?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <button
              onClick={() => window.open('tel:+919876543210')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Call Now</span>
            </button>
            
            <button
              onClick={() => window.open('https://wa.me/919876543210?text=Hello%20PerPenny%20Support')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;