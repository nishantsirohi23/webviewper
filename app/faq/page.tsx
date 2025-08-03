"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How do I book a service on PerPenny?",
      answer: "Simply select the service you need, view available professionals, check their ratings and prices, choose one that fits your needs, and confirm your booking for your preferred date and time."
    },
    {
      id: 2,
      question: "Can I choose who comes to my home for the service?",
      answer: "Yes, you can browse through available service providers, view their profiles, ratings, and reviews, and select the professional you prefer for your specific service needs."
    },
    {
      id: 3,
      question: "Are there any hidden or visiting charges?",
      answer: "No, we believe in transparent pricing. All costs are clearly displayed upfront when you book a service. There are no hidden fees or surprise charges."
    },
    {
      id: 4,
      question: "What if I need to reschedule or cancel a booking?",
      answer: "You can easily reschedule or cancel your booking through your account dashboard. Please note our cancellation policy for any applicable fees based on timing."
    },
    {
      id: 5,
      question: "Are the service providers background verified?",
      answer: "Yes, all our service providers undergo thorough background verification including identity checks, skill assessments, and reference verification to ensure your safety and service quality."
    },
    {
      id: 6,
      question: "In which cities is PerPenny available?",
      answer: "PerPenny currently operates in major metropolitan areas. Please check our website or app for the most up-to-date list of available cities and service areas."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-light mb-16 leading-tight">
          Frequently asked<br />
          questions
        </h1>
        
        <div className="space-y-1">
          {faqData.map((item) => (
            <div key={item.id} className="border-b border-gray-800">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-900/30 transition-colors duration-200 focus:outline-none"
                aria-expanded={openItems[item.id]}
                aria-controls={`faq-${item.id}`}
              >
                <span className="text-lg md:text-xl font-normal pr-4">
                  {item.question}
                </span>
                <ChevronDown 
                  className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                    openItems[item.id] ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              
              <div 
                id={`faq-${item.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems[item.id] ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
                role="region"
              >
                <div className="text-gray-300 text-base leading-relaxed pr-10">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;