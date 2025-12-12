import { ArrowRight, Shield, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import HotelCard from '@/components/HotelCard';
import DestinationCard from '@/components/DestinationCard';
import { hotels, destinations } from '@/data/hotels';
import { MapPin } from 'lucide-react';

const Index = () => {
  const popularHotels = hotels.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden py-12 md:py-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 md:w-8 md:h-8 mr-2" />
            <span className="text-base md:text-lg font-medium">Discover Cambodia</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Find Your Perfect Stay in the Kingdom of Wonder
          </h1>
          <p className="text-base md:text-xl mb-6 md:mb-8 text-white/90 max-w-2xl mx-auto">
            Experience the best of Cambodia, from ancient wonders to beachfront escape — your unforgettable journey starts here.
          </p>
          
          <SearchBar />
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-10 md:py-16 container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">Explore Cambodia</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            From the temples of Angkor to pristine beaches, discover the best destinations for your next adventure.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* Popular Hotels Section */}
      <section className="py-10 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">Top-Rated Hotels</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Hand-picked accommodations loved by travelers from around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {popularHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Index;
