"use client"
import { Plane, Hotel, Check } from 'lucide-react'

const pricingOptions = [
  {
    icon: <Plane className="w-6 h-6 text-white" />,
    title: "Dummy Flight",
    price: "$8",
    features: [
      "Instant Download On Checkout",
      "No Fee To Change Date"
    ],
    buttonText: "GET STARTED"
  },
  {
    icon: <Hotel className="w-6 h-6 text-white" />,
    title: "Dummy Hotel",
    price: "$8",
    features: [
      "Unlimited Stays Duration",
      "No Fee To Change Date"
    ],
    buttonText: "GET STARTED"
  }
]

export default function PricingSection() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Pricing</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {pricingOptions.map((option, index) => (
            <div key={index} className="w-full md:w-[calc(50%-1rem)] max-w-md">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-blue-600 flex items-center justify-center transform -skew-y-6">
                  <div className="transform skew-y-6 text-white font-bold text-xl writing-mode-vertical">
                    BOARDING PASS
                  </div>
                </div>
                <div className="p-8 pl-24">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 p-2 rounded-full mr-3">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{option.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">What You will Get</p>
                  <ul className="mb-8">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-center mb-2">
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-4xl font-bold">{option.price}</span>
                      <span className="text-gray-600">/Per Person or Child</span>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                      {option.buttonText}
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-4 bg-white"></div>
              <div className="ticket-bottom"></div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .ticket-bottom {
          height: 20px;
          background-image: radial-gradient(circle at 10px -5px, transparent 12px, white 13px);
          background-size: 20px 20px;
          background-position: -10px 0;
        }
      `}</style>
    </div>
  )
}