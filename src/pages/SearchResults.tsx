import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, List, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import HotelCard from '@/components/HotelCard';
import FilterSidebar from '@/components/FilterSidebar';
import { hotels, searchHotels } from '@/data/hotels';
import { Button } from '@/components/ui/button';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get('location') || '';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    priceRange: [0, 4000] as [number, number],
    amenities: [] as string[],
    stars: [] as number[],
    propertyTypes: [] as string[],
    sortBy: 'rating-high',
    province: locationQuery,
    zones: [] as string[],
  });

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
    filters.zones.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search Header */}
      <div className="border-b border-border bg-card py-6">
        <div className="container px-4">
          <SearchBar variant="compact" className="mx-auto max-w-3xl" />
        </div>
      </div>

      <div className="container px-4 py-8">
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
            <Sheet>
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
                <div className="h-full overflow-y-auto p-6">
                <FilterSidebar
                  onFiltersChange={setFilters}
                  onClose={() => {}}
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
              })}
            >
              Clear all
            </Button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24">
              <FilterSidebar onFiltersChange={setFilters} initialProvince={locationQuery} />
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            {filteredHotels.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3'
                    : 'flex flex-col gap-4'
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
                    });
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
