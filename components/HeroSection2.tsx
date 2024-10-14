'use client';
import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {  Plane, Hotel, Plus, Minus, ArrowRight } from "lucide-react";
import DotPattern from './ui/dot-pattern';
import { cn } from "@/lib/utils";

// Interface for FormData
interface FormData {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  hotelName?: string;
  hotelLocation?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: number;
  roomType?: string;
}

export default function HeroSection() {
  const [reservationType, setReservationType] = useState('flight');
  const [tripType, setTripType] = useState('roundTrip');
  const [cities, setCities] = useState([{ from: '', to: '' }]);
  const [formData, setFormData] = useState<FormData>({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    travelers: 1,
    name: '',
    email: '',
    phone: '',
    address: '',
    hotelName: '',
    hotelLocation: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
  });

  // Add a new city for multi-city trips
  const addCity = () => {
    setCities([...cities, { from: '', to: '' }]);
  };

  // Remove a city from multi-city trips
  const removeCity = (index: number) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities(newCities);
  };

  // Update cities (from and to fields)
  const updateCity = (index: number, field: 'from' | 'to', value: string) => {
    const newCities = [...cities];
    newCities[index][field] = value;
    setCities(newCities);
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle traveler change for flight
  const handleTravelerChange = (value: number) => {
    setFormData({
      ...formData,
      travelers: value,
    });
  };

  // Handle guest change for hotel
  const handleGuestChange = (value: number) => {
    setFormData({
      ...formData,
      guests: value,
    });
  };

  // Validate form data before submission
  const validateForm = () => {


    if (reservationType === "flight") {
      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.from || !formData.to || !formData.departureDate) {
        alert("Please fill in all flight details.");
        return false;
      }
    } else if (reservationType === "hotel") {
      if (!formData.name || !formData.email || !formData.phone || !formData.hotelName || !formData.hotelLocation || !formData.checkInDate || !formData.checkOutDate) {
        alert("Please fill in all hotel reservation details.");
        return false;
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmitToEmail = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Email sent successfully!');
    } else {
      alert('Failed to send email');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex">
        <div className="md:flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Get A Dummy {reservationType === 'flight' ? 'Flight' : 'Hotel Reservation'} For Only $15
          </h1>
          <p className="text-gray-600 mb-6">
            Our dummy {reservationType} is valid for a visa application and serves as proof of travel or accommodation. We
            are the cheapest and the fastest dummy {reservationType} service online. No need to wait. Your dummy {reservationType}
            will be ready for you to download on checkout!
          </p>
          <div className="bg-gray-100 p-6 rounded-lg">
            <img src="/ticket.png" alt="Sample Ticket" className="w-full mb-4" />
            {/* <p className="text-sm text-gray-500">Sample dummy {reservationType}</p> */}
          </div>
        </div>

        <div className="md:flex-1 p-8 bg-gray-50">
          <div className="flex space-x-4 mb-6">
            <Button
              variant={reservationType === 'flight' ? "default" : "outline"}
              className="flex-1"
              onClick={() => setReservationType('flight')}
            >
              <Plane className="mr-2 h-4 w-4" /> Flight Reservation
            </Button>
            <Button
              variant={reservationType === 'hotel' ? "default" : "outline"}
              className="flex-1"
              onClick={() => setReservationType('hotel')}
            >
              <Hotel className="mr-2 h-4 w-4" /> Hotel Reservation
            </Button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmitToEmail}>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+1 234 567 8900" value={formData.phone} onChange={handleChange} />
            </div>

            {reservationType === 'flight' ? (
              <>
                <RadioGroup className="flex space-x-4 mb-6" value={tripType} onValueChange={setTripType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oneWay" id="oneWay" />
                    <Label htmlFor="oneWay">One-way</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="roundTrip" id="roundTrip" />
                    <Label htmlFor="roundTrip">Round Trip</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multiCity" id="multiCity" />
                    <Label htmlFor="multiCity">Multi City</Label>
                  </div>
                </RadioGroup>

                {cities.map((city, index) => (
                  <div key={index} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`from-${index}`}>From</Label>
                        <Input
                          id={`from-${index}`}
                          placeholder="e.g. Tokyo"
                          value={city.from}
                          onChange={(e) => updateCity(index, 'from', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`to-${index}`}>To</Label>
                        <Input
                          id={`to-${index}`}
                          placeholder="e.g. Paris"
                          value={city.to}
                          onChange={(e) => updateCity(index, 'to', e.target.value)}
                        />
                      </div>
                    </div>
                    {tripType === 'multiCity' && cities.length > 1 && (
                      <Button type="button" variant="outline" onClick={() => removeCity(index)}>
                        <Minus className="mr-2 h-4 w-4" /> Remove City
                      </Button>
                    )}
                  </div>
                ))}

                {tripType === 'multiCity' && (
                  <Button type="button" variant="outline" onClick={addCity}>
                    <Plus className="mr-2 h-4 w-4" /> Add City
                  </Button>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departureDate">Departure Date</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                    />
                  </div>
                  {tripType !== 'oneWay' && (
                    <div>
                      <Label htmlFor="returnDate">Return Date</Label>
                      <Input
                        id="returnDate"
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="travelers">Number of Travelers</Label>
                  <Select onValueChange={(value) => handleTravelerChange(Number(value))}>
                    <SelectTrigger id="travelers" className="bg-white">
                      <SelectValue placeholder="Select number of travelers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(6)].map((_, i) => (
                        <SelectItem key={i} value={String(i + 1)}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="hotelName">Hotel Name</Label>
                  <Input
                    id="hotelName"
                    name="hotelName"
                    placeholder="Hotel California"
                    value={formData.hotelName || ''}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="hotelLocation">Hotel Location</Label>
                  <Input
                    id="hotelLocation"
                    name="hotelLocation"
                    placeholder="Los Angeles"
                    value={formData.hotelLocation || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkInDate">Check-in Date</Label>
                    <Input
                      id="checkInDate"
                      type="date"
                      name="checkInDate"
                      value={formData.checkInDate || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkOutDate">Check-out Date</Label>
                    <Input
                      id="checkOutDate"
                      type="date"
                      name="checkOutDate"
                      value={formData.checkOutDate || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select onValueChange={(value) => handleGuestChange(Number(value))}>
                    <SelectTrigger id="guests" className="bg-white">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(6)].map((_, i) => (
                        <SelectItem key={i} value={String(i + 1)}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="address">Billing Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" variant="default" className="w-full">
              <ArrowRight className="mr-2 h-4 w-4" /> Submit and Pay $15
            </Button>
          </form>
        </div>
      </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
}
