import { ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { offers } from '@/data/offers';

const OffersSection = () => {
    return (
        <section className="py-10 container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Exclusive Offers</h2>
                    <p className="text-muted-foreground text-sm mt-1">Deals you don't want to miss</p>
                </div>
                <Button asChild variant="ghost" className="text-primary hover:text-primary/80">
                    <Link to="/offers">
                        View all deals <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <Link key={offer.id} to={`/offers/${offer.slug}`} className="group">
                        <div className="relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all">
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
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default OffersSection;
