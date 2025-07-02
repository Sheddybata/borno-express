import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, MapPin, User, Phone } from 'lucide-react';

const ParcelService: React.FC = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    recipientName: '',
    recipientPhone: '',
    pickupLocation: '',
    deliveryLocation: '',
    parcelDescription: '',
    parcelWeight: '',
    specialInstructions: ''
  });

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Parcel booking:', formData);
    // Handle parcel booking logic here
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Parcels</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Send your packages safely and quickly across Maiduguri with E-star Express
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sender Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Sender Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="senderName">Full Name</Label>
                  <Input
                    id="senderName"
                    value={formData.senderName}
                    onChange={(e) => handleInputChange('senderName', e.target.value)}
                    placeholder="Enter sender's name"
                  />
                </div>
                <div>
                  <Label htmlFor="senderPhone">Phone Number</Label>
                  <Input
                    id="senderPhone"
                    value={formData.senderPhone}
                    onChange={(e) => handleInputChange('senderPhone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <Select onValueChange={(value) => handleInputChange('pickupLocation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup area" />
                    </SelectTrigger>
                    <SelectContent>
                      {maiduguriAreas.map((area) => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Recipient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Recipient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="recipientName">Full Name</Label>
                  <Input
                    id="recipientName"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange('recipientName', e.target.value)}
                    placeholder="Enter recipient's name"
                  />
                </div>
                <div>
                  <Label htmlFor="recipientPhone">Phone Number</Label>
                  <Input
                    id="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryLocation">Delivery Location</Label>
                  <Select onValueChange={(value) => handleInputChange('deliveryLocation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery area" />
                    </SelectTrigger>
                    <SelectContent>
                      {maiduguriAreas.map((area) => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Parcel Details */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Parcel Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parcelDescription">Parcel Description</Label>
                  <Input
                    id="parcelDescription"
                    value={formData.parcelDescription}
                    onChange={(e) => handleInputChange('parcelDescription', e.target.value)}
                    placeholder="What are you sending?"
                  />
                </div>
                <div>
                  <Label htmlFor="parcelWeight">Estimated Weight (kg)</Label>
                  <Input
                    id="parcelWeight"
                    type="number"
                    value={formData.parcelWeight}
                    onChange={(e) => handleInputChange('parcelWeight', e.target.value)}
                    placeholder="Enter weight"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  placeholder="Any special handling instructions?"
                  rows={3}
                />
              </div>
              <Button 
                onClick={handleSubmit}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
              >
                Book Parcel Delivery
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ParcelService;