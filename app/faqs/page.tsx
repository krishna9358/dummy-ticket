"use client"

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

type FAQItem = {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is a connecting flight?",
    answer: "A connecting flight is an itinerary that involves a stop and plane change at an intermediate airport between your departure and final destination. It often allows for more route options and sometimes lower fares."
  },
  {
    question: "How does reservation for visa application work?",
    answer: "For visa applications, we provide a tentative reservation valid for a specific period. This serves as proof of travel plans for your application. You can confirm or cancel based on your visa approval status, ensuring flexibility in your travel arrangements."
  },
  {
    question: "How soon will I get my flight and hotel reservation?",
    answer: "After completing your booking, you'll receive an email confirmation with your flight and hotel reservation details within 24 hours. In most cases, it's almost immediate, allowing you to start planning your trip right away."
  },
  {
    question: "Are these real flight tickets?",
    answer: "Yes, these are genuine flight tickets issued directly by airlines. We always recommend double-checking the details and contacting our customer service if you have any questions or concerns about your booking."
  },
  {
    question: "How do I check in for my flight?",
    answer: "Most airlines offer online check-in 24-48 hours before departure through their website or mobile app. This allows you to choose seats and print boarding passes in advance. Alternatively, you can check in at the airport counter if you prefer or need assistance."
  }
]

export default function Component() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-900 hover:text-blue-600 transition-colors duration-300"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="text-lg sm:text-xl">{item.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-gray-600 text-base sm:text-lg">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}