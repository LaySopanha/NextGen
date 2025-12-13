import { Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">NextGen</span>
            </Link>
            <p className="text-background/70 mb-4 max-w-md">
              Your trusted partner for hotel bookings in Cambodia. We connect travel agents with the finest accommodations across the Kingdom of Wonder.
            </p>
            <div className="flex flex-col space-y-2 text-background/70">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@nextgen.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+855 23 123 456</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-background/70">
              <li><Link to="/search?city=Siem Reap" className="hover:text-background transition-colors">Siem Reap</Link></li>
              <li><Link to="/search?city=Phnom Penh" className="hover:text-background transition-colors">Phnom Penh</Link></li>
              <li><Link to="/search?city=Sihanoukville" className="hover:text-background transition-colors">Sihanoukville</Link></li>
              <li><Link to="/search?city=Battambang" className="hover:text-background transition-colors">Battambang</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Agents</h4>
            <ul className="space-y-2 text-background/70">
              <li><Link to="/contact" className="hover:text-background transition-colors">Partner Program</Link></li>
              <li><a href="#" className="hover:text-background transition-colors">Agent Login</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Support</a></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/60">
          <p>&copy; {new Date().getFullYear()} NextGen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
