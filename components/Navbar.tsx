"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu,  Plane, Hotel, CreditCard, HelpCircle } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const NavItems = () => (
    <>
      <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Home</a>
      <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">About</a>
      <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Services</a>
      <a href="#footer" className="text-gray-700 hover:text-orange-500 transition-colors">Contact</a>
    </>
  )

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-xl text-gray-800">DummyTicket</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <NavItems />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-orange-500 hover:bg-orange-50">
              <Hotel className="mr-2 h-4 w-4" />
              Hotels
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-orange-500 hover:bg-orange-50">
              <CreditCard className="mr-2 h-4 w-4" />
              Pricing
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-orange-500 hover:bg-orange-50">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-4">
                <NavItems />
                <Button variant="ghost" className="justify-start">
                  <Hotel className="mr-2 h-4 w-4" />
                  Hotels
                </Button>
                <Button variant="ghost" className="justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pricing
                </Button>
                <Button variant="ghost" className="justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}