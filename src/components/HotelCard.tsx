import { Link, useSearchParams } from 'react-router-dom';
import { Star, Heart, MapPin, Check, Clock, Users, Bed } from 'lucide-react';
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

  // Generate a fake cancellation date (14 days from now)
  const cancellationDate = new Date();
  cancellationDate.setDate(cancellationDate.getDate() + 14);
  const formattedCancellationDate = cancellationDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  // Get the cheapest room type
  const cheapestRoom = hotel.roomTypes?.reduce((min, room) => 
    room.price < min.price ? room : min, hotel.roomTypes[0]
  );

  if (viewMode === 'list') {
    return (
      <Link to={hotelUrl} className="group block">
        <div className="overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20">
          <div className="flex flex-col sm:flex-row">
            {/* Image Section */}
            <div className="relative w-full sm:w-72 md:w-80 shrink-0">
              <div className="aspect-[16/10] sm:aspect-auto sm:h-full overflow-hidden">
                <img
                  src={hotel.images[currentImageIndex]}
                  alt={hotel.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Like button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-all hover:bg-card hover:scale-110"
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isLiked ? 'fill-primary text-primary' : 'text-foreground'
                  }`}
                />
              </button>

              {/* Image dots */}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {hotel.images.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(index);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'w-4 bg-card'
                        : 'w-1.5 bg-card/60 hover:bg-card/80'
                    }`}
                  />
                ))}
              </div>

              {/* Property type badge */}
              <Badge className="absolute left-3 top-3 bg-card/90 text-foreground backdrop-blur-sm">
                {hotel.propertyType}
              </Badge>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              {/* Header */}
              <div className="mb-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                        ))}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {hotel.name}
                    </h3>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-1 rounded-lg bg-primary px-2 py-1">
                      <span className="text-sm font-bold text-primary-foreground">{hotel.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{hotel.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-sm">{hotel.location}</span>
                </div>
              </div>

              {/* Middle section - Room info & Amenities */}
              <div className="flex-1 mb-3">
                {/* Room type preview */}
                {cheapestRoom && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{cheapestRoom.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{cheapestRoom.capacity} guests</span>
                    </div>
                  </div>
                )}

                {/* Amenities */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  {hotel.amenities.slice(0, 5).map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-xs font-normal">
                      {amenity}
                    </Badge>
                  ))}
                  {hotel.amenities.length > 5 && (
                    <span className="text-xs text-muted-foreground">+{hotel.amenities.length - 5} more</span>
                  )}
                </div>

                {/* Cancellation policy */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">Free cancellation</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs">Cancel before {formattedCancellationDate} for full refund</span>
                  </div>
                </div>
              </div>

              {/* Footer - Price section */}
              <div className="flex items-end justify-between border-t border-border pt-3 mt-auto">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    {hotel.roomTypes?.length || 0} room types available
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">${hotel.price}</span>
                    <span className="text-sm text-muted-foreground">/ night</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Includes taxes & fees</p>
                </div>
                <Button 
                  className="shrink-0"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = hotelUrl;
                  }}
                >
                  View Deal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view (original design)
  return (
    <Link to={hotelUrl} className="group block">
      <div className="overflow-hidden rounded-2xl bg-card transition-all duration-300 hover-lift">
        {/* Image Carousel */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Like button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-all hover:bg-card hover:scale-110"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isLiked ? 'fill-primary text-primary' : 'text-foreground'
              }`}
            />
          </button>

          {/* Image dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {hotel.images.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'w-4 bg-card'
                    : 'w-1.5 bg-card/60 hover:bg-card/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">{hotel.propertyType}</Badge>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-gold text-gold" />
              ))}
            </div>
          </div>
          
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="text-sm font-medium text-foreground">{hotel.rating}</span>
              <span className="text-sm text-muted-foreground">({hotel.reviews})</span>
            </div>
          </div>

          <div className="mb-2 flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-sm line-clamp-1">{hotel.city}, {hotel.country}</span>
          </div>

          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{hotel.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {hotel.amenities.slice(0, 3).map((amenity) => (
                <Badge key={amenity} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-1 border-t border-border pt-3">
            <span className="text-lg font-bold text-foreground">${hotel.price}</span>
            <span className="text-sm text-muted-foreground">/ night</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;