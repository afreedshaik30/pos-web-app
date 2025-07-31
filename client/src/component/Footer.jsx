import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-sky-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-pink-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-red-600">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
