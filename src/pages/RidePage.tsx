import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Car, Users, Zap, Clock, MapPin, Navigation, 
  History, Star, Heart, Share2, Radio, 
  User, Phone, Plus, Copy
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface RideHistory {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  driver: string;
  driverRating: number;
  rideType: string;
  status: 'completed' | 'cancelled';
}

interface FavoriteLocation {
  id: string;
  name: string;
  address: string;
  type: 'home' | 'work' | 'favorite';
  icon: string;
}

const RidePage: React.FC = () => {
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'book' | 'history' | 'favorites' | 'tracking'>('book');
  const [showRating, setShowRating] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareCode, setShareCode] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const { fromLocation, toLocation, setFromLocation, setToLocation } = useAppContext();

  const maiduguriAreas = [
    'Bulumkutu', 'Gwange', 'Hausari', 'Jere', 'Konduga',
    'Lamisula', 'Mairi', 'Monday Market', 'Post Office Area',
    'Railway', 'Shehuri North', 'Shehuri South', 'Tashan Bama',
    'University of Maiduguri'
  ];

  const [favorites, setFavorites] = useState<FavoriteLocation[]>([
    { id: '1', name: 'Home', address: 'Gwange', type: 'home', icon: '🏠' },
    { id: '2', name: 'Work', address: 'Monday Market', type: 'work', icon: '💼' },
    { id: '3', name: 'University', address: 'University of Maiduguri', type: 'favorite', icon: '🎓' },
  ]);

  const [rideHistory, setRideHistory] = useState<RideHistory[]>([
    {
      id: '1',
      from: 'Gwange',
      to: 'Monday Market',
      date: '2024-01-15',
      time: '10:30 AM',
      price: 500,
      driver: 'Ahmed Musa',
      driverRating: 4.5,
      rideType: 'E-star Economy',
      status: 'completed'
    },
    {
      id: '2',
      from: 'University of Maiduguri',
      to: 'Post Office Area',
      date: '2024-01-14',
      time: '2:15 PM',
      price: 800,
      driver: 'Ibrahim Ali',
      driverRating: 5.0,
      rideType: 'E-star Premium',
      status: 'completed'
    },
    {
      id: '3',
      from: 'Shehuri North',
      to: 'Railway',
      date: '2024-01-13',
      time: '8:45 AM',
      price: 1200,
      driver: 'Mohammed Bello',
      driverRating: 4.0,
      rideType: 'E-star Express',
      status: 'completed'
    },
  ]);

  const rideTypes = [
    {
      id: 'economy',
      name: 'E-star Economy',
      icon: Car,
      time: '5-10 min',
      price: '₦500',
      description: 'Affordable rides around Maiduguri',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      id: 'premium',
      name: 'E-star Premium',
      icon: Users,
      time: '7-12 min',
      price: '₦800',
      description: 'Comfortable rides with AC',
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600',
    },
    {
      id: 'express',
      name: 'E-star Express',
      icon: Zap,
      time: '3-8 min',
      price: '₦1200',
      description: 'Fastest rides in Maiduguri',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
    }
  ];

  const handleRideSelect = (rideId: string) => {
    setSelectedRide(rideId);
  };

  const handleBookRide = () => {
    const selectedRideData = rideTypes.find(ride => ride.id === selectedRide);
    if (selectedRideData) {
      setIsTracking(true);
      setActiveTab('tracking');
      // Simulate ride booking
    }
  };

  const handleRateDriver = (rideId: string) => {
    setShowRating(rideId);
  };

  const submitRating = () => {
    if (rating > 0) {
      // Update ride history with rating
      setRideHistory(prev => prev.map(ride => 
        ride.id === showRating ? { ...ride, driverRating: rating } : ride
      ));
      setShowRating(null);
      setRating(0);
      setRatingComment('');
      alert('Thank you for your rating!');
    }
  };

  const handleShareRide = () => {
    const code = `RIDE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setShareCode(code);
    setShowShareDialog(true);
  };

  const addToFavorites = (location: string, type: 'home' | 'work' | 'favorite') => {
    const newFavorite: FavoriteLocation = {
      id: Date.now().toString(),
      name: type === 'home' ? 'Home' : type === 'work' ? 'Work' : location,
      address: location,
      type,
      icon: type === 'home' ? '🏠' : type === 'work' ? '💼' : '⭐'
    };
    setFavorites(prev => [...prev, newFavorite]);
  };

  const canBookRide = selectedRide && fromLocation && toLocation;

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-12 pb-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Book a Ride</h1>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-4 bg-white/20">
            <TabsTrigger value="book" className="text-xs text-white data-[state=active]:bg-white/30">
              Book
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs text-white data-[state=active]:bg-white/30">
              <History className="h-3 w-3 mr-1" />
              History
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-xs text-white data-[state=active]:bg-white/30">
              <Heart className="h-3 w-3 mr-1" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="tracking" className="text-xs text-white data-[state=active]:bg-white/30">
              <Radio className="h-3 w-3 mr-1" />
              Track
            </TabsTrigger>
          </TabsList>

          {/* Book Tab */}
          <TabsContent value="book" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-blue-100 text-xs mb-1">From</p>
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
                  <p className="text-blue-100 text-xs mb-1">To</p>
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
          </TabsContent>
        </Tabs>
      </div>

      <div className="px-4 py-6">
        {activeTab === 'book' && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose your ride</h2>
            
            <div className="space-y-3 mb-6">
              {rideTypes.map((ride) => {
                const IconComponent = ride.icon;
                const isSelected = selectedRide === ride.id;
                
                return (
                  <Card
                    key={ride.id}
                    className={cn(
                      ride.color,
                      isSelected && 'ring-2 ring-blue-500 shadow-lg',
                      'cursor-pointer transition-all'
                    )}
                    onClick={() => handleRideSelect(ride.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className={`bg-white p-3 rounded-full ${ride.iconColor}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{ride.name}</h3>
                            <p className="text-sm text-gray-600">{ride.description}</p>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{ride.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-blue-600">{ride.price}</p>
                          <p className="text-xs text-gray-500">Est. fare</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {canBookRide && (
              <div className="space-y-3">
                <Button
                  onClick={handleBookRide}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold rounded-lg shadow-lg"
                  size="lg"
                >
                  <Navigation className="h-5 w-5 mr-2" />
                  Book Ride Now
                </Button>
                <Button
                  onClick={handleShareRide}
                  variant="outline"
                  className="w-full"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Ride Cost
                </Button>
              </div>
            )}
          </>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ride History</h2>
            {rideHistory.map((ride) => (
              <Card key={ride.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold">{ride.from} → {ride.to}</span>
                      </div>
                      <p className="text-sm text-gray-600">{ride.rideType}</p>
                      <p className="text-xs text-gray-500 mt-1">{ride.date} • {ride.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">₦{ride.price}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{ride.driverRating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-xs text-gray-500">Driver</p>
                      <p className="text-sm font-medium">{ride.driver}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRateDriver(ride.id)}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Rate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Favorite Locations</h2>
            {favorites.map((fav) => (
              <Card key={fav.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{fav.icon}</div>
                      <div>
                        <p className="font-semibold">{fav.name}</p>
                        <p className="text-sm text-gray-600">{fav.address}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setFromLocation(fav.address);
                        setActiveTab('book');
                      }}
                    >
                      Use
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="border-dashed">
              <CardContent className="p-4 text-center">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (fromLocation) {
                      addToFavorites(fromLocation, 'favorite');
                    }
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Current Location
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="space-y-4">
            {isTracking ? (
              <>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <Radio className="h-12 w-12 text-green-600 mx-auto mb-2 animate-pulse" />
                      <h3 className="text-lg font-bold text-gray-900">Driver En Route</h3>
                      <p className="text-sm text-gray-600 mt-1">Your driver is on the way</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-semibold">Ahmed Musa</p>
                            <p className="text-xs text-gray-500">Toyota Corolla • ABC 123 XY</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">4.8</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-semibold">ETA</p>
                            <p className="text-xs text-gray-500">Estimated arrival</p>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-blue-600">5 min</p>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-semibold">Distance</p>
                            <p className="text-xs text-gray-500">From your location</p>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-blue-600">2.3 km</p>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        // Simulate ride completion
                        setIsTracking(false);
                        setActiveTab('history');
                      }}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Driver
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-12">
                <Radio className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No active ride</p>
                <p className="text-sm text-gray-400 mt-1">Book a ride to start tracking</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Rating Dialog */}
      <Dialog open={showRating !== null} onOpenChange={() => setShowRating(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Driver</DialogTitle>
            <DialogDescription>
              How was your ride experience?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-colors",
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                </button>
              ))}
            </div>
            <div>
              <Label>Comments (Optional)</Label>
              <Textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="Tell us about your experience..."
                className="mt-2"
                rows={3}
              />
            </div>
            <Button
              onClick={submitRating}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={rating === 0}
            >
              Submit Rating
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Ride Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Ride Cost</DialogTitle>
            <DialogDescription>
              Share this code with friends to split the ride cost
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600 mb-2">{shareCode}</p>
              <p className="text-sm text-gray-600">Share this code with your friends</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  navigator.clipboard.writeText(shareCode);
                  alert('Code copied to clipboard!');
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  // Share functionality
                  alert('Share feature coming soon!');
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RidePage;
