import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">AdiSync Solutions</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for premium industrial hardware parts and machinery components. 
              Quality guaranteed with fast delivery across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Categories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Catalogues</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Product Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Excavator Parts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Engine Components</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Hydraulics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Electrical Parts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Transmission</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Tools & Hardware</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">+91 99642 64412</p>
                  <p className="text-gray-400 text-xs">Mon-Sat 9:00 AM - 6:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">irfanshaikh110805@gmail.com</p>
                  <p className="text-gray-400 text-xs">24/7 Email Support</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Mumbai, Maharashtra</p>
                  <p className="text-gray-400 text-xs">India</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Business Hours</p>
                  <p className="text-gray-400 text-xs">Mon-Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 AdiSync Solutions. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Shipping Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
