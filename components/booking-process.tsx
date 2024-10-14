import { Search, CheckCircle, UserCheck, FileText } from 'lucide-react'

const steps = [
  {
    icon: <Search className="w-12 h-12 text-blue-500" />,
    title: "Search for Flight or Hotel",
    description: "Search for the Flight or Hotel by fill in the booking form."
  },
  {
    icon: <CheckCircle className="w-12 h-12 text-green-500" />,
    title: "Select Flight or Hotel",
    description: "View flight or hotel details or directly select the service"
  },
  {
    icon: <UserCheck className="w-12 h-12 text-orange-500" />,
    title: "Confirm Your Booking",
    description: "Confirm your booking detail and pay to get dummy flight."
  },
  {
    icon: <FileText className="w-12 h-12 text-purple-500" />,
    title: "Download Your Ticket",
    description: "Your booking will be ready for you to download and print out immediately"
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
      <div className="absolute top-10 left-10 animate-float">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21H21" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 21V7L13 3V21" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 21V11L13 7" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 animate-float" style={{animationDelay: '2s'}}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2L11 13" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}