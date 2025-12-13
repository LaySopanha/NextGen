import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  ChefHat,
  CheckCircle2,
  Clock4,
  Heart,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Sun,
  Ticket,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NotFound from "./NotFound";
import { getOfferBySlug, offers, type OfferPerk } from "@/data/offers";
import { destinations as coreDestinations, hotels as coreHotels } from "@/data/hotels";

const perkIcons: Record<OfferPerk["icon"], LucideIcon> = {
  calendar: CalendarCheck,
  shield: ShieldCheck,
  sparkles: Sparkles,
  heart: Heart,
  clock: Clock4,
  users: Users,
  sun: Sun,
  plane: Plane,
  ticket: Ticket,
  chef: ChefHat,
};

const offerCityMap: Record<string, string[]> = {
  "early-bird-saver": ["Siem Reap", "Phnom Penh"],
  "couples-retreat": ["Phnom Penh", "Siem Reap"],
  "family-fun-pack": ["Koh Rong", "Kep", "Battambang"],
};

const offerDestinationMap: Record<string, string[]> = {
  "early-bird-saver": ["siem-reap", "phnom-penh", "kampot"],
  "couples-retreat": ["phnom-penh", "kep", "sihanoukville"],
  "family-fun-pack": ["koh-kong", "battambang", "kampong-cham"],
};

const OfferDetails = () => {
  const { slug } = useParams();
  const offer = slug ? getOfferBySlug(slug) : undefined;

  if (!offer) {
    return <NotFound />;
  }

  const otherOffers = offers.filter((item) => item.slug !== offer.slug);
  const hotelsForOffer = (() => {
    const target = 3;
    const picked: typeof coreHotels = [];
    const seen = new Set<string>();
    const preferredCities = offerCityMap[offer.slug] ?? [];

    // Pull from preferred cities first so each offer highlights different places.
    for (const city of preferredCities) {
      for (const hotel of coreHotels) {
        if (picked.length >= target) break;
        if (hotel.city === city && !seen.has(hotel.id)) {
          picked.push(hotel);
          seen.add(hotel.id);
        }
      }
    }

    // Fill any remaining slots with other options (avoids duplicates).
    for (const hotel of coreHotels) {
      if (picked.length >= target) break;
      if (!seen.has(hotel.id)) {
        picked.push(hotel);
        seen.add(hotel.id);
      }
    }

    return picked.slice(0, target);
  })();

  const destinationsForOffer = (() => {
    const ids = offerDestinationMap[offer.slug] ?? [];
    const picked = ids
      .map((id) => coreDestinations.find((dest) => dest.id === id))
      .filter(Boolean) as typeof coreDestinations;

    if (picked.length < 3) {
      for (const dest of coreDestinations) {
        if (picked.length >= 3) break;
        if (!picked.find((d) => d.id === dest.id)) {
          picked.push(dest);
        }
      }
    }
    return picked.slice(0, 3);
  })();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <img
            src={offer.heroImage}
            alt={offer.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-900/80" />
          <div className="container relative z-10 mx-auto px-4 py-14 md:py-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="max-w-3xl">
                <Badge className="mb-4 bg-white/10 text-white border border-white/20">
                  {offer.tag}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
                  {offer.title}
                </h1>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
                  {offer.longDescription}
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <Button asChild>
                    <Link to={`/search?offer=${offer.slug}`}>
                      Explore stays <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" className="bg-white/15 text-white hover:bg-white/25 border border-white/20">
                    <Link to="/contact">
                      Chat with concierge <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 text-white border border-white/20 rounded-2xl p-5 backdrop-blur-lg w-full md:w-[380px]">
                <p className="text-sm uppercase tracking-wide text-white/80 mb-2">
                  {offer.headline}
                </p>
                <div className="space-y-3">
                  {offer.stats.slice(0, 2).map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-sm text-white/80">{stat.label}</span>
                      <span className="text-xl font-semibold">{stat.value}</span>
                    </div>
                  ))}
                  <div className="h-px bg-white/20" />
                  <p className="text-sm text-white/80">
                    {offer.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 -mt-10 md:-mt-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offer.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-border/60 shadow-sm rounded-xl p-4 flex flex-col gap-1"
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Curated Bundles */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase text-primary/80">Curated Bundles</p>
              <h2 className="text-2xl font-bold text-foreground">Featured stays built for this offer</h2>
              <p className="text-muted-foreground mt-1">
                Powered by the stays already in your catalog—no guesswork, just the best-matching picks.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to={`/search?offer=${offer.slug}`}>
                View all stays <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotelsForOffer.map((hotel) => (
              <Card key={hotel.id} className="h-full border-border/60 shadow-sm hover:-translate-y-1 transition-transform bg-white/90 overflow-hidden">
                <div className="h-40 w-full overflow-hidden">
                  <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground line-clamp-2">{hotel.name}</h3>
                    <Badge className="bg-primary/10 text-primary border-primary/20">{hotel.city}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{hotel.description}</p>
                  <p className="text-xl font-bold text-foreground mb-1">${hotel.price}/night</p>
                  <p className="text-sm text-muted-foreground mb-4">{hotel.stars}★ · {hotel.rating} ({hotel.reviews} reviews)</p>
                  <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                    {hotel.amenities.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex gap-2">
                    <Button asChild className="flex-1">
                      <Link to={`/hotel/${hotel.id}`}>View details</Link>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link to={`/booking/${hotel.id}`}>Book</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Perks */}
        <section className="container mx-auto px-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase text-primary/80">Why travelers book it</p>
              <h2 className="text-2xl font-bold text-foreground">Perks tailored to this deal</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offer.perks.map((perk) => {
              const Icon = perkIcons[perk.icon] ?? Sparkles;
              return (
                <div
                  key={perk.title}
                  className="rounded-xl border border-border/60 bg-white/90 p-4 shadow-sm hover:border-primary/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{perk.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{perk.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Destinations */}
        <section className="container mx-auto px-4 pb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase text-primary/80">Trip ideas</p>
              <h2 className="text-2xl font-bold text-foreground">Where this offer shines</h2>
              <p className="text-muted-foreground mt-1">From city lights to barefoot beaches.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinationsForOffer.map((dest) => (
              <div key={dest.id} className="relative overflow-hidden rounded-2xl shadow-sm group border border-border/60 bg-white">
                <img src={dest.image} alt={dest.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/15 border border-white/20 text-white">{dest.country}</Badge>
                </div>
                <div className="absolute bottom-0 p-5 text-white">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/80 mb-2">
                    <MapPin className="w-4 h-4" /> {dest.hotelCount} stays
                  </div>
                  <h3 className="text-xl font-semibold">{dest.name}</h3>
                  <p className="text-sm text-white/80 mt-1">{dest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-4 pb-12">
          <div className="bg-white border border-border/60 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-semibold uppercase text-primary/80">How to claim</p>
                <h2 className="text-xl font-bold text-foreground">Book it in three smooth steps</h2>
              </div>
              <Button asChild variant="ghost">
                <Link to="/support">
                  Need help? <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {offer.steps.map((step, index) => (
                <div key={step} className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other offers */}
        <section className="container mx-auto px-4 pb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Explore other exclusives</h3>
            <Button asChild variant="link" className="text-primary">
              <Link to="/offers">
                View all deals <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherOffers.map((other) => (
              <Link key={other.slug} to={`/offers/${other.slug}`} className="relative rounded-2xl overflow-hidden group border border-border/60 bg-white shadow-sm">
                <div className="h-44 overflow-hidden">
                  <img
                    src={other.image}
                    alt={other.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <Badge className="bg-white/15 border border-white/20 text-white mb-2">{other.tag}</Badge>
                  <h4 className="text-lg font-semibold">{other.title}</h4>
                  <p className="text-sm text-white/80 line-clamp-2 mt-1">{other.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <Button asChild variant="ghost" className="mt-6 gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OfferDetails;
