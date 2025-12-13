
import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, SlidersHorizontal, Heart, MapPin, Bed, Check, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { searchHotels } from '@/data/hotels'; // Reusing data logic
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import FilterSidebar from '@/components/FilterSidebar';
import { useCurrency } from '@/context/CurrencyContext';

// Reusing the map icon logic from HotelMap
const createCustomIcon = (price: number, isHovered: boolean) => {
    return L.divIcon({
        className: 'custom-map-marker',
        html: `<div class="${isHovered ? 'bg-black text-white scale-110 z-50' : 'bg-primary text-primary-foreground'} font-bold px-2 py-1 rounded shadow-md text-sm transition-all whitespace-nowrap">$${price}</div>`,
        iconSize: [40, 30],
        iconAnchor: [20, 30],
    });
};

// Coordinates for major Cambodian provinces/locations to center the map accurately
const PROVINCE_COORDINATES: Record<string, [number, number]> = {
    'siem reap': [13.3633, 103.8564],
    'phnom penh': [11.5564, 104.9282],
    'sihanoukville': [10.627543, 103.522241],
    'kampot': [10.6104, 104.1818],
    'battambang': [13.0957, 103.2022],
    'kep': [10.4829, 104.2936],
    'koh rong': [10.7302, 103.2384],
    'mondulkiri': [12.4554, 107.1950],
};

const DEFAULT_CENTER: [number, number] = [13.3633, 103.8564]; // Siem Reap default

// Controller for Map Interactions (Zoom/Pan)
const MapController = ({
    hoveredHotel,
    mapCenter,
    baseZoom = 13,
    hoverZoom = 18
}: {
    hoveredHotel: any,
    mapCenter: [number, number],
    baseZoom?: number,
    hoverZoom?: number
}) => {
    const map = useMap();

    // 1. Handle Hover Interactions
    useEffect(() => {
        if (hoveredHotel) {
            // Zoom IN to the hotel
            map.flyTo(
                [hoveredHotel.coordinates.lat, hoveredHotel.coordinates.lng],
                hoverZoom,
                { animate: true, duration: 1.2 }
            );
        } else {
            // Zoom OUT on un-hover (but stay relative to where we were looking, don't force reset to city center yet)
            // We use map.getCenter() to keep context of where the user was looking.
            // Only 'mapCenter' prop change enforces a hard city reset.
            map.flyTo(map.getCenter(), baseZoom, { animate: true, duration: 1.2 });
        }
    }, [hoveredHotel, map, baseZoom, hoverZoom]);

    // 2. Handle City/Search Changes (The Fix)
    useEffect(() => {
        // When the Global 'mapCenter' changes (user searched a new place), fly there.
        map.flyTo(mapCenter, baseZoom, { animate: true, duration: 2.0 });
    }, [mapCenter, map, baseZoom]);

    return null;
};

// Sub-component for individual markers
const HotelMarker = ({
    hotel,
    isHovered,
    setHoveredHotelId
}: {
    hotel: any,
    isHovered: boolean,
    setHoveredHotelId: (id: string | null) => void
}) => {
    const markerRef = useRef<L.Marker>(null);
    const { formatPrice } = useCurrency(); // Hook

    // Sync popup state only (Movement handled by MapController now)
    useEffect(() => {
        if (markerRef.current) {
            if (isHovered) {
                markerRef.current.openPopup();
            } else {
                markerRef.current.closePopup();
            }
        }
    }, [isHovered]);

    return (
        <Marker
            ref={markerRef}
            position={[hotel.coordinates.lat, hotel.coordinates.lng]}
            icon={createCustomIcon(hotel.price, isHovered)}
            eventHandlers={{
                mouseover: (e) => {
                    setHoveredHotelId(hotel.id);
                    e.target.openPopup();
                },
                mouseout: (e) => {
                    setHoveredHotelId(null);
                    e.target.closePopup();
                },
                click: (e) => {
                    // navigate
                }
            }}
        >
            <Popup autoPan={false} closeButton={false} className="custom-popup">
                {/* Compact horizontal card with prominent image */}
                <div className="flex w-[420px] min-h-[190px] bg-white rounded-xl overflow-hidden shadow-xl border border-border/50 font-sans p-0 m-0">
                    <style>
                        {`
                            .custom-popup .leaflet-popup-content-wrapper {
                                background: transparent !important;
                                box-shadow: none !important;
                                padding: 0 !important;
                                overflow: visible !important;
                            }
                            .custom-popup .leaflet-popup-content {
                                margin: 0 !important;
                                width: auto !important;
                            }
                            .custom-popup .leaflet-popup-tip-container {
                                display: none !important;
                            }
                        `}
                    </style>

                    {/* LEFT: Image Section */}
                    <div className="w-[160px] h-[190px] shrink-0 relative">
                        <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2">
                            <span className="bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm text-foreground">
                                {hotel.propertyType}
                            </span>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="flex items-center gap-2 text-white">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-[11px] font-semibold shadow-sm">
                                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                                    {hotel.rating.toFixed(1)}/5
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 p-3 flex flex-col justify-between min-w-0 bg-white">
                        <div>
                            <h3 className="font-bold text-sm leading-tight mb-1 truncate text-foreground pr-4">{hotel.name}</h3>
                            <p className="text-[11px] text-muted-foreground mb-2 truncate flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-primary shrink-0" />
                                {hotel.location}
                            </p>

                            {/* Dense Mini Grid */}
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                                <div className="flex items-center gap-1 text-[10px] text-slate-600">
                                    <Bed className="w-3 h-3 text-slate-400" />
                                    <span>King Bed</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-slate-600">
                                    <Users className="w-3 h-3 text-slate-400" />
                                    <span>Sleeps 2</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-green-700 font-medium">
                                    <Check className="w-3 h-3" />
                                    <span>Free Cancel</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Price */}
                        <div className="flex items-end justify-between border-t border-dashed border-slate-100 pt-2">
                            <div>
                                <div className="flex flex-col items-start leading-none">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold text-blue-600 font-sans">${hotel.price}</span>
                                        <span className="text-[10px] text-muted-foreground">/ night</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                                        ៛{(hotel.price * 4100).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-[9px] text-slate-300 leading-none mt-1">Includes taxes</p>
                            </div>
                            <Button size="sm" className="h-7 text-xs px-3 font-bold bg-blue-600 hover:bg-blue-700 shadow-sm">
                                View Deal
                            </Button>
                        </div>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

// Specialized Hotel Card for Map Sidebar (Compact but premium)
const SidebarHotelCard = ({ hotel }: { hotel: any }) => (
    <div className="flex min-h-[210px] w-full bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-lg transition-all overflow-hidden group">
        {/* Left: Image */}
        <div className="w-[180px] shrink-0 relative">
            <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay Info */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                {hotel.rating >= 4.5 && (
                    <span className="bg-blue-600/95 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md shadow-sm">
                        Popular Choice
                    </span>
                )}
            </div>
            <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-red-500 transition-colors">
                <Heart className="w-3.5 h-3.5" />
            </button>
        </div>

        {/* Right: Content */}
        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
            <div>
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-base leading-tight mb-1 truncate text-foreground group-hover:text-primary transition-colors">
                        {hotel.name}
                    </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-2">
                    <div className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        {hotel.rating} <span className="font-normal opacity-80">/5</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{hotel.reviews} reviews</span>
                </div>

                {/* Location */}
                <div className="flex items-start gap-1 text-xs text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                    <span className="truncate">{hotel.location}</span>
                </div>

                {/* Richer Info: Room/Amenities */}
                <div className="space-y-1 mb-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Bed className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">Deluxe Double Room</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>2 Adults, 1 Child</span>
                    </div>
                    {hotel.policies?.cancellation && (
                        <div className="flex items-center gap-1.5 text-[10px] text-green-600 font-medium mt-1">
                            <Check className="w-3 h-3" />
                            Free Cancellation
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-end justify-between border-t border-dashed border-border pt-2 mt-auto">
                <div className="flex flex-wrap gap-1">
                    {hotel.stars >= 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded hidden lg:inline-block">
                            {hotel.stars}★
                        </span>
                    )}
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-50 text-slate-600 border border-slate-100 rounded truncate max-w-[80px]">
                        {hotel.propertyType}
                    </span>
                </div>
                <div className="text-right shrink-0">
                    <span className="text-[10px] text-muted-foreground line-through block leading-none">US${Math.round(hotel.price * 1.2)}</span>
                    <div className="flex items-baseline justify-end gap-1">
                        <span className="text-xs font-semibold">US</span>
                        <span className="text-xl font-bold text-primary">${hotel.price}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground block leading-none">/ night</span>
                </div>
            </div>
        </div>
    </div>
);

const MapSearch = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const locationQuery = searchParams.get('location') || 'Siem Reap';
    const [hoveredHotelId, setHoveredHotelId] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState(locationQuery);

    // Filters State
    const [filters, setFilters] = useState({
        priceRange: [0, 4000] as [number, number],
        amenities: [] as string[],
        stars: [] as number[],
        propertyTypes: [] as string[],
        sortBy: 'rating-high',
        province: locationQuery,
        zones: [] as string[],
        guestRating: null as number | null,
        paymentTypes: [] as string[],
    });

    // State for Search Suggestions
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Filter suggestions based on input
    useEffect(() => {
        if (searchInput.trim() === '') {
            setSuggestions(Object.keys(PROVINCE_COORDINATES));
        } else {
            const filtered = Object.keys(PROVINCE_COORDINATES).filter(p =>
                p.toLowerCase().includes(searchInput.toLowerCase())
            );
            setSuggestions(filtered);
        }
    }, [searchInput]);

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Update filters when URL location changes
    useEffect(() => {
        setFilters(prev => ({ ...prev, province: locationQuery }));
        setSearchInput(locationQuery);
    }, [locationQuery]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuggestions(false);
        setSearchParams({ location: searchInput });
    };

    const handleSuggestionClick = (province: string) => {
        setSearchInput(province);
        setSearchParams({ location: province });
        setShowSuggestions(false);
    };

    const filteredHotels = useMemo(() => {
        let results = searchHotels(locationQuery);

        // Apply price filter
        results = results.filter(hotel =>
            hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
        );

        // Apply stars filter
        if (filters.stars.length > 0) {
            results = results.filter(hotel => filters.stars.includes(hotel.stars));
        }

        // Apply property type
        if (filters.propertyTypes.length > 0) {
            results = results.filter(hotel => filters.propertyTypes.includes(hotel.propertyType));
        }

        // Apply guest rating filter
        if (filters.guestRating !== null) {
            results = results.filter(hotel => hotel.rating >= filters.guestRating!);
        }

        // Apply sorting
        results.sort((a, b) => {
            if (filters.sortBy === 'price-low') {
                return a.price - b.price;
            } else if (filters.sortBy === 'price-high') {
                return b.price - a.price;
            } else if (filters.sortBy === 'rating-high') {
                return b.rating - a.rating;
            }
            return 0;
        });

        return results;
    }, [locationQuery, filters]);

    // Derived state for the currently hovered hotel data
    const hoveredHotel = useMemo(() => {
        return filteredHotels.find(h => h.id === hoveredHotelId);
    }, [hoveredHotelId, filteredHotels]);

    // Determine Map Center based on query
    const mapCenter = useMemo(() => {
        const queryLower = locationQuery.toLowerCase();
        const match = Object.keys(PROVINCE_COORDINATES).find(k => queryLower.includes(k) || k.includes(queryLower));
        return match ? PROVINCE_COORDINATES[match] : DEFAULT_CENTER;
    }, [locationQuery]);

    return (
        <div className="h-screen w-screen flex flex-col bg-background overflow-hidden font-sans text-foreground">
            {/* BRANDING HEADER + SEARCH */}
            <header className="flex-none h-16 bg-primary text-white flex items-center justify-between px-4 shadow-md z-50">
                <div className="flex items-center gap-6">
                    {/* Logo Area */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xl font-bold text-white hidden md:block">NextGen</span>
                    </div>

                    {/* Compact Search Bar with Suggestions */}
                    <div className="relative group" ref={searchContainerRef}>
                        <form onSubmit={handleSearchSubmit}>
                            <div className="flex items-center bg-white/10 hover:bg-white/20 transition-colors rounded-lg border border-white/20 overflow-hidden w-[200px] md:w-[320px] focus-within:ring-2 focus-within:ring-white/50 focus-within:bg-white/20">
                                <MapPin className="ml-2.5 w-4 h-4 text-white/70 shrink-0" />
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => {
                                        setSearchInput(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="Where to? (e.g. Siem Reap)"
                                    className="bg-transparent border-none text-white placeholder:text-white/60 text-sm px-2 py-2 focus:outline-none w-full font-medium"
                                />
                                {searchInput && (
                                    <button type="button" onClick={() => handleSearchSubmit({ preventDefault: () => { } } as any)} className="mr-2">
                                        <ArrowLeft className="w-4 h-4 rotate-180 text-white/70 hover:text-white" />
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-border overflow-hidden py-1 z-[60]">
                                {suggestions.map((province) => (
                                    <div
                                        key={province}
                                        className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2 text-sm text-foreground transition-colors"
                                        onClick={() => handleSuggestionClick(province)}
                                    >
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{province}</span>
                                            <span className="text-[10px] text-muted-foreground">Cambodia</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="text-white hover:bg-white/10 hidden md:flex" onClick={() => navigate('/')}>Home</Button>
                    <div className="h-5 w-px bg-white/20 hidden md:block"></div>
                </div>
            </header>

            {/* Quick Filters Bar */}
            <div className="flex-none h-12 border-b border-border bg-card px-4 flex items-center gap-3 z-40 shadow-sm overflow-x-auto no-scrollbar">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2 border-dashed shrink-0 h-8 rounded-full">
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            All Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <FilterSidebar
                            onFiltersChange={setFilters}
                            initialProvince={locationQuery}
                            isMobile
                        />
                    </SheetContent>
                </Sheet>
                <div className="h-4 w-px bg-border mx-1 shrink-0" />
                <Button
                    variant={filters.priceRange[1] <= 100 ? "default" : "outline"}
                    size="sm"
                    className="shrink-0 h-8 rounded-full text-xs"
                    onClick={() => setFilters(prev => ({ ...prev, priceRange: [0, 100] }))}
                >
                    Budget
                </Button>
                <Button
                    variant={filters.stars.includes(5) ? "default" : "outline"}
                    size="sm"
                    className="shrink-0 h-8 rounded-full text-xs"
                    onClick={() => setFilters(prev => ({ ...prev, stars: [5] }))}
                >
                    Luxury (5★)
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 h-8 rounded-full text-xs"
                    onClick={() => setFilters(prev => ({ ...prev, guestRating: 4.5 }))}
                >
                    Top Rated
                </Button>
            </div>

            {/* Split Content Area */}
            <div className="flex-1 flex overflow-hidden relative h-[calc(100vh-7rem)] min-h-0">

                {/* Left Sidebar: Hotel List 
                    Fixed width of 540px. 
                */}
                <div className="hidden md:flex w-[540px] min-w-[540px] flex-col border-r border-border bg-muted/20 z-20 shadow-xl relative transition-all h-full min-h-0">

                    {/* Sticky Sidebar Header */}
                    <div className="p-3 bg-background/95 backdrop-blur-sm border-b border-border flex items-center justify-between z-30 flex-none px-4">
                        <div className="text-sm font-semibold text-foreground">
                            {filteredHotels.length} properties found
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Sort:</span>
                            <select
                                className="text-xs font-semibold bg-transparent border-none focus:ring-0 cursor-pointer p-0 text-foreground"
                                value={filters.sortBy}
                                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                            >
                                <option value="rating-high">Recommended</option>
                                <option value="price-low">Price (Low to High)</option>
                                <option value="price-high">Price (High to Low)</option>
                            </select>
                        </div>
                    </div>

                    {/* ScrollArea takes remaining space (flex-1) instead of h-full */}
                    <div className="flex-1 w-full min-h-0 overflow-y-auto">
                        <div className="p-4 space-y-4 pb-8">
                            {filteredHotels.map(hotel => (
                                <div
                                    key={hotel.id}
                                    onMouseEnter={() => setHoveredHotelId(hotel.id)}
                                    onMouseLeave={() => setHoveredHotelId(null)}
                                    className={`transition-all duration-300 cursor-pointer ${hoveredHotelId === hotel.id ? 'translate-x-2' : ''}`}
                                    onClick={() => navigate(`/hotel/${hotel.id}`)}
                                >
                                    <SidebarHotelCard hotel={hotel} />
                                </div>
                            ))}
                            {filteredHotels.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center px-4">
                                    <p className="mb-4">No hotels found in {locationQuery}.</p>
                                    <Button variant="outline" onClick={() => {
                                        setSearchInput('Siem Reap');
                                        setSearchParams({ location: 'Siem Reap' });
                                    }}>Reset Search</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Area: Full Screen Map */}
                <div className="flex-1 relative bg-gray-100 min-w-0">
                    <MapContainer
                        center={mapCenter}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        zoomControl={false}
                    >
                        <MapController hoveredHotel={hoveredHotel} mapCenter={mapCenter} baseZoom={13} hoverZoom={18} />
                        <TileLayer
                            attribution='&copy; OpenStreetMap'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* City Center Marker */}
                        <Marker
                            position={mapCenter}
                            icon={L.divIcon({
                                className: 'city-center-marker',
                                html: `<div class="bg-foreground text-background font-bold px-3 py-1.5 rounded-full shadow-lg text-sm whitespace-nowrap border-2 border-white flex items-center gap-1"><span class="text-xs">📍</span> ${locationQuery}</div>`,
                                iconSize: [100, 30],
                                iconAnchor: [50, 45]
                            })}
                            zIndexOffset={100}
                        />

                        {filteredHotels.map((hotel) => (
                            <HotelMarker
                                key={hotel.id}
                                hotel={hotel}
                                isHovered={hoveredHotelId === hotel.id}
                                setHoveredHotelId={setHoveredHotelId}
                            />
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default MapSearch;
