import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Menu, Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const currencies = [
  { code: 'USD', name: 'United States Dollar', symbol: '$' },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
];

interface HeaderProps {
  hideOnScroll?: boolean;
}

const Header = ({ hideOnScroll = true }: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currency, setCurrency] = useState(currencies[0]);

  useEffect(() => {
    if (!hideOnScroll) return;

    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // Show header if scrolling up or at the top
        if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsVisible(true);
        } else {
          // Hide header if scrolling down and past 10px
          setIsVisible(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, hideOnScroll]);

  return (
    <header
      className={`${hideOnScroll ? 'fixed transition-transform duration-200 ease-in-out' : 'sticky'} top-0 w-full z-50 ${hideOnScroll ? (isVisible ? 'translate-y-0' : '-translate-y-full') : ''
        } bg-primary/95 backdrop-blur-md border-b border-white/10 text-white shadow-md`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-white">NextGen</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
              Home
            </Link>
            <Link to="/destinations" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
              Destinations
            </Link>
            <Link to="/search" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
              Hotels
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm font-medium">
            <Link to="/list-property" className="text-white/90 hover:text-white transition-colors">
              List Your Property
            </Link>

            <div className="h-4 w-px bg-white/20"></div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors outline-none">
                  <Globe className="w-4 h-4" />
                  <span>{currency.code}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-white text-foreground p-2 animate-in fade-in slide-in-from-top-5">
                <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Select Currency</DropdownMenuLabel>
                <div className="grid grid-cols-1 gap-1">
                  {currencies.map((c) => (
                    <DropdownMenuItem
                      key={c.code}
                      onClick={() => setCurrency(c)}
                      className={`flex justify-between items-center cursor-pointer p-2 rounded-md ${currency.code === c.code ? 'bg-primary/5 text-primary font-medium' : 'hover:bg-slate-100'}`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{c.code}</span>
                        <span className="text-xs text-muted-foreground">{c.name}</span>
                      </div>
                      {currency.code === c.code && <Check className="w-4 h-4" />}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/support" className="text-white/90 hover:text-white transition-colors">
              Customer Support
            </Link>

            {/* <Link to="/bookings" className="text-white/90 hover:text-white transition-colors">
              My Bookings
            </Link> */}

            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-primary bg-white hover:bg-white/90 font-bold ml-2">
                Sign In / Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <div className="flex flex-col h-full pt-8">
                <nav className="flex flex-col space-y-4">
                  <SheetClose asChild>
                    <Link to="/" className="text-lg font-medium py-2">Home</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/destinations" className="text-lg font-medium py-2">Destinations</Link>
                  </SheetClose>
                  {/* <SheetClose asChild>
                    <Link to="/bookings" className="text-lg font-medium py-2">My Bookings</Link>
                  </SheetClose> */}
                  <SheetClose asChild>
                    <Link to="/support" className="text-lg font-medium py-2">Customer Support</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/list-property" className="text-lg font-medium py-2">List Your Property</Link>
                  </SheetClose>
                  <div className="pt-4 border-t border-border mt-4">
                    <p className="text-sm text-muted-foreground mb-3 font-medium">Currency</p>
                    <div className="grid grid-cols-2 gap-2">
                      {currencies.slice(0, 4).map(c => (
                        <div key={c.code} onClick={() => setCurrency(c)} className={`p-2 rounded border text-center text-sm cursor-pointer ${currency.code === c.code ? 'border-primary bg-primary/5 text-primary' : 'border-border'}`}>
                          {c.code}
                        </div>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
