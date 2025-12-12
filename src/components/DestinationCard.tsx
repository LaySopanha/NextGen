import { Link } from 'react-router-dom';
import { Destination } from '@/data/hotels';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Link
      to={`/search?location=${encodeURIComponent(destination.name)}`}
      className="group relative block overflow-hidden rounded-2xl"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-background">{destination.name}</h3>
          <p className="text-sm text-background/80">{destination.country}</p>
          <p className="mt-1 text-sm font-medium text-background/90">{destination.hotelCount} hotels</p>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
