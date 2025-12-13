import { Hotel, Plane, Map, Car, Ticket, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    { icon: Hotel, label: 'Hotels', color: 'bg-blue-100 text-blue-600', link: '/search' },
    { icon: Plane, label: 'Flights', color: 'bg-sky-100 text-sky-600', link: '/flights' },
    { icon: Ticket, label: 'Attractions', color: 'bg-purple-100 text-purple-600', link: '/attractions' },
    { icon: Car, label: 'Car Rental', color: 'bg-green-100 text-green-600', link: '/cars' },
    { icon: Map, label: 'Tours', color: 'bg-orange-100 text-orange-600', link: '/tours' },
    { icon: UtensilsCrossed, label: 'Food', color: 'bg-red-100 text-red-600', link: '/food' },
];

const CategorySection = () => {
    return (
        <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-xl font-bold mb-6 text-foreground">Explore by Category</h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {categories.map((item, index) => (
                        <Link
                            key={index}
                            to={item.link}
                            className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-slate-50 transition-all duration-300 group border border-transparent hover:border-slate-100 hover:shadow-sm"
                        >
                            <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
