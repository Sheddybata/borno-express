import React from 'react';
import { MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';

const Hero: React.FC = () => {
  const { fromLocation, toLocation, setFromLocation, setToLocation } = useAppContext();
  
  const maiduguriAreas = [
    'Bulumkutu',
    'Gwange',
    'Hausari',
    'Jere',
    'Konduga',
    'Lamisula',
    'Mairi',
    'Monday Market',
    'Post Office Area',
    'Railway',
    'Shehuri North',
    'Shehuri South',
    'Tashan Bama',
    'University of Maiduguri'
  ];

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Go anywhere in
              <span className="text-yellow-400 block">Maiduguri</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-lg">
              Fast, reliable, and affordable transportation services around Maiduguri, Borno State.
            </p>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-100 mb-2">From</p>
                    <Select value={fromLocation} onValueChange={setFromLocation}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Select pickup area" />
                      </SelectTrigger>
                      <SelectContent>
                        {maiduguriAreas.map((area) => (
                          <SelectItem key={area} value={area}>{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-100 mb-2">To</p>
                    <Select value={toLocation} onValueChange={setToLocation}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {maiduguriAreas.map((area) => (
                          <SelectItem key={area} value={area}>{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;