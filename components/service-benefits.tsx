import { FileText, Ban,  CalendarDays } from 'lucide-react'

const benefits = [
  {
    icon: <FileText className="w-8 h-8 text-blue-500" />,
    title: "No Waiting",
    description: "Delivered as PDF on checkout."
  },
  {
    icon: <Ban className="w-8 h-8 text-blue-500" />,
    title: "No cancellation fee",
    description: ""
  },
  {
    title: "Transit Visa",
    description: "Avoid flight transit in any country that require a transit visa."
  },
  {
    icon: <CalendarDays className="w-8 h-8 text-green-500" />,
    title: "Change Plan",
    description: "No fee to change date in case your travel plan change."
  }
]

export default function ServiceBenefits() {
  return (
    <div className="relative min-h-screen p-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-green-200/30 animate-gradient-x"></div>
      <div className="relative max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in">Why You Should Use Our Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg p-6 flex items-start transform hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
              <div className="mr-4 bg-gray-100 rounded-full p-3 animate-pulse">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}