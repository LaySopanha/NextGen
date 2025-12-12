import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import HotelCard from '@/components/HotelCard';
import { destinations, hotels } from '@/data/hotels';
import { MapPin } from 'lucide-react';

const Destinations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 mr-2" />
            <span className="text-lg font-medium">Cambodia</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Destinations in Cambodia
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover the Kingdom of Wonder — ancient temples, vibrant cities, and pristine beaches await your clients.
          </p>
        </div>
      </section>

      {/* All Destinations */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {/* Hotels by Destination */}
        {destinations.map((destination) => {
          const destinationHotels = hotels.filter(h => h.city === destination.name);
          if (destinationHotels.length === 0) return null;
          
          return (
            <div key={destination.id} className="mb-16">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">{destination.name}</h2>
                <p className="text-muted-foreground">{destination.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {destinationHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;
