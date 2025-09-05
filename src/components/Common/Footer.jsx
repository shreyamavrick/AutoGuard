import { Send } from "lucide-react";
import logo from "../../assets/logo_ag.png";

const Footer = () => {
  return (
    <footer className="bg-[#0d0d0d] text-white pt-16 pb-8 px-6 md:px-12 rounded-t-3xl mt-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-neutral-300 text-sm">
          
          {/* Useful Links */}
          <div className="flex-shrink-0 mb-6 lg:mb-0">
            <img
              src={logo}
              
              className="w-32 md:w-40"
            />
          </div>
          <div>
            <h4 className="text-lg text-white font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
                <li><a href="/" className="hover:text-purple-500">Home</a></li>
                <li><a href="/about" className="hover:text-purple-500">About</a></li>
                <li><a href="/allservices" className="hover:text-purple-500">Services</a></li>
                <li><a href="/contact" className="hover:text-purple-500">Contact</a></li>
            </ul>

          </div>

          {/* Working Time */}
          <div>
            <h4 className="text-lg text-white font-semibold mb-4">Working Time</h4>
            <ul className="space-y-2">
              <li>Mon – Fri: 9.00am – 5.00pm</li>
              <li>Saturday: 10.00am – 6.00pm</li>
              <li>Sunday Closed</li>
            </ul>
          </div>

          {/* Say Hello */}
          <div>
            <h4 className="text-lg text-white font-semibold mb-4">Say Hello</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@vaahansuraksha.com" className="underline">
                  info@autoguard.com
                </a>
              </li>
              <li className="text-white font-bold">+1 800 123 456 789</li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-neutral-400 mt-10 text-sm">
  Copyright © 2025 {" "}
  <a
    href="https://maverickservices.in/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-purple-500 hover:underline"
  >
    Maverick
  </a>
  . All Rights Reserved.
</div>

      </div>
    </footer>
  );
};

export default Footer;
