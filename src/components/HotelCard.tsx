import { Link, useSearchParams } from 'react-router-dom';
import { Star, Heart, MapPin, Check, Clock, Users, Bed, ChevronRight, ThumbsUp, ShieldCheck } from 'lucide-react';
import { Hotel } from '@/data/hotels';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface HotelCardProps {
  hotel: Hotel;
  viewMode?: 'grid' | 'list';
}

const HotelCard = ({ hotel, viewMode = 'grid' }: HotelCardProps) => {
  const [searchParams] = useSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Build hotel URL with search params preserved
  const hotelUrl = `/hotel/${hotel.id}?${searchParams.toString()}`;

  // Fake urgency / social proof tag based on checks
  const getUrgencyTag = () => {
    if (hotel.rating >= 4.8) return { text: "Likely to sell out soon", color: "text-red-600 bg-red-50" };
    if (hotel.reviews > 1000) return { text: "Popular Choice", color: "text-blue-600 bg-blue-50" };
    return null;
  };
  const urgency = getUrgencyTag();

  // Get the cheapest room type
  const cheapestRoom = hotel.roomTypes?.reduce((min, room) =>
    room.price < min.price ? room : min, hotel.roomTypes[0]
  );

  const scoreText = (rating: number) => {
    if (rating >= 4.8) return "Exceptional";
    if (rating >= 4.5) return "Wonderful";
    if (rating >= 4.0) return "Very Good";
    return "Good";
  };

  if (viewMode === 'list') {
    return (
      <Link to={hotelUrl} className="group block mb-3">
        <div className="flex flex-col md:flex-row rounded-lg bg-card border border-border/60 hover:border-blue-500/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full md:h-[220px]">
          {/* Left: Image (Fixed width) */}
          <div className="md:w-[280px] shrink-0 relative">
            <div className="h-full w-full">
              <img
                src={hotel.images[currentImageIndex]}
                alt={hotel.name}
                className="h-full w-full object-cover"
              />

              {/* Image Navigation Arrows (Hidden by default, show on hover) */}
              <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.preventDefault(); setCurrentImageIndex(prev => prev > 0 ? prev - 1 : prev) }} className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1"><ChevronRight className="w-4 h-4 rotate-180" /></button>
                <button onClick={(e) => { e.preventDefault(); setCurrentImageIndex(prev => prev < hotel.images.length - 1 ? prev + 1 : prev) }} className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1"><ChevronRight className="w-4 h-4" /></button>
              </div>

              {/* Like button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
                className="absolute right-2 top-2 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white/90 hover:text-white transition-all"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 flex flex-col p-4 md:p-3 relative">
            <div className="flex justify-between gap-4">
              {/* Info Column */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-blue-600 truncate transition-colors">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-[10px] h-5 font-normal bg-slate-100 text-slate-600 hover:bg-slate-100">{hotel.propertyType}</Badge>
                </div>

                <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-3 cursor-pointer hover:underline">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{hotel.location}</span>
                  <span className="text-slate-400 mx-1">|</span>
                  <span>Show on Map</span>
                </div>

                {/* Review Score Badge (Trip.com style - Blue box with score) */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-600 text-white text-sm font-bold px-1.5 py-0.5 rounded-t-md rounded-br-md">
                    {hotel.rating} <span className="text-[10px] font-normal">/5</span>
                  </div>
                  <div>
                    <span className="font-bold text-sm text-blue-700 block leading-none">{scoreText(hotel.rating)}</span>
                    <span className="text-xs text-slate-500">{hotel.reviews} reviews</span>
                  </div>
                </div>
              </div>

              {/* Price Column (Desktop) */}
              <div className="hidden md:flex flex-col items-end shrink-0 text-right min-w-[140px]">
                <div className="mt-auto">
                  <span className="text-xs text-slate-400 line-through block mb-0.5">US${Math.round(hotel.price * 1.3)}</span>
                  <div className="flex flex-col items-end">
                    <div className="flex items-baseline justify-end gap-1 mb-0.5">
                      <span className="text-sm font-semibold text-foreground">US</span>
                      <span className="text-2xl font-bold text-blue-600">${hotel.price}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium mb-1">៛{(hotel.price * 4100).toLocaleString()}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mb-2">Includes taxes & fees</div>
                  <Button className="h-9 px-4 font-bold bg-blue-600 hover:bg-blue-700 w-full transition-all shadow-sm hover:shadow">
                    Check Availability <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom divider area */}
            <div className="mt-auto pt-3 border-t border-dashed border-border flex items-end justify-between md:hidden">
              {/* Mobile Price View */}
              <div>
                <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-100">Limited Deal</span>
              </div>
              <div className="text-right">
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-sm font-semibold">US</span>
                    <span className="text-xl font-bold text-blue-600">${hotel.price}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">៛{(hotel.price * 4100).toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Includes taxes</div>
              </div>
            </div>

            {/* Desktop Amenities / Benefits */}
            <div className="hidden md:flex flex-wrap gap-2 mt-2">
              {hotel.policies?.cancellation && (
                <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                  <Check className="w-3 h-3" /> Free Verification
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                <ShieldCheck className="w-3 h-3 text-blue-500" /> Price Match
              </div>
              {hotel.amenities.slice(0, 2).map((a, i) => (
                <span key={i} className="text-xs text-slate-500 px-2 py-1 bg-slate-50 rounded border border-slate-100">{a}</span>
              ))}
            </div>

          </div>
        </div>
      </Link>
    );
  }

  // Grid view (Redesigned - Trip.com inspired)
  return (
    <Link to={hotelUrl} className="group block h-full">
      <div className="overflow-hidden rounded-lg bg-card border border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Top Gradient for text readability */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent opacity-60"></div>

          {/* Like button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-all hover:bg-white hover:text-red-500 text-white"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'fill-transparent'}`}
            />
          </button>

          {/* Rating Badge (Trip.com style - Top Left) */}
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm flex items-center gap-1">
            <span className="text-sm">{hotel.rating}</span>
            <span className="font-normal opacity-80">/5</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-muted-foreground ml-1">{hotel.propertyType}</span>
            </div>

            <h3 className="font-bold text-lg leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
              {hotel.name}
            </h3>

            <div className="flex items-start gap-1.5 text-muted-foreground text-sm mb-3">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span className="line-clamp-1">{hotel.location}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-border flex items-end justify-between">
            <div className="text-xs text-muted-foreground">
              {hotel.policies?.cancellation && (
                <span className="text-green-600 font-medium block mb-0.5">Free Cancellation</span>
              )}
              <span>{hotel.reviews} reviews</span>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Per night</p>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold text-primary">${hotel.price}</span>
                <span className="text-xs text-muted-foreground font-medium">៛{(hotel.price * 4100).toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Includes taxes & fees</p>

              <Button className="mt-4 w-full md:w-auto font-bold">
                View Availability
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;