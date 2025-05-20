import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-purple-100 text-white py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-800">
          &copy; 2025 Dummy Company. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-800 hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-800 hover:text-white transition">
            Terms of Service
          </a>
          <a href="#" className="text-gray-800 hover:text-white transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer