import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TIGER IRON</h3>
            <p className="text-gray-400 text-sm mb-4">
              Auburn's only 24/7 gym. Train on your schedule with secure access, top equipment, and community support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FF6A00] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6A00] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6A00] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-[#FF6A00] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-400 hover:text-[#FF6A00] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-[#FF6A00] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/app" className="text-gray-400 hover:text-[#FF6A00] transition-colors">
                  Download App
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-400 hover:text-[#FF6A00] transition-colors">
                  Member Login
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>123 Auburn Ave<br />Auburn, AL 36830</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+15555555555" className="hover:text-[#FF6A00] transition-colors">
                  (555) 555-5555
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@tigeriron.gym" className="hover:text-[#FF6A00] transition-colors">
                  info@tigeriron.gym
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <div className="text-sm text-gray-400 space-y-2">
              <p className="font-semibold text-[#FF6A00]">24/7 Access for Members</p>
              <p className="mt-3 font-semibold text-white">Staffed Hours:</p>
              <p>Mon-Fri: 5am - 10pm</p>
              <p>Sat-Sun: 7am - 8pm</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2025 Tiger Iron. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/legal/privacy" className="hover:text-[#FF6A00] transition-colors">
              Privacy Policy
            </a>
            <a href="/legal/terms" className="hover:text-[#FF6A00] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
