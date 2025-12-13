import { ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const offers = [
    {
        id: 1,
        title: "Early Bird Saver",
        description: "Book 60 days in advance and save up to 20% on selected premium hotels.",
        image: "https://mediaim.expedia.com/destination/1/70981b9f24e4825958eff982f8e1d2f6.jpg",
        tag: "Limited Time",
        color: "from-blue-600 to-blue-400"
    },
    {
        id: 2,
        title: "Couple's Retreat",
        description: "Romantic getaways with special amenities included. Perfect for honeymooners.",
        image: "https://airial.travel/_next/image?url=https%3A%2F%2Fcoinventmediastorage.blob.core.windows.net%2Fmedia-storage-container%2Fgphoto_ChIJoSJWb-vBBzERWB2aRlr3aoM_0.jpg&w=3840&q=75",
        tag: "Trending",
        color: "from-rose-500 to-pink-400"
    },
    {
        id: 3,
        title: "Family Fun Pack",
        description: "Kids stay free! Enjoy family-friendly resorts with activities for everyone.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
        tag: "Family Special",
        color: "from-emerald-500 to-teal-400"
    }
];

const OffersSection = () => {
    return (
        <section className="py-10 container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Exclusive Offers</h2>
                    <p className="text-muted-foreground text-sm mt-1">Deals you don't want to miss</p>
                </div>
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                    View all deals <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div key={offer.id} className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-sm hover:shadow-md transition-all">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                        {/* Background Image */}
                        <div className="h-64 overflow-hidden">
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white mb-2 bg-gradient-to-r ${offer.color}`}>
                                {offer.tag}
                            </span>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{offer.title}</h3>
                            <p className="text-white/80 text-sm line-clamp-2 mb-3">{offer.description}</p>
                            <div className="flex items-center text-white text-xs font-semibold">
                                Grab Deal <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white">
                            <Tag className="w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OffersSection;
