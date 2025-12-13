import { useState, useEffect } from 'react';
import mapPreview from '@/assets/map-preview.png';
import { Search, MapPin, X, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { provinceZones } from '@/data/hotels';
import mapPreviewImg from '@/assets/map-preview.png';

interface FilterSidebarProps {
  onFiltersChange: (filters: any) => void;
  onClose?: () => void;
  isMobile?: boolean;
  initialProvince?: string;
  onShowMap?: () => void;
}

const FilterSidebar = ({ onFiltersChange, onClose, isMobile, initialProvince, onShowMap }: FilterSidebarProps) => {
  const PRICE_MIN = 0;
  const PRICE_MAX = 4000;
  const pricePresets: [number, number][] = [
    [0, 100],
    [100, 300],
    [300, 600],
    [600, 1000],
    [1000, 2000],
  ];

  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [stars, setStars] = useState<number[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [guestRating, setGuestRating] = useState<number | null>(null);
  const [paymentTypes, setPaymentTypes] = useState<string[]>([]);
  const [zones, setZones] = useState<string[]>([]);
  const [province, setProvince] = useState(initialProvince || '');

  // Effects to sync state
  useEffect(() => {
    onFiltersChange({
      priceRange,
      amenities,
      stars,
      propertyTypes,
      guestRating,
      paymentTypes,
      zones,
      province
    });
  }, [priceRange, amenities, stars, propertyTypes, guestRating, paymentTypes, zones, province]);

  useEffect(() => {
    if (initialProvince) setProvince(initialProvince);
  }, [initialProvince]);

  const toggleFilter = (item: string | number, currentList: any[], setList: (l: any[]) => void) => {
    if (currentList.includes(item)) {
      setList(currentList.filter(i => i !== item));
    } else {
      setList([...currentList, item]);
    }
  };

  const handleClearAll = () => {
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setAmenities([]);
    setStars([]);
    setPropertyTypes([]);
    setGuestRating(null);
    setPaymentTypes([]);
    setZones([]);
  };

  const availableZones = provinceZones.find(p => p.province.toLowerCase() === province.toLowerCase())?.zones || [];

  const updateMinPrice = (value: number) => {
    const clamped = Math.max(PRICE_MIN, Math.min(value, priceRange[1]));
    setPriceRange([clamped, priceRange[1]]);
  };

  const updateMaxPrice = (value: number) => {
    const clamped = Math.min(PRICE_MAX, Math.max(value, priceRange[0]));
    setPriceRange([priceRange[0], clamped]);
  };

  return (
    <div className={`flex flex-col h-full bg-card rounded-xl border border-border/50 shadow-sm ${isMobile ? 'border-none shadow-none rounded-none' : ''}`}>
      {!isMobile && (
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-lg">Filters</h3>
          <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-primary hover:text-primary/80 h-auto p-0 hover:bg-transparent">
            Clear all
          </Button>
        </div>
      )}

      {/* Show on Map Widget */}
      {!isMobile && (
        <div className="p-4 border-b border-border">
          <div
            className="relative h-24 rounded-lg overflow-hidden border border-border cursor-pointer group"
            onClick={() => {
              const params = new URLSearchParams();
              if (province) params.set('location', province);
              window.location.href = `/map-search?${params.toString()}`;
            }}
          >
            <img
              src={mapPreviewImg}
              alt="Map View"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button className="bg-primary/90 hover:bg-primary shadow-lg gap-2 pointer-events-none">
                <MapPin className="h-4 w-4" />
                Show on Map
              </Button>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-background z-10">
          <h3 className="font-bold text-lg">Filters</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">

          {/* Popular Filters */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Popular Filters</h4>
            <div className="space-y-2">
              {[
                { label: "Free Cancellation", value: "free_cancellation" },
                { label: "Breakfast Included", value: "breakfast_included" },
                { label: "Pool", value: "pool" },
                { label: "Spa", value: "spa" }
              ].map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`pop-${opt.value}`}
                    checked={amenities.includes(opt.label)}
                    onCheckedChange={() => toggleFilter(opt.label, amenities, setAmenities)}
                  />
                  <label htmlFor={`pop-${opt.value}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    {opt.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Price Range (Per Night)</h4>
            <Slider
              value={priceRange}
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={25}
              onValueChange={setPriceRange}
              className="mb-4"
            />
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground block mb-1">Min</label>
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => updateMinPrice(Number(e.target.value) || PRICE_MIN)}
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                />
              </div>
              <span className="text-muted-foreground mt-6">to</span>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground block mb-1">Max</label>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => updateMaxPrice(Number(e.target.value) || PRICE_MAX)}
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {pricePresets.map(([min, max]) => (
                <Button
                  key={`${min}-${max}`}
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${priceRange[0] === min && priceRange[1] === max ? 'border-primary text-primary' : ''}`}
                  onClick={() => setPriceRange([min, max])}
                >
                  ${min} - ${max}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full ${priceRange[0] === PRICE_MIN && priceRange[1] === PRICE_MAX ? 'border-primary text-primary' : ''}`}
                onClick={() => setPriceRange([PRICE_MIN, PRICE_MAX])}
              >
                Any
              </Button>
            </div>
          </div>

          <Separator />

          {/* Star Rating */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Star Rating</h4>
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2].map((star) => (
                <div key={star} className="flex items-center space-x-2">
                  <Checkbox
                    id={`star-${star}`}
                    checked={stars.includes(star)}
                    onCheckedChange={() => toggleFilter(star, stars, setStars)}
                  />
                  <label htmlFor={`star-${star}`} className="flex items-center cursor-pointer flex-1">
                    <div className="flex items-center">
                      {Array.from({ length: star }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Guest Rating */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Guest Rating</h4>
            <div className="space-y-2">
              {[
                { val: 4.5, label: "Excellent 4.5+" },
                { val: 4.0, label: "Very Good 4.0+" },
                { val: 3.5, label: "Good 3.5+" }
              ].map((opt) => (
                <div key={opt.val} className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full border border-primary flex items-center justify-center cursor-pointer ${guestRating === opt.val ? 'bg-primary' : ''}`}
                    onClick={() => setGuestRating(guestRating === opt.val ? null : opt.val)}
                  >
                    {guestRating === opt.val && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <label className="text-sm cursor-pointer" onClick={() => setGuestRating(guestRating === opt.val ? null : opt.val)}>
                    {opt.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Location / Zones */}
          {availableZones.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold mb-3 text-sm">Neighborhood / Area</h4>
                <div className="space-y-2">
                  {availableZones.map((zone) => (
                    <div key={zone.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`zone-${zone.id}`}
                        checked={zones.includes(zone.id)}
                        onCheckedChange={() => toggleFilter(zone.id, zones, setZones)}
                      />
                      <label htmlFor={`zone-${zone.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        {zone.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Property Type */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Property Type</h4>
            <div className="space-y-2">
              {["Hotel", "Resort", "Apartment", "Villa", "Guesthouse"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={propertyTypes.includes(type)}
                    onCheckedChange={() => toggleFilter(type, propertyTypes, setPropertyTypes)}
                  />
                  <label htmlFor={`type-${type}`} className="text-sm font-medium cursor-pointer">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Payment Type */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Payment Type</h4>
            <div className="space-y-2">
              {["Free Cancellation", "No Prepayment Needed", "Pay at Hotel"].map((pay) => (
                <div key={pay} className="flex items-center space-x-2">
                  <Checkbox
                    id={`pay-${pay}`}
                    checked={paymentTypes.includes(pay)}
                    onCheckedChange={() => toggleFilter(pay, paymentTypes, setPaymentTypes)}
                  />
                  <label htmlFor={`pay-${pay}`} className="text-sm font-medium cursor-pointer">
                    {pay}
                  </label>
                </div>
              ))}
            </div>
          </div>

        </div>
      </ScrollArea>

      {isMobile && (
        <div className="p-4 border-t border-border bg-background sticky bottom-0">
          <Button className="w-full" onClick={onClose}>Show Results</Button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
