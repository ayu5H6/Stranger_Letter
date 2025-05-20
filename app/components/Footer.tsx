import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-purple-500 text-white py-12 border-t-4 border-purple-600">
      <div className="w-full px-4 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p className="text-sm text-white">
          &copy; 2025 Dummy Company. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-white hover:text-gray-200 transition">
            Privacy Policy
          </a>
          <a href="#" className="text-white hover:text-gray-200 transition">
            Terms of Service
          </a>
          <a href="#" className="text-white hover:text-gray-200 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer