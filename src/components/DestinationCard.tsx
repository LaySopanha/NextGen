import { Link } from 'react-router-dom';
import { Destination } from '@/data/hotels';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Link
      to={`/search?location=${encodeURIComponent(destination.name)}`}
      className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all"
    >
      <div className="aspect-[4/3] md:aspect-square overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-base font-bold text-white leading-tight">{destination.name}</h3>
          <p className="mt-0.5 text-xs text-white/80 font-medium">{destination.hotelCount} properties</p>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
