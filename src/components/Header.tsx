import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-foreground">NextGen</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Home
            </Link>
            <Link to="/destinations" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Destinations
            </Link>
            <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Hotels
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">
              For Travel Agents
            </Button>
            <Link to="/contact">
              <Button>
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <div className="flex flex-col h-full pt-8">
                <nav className="flex flex-col space-y-4">
                  <SheetClose asChild>
                    <Link 
                      to="/" 
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/destinations" 
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                    >
                      Destinations
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/search" 
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                    >
                      Hotels
                    </Link>
                  </SheetClose>
                </nav>
                
                <div className="mt-8 flex flex-col space-y-3">
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full justify-center">
                      For Travel Agents
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/contact">
                      <Button className="w-full justify-center">
                        Contact Us
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
