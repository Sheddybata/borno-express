import React from 'react';
import { Shield, Clock, CreditCard, MapPin, Star, Headphones } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All drivers are verified and licensed in Borno State with real-time tracking'
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Round-the-clock service across Maiduguri whenever you need a ride'
    },
    {
      icon: CreditCard,
      title: 'Easy Payment',
      description: 'Pay with cash, bank transfer, or mobile money (Naira only)'
    },
    {
      icon: MapPin,
      title: 'Live Tracking',
      description: 'Track your ride across Maiduguri in real-time and share with family'
    },
    {
      icon: Star,
      title: 'Top Rated',
      description: 'Highly rated local drivers with excellent knowledge of Maiduguri'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Customer support available in English and Hausa languages'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why choose <span className="text-yellow-500">Borno Express</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the best taxi service in Maiduguri with features designed for your comfort and safety
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-yellow-400 group-hover:to-yellow-500 transition-all duration-300">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;