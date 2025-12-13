import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Star, MapPin, Share, Heart, Check, Wifi, Car, Utensils, Waves, Dumbbell, Coffee } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import RoomList from '@/components/RoomList';
import HotelStickyNav from '@/components/HotelStickyNav';
import HotelPolicies from '@/components/HotelPolicies';
import { getHotelById, RoomType, MealPlan, mealPlans } from '@/data/hotels';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'WiFi': Wifi,
  'Free WiFi': Wifi,
  'Parking': Car,
  'Restaurant': Utensils,
  'Pool': Waves,
  'Infinity Pool': Waves,
  'Gym': Dumbbell,
  'Fitness Center': Dumbbell,
  'Room Service': Coffee,
};

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hotel = getHotelById(id || '');

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background pt-14">
        <Header />
        <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Hotel not found</h1>
          <p className="mb-6 text-muted-foreground">The hotel you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/search')}>Browse Hotels</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBookRoom = (room: RoomType, mealPlan: MealPlan) => {
    // Preserve search params (checkIn, checkOut, adults, children, rooms)
    const params = new URLSearchParams(searchParams);
    params.set('room', room.id);
    params.set('mealPlan', mealPlan.id);
    params.set('mealPlanPrice', mealPlan.pricePerNight.toString());
    navigate(`/booking/${hotel.id}?${params.toString()}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link copied!',
      description: 'Hotel link has been copied to clipboard.',
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20 md:pt-24">
      <Header />

      <HotelStickyNav />

      <main className="container px-4 py-8" id="overview">
        {/* Title Section */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">{hotel.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{hotel.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full" onClick={handleShare}>
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={hotel.images} hotelName={hotel.name} />

        {/* Content Grid */}
        <div className="mt-8 grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Rating & Reviews Summary */}
            <div className="mb-8 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
                  {hotel.rating}
                </div>
                <div>
                  <p className="font-semibold text-foreground">Excellent</p>
                  <p className="text-sm text-muted-foreground">{hotel.reviews} reviews</p>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">About this property</h2>
              <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>
            </div>

            <Separator className="my-8" />

            {/* Score Breakdown */}
            <div className="mb-8" id="reviews">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Guest Ratings</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <div className="font-bold text-2xl text-blue-600">{hotel.scoreBreakdown?.cleanliness || hotel.rating}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Cleanliness</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-blue-600">{hotel.scoreBreakdown?.service || hotel.rating}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Service</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-blue-600">{hotel.scoreBreakdown?.amenities || hotel.rating}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Amenities</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-blue-600">{hotel.scoreBreakdown?.location || hotel.rating}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Location</div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Amenities */}
            <div className="mb-8" id="amenities">
              <h2 className="mb-4 text-xl font-semibold text-foreground">What this place offers</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {hotel.amenities.map((amenity) => {
                  const IconComponent = amenityIcons[amenity] || Check;
                  return (
                    <div key={amenity} className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                      <span className="text-foreground">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Rooms */}
            <div className="mb-8" id="rooms">
              <RoomList rooms={hotel.roomTypes} onBook={handleBookRoom} />
            </div>

            <Separator className="my-8" />

            <div id="policies">
              <HotelPolicies policies={hotel.policies} />
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-elevated">
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">${hotel.price}</span>
                <span className="text-muted-foreground">/ night</span>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span className="font-medium text-foreground">{hotel.rating}</span>
                <span className="text-muted-foreground">· {hotel.reviews} reviews</span>
              </div>

              <Button
                className="mb-3 w-full rounded-full"
                size="lg"
                onClick={() => hotel.roomTypes[0] && handleBookRoom(hotel.roomTypes[0], mealPlans[0])}
              >
                Book Now
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Free cancellation available
              </p>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground">{hotel.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rooms Available</span>
                  <span className="text-foreground">{hotel.roomTypes.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HotelDetails;
