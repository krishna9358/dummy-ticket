'use client';
import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, Plane, Hotel, Plus, Minus, ArrowRight } from "lucide-react";
import DotPattern from './ui/dot-pattern';
import { cn } from "@/lib/utils";


interface FormData {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  travelers: number | void;
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
  });

  const addCity = () => {
    setCities([...cities, { from: '', to: '' }]);
  };

  const removeCity = (index: number) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities(newCities);
  };

  const updateCity = (index: number, field: 'from' | 'to', value: string) => {
    const newCities = [...cities];
    newCities[index][field] = value;
    setCities(newCities);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTravelerChange = (value: number) => {
    setFormData({
      ...formData,
      travelers: value,
    });
  };

  const handleSubmitToEmail = async (e: FormEvent) => {
    e.preventDefault();

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
            <p className="text-sm text-gray-500">Sample dummy {reservationType}</p>
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
                    {tripType === 'multiCity' && index > 0 && (
                      <Button variant="outline" size="sm" onClick={() => removeCity(index)}>
                        <Minus className="mr-2 h-4 w-4" /> Remove City
                      </Button>
                    )}
                  </div>
                ))}

                {tripType === 'multiCity' && (
                  <Button variant="outline" onClick={addCity}>
                    <Plus className="mr-2 h-4 w-4" /> Add City
                  </Button>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departure">Departure</Label>
                    <div className="relative">
                      <Input id="departure" name="departureDate" type="date" value={formData.departureDate} onChange={handleChange} />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  {tripType === 'roundTrip' && (
                    <div>
                      <Label htmlFor="return">Return</Label>
                      <div className="relative">
                        <Input id="return" name="returnDate" type="date" value={formData.returnDate} onChange={handleChange} />
                        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="travelers">Travelers</Label>
                  <Select>
                    <SelectTrigger id="travelers" className="bg-white">
                      <SelectValue placeholder="Select number of travelers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1" onClick={() => handleTravelerChange(1)}>1</SelectItem>
                      <SelectItem value="2" onClick={() => handleTravelerChange(2)}>2</SelectItem>
                      <SelectItem value="3" onClick={() => handleTravelerChange(3)}>3</SelectItem>
                      <SelectItem value="4" onClick={() => handleTravelerChange(4)}>4</SelectItem>
                      <SelectItem value="5" onClick={() => handleTravelerChange(5)}>5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="hotelName">Hotel Name</Label>
                  <Input id="hotelName" name="hotelName" placeholder="e.g. Hilton" value={formData.hotelName} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="hotelLocation">Hotel Location</Label>
                  <Input id="hotelLocation" name="hotelLocation" placeholder="e.g. New York" value={formData.hotelLocation} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkInDate">Check-in Date</Label>
                    <div className="relative">
                      <Input id="checkInDate" name="checkInDate" type="date" value={formData.checkInDate} onChange={handleChange} />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="checkOutDate">Check-out Date</Label>
                    <div className="relative">
                      <Input id="checkOutDate" name="checkOutDate" type="date" value={formData.checkOutDate} onChange={handleChange} />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select>
                    <SelectTrigger id="guests" className="bg-white">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1" onClick={() => handleTravelerChange(1)}>1</SelectItem>
                      <SelectItem value="2" onClick={() => handleTravelerChange(2)}>2</SelectItem>
                      <SelectItem value="3" onClick={() => handleTravelerChange(3)}>3</SelectItem>
                      <SelectItem value="4" onClick={() => handleTravelerChange(4)}>4</SelectItem>
                      <SelectItem value="5" onClick={() => handleTravelerChange(5)}>5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" placeholder="123 Main St" value={formData.address} onChange={handleChange} />
            </div>

            <Button type="submit" variant="default" className="w-full">
            <span className="flex items-center">
                 Get Dummy {reservationType === 'flight' ? 'Ticket' : 'Reservation'}
                      <ArrowRight className="ml-1.5 w-5 h-5" />
                    </span>
            </Button>
          </form>
        </div>
        <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
      </div>

    </div>
  );
}
