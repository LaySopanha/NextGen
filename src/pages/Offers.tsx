import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { offers } from "@/data/offers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Offers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="container mx-auto px-4 py-14 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold mb-3">
                  <Sparkles className="w-4 h-4" />
                  Handpicked Offers
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Exclusive deals built for every type of trip</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  Inspired by Trip.com experience pages: clean bundles, instant perks, and routes that make sense for how you travel.
                </p>
                <div className="mt-4 flex gap-3">
                  <Button asChild>
                    <Link to="/search">
                      Start searching <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link to="/support">
                      Talk to support <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-white border border-border/60 rounded-2xl p-4 shadow-sm max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Always-on value</p>
                    <p className="text-sm text-muted-foreground">Breakfast, Wi-Fi, and friendly change policies on highlighted stays.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <Link
                key={offer.slug}
                to={`/offers/${offer.slug}`}
                className="relative overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm group"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/15 border border-white/20 text-white">{offer.tag}</Badge>
                </div>
                <div className="absolute bottom-0 p-5 text-white space-y-2">
                  <h2 className="text-xl font-semibold">{offer.title}</h2>
                  <p className="text-sm text-white/80 line-clamp-2">{offer.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    View details <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Offers;
