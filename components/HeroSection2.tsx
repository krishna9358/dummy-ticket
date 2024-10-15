'use client';
import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plane, Hotel, Plus, Minus, ArrowRight } from "lucide-react";
import DotPattern from './ui/dot-pattern';
import { cn } from "@/lib/utils";

// Interface for FormData
interface FormData {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
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
  reservationType: string;  // Added reservationType to FormData
}

export default function HeroSection() {
  const [reservationType, setReservationType] = useState('flight');
  const [tripType, setTripType] = useState('roundTrip');
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
    reservationType: 'flight',  // Default reservationType is 'flight'
  });

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle traveler change for flight
  const handleTravelerChange = (value: number) => {
    if (value < 1) return;
    setFormData({
      ...formData,
      travelers: value,
    });
  };

  // Handle guest change for hotel
  const handleGuestChange = (value: number) => {
    if (value < 1) return;
    setFormData({
      ...formData,
      guests: value,
    });
  };

  // Validate form data before submission
  const validateForm = () => {
    if (reservationType === "flight") {
      if (!formData.name || !formData.email || !formData.phone  || !formData.departureDate) {
        alert("Please fill in all required flight details.");
        return false;
      }

      if (tripType === 'roundTrip' && !formData.returnDate) {
        alert("Please fill in return date for round trip.");
        return false;
      }

      if (tripType === 'roundTrip') {
        const departure = new Date(formData.departureDate);
        const returnDate = new Date(formData.returnDate || '');
        if (returnDate <= departure) {
          alert('Return date must be after the departure date.');
          return false;
        }
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

    const finalFormData = {
      ...formData,
      reservationType,  // Include reservationType in form data
    };

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalFormData),
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
            Get A Dummy {reservationType === 'flight' ? 'Flight' : 'Hotel Reservation'} For Only $8
          </h1>
          <p className="text-gray-600 mb-6">
            Our dummy {reservationType} is valid for a visa application and serves as proof of travel or accommodation. We
            are the cheapest and the fastest dummy {reservationType} service online. No need to wait. Your dummy {reservationType}
            will be ready for you to download on checkout!
          </p>
          <div className="bg-gray-100 p-6 rounded-lg">
            <img src="/ticket.png" alt="Sample Ticket" className="w-full mb-4" />
          </div>
        </div>

        <div className="md:flex-1 p-8 bg-gray-50">
          <div className="flex space-x-4 mb-6">
            <Button
              variant={reservationType === 'flight' ? "default" : "outline"}
              className="flex-1"
              onClick={() => {
                setReservationType('flight');
                setFormData({ ...formData, reservationType: 'flight' });
              }}
            >
              <Plane className="mr-2 h-4 w-4" /> Flight Reservation
            </Button>
            <Button
              variant={reservationType === 'hotel' ? "default" : "outline"}
              className="flex-1"
              onClick={() => {
                setReservationType('hotel');
                setFormData({ ...formData, reservationType: 'hotel' });
              }}
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
                </RadioGroup>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from">From</Label>
                    <Input
                      id="from"
                      name="from"
                      placeholder="City of Origin"
                      value={formData.from}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="to">To</Label>
                    <Input
                      id="to"
                      name="to"
                      placeholder="Destination"
                      value={formData.to}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departureDate">Departure Date</Label>
                    <Input
                      id="departureDate"
                      name="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={handleChange}
                    />
                  </div>
                  {tripType === 'roundTrip' && (
                    <div>
                      <Label htmlFor="returnDate">Return Date</Label>
                      <Input
                        id="returnDate"
                        name="returnDate"
                        type="date"
                        value={formData.returnDate}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label>Travelers</Label>
                  <div className="flex items-center">
                    <Button variant="outline" className="mr-2" onClick={() => handleTravelerChange(formData.travelers - 1)}>
                      <Minus />
                    </Button>
                    <Input type="number" value={formData.travelers} className="w-16 text-center" readOnly />
                    <Button variant="outline" className="ml-2" onClick={() => handleTravelerChange(formData.travelers + 1)}>
                      <Plus />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="hotelName">Hotel Name</Label>
                  <Input id="hotelName" name="hotelName" placeholder="Hotel Name" value={formData.hotelName} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="hotelLocation">Hotel Location</Label>
                  <Input id="hotelLocation" name="hotelLocation" placeholder="City of the Hotel" value={formData.hotelLocation} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkInDate">Check-In Date</Label>
                    <Input
                      id="checkInDate"
                      name="checkInDate"
                      type="date"
                      value={formData.checkInDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkOutDate">Check-Out Date</Label>
                    <Input
                      id="checkOutDate"
                      name="checkOutDate"
                      type="date"
                      value={formData.checkOutDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label>Guests</Label>
                  <div className="flex items-center">
                    <Button variant="outline" className="mr-2" onClick={() => handleGuestChange((formData.guests ?? 1) - 1)}>
                      <Minus />
                    </Button>
                    <Input type="number" value={formData.guests} className="w-16 text-center" readOnly />
                    <Button variant="outline" className="ml-2" onClick={() => handleGuestChange((formData.guests ?? 1) + 1)}>
                      <Plus />
                    </Button>
                  </div>
                </div>
              </>
            )}

            <Button type="submit" className="w-full mt-4">
              Proceed to Payment <ArrowRight className="mr-2 h-4 w-4" /> 
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
