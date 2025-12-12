import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { destinations } from '@/data/hotels';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  className?: string;
}

// Location suggestions based on destinations
const locationSuggestions = destinations.map(d => ({
  name: d.name,
  country: d.country,
  hotelCount: d.hotelCount
}));

const SearchBar = ({ variant = 'hero', className = '' }: SearchBarProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  // Popover states for sequential flow
  const [locationOpen, setLocationOpen] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);

  // Filter suggestions based on input
  const filteredSuggestions = locationSuggestions.filter(s =>
    s.name.toLowerCase().includes(location.toLowerCase()) ||
    s.country.toLowerCase().includes(location.toLowerCase())
  );

  const handleLocationSelect = (name: string) => {
    setLocation(name);
    setLocationOpen(false);
    // Auto-open check-in after selecting location
    setTimeout(() => setCheckInOpen(true), 100);
  };

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date);
    if (date) {
      setCheckInOpen(false);
      // Auto-open check-out after selecting check-in
      setTimeout(() => setCheckOutOpen(true), 100);
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOut(date);
    if (date) {
      setCheckOutOpen(false);
      // Auto-open guests after selecting check-out
      setTimeout(() => setGuestsOpen(true), 100);
    }
  };

  const handleSearch = () => {
    setGuestsOpen(false);
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (checkIn) params.set('checkIn', checkIn.toISOString());
    if (checkOut) params.set('checkOut', checkOut.toISOString());
    params.set('rooms', rooms.toString());
    params.set('adults', adults.toString());
    params.set('children', children.toString());
    navigate(`/search?${params.toString()}`);
  };

  const totalGuests = adults + children;

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center gap-2 rounded-full border border-border bg-card p-2 shadow-soft ${className}`}>
        {/* Location */}
        <Popover open={locationOpen} onOpenChange={setLocationOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-muted">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">
                {location || 'Where to?'}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0 max-h-[60vh] overflow-y-auto" align="start">
            <div className="p-2">
              <Input
                type="text"
                placeholder="Search destinations"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mb-2"
                autoFocus
              />
              <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Popular destinations</p>
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.name}
                    onClick={() => handleLocationSelect(suggestion.name)}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{suggestion.name}</p>
                      <p className="text-xs text-muted-foreground">{suggestion.hotelCount} hotels</p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="px-2 py-4 text-center text-sm text-muted-foreground">No destinations found</p>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <div className="h-6 w-px bg-border" />

        {/* Check-in Date */}
        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-muted">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">
                {checkIn ? format(checkIn, 'MMM d') : 'Check in'}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={checkIn}
              onSelect={handleCheckInSelect}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <span className="text-muted-foreground">-</span>

        {/* Check-out Date */}
        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-muted">
              <span className="text-sm text-foreground">
                {checkOut ? format(checkOut, 'MMM d') : 'Check out'}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={checkOut}
              onSelect={handleCheckOutSelect}
              disabled={(date) => date < (checkIn || new Date())}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="h-6 w-px bg-border" />

        {/* Rooms & Guests */}
        <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-muted">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{rooms} room, {totalGuests} guests</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="end">
            <div className="space-y-4">
              {/* Rooms */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Rooms</p>
                  <p className="text-xs text-muted-foreground">Number of rooms</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    disabled={rooms <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center font-medium">{rooms}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setRooms(rooms + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Adults</p>
                  <p className="text-xs text-muted-foreground">Age 13+</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center font-medium">{adults}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setAdults(adults + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Children</p>
                  <p className="text-xs text-muted-foreground">Age 0-12</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center font-medium">{children}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setChildren(children + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button size="icon" className="h-8 w-8 rounded-full shrink-0" onClick={handleSearch}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl ${className}`}>
      <div className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-4 shadow-elevated md:flex-row md:items-center md:gap-0 md:rounded-full md:p-2">
        {/* Location with dropdown */}
        <Popover open={locationOpen} onOpenChange={setLocationOpen}>
          <PopoverTrigger asChild>
            <div className="flex flex-1 cursor-pointer items-center gap-3 rounded-full px-4 py-2 transition-colors hover:bg-muted md:border-r md:border-border">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs font-semibold text-foreground">Where</p>
                <Input
                  type="text"
                  placeholder="Search destinations"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (!locationOpen) setLocationOpen(true);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocationOpen(true);
                  }}
                  className="h-auto border-0 bg-transparent p-0 text-sm text-muted-foreground placeholder:text-muted-foreground focus-visible:ring-0 text-center md:text-left"
                />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0 max-h-[60vh] overflow-y-auto" align="start">
            <div className="p-2">
              <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Popular destinations</p>
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.name}
                    onClick={() => handleLocationSelect(suggestion.name)}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{suggestion.name}</p>
                      <p className="text-xs text-muted-foreground">{suggestion.country} · {suggestion.hotelCount} hotels</p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="px-2 py-4 text-center text-sm text-muted-foreground">No destinations found</p>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Check-in */}
        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
          <PopoverTrigger asChild>
            <div className="flex flex-1 cursor-pointer items-center gap-3 rounded-full px-4 py-2 transition-colors hover:bg-muted md:border-r md:border-border">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">Check in</p>
                <p className="text-sm text-muted-foreground">
                  {checkIn ? format(checkIn, 'MMM d, yyyy') : 'Add dates'}
                </p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={checkIn}
              onSelect={handleCheckInSelect}
              disabled={(date) => date < new Date()}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {/* Check-out */}
        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
          <PopoverTrigger asChild>
            <div className="flex flex-1 cursor-pointer items-center gap-3 rounded-full px-4 py-2 transition-colors hover:bg-muted md:border-r md:border-border">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">Check out</p>
                <p className="text-sm text-muted-foreground">
                  {checkOut ? format(checkOut, 'MMM d, yyyy') : 'Add dates'}
                </p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={checkOut}
              onSelect={handleCheckOutSelect}
              disabled={(date) => date < (checkIn || new Date())}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {/* Rooms & Guests */}
        <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
          <PopoverTrigger asChild>
            <div className="flex flex-1 cursor-pointer items-center gap-3 rounded-full px-4 py-2 transition-colors hover:bg-muted">
              <Users className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">Rooms & Guests</p>
                <p className="text-sm text-muted-foreground">{rooms} room, {totalGuests} guests</p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="end">
            <div className="space-y-4">
              {/* Rooms */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Rooms</p>
                  <p className="text-xs text-muted-foreground">Number of rooms</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    disabled={rooms <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center font-medium">{rooms}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setRooms(rooms + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Adults</p>
                  <p className="text-xs text-muted-foreground">Age 13+</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center font-medium">{adults}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setAdults(adults + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Children</p>
                  <p className="text-xs text-muted-foreground">Age 0-12</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center font-medium">{children}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setChildren(children + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Done button */}
              <Button className="w-full" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          size="lg"
          className="mt-2 rounded-full md:ml-2 md:mt-0 md:h-12 md:w-12 md:p-0"
        >
          <Search className="h-5 w-5" />
          <span className="ml-2 md:hidden">Search</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
