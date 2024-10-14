import { Search, CheckCircle, UserCheck, FileText } from 'lucide-react'

const steps = [
  {
    icon: <Search className="w-12 h-12 text-blue-500" />,
    title: "Search for Flight or Hotel",
    description: "Search for the Flight or Hotel by fill in the booking form."
  },
  {
    icon: <CheckCircle className="w-12 h-12 text-green-500" />,
    title: "Fill the form",
    description: "View flight or hotel details and fill the form"
  },
  {
    icon: <UserCheck className="w-12 h-12 text-orange-500" />,
    title: "Confirm Your Booking",
    description: "Confirm your booking detail by paying the amount."
  },
  {
    icon: <FileText className="w-12 h-12 text-purple-500" />,
    title: "Get your ticket on Mail",
    description: "Your booking will be ready for you and you will get the ticket through mail."
  }
]

export default function BookingProcess() {
  return (
    <div className="relative min-h-screen p-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-green-200/30 animate-gradient-x"></div>
      <div className="relative max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in">How to book dummy flight?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
              <div className="mb-4 animate-bounce-slow">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}