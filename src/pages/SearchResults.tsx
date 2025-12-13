import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, List, X, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import HotelCard from '@/components/HotelCard';
import FilterSidebar from '@/components/FilterSidebar';
import { hotels, searchHotels } from '@/data/hotels';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import HotelMap from '@/components/HotelMap';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationQuery = searchParams.get('location') || 'Siem Reap'; // Default to Siem Reap to ensure results
  const [headerHidden, setHeaderHidden] = useState(false);
  const hotelListRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [showMap, setShowMap] = useState(false);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filters, setFilters] = useState({
    priceRange: [0, 4000] as [number, number],
    amenities: [] as string[],
    stars: [] as number[],
    propertyTypes: [] as string[],
    sortBy: 'rating-high',
    province: locationQuery,
    zones: [] as string[],
    guestRating: null as number | null,
    paymentTypes: [] as string[],
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredHotels = useMemo(() => {
    // Start with province/location filter
    let results = filters.province
      ? searchHotels(filters.province)
      : (locationQuery ? searchHotels(locationQuery) : hotels);

    // Apply price filter
    results = results.filter(hotel =>
      hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
    );

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      results = results.filter(hotel =>
        filters.amenities.every(amenity =>
          hotel.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        )
      );
    }

    // Apply stars filter
    if (filters.stars.length > 0) {
      results = results.filter(hotel => filters.stars.includes(hotel.stars));
    }

    // Apply property type filter
    if (filters.propertyTypes.length > 0) {
      results = results.filter(hotel => filters.propertyTypes.includes(hotel.propertyType));
    }

    // Apply Guest Rating filter
    if (filters.guestRating) {
      results = results.filter(hotel => hotel.rating >= (filters.guestRating as number));
    }

    // Apply Payment Type filter (mock implementation as data might be missing on some)
    if (filters.paymentTypes.length > 0) {
      results = results.filter(hotel =>
        filters.paymentTypes.some(type =>
          hotel.paymentMethods?.includes(type) ||
          (type === 'Free Cancellation' && hotel.policies?.cancellation.includes('Free'))
        )
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        results = [...results].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        results = [...results].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-high':
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        results = [...results].sort((a, b) => a.rating - b.rating);
        break;
      default:
        results = [...results].sort((a, b) => a.price - b.price);
    }

    return results;
  }, [locationQuery, filters]);

  const hasActiveFilters =
    filters.amenities.length > 0 ||
    filters.stars.length > 0 ||
    filters.propertyTypes.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 4000 ||
    filters.zones.length > 0 ||
    filters.guestRating !== null ||
    filters.paymentTypes.length > 0;

  useEffect(() => {
    const handleScroll = () => {
      if (!hotelListRef.current) return;
      const currentY = hotelListRef.current.scrollTop;

      // Hide header if scrolling DOWN and position is > 50px
      if (currentY > 50 && currentY > lastScrollY.current) {
        setHeaderHidden(true);
      }
      // Show header if scrolling UP significantly or at top
      else if (currentY < lastScrollY.current - 10 || currentY < 20) {
        setHeaderHidden(false);
      }

      lastScrollY.current = currentY;
    };

    const listElement = hotelListRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Global Header (Collapsible) */}
      <div className={`shrink-0 z-50 transition-all duration-300 ease-in-out ${headerHidden ? '-mt-20 opacity-0 pointer-events-none' : 'mt-0 opacity-100'}`}>
        <Header hideOnScroll={false} />
      </div>

      {/* Search Bar (Sticky/Fixed) */}
      <div className="shrink-0 z-40 border-b border-border bg-card shadow-sm py-4">
        <div className="container px-4">
          <SearchBar variant="compact" className="mx-auto max-w-3xl" />
        </div>
      </div>

      {/* Main Content Area (Independent Scroll) */}
      <div className="flex-1 container mx-auto px-4 lg:px-6 min-h-0">
        <div className="grid h-full lg:grid-cols-[280px_minmax(0,1fr)] gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block h-full overflow-y-auto no-scrollbar py-6 pr-2">
            <FilterSidebar
              onFiltersChange={setFilters}
              initialProvince={locationQuery}
              onShowMap={() => setShowMap(true)}
            />
          </aside>

          {/* Results List */}
          <div
            ref={hotelListRef}
            className="min-w-0 h-full overflow-y-auto no-scrollbar py-6 pl-2"
          >
            {/* Results Header */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {filters.province || locationQuery
                    ? `Hotels in ${filters.province || locationQuery}`
                    : 'All Hotels in Cambodia'}
                </h1>
                <p className="text-muted-foreground">
                  {filteredHotels.length} {filteredHotels.length === 1 ? 'property' : 'properties'} found
                  {filters.zones.length > 0 && ` in ${filters.zones.length} selected area${filters.zones.length > 1 ? 's' : ''}`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 lg:hidden">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                      {hasActiveFilters && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          !
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full max-w-sm p-0">
                    <div className="h-full overflow-y-auto">
                      <FilterSidebar
                        onFiltersChange={setFilters}
                        onClose={() => setIsFilterOpen(false)}
                        isMobile
                        initialProvince={locationQuery}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* View Toggle */}
                <div className="hidden items-center gap-1 rounded-lg border border-border p-1 md:flex">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {filters.amenities.map((amenity) => (
                    <Button
                      key={amenity}
                      variant="secondary"
                      size="sm"
                      className="gap-1 rounded-full"
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        amenities: prev.amenities.filter(a => a !== amenity)
                      }))}
                    >
                      {amenity}
                      <X className="h-3 w-3" />
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                    onClick={() => setFilters({
                      priceRange: [0, 4000],
                      amenities: [],
                      stars: [],
                      propertyTypes: [],
                      sortBy: 'rating-high',
                      province: locationQuery,
                      zones: [],
                      guestRating: null,
                      paymentTypes: []
                    })}
                  >
                    Clear all
                  </Button>
                </div>
              )}

              {filteredHotels.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
                      : 'flex flex-col gap-3'
                  }
                >
                  {filteredHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} viewMode={viewMode} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 text-6xl">🏨</div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">No hotels found</h3>
                  <p className="mb-6 text-muted-foreground">
                    Try adjusting your filters or search for a different destination.
                  </p>
                  <Button
                    onClick={() => {
                      setFilters({
                        priceRange: [0, 4000],
                        amenities: [],
                        stars: [],
                        propertyTypes: [],
                        sortBy: 'rating-high',
                        province: '',
                        zones: [],
                        guestRating: null,
                        paymentTypes: []
                      });
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              <div className="mt-8">
                <Footer />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Floating Map Button - Navigates to Map Page */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 lg:hidden">
          <Button
            onClick={() => window.location.href = `/map-search?${searchParams.toString()}`}
            className="rounded-full shadow-lg bg-slate-900 text-white px-6 py-6 font-bold flex items-center gap-2 hover:bg-slate-800 hover:scale-105 transition-all text-sm"
          >
            <MapPin className="w-4 h-4" />
            Map View
          </Button>
        </div>

        {/* Map Modal */}
        <Dialog open={showMap} onOpenChange={setShowMap}>
          <DialogContent className="max-w-[95vw] h-[90vh] w-full p-0 overflow-hidden flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Map View</h2>
              {/* Standard Close button is built-in to DialogContent, usually */}
            </div>
            <div className="flex-1 relative">
              <HotelMap hotels={filteredHotels} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SearchResults;
