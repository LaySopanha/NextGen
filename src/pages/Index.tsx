import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import HotelCard from '@/components/HotelCard';
import DestinationCard from '@/components/DestinationCard';
import { hotels, destinations } from '@/data/hotels';
import OffersSection from '@/components/OffersSection';
import TrustSection from '@/components/TrustSection';
import Newsletter from '@/components/Newsletter';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const popularHotels = hotels.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599283787923-51b965a58b05?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5na29yJTIwd2F0fGVufDB8fDB8fHww"
            alt="Angkor Wat"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 65%' }}
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center px-4 w-full -mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Kingdom of Wonder
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
            Find Your Perfect Stay in the Kingdom of Wonder
          </h1>
          <p className="text-lg md:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-md font-medium">
            Experience the best of Cambodia, from ancient wonders to beachfront escape — your unforgettable journey starts here.
          </p>
        </div>
      </section>

      {/* Floating Search Console */}
      <div className="container mx-auto px-4 relative z-30 -mt-24 md:-mt-32 mb-16">
        <div className="flex justify-center">
          <SearchBar />
        </div>
      </div>

      <OffersSection />

      {/* Destinations Section (Slider) */}
      <section className="py-8 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Popular Destinations</h2>
            <p className="text-muted-foreground text-sm">Most booked cities by travelers</p>
          </div>
          <Link to="/destinations" className="text-primary font-semibold text-sm flex items-center hover:underline">
            View all destinations <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {destinations.map((destination) => (
              <CarouselItem key={destination.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                <div className="p-1">
                  <DestinationCard destination={destination} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </section>

      {/* Popular Hotels Section */}
      <section className="py-10 md:py-20 bg-slate-50 border-t border-border/40">
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

      <TrustSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
