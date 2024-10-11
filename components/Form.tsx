'use client';
import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button"; // Ensure these imports are correct
import { Label} from "@/components/ui/label"; // Ensure these imports are correct
import {Input} from "@/components/ui/input"; // Ensure these imports are correct
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Ensure these imports are correct
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Ensure these imports are correct

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
}

interface FormProps {
  className?: string; // Optional className prop
}

export default function Form({ className }: FormProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmitToWhatsApp = (e: FormEvent) => {
  //   e.preventDefault();
  //   const message = `Name: ${formData.name}, Email: ${formData.email}, From: ${formData.from}, To: ${formData.to}, Departure Date: ${formData.departureDate}, Return Date: ${formData.returnDate}, Travelers: ${formData.travelers}, Phone: ${formData.phone}, Address: ${formData.address}`;
    
  //   // Redirect to WhatsApp with the form data
  //   const whatsappURL = `https://api.whatsapp.com/send?phone=9358524849&text=${encodeURIComponent(message)}`;
  //   window.open(whatsappURL, '_blank');
  // };

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
    <div className={`flex flex-col justify-center ${className}`}>
    <form className="space-y-4" onSubmit={handleSubmitToEmail}>      
      {/* <RadioGroup defaultValue="roundTrip" className="flex">
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
      </RadioGroup> */}

      <div className="grid gap-2">
        <Label htmlFor="from">From</Label>
        <Input id="from" name="from" placeholder="e.g. Tokyo" className="bg-white" value={formData.from} onChange={handleChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="to">To</Label>
        <Input id="to" name="to" placeholder="e.g. Paris" className="bg-white" value={formData.to} onChange={handleChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="departureDate">Departure Date</Label>
        <Input id="departureDate" name="departureDate" type="date" className="bg-white" value={formData.departureDate} onChange={handleChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="returnDate">Return Date</Label>
        <Input id="returnDate" name="returnDate" type="date" className="bg-white" value={formData.returnDate} onChange={handleChange} />
      </div>

      

      <div className="grid gap-2">
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
              </SelectContent>
            </Select>
          </div>
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="Enter your full name" className="bg-white" value={formData.name} onChange={handleChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Enter your email" className="bg-white" value={formData.email} onChange={handleChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" className="bg-white" value={formData.phone} onChange={handleChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Current Address</Label>
        <Input id="address" name="address" placeholder="Enter your current address" className="bg-white" value={formData.address} onChange={handleChange} />
      </div>
      <div className="flex justify-between">
        <Button className="w-full bg-orange-500 hover:bg-orange-600" type="submit">
          Send to Email
        </Button>
        {/* <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleSubmitToWhatsApp}>
          Send to WhatsApp
        </Button> */}
      </div>
    </form>
    </div>
  );
}
