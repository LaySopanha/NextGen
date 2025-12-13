import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar as CalendarIcon, Users, Bed, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { destinations } from '@/data/hotels';
import { DateRange } from "react-day-picker";

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
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState({
    rooms: 1,
    adults: 2,
    children: 0
  });

  // Popover states for sequential flow
  const [locationOpen, setLocationOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);

  // Filter suggestions based on input
  const filteredSuggestions = locationSuggestions.filter(s =>
    s.name.toLowerCase().includes(location.toLowerCase()) ||
    s.country.toLowerCase().includes(location.toLowerCase())
  );

  const handleLocationSelect = (name: string) => {
    setLocation(name);
    setLocationOpen(false);
    setDateOpen(true);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (dateRange?.from) params.set('checkIn', dateRange.from.toISOString());
    if (dateRange?.to) params.set('checkOut', dateRange.to.toISOString());
    params.set('rooms', guests.rooms.toString());
    params.set('adults', guests.adults.toString());
    params.set('children', guests.children.toString());
    setLocationOpen(false);
    setDateOpen(false);
    setGuestsOpen(false);
    navigate(`/search?${params.toString()}`);
  };

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2 shadow-sm ${className}`}>
        <Popover open={locationOpen} onOpenChange={setLocationOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors hover:bg-muted">
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
                <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                  No destinations found
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
        <div className="h-6 w-px bg-border" />
        <Button size="sm" onClick={handleSearch}>Search</Button>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-5xl ${className}`}>
      {/* Tabs */}
      <div className="flex items-center space-x-1 mb-0 px-1 w-[95%] max-w-6xl mx-auto">
        <button className="flex items-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-t-lg shadow-[0_-2px_6px_rgba(0,0,0,0.05)] relative z-10 -mb-1">
          <Bed className="w-5 h-5" />
          <span>Hotels</span>
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-white/40 text-white hover:bg-white/60 font-medium rounded-t-lg transition-colors -mb-1 backdrop-blur-sm">
          <MapPin className="w-5 h-5" />
          <span>Stays</span>
        </button>
      </div>

      <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow-xl md:flex-row md:items-center relative z-20 w-[95%] max-w-6xl mx-auto">
        {/* Location Input */}
        <div className="relative flex-1">
          <Popover open={locationOpen} onOpenChange={setLocationOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-14 w-full justify-start rounded-md border border-slate-200 bg-slate-50/50 px-4 text-left font-normal hover:bg-slate-100 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3 w-full">
                  <Search className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex flex-col items-start gap-0.5 overflow-hidden flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                      Destination
                    </span>
                    <span className="truncate text-base font-semibold text-foreground">
                      {location || "Where are you going?"}
                    </span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[340px] p-0 max-h-[400px] overflow-y-auto" align="start">
              <div className="p-2 sticky top-0 bg-white z-10 border-b">
                <Input
                  type="text"
                  placeholder="Search destinations (e.g. Siem Reap)"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (!locationOpen) setLocationOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && location.trim()) {
                      e.preventDefault();
                      setLocationOpen(false);
                      setDateOpen(true);
                    }
                  }}
                  className="h-10 border-slate-200 bg-slate-50 focus-visible:ring-1"
                  autoFocus
                />
              </div>
              <div className="p-2">
                <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Popular Destinations</p>
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.name}
                      onClick={() => handleLocationSelect(suggestion.name)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-slate-100 group"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{suggestion.name}</p>
                        <p className="text-xs text-muted-foreground">{suggestion.country}</p>
                      </div>
                      {location === suggestion.name && (
                        <Check className="ml-auto h-4 w-4 text-primary" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-2 py-8 text-center">
                    <p className="text-sm font-medium text-foreground">No destinations found</p>
                    <p className="text-xs text-muted-foreground">Try searching for a different location</p>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Date Picker */}
        <div className="relative flex-1">
          <Popover
            open={dateOpen}
            onOpenChange={(open) => {
              setDateOpen(open);
              if (open) setGuestsOpen(false);
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-14 w-full justify-start rounded-md border border-slate-200 bg-slate-50/50 px-4 text-left font-normal hover:bg-slate-100 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3 w-full">
                  <CalendarIcon className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex flex-col items-start gap-0.5 overflow-hidden flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                      Check-in - Check-out
                    </span>
                    <span className="truncate text-sm font-semibold text-foreground">
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                            <span className="ml-2 text-xs font-normal text-muted-foreground bg-white/50 px-1.5 py-0.5 rounded-full inline-block">
                              {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} n
                            </span>
                          </>
                        ) : (
                          format(dateRange.from, "MMM dd")
                        )
                      ) : (
                        "Add dates"
                      )}
                    </span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range);
                  if (range?.from && range?.to) {
                    setDateOpen(false);
                    setGuestsOpen(true);
                  }
                }}
                numberOfMonths={2}
                className="rounded-lg border shadow-lg"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests Input */}
        <div className="relative flex-1">
          <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-14 w-full justify-start rounded-md border border-slate-200 bg-slate-50/50 px-4 text-left font-normal hover:bg-slate-100 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3 w-full">
                  <Users className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex flex-col items-start gap-0.5 overflow-hidden">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                      Guests
                    </span>
                    <span className="truncate text-base font-semibold text-foreground">
                      {guests.adults + guests.children} Guests, {guests.rooms} Room
                    </span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6" align="end">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm leading-none">Rooms</h4>
                    <p className="text-xs text-muted-foreground">Number of rooms</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-slate-200"
                      onClick={() => setGuests({ ...guests, rooms: Math.max(1, guests.rooms - 1) })}
                      disabled={guests.rooms <= 1}
                    >
                      -
                    </Button>
                    <span className="w-4 text-center text-sm font-semibold">{guests.rooms}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-slate-200"
                      onClick={() => setGuests({ ...guests, rooms: Math.min(10, guests.rooms + 1) })}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm leading-none">Adults</h4>
                    <p className="text-xs text-muted-foreground">Ages 18+</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-slate-200"
                      onClick={() => setGuests({ ...guests, adults: Math.max(1, guests.adults - 1) })}
                      disabled={guests.adults <= 1}
                    >
                      -
                    </Button>
                    <span className="w-4 text-center text-sm font-semibold">{guests.adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-slate-200"
                      onClick={() => setGuests({ ...guests, adults: Math.min(20, guests.adults + 1) })}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm leading-none">Children</h4>
                    <p className="text-xs text-muted-foreground">Ages 0-17</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-slate-200"
                      onClick={() => setGuests({ ...guests, children: Math.max(0, guests.children - 1) })}
                      disabled={guests.children <= 0}
                    >
                      -
                    </Button>
                    <span className="w-4 text-center text-sm font-semibold">{guests.children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-slate-200"
                      onClick={() => setGuests({ ...guests, children: Math.min(10, guests.children + 1) })}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="h-14 px-8 bg-accent hover:bg-accent/90 text-primary font-bold text-lg rounded-md shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          Search
        </Button>
      </div>

    </div>
  );
};

export default SearchBar;
