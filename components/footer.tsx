export default function Footer(){

    return <>
    <footer id="footer" className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400 ml-2">We provide dummy flight and hotel bookings for visa applications and travel planning purposes.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: fly365.in@gmail.com</p>
              <p className="text-gray-400">Phone: +91 7071341203</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Dummy Ticket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
}