"use client"
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plane, Hotel, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/animated-grid-pattern";

export default function HeroSection() {
  const [tripType, setTripType] = useState('roundTrip')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex">
        <div className="md:flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Get A Dummy Flight For Only $15</h1>
          <p className="text-gray-600 mb-6">
            Our dummy flight is valid for a visa application and serves as proof of travel or return ticket. We
            are the cheapest and the fastest dummy flight service online. No need to wait. Your dummy flight
            will be ready for you to download on checkout!
          </p>
          <div className="bg-gray-100 p-6 rounded-lg">
            <img src="/img/ticket.png" alt="Sample Ticket" className="w-full mb-4" />
            <p className="text-sm text-gray-500">Sample dummy ticket</p>
          </div>
        </div>
        <div className="md:flex-1 p-8 bg-gray-50">
          <div className="flex space-x-4 mb-6">
            <Button variant="outline" className="flex-1">
              <Plane className="mr-2 h-4 w-4" /> Flight Reservation
            </Button>
            <Button variant="outline" className="flex-1">
              <Hotel className="mr-2 h-4 w-4" /> Hotel Reservation
            </Button>
          </div>
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from">From</Label>
                <Input id="from" placeholder="e.g. Tokyo" />
              </div>
              <div>
                <Label htmlFor="to">To</Label>
                <Input id="to" placeholder="e.g. Paris" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="departure">Departure</Label>
                <div className="relative">
                  <Input id="departure" type="date" />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <Label htmlFor="return">Return</Label>
                <div className="relative">
                  <Input id="return" type="date" disabled={tripType === 'oneWay'} />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="transit">Exclude Transit Through</Label>
              <Input id="transit" placeholder="e.g. United States" />
            </div>
            <div>
              <Label htmlFor="travelers">Travelers</Label>
              <Input id="travelers" placeholder="1 Adult" />
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              <span className="flex items-center">
                      Next <ArrowRight className="ml-1.5 w-5 h-5" />
                    </span></Button>
          </div>
        </div>
      </div>
      <GridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </div>
  )
}