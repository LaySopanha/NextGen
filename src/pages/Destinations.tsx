import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import HotelCard from '@/components/HotelCard';
import { destinations, hotels } from '@/data/hotels';
import { MapPin, TrendingUp, Compass, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Destinations = () => {
  // Mock categories for the redesign
  const trendingDestinations = destinations.slice(0, 2);
  const popularDestinations = destinations;
  const hiddenGems = destinations.slice(2, 4);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      {/* 1. CLEAN HERO SECTION */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://i0.wp.com/travel-lush.com/wp-content/uploads/2015/01/view-koh-rong.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-black/40" /> {/* Simple dark overlay */}
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Explore Cambodia
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
            Find your perfect getaway in the Kingdom of Wonder.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 space-y-16">

        {/* 2. TRENDING NOW (Cleaner Cards) */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingDestinations.map(dest => (
              <Link key={dest.id} to={`/search?location=${dest.name}`} className="group relative h-[240px] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{dest.name}</h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm font-medium drop-shadow-md">
                    <span>Explore Properties</span>
                    <Compass className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 3. POPULAR DESTINATIONS */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Popular Destinations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map(dest => (
              <Link key={dest.id} to={`/search?location=${dest.name}`} className="group block bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-primary/50 transition-colors">
                <div className="relative h-40 overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-slate-900">{dest.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-1 mt-1">{dest.description}</p>
                  <p className="text-xs text-primary font-medium mt-3">{dest.hotelCount} Properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 4. DISCOVER HOTELS BY REGION */}
        {destinations.map((destination) => {
          const destinationHotels = hotels.filter(h => h.city === destination.name);
          if (destinationHotels.length === 0) return null;

          return (
            <div key={destination.id} className="pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    {destination.name}
                    <span className="text-slate-400 text-sm font-normal">({destinationHotels.length} hotels)</span>
                  </h2>
                </div>
                <Link to={`/search?location=${destination.name}`} className="text-sm font-bold text-primary hover:underline">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {destinationHotels.slice(0, 4).map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Cleaner CTA */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to go?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">Book your perfect stay today with NextGen Hotels.</p>
          <Link to="/search">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8">
              Find a Hotel
            </Button>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Destinations;
