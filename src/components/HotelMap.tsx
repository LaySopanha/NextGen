
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Hotel } from '@/data/hotels';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map center when hotels change
const FitBounds = ({ hotels }: { hotels: Hotel[] }) => {
    const map = useMap();

    useEffect(() => {
        if (hotels.length > 0) {
            const bounds = L.latLngBounds(hotels.map(h => [h.coordinates.lat, h.coordinates.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [hotels, map]);

    return null;
};

interface HotelMapProps {
    hotels: Hotel[];
}

const HotelMap = ({ hotels }: HotelMapProps) => {
    // Default center (Siem Reap) if no hotels
    const defaultCenter: [number, number] = [13.3633, 103.8564];

    // Custom Icon for Hotels (Price Label Style)
    const createCustomIcon = (price: number) => {
        return L.divIcon({
            className: 'custom-map-marker',
            html: `<div class="bg-primary text-primary-foreground font-bold px-2 py-1 rounded shadow-md text-sm hover:scale-110 transition-transform whitespace-nowrap">$${price}</div>`,
            iconSize: [40, 30],
            iconAnchor: [20, 30],
        });
    };

    return (
        <div className="h-full w-full rounded-xl overflow-hidden shadow-sm border border-border">
            <MapContainer
                center={defaultCenter}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.osmtiles.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitBounds hotels={hotels} />

                {hotels.map((hotel) => (
                    <Marker
                        key={hotel.id}
                        position={[hotel.coordinates.lat, hotel.coordinates.lng]}
                        icon={createCustomIcon(hotel.price)}
                    >
                        <Popup className="hotel-popup">
                            <div className="w-[200px] p-0">
                                <div className="relative h-28 w-full mb-2 rounded overflow-hidden">
                                    <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-1 right-1 bg-white/90 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-0.5">
                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                        {hotel.rating}
                                    </div>
                                </div>
                                <h3 className="font-bold text-sm leading-tight mb-1 line-clamp-2">{hotel.name}</h3>
                                <p className="text-xs text-muted-foreground mb-2">{hotel.location}</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-lg text-primary">${hotel.price}</span>
                                    <Link to={`/hotel/${hotel.id}`}>
                                        <Button size="sm" className="h-7 text-xs">View</Button>
                                    </Link>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default HotelMap;
