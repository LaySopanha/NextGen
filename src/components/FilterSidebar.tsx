import { useState, useEffect } from 'react';
import { Star, X, ChevronDown, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { provinceZones } from '@/data/hotels';

interface FilterSidebarProps {
  onFiltersChange: (filters: {
    priceRange: [number, number];
    stars: number[];
    propertyTypes: string[];
    amenities: string[];
    sortBy: string;
    province: string;
    zones: string[];
  }) => void;
  onClose?: () => void;
  isMobile?: boolean;
  initialProvince?: string;
}

const sortOptions = [
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating-high', label: 'Rating: High to Low' },
  { value: 'rating-low', label: 'Rating: Low to High' },
];

const propertyTypes = ['Hotel', 'Resort', 'Villa', 'Boutique', 'Apartment'];
const amenitiesList = ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Room Service', 'Airport Transfer', 'Parking'];

const FilterSidebar = ({ onFiltersChange, onClose, isMobile, initialProvince }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('rating-high');
  const [selectedProvince, setSelectedProvince] = useState<string>(initialProvince || '');
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  
  const [locationOpen, setLocationOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(true);
  const [starsOpen, setStarsOpen] = useState(true);
  const [propertyOpen, setPropertyOpen] = useState(true);
  const [amenitiesOpen, setAmenitiesOpen] = useState(true);

  // Get zones for selected province
  const currentProvinceZones = provinceZones.find(p => p.province === selectedProvince)?.zones || [];

  // Update province when initialProvince changes
  useEffect(() => {
    if (initialProvince && initialProvince !== selectedProvince) {
      setSelectedProvince(initialProvince);
      setSelectedZones([]);
    }
  }, [initialProvince]);

  const handleApplyFilters = () => {
    onFiltersChange({
      priceRange,
      stars: selectedStars,
      propertyTypes: selectedPropertyTypes,
      amenities: selectedAmenities,
      sortBy,
      province: selectedProvince,
      zones: selectedZones,
    });
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleClearFilters = () => {
    setPriceRange([0, 4000]);
    setSelectedStars([]);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
    setSortBy('price-low');
    setSelectedProvince('');
    setSelectedZones([]);
    onFiltersChange({
      priceRange: [0, 4000],
      stars: [],
      propertyTypes: [],
      amenities: [],
      sortBy: 'price-low',
      province: '',
      zones: [],
    });
  };


  const toggleStar = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const toggleZone = (zoneId: string) => {
    setSelectedZones((prev) =>
      prev.includes(zoneId) ? prev.filter((z) => z !== zoneId) : [...prev, zoneId]
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Popular Areas - Shows only when province is selected */}
      {selectedProvince && currentProvinceZones.length > 0 && (
        <Collapsible open={locationOpen} onOpenChange={setLocationOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-foreground">Popular Areas in {selectedProvince}</h4>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${locationOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="space-y-2 pt-2 pb-4">
              {currentProvinceZones.map((zone) => (
                <div
                  key={zone.id}
                  className={`flex items-start gap-3 p-2 rounded-lg border cursor-pointer transition-all ${
                    selectedZones.includes(zone.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  onClick={() => toggleZone(zone.id)}
                >
                  <Checkbox
                    checked={selectedZones.includes(zone.id)}
                    onCheckedChange={() => toggleZone(zone.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{zone.name}</p>
                    <p className="text-xs text-muted-foreground">{zone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {selectedProvince && currentProvinceZones.length > 0 && <Separator className="my-4" />}

      <Separator className="my-4" />

      {/* Sort By */}
      <Collapsible open={sortOpen} onOpenChange={setSortOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="font-medium text-foreground">Sort By</h4>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <RadioGroup value={sortBy} onValueChange={setSortBy} className="space-y-2 pt-2 pb-4">
            {sortOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="text-sm cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      <Separator className="my-4" />

      {/* Price Range */}
      <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="font-medium text-foreground">Price Range</h4>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${priceOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="pt-2 pb-4">
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              max={4000}
              min={0}
              step={10}
              className="mb-2"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator className="my-4" />

      {/* Star Rating */}
      <Collapsible open={starsOpen} onOpenChange={setStarsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="font-medium text-foreground">Star Rating</h4>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${starsOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="flex flex-wrap gap-2 pt-2 pb-4">
            {[5, 4, 3, 2, 1].map((star) => (
              <Button
                key={star}
                variant={selectedStars.includes(star) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleStar(star)}
                className="flex items-center gap-1"
              >
                {star}
                <Star className="h-3 w-3 fill-current" />
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator className="my-4" />

      {/* Property Type */}
      <Collapsible open={propertyOpen} onOpenChange={setPropertyOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="font-medium text-foreground">Property Type</h4>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${propertyOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="space-y-3 pt-2 pb-4">
            {propertyTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedPropertyTypes.includes(type)}
                  onCheckedChange={() => togglePropertyType(type)}
                />
                <Label htmlFor={type} className="text-sm cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator className="my-4" />

      {/* Amenities */}
      <Collapsible open={amenitiesOpen} onOpenChange={setAmenitiesOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="font-medium text-foreground">Amenities</h4>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${amenitiesOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="space-y-3 pt-2 pb-4">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => toggleAmenity(amenity)}
                />
                <Label htmlFor={amenity} className="text-sm cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator className="my-4" />

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={handleClearFilters} className="flex-1">
          Clear All
        </Button>
        <Button onClick={handleApplyFilters} className="flex-1">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
