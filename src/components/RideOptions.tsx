import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Users, Zap, Clock } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const RideOptions: React.FC = () => {
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const { fromLocation, toLocation } = useAppContext();

  const rideTypes = [
    {
      id: 'economy',
      name: 'E-star Economy',
      icon: Car,
      time: '5-10 min',
      price: '₦500',
      description: 'Affordable rides around Maiduguri',
      color: 'bg-blue-50 border-blue-200',
      image: 'https://d64gsuwffb70l.cloudfront.net/6849f20c96d8ea3eaf8704e6_1751360333624_4aa59213.webp'
    },
    {
      id: 'premium',
      name: 'E-star Premium',
      icon: Users,
      time: '7-12 min',
      price: '₦800',
      description: 'Comfortable rides with AC',
      color: 'bg-yellow-50 border-yellow-200',
      image: 'https://d64gsuwffb70l.cloudfront.net/6849f20c96d8ea3eaf8704e6_1751360333624_4aa59213.webp'
    },
    {
      id: 'express',
      name: 'E-star Express',
      icon: Zap,
      time: '3-8 min',
      price: '₦1200',
      description: 'Fastest rides in Maiduguri',
      color: 'bg-blue-50 border-blue-200',
      image: 'https://d64gsuwffb70l.cloudfront.net/6849f20c96d8ea3eaf8704e6_1751360333624_4aa59213.webp'
    }
  ];

  const handleRideSelect = (rideId: string) => {
    setSelectedRide(rideId);
  };

  const handleBookRide = () => {
    const selectedRideData = rideTypes.find(ride => ride.id === selectedRide);
    if (selectedRideData) {
      alert(`Booking ${selectedRideData.name} from ${fromLocation} to ${toLocation} for ${selectedRideData.price}`);
    }
  };

  const canBookRide = selectedRide && fromLocation && toLocation;

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose your <span className="text-blue-600">ride</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our range of taxi options in Maiduguri, Borno State
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          {rideTypes.map((ride) => {
            const IconComponent = ride.icon;
            const isSelected = selectedRide === ride.id;
            return (
              <Card 
                key={ride.id} 
                className={`${ride.color} ${isSelected ? 'ring-2 ring-blue-500' : ''} hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
                onClick={() => handleRideSelect(ride.id)}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img 
                      src={ride.image} 
                      alt={ride.name}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white p-3 rounded-full">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{ride.time}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{ride.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{ride.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{ride.price}</span>
                    <span className="text-sm text-gray-500">Est. fare</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {canBookRide && (
          <div className="text-center">
            <Button 
              onClick={handleBookRide}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg"
            >
              Book Ride
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideOptions;