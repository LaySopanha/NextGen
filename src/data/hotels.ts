import siemReapImg from '@/assets/destinations/siem-reap.jpg';
import phnomPenhImg from '@/assets/destinations/phnom-penh.jpg';
import sihanoukvilleImg from '@/assets/destinations/sihanoukville.jpg';
import kampotImg from '@/assets/destinations/kampot.jpg';
import battambangImg from '@/assets/destinations/battambang.jpg';

export type PropertyType = 'Hotel' | 'Resort' | 'Villa' | 'Boutique' | 'Apartment' | 'Guesthouse';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  stars: number;
  propertyType: PropertyType;
  images: string[];
  amenities: string[];
  roomTypes: RoomType[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
}

export const mealPlans: MealPlan[] = [
  { id: 'room-only', name: 'Room Only', description: 'No meals included', pricePerNight: 0 },
  { id: 'breakfast', name: 'Breakfast', description: 'Daily breakfast buffet', pricePerNight: 15 },
  { id: 'half-board', name: 'Half Board', description: 'Breakfast + Dinner', pricePerNight: 35 },
  { id: 'full-board', name: 'Full Board', description: 'Breakfast + Lunch + Dinner', pricePerNight: 55 },
];

export interface RoomType {
  id: string;
  name: string;
  price: number;
  capacity: number;
  beds: string;
  size: number;
  amenities: string[];
  image: string;
  available: number;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
}

export interface ProvinceZones {
  province: string;
  zones: Zone[];
}

export const provinceZones: ProvinceZones[] = [
  {
    province: 'Siem Reap',
    zones: [
      { id: 'angkor-wat-area', name: 'Angkor Wat Area', description: 'Near the famous temple complex' },
      { id: 'old-market', name: 'Old Market (Pub Street)', description: 'City center with nightlife' },
      { id: 'riverside', name: 'Siem Reap River', description: 'Scenic riverside location' },
      { id: 'airport-area', name: 'Airport Area', description: 'Convenient for early flights' },
    ]
  },
  {
    province: 'Phnom Penh',
    zones: [
      { id: 'royal-palace', name: 'Royal Palace Area', description: 'Near Royal Palace & Silver Pagoda' },
      { id: 'riverfront', name: 'Sisowath Quay (Riverfront)', description: 'Mekong riverside promenade' },
      { id: 'bkk1', name: 'BKK1', description: 'Upscale expat neighborhood' },
      { id: 'russian-market', name: 'Russian Market Area', description: 'Near Tuol Sleng & markets' },
    ]
  },
  {
    province: 'Sihanoukville',
    zones: [
      { id: 'ochheuteal-beach', name: 'Ochheuteal Beach', description: 'Main tourist beach' },
      { id: 'otres-beach', name: 'Otres Beach', description: 'Quieter beach area' },
      { id: 'koh-rong', name: 'Koh Rong Island', description: 'Paradise island getaway' },
      { id: 'koh-rong-samloem', name: 'Koh Rong Samloem', description: 'Pristine secluded island' },
    ]
  },
  {
    province: 'Kampot',
    zones: [
      { id: 'kampot-riverside', name: 'Kampot Riverside', description: 'Along the Kampot River' },
      { id: 'bokor-mountain', name: 'Bokor Mountain', description: 'Hill station with views' },
      { id: 'kep-beach', name: 'Kep Beach Area', description: 'Nearby coastal town' },
      { id: 'pepper-farms', name: 'Pepper Plantation Area', description: 'Famous Kampot pepper region' },
    ]
  },
  {
    province: 'Battambang',
    zones: [
      { id: 'battambang-center', name: 'City Center', description: 'Colonial architecture area' },
      { id: 'bamboo-train', name: 'Bamboo Train Area', description: 'Near the famous bamboo railway' },
      { id: 'phare-circus', name: 'Phare Circus Area', description: 'Near the famous circus' },
      { id: 'sangker-river', name: 'Sangker River', description: 'Scenic riverside location' },
    ]
  },
];

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  hotelCount: number;
  description: string;
}

export const destinations: Destination[] = [
  {
    id: 'siem-reap',
    name: 'Siem Reap',
    country: 'Cambodia',
    image: siemReapImg,
    hotelCount: 6,
    description: 'Home to the magnificent Angkor Wat temple complex'
  },
  {
    id: 'phnom-penh',
    name: 'Phnom Penh',
    country: 'Cambodia',
    image: phnomPenhImg,
    hotelCount: 5,
    description: 'The vibrant capital city along the Mekong River'
  },
  {
    id: 'sihanoukville',
    name: 'Sihanoukville',
    country: 'Cambodia',
    image: sihanoukvilleImg,
    hotelCount: 4,
    description: 'Beautiful beaches and tropical island getaways'
  },
  {
    id: 'kampot',
    name: 'Kampot',
    country: 'Cambodia',
    image: kampotImg,
    hotelCount: 4,
    description: 'Riverside charm, pepper plantations, and Bokor Mountain'
  },
  {
    id: 'battambang',
    name: 'Battambang',
    country: 'Cambodia',
    image: battambangImg,
    hotelCount: 3,
    description: 'Colonial charm and authentic Cambodian culture'
  }
];

export const hotels: Hotel[] = [
  // ========== SIEM REAP HOTELS ==========
  {
    id: 'sofitel-angkor-phokeethra',
    name: 'Sofitel Angkor Phokeethra Golf & Spa Resort',
    location: 'Vithei Charles de Gaulle, Khum Svay Dang Kum, Siem Reap',
    city: 'Siem Reap',
    country: 'Cambodia',
    description: 'A stunning French colonial-style resort featuring Cambodia\'s largest free-form swimming pool. Enjoy championship golf, a luxurious spa, and five restaurants offering cuisines from around the world.',
    price: 280,
    rating: 4.8,
    reviews: 4966,
    stars: 5,
    propertyType: 'Resort',
    images: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/d1/41/0b/luxurious-garden.jpg?w=800&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/d1/3e/fd/pool-by-night.jpg?w=800&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/d1/3d/0c/opera-suite-living-room.jpg?w=800&h=-1&s=1'
    ],
    amenities: ['Largest Pool', 'Golf Course', 'So Spa', '5 Restaurants', 'Free WiFi', 'Kids Club', 'Tennis', 'Gym'],
    roomTypes: [
      {
        id: 'superior-room',
        name: 'Superior Room',
        price: 220,
        capacity: 2,
        beds: '1 King Bed or 2 Twin Beds',
        size: 36,
        amenities: ['Garden View', 'Air Conditioning', 'Mini Bar', 'Safe'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/d1/3d/0c/opera-suite-living-room.jpg?w=800&h=-1&s=1',
        available: 8
      },
      {
        id: 'luxury-room',
        name: 'Luxury Room',
        price: 280,
        capacity: 2,
        beds: '1 King Bed',
        size: 42,
        amenities: ['Garden View', 'Balcony', 'Bathtub', 'Mini Bar'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/d1/3d/0c/opera-suite-living-room.jpg?w=800&h=-1&s=1',
        available: 5
      },
      {
        id: 'prestige-suite',
        name: 'Prestige Suite',
        price: 420,
        capacity: 3,
        beds: '1 King Bed',
        size: 68,
        amenities: ['Pool View', 'Living Room', 'Jacuzzi', 'Club Access'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/d1/3d/0c/opera-suite-living-room.jpg?w=800&h=-1&s=1',
        available: 3
      },
      {
        id: 'opera-suite',
        name: 'Opera Suite',
        price: 650,
        capacity: 4,
        beds: '1 King Bed + Sofa Bed',
        size: 84,
        amenities: ['Pool View', 'Living Room', 'Jacuzzi', 'Butler Service', 'Private Dining'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/d1/3d/0c/opera-suite-living-room.jpg?w=800&h=-1&s=1',
        available: 2
      }
    ],
    coordinates: { lat: 13.3621, lng: 103.8542 }
  },
  {
    id: 'jaya-house-river-park',
    name: 'Jaya House River Park',
    location: 'River Road, Siem Reap',
    city: 'Siem Reap',
    country: 'Cambodia',
    description: 'One of the highest-rated properties in Siem Reap with perfect 5.0 rating. A boutique luxury hotel featuring stunning silver-tiled pools, exceptional service, and beautiful grounds.',
    price: 350,
    rating: 5.0,
    reviews: 4646,
    stars: 5,
    propertyType: 'Boutique',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
    ],
    amenities: ['2 Pools', 'Spa', 'Restaurant', 'Free WiFi', 'Airport Transfer', 'Bicycle Rental', 'River Views'],
    roomTypes: [
      {
        id: 'deluxe-room',
        name: 'Deluxe Room',
        price: 350,
        capacity: 2,
        beds: '1 King Bed',
        size: 45,
        amenities: ['Garden View', 'Rain Shower', 'Mini Bar', 'Bathtub'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        available: 6
      },
      {
        id: 'river-suite',
        name: 'River View Suite',
        price: 520,
        capacity: 2,
        beds: '1 King Bed',
        size: 65,
        amenities: ['River View', 'Private Balcony', 'Living Area', 'Butler Service'],
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
        available: 3
      },
      {
        id: 'pool-villa',
        name: 'Pool Villa',
        price: 780,
        capacity: 3,
        beds: '1 King Bed',
        size: 95,
        amenities: ['Private Pool', 'Garden', 'Outdoor Shower', 'Butler Service', 'Breakfast Included'],
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        available: 2
      }
    ],
    coordinates: { lat: 13.3548, lng: 103.8554 }
  },
  {
    id: 'borei-angkor-resort',
    name: 'Borei Angkor Resort & Spa',
    location: 'National Road 6, Siem Reap',
    city: 'Siem Reap',
    country: 'Cambodia',
    description: 'An elegant resort combining traditional Khmer architecture with modern luxury. Features beautiful swimming pools, full-service spa, and excellent breakfast included.',
    price: 180,
    rating: 4.7,
    reviews: 3200,
    stars: 4,
    propertyType: 'Resort',
    images: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/af/ab/2b/borei-angkor-resort-spa.jpg?w=800&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/af/aa/f8/borei-angkor-resort-spa.jpg?w=800&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/af/aa/c5/borei-angkor-resort-spa.jpg?w=800&h=-1&s=1'
    ],
    amenities: ['Pool', 'Spa', 'Restaurant', 'Breakfast Included', 'Free WiFi', 'Gym', 'Temple Tours'],
    roomTypes: [
      {
        id: 'standard-room',
        name: 'Standard Room',
        price: 140,
        capacity: 2,
        beds: '1 Queen Bed',
        size: 32,
        amenities: ['City View', 'Air Conditioning', 'Safe', 'TV'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/af/aa/c5/borei-angkor-resort-spa.jpg?w=800&h=-1&s=1',
        available: 10
      },
      {
        id: 'superior-room',
        name: 'Superior Room',
        price: 180,
        capacity: 2,
        beds: '1 King Bed',
        size: 38,
        amenities: ['Pool View', 'Air Conditioning', 'Mini Bar', 'Safe'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/af/aa/c5/borei-angkor-resort-spa.jpg?w=800&h=-1&s=1',
        available: 8
      },
      {
        id: 'deluxe-suite',
        name: 'Deluxe Suite',
        price: 320,
        capacity: 3,
        beds: '1 King Bed + Sofa Bed',
        size: 60,
        amenities: ['Garden View', 'Living Room', 'Bathtub', 'Balcony'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/af/aa/f8/borei-angkor-resort-spa.jpg?w=800&h=-1&s=1',
        available: 4
      }
    ],
    coordinates: { lat: 13.3847, lng: 103.8588 }
  },
  {
    id: 'raffles-grand-hotel-angkor',
    name: 'Raffles Grand Hotel d\'Angkor',
    location: '1 Vithei Charles de Gaulle, Siem Reap',
    city: 'Siem Reap',
    country: 'Cambodia',
    description: 'A legendary 1932 landmark offering French colonial elegance combined with Khmer hospitality. Set in 15 acres of lush gardens featuring the famous Elephant Bar.',
    price: 450,
    rating: 4.9,
    reviews: 2847,
    stars: 5,
    propertyType: 'Hotel',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
    ],
    amenities: ['2 Pools', 'Raffles Spa', 'Elephant Bar', 'Fine Dining', 'Free WiFi', 'Tennis Court', 'Butler Service'],
    roomTypes: [
      {
        id: 'state-room',
        name: 'State Room',
        price: 450,
        capacity: 2,
        beds: '1 King Bed',
        size: 47,
        amenities: ['Garden View', 'Air Conditioning', 'Mini Bar', 'Bathtub'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        available: 12
      },
      {
        id: 'cabana-room',
        name: 'Cabana Room',
        price: 580,
        capacity: 2,
        beds: '1 King Bed',
        size: 55,
        amenities: ['Pool Access', 'Private Terrace', 'Mini Bar', 'Outdoor Shower'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        available: 6
      },
      {
        id: 'landmark-suite',
        name: 'Landmark Suite',
        price: 850,
        capacity: 3,
        beds: '1 King Bed',
        size: 94,
        amenities: ['Pool View', 'Living Room', 'Butler Service', 'Private Balcony'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        available: 3
      },
      {
        id: 'royal-suite',
        name: 'Royal Suite',
        price: 1500,
        capacity: 4,
        beds: '1 King Bed + 2 Singles',
        size: 165,
        amenities: ['Panoramic Views', 'Dining Room', 'Butler Service', 'Private Garden', 'Jacuzzi'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        available: 1
      }
    ],
    coordinates: { lat: 13.3633, lng: 103.8564 }
  },
  {
    id: 'angkor-village-hotel',
    name: 'Angkor Village Hotel',
    location: 'Wat Bo Road, Siem Reap',
    city: 'Siem Reap',
    country: 'Cambodia',
    description: 'An enchanting boutique hotel built in traditional Khmer style with wooden bungalows surrounded by lotus ponds and tropical gardens. Authentic cultural experience with modern comfort.',
    price: 95,
    rating: 4.5,
    reviews: 1876,
    stars: 4,
    propertyType: 'Boutique',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
    ],
    amenities: ['Pool', 'Restaurant', 'Spa', 'Free WiFi', 'Traditional Shows', 'Garden'],
    roomTypes: [
      {
        id: 'classic-room',
        name: 'Classic Room',
        price: 95,
        capacity: 2,
        beds: '1 Queen Bed',
        size: 28,
        amenities: ['Garden View', 'Air Conditioning', 'Safe', 'TV'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        available: 15
      },
      {
        id: 'superior-bungalow',
        name: 'Superior Bungalow',
        price: 145,
        capacity: 2,
        beds: '1 King Bed',
        size: 40,
        amenities: ['Lotus Pond View', 'Private Terrace', 'Mini Bar', 'Bathtub'],
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
        available: 8
      },
      {
        id: 'deluxe-villa',
        name: 'Deluxe Villa',
        price: 220,
        capacity: 3,
        beds: '1 King Bed',
        size: 55,
        amenities: ['Private Garden', 'Outdoor Shower', 'Living Area', 'Mini Bar'],
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        available: 4
      }
    ],
    coordinates: { lat: 13.3612, lng: 103.8612 }
  },
  {
    id: 'motherhome-guesthouse',
    name: 'Motherhome Guesthouse',
    location: 'Taphul Road, Siem Reap',
    city: 'Siem Reap',
    country: 'Cambodia',
    description: 'Award-winning budget guesthouse known for exceptional hospitality and home-cooked Khmer meals. Perfect for backpackers and budget travelers seeking authentic local experience.',
    price: 25,
    rating: 4.8,
    reviews: 2340,
    stars: 2,
    propertyType: 'Guesthouse',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800'
    ],
    amenities: ['Free Breakfast', 'Free WiFi', 'Airport Pickup', 'Laundry', 'Bicycle Rental', 'Tours'],
    roomTypes: [
      {
        id: 'dormitory',
        name: 'Dormitory Bed',
        price: 8,
        capacity: 1,
        beds: '1 Single Bed',
        size: 6,
        amenities: ['Shared Bathroom', 'Locker', 'Fan'],
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        available: 12
      },
      {
        id: 'standard-fan',
        name: 'Standard Fan Room',
        price: 15,
        capacity: 2,
        beds: '1 Double Bed',
        size: 16,
        amenities: ['Fan', 'Private Bathroom', 'Hot Water'],
        image: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800',
        available: 6
      },
      {
        id: 'standard-ac',
        name: 'Standard AC Room',
        price: 25,
        capacity: 2,
        beds: '1 Double Bed',
        size: 18,
        amenities: ['Air Conditioning', 'Private Bathroom', 'Hot Water', 'TV'],
        image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800',
        available: 8
      },
      {
        id: 'family-room',
        name: 'Family Room',
        price: 40,
        capacity: 4,
        beds: '1 Double + 2 Singles',
        size: 28,
        amenities: ['Air Conditioning', 'Private Bathroom', 'Hot Water', 'TV', 'Balcony'],
        image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800',
        available: 3
      }
    ],
    coordinates: { lat: 13.3587, lng: 103.8598 }
  },

  // ========== PHNOM PENH HOTELS ==========
  {
    id: 'palace-gate-hotel',
    name: 'Palace Gate Hotel & Resort',
    location: 'Street 47, Sangkat Chey Chumneah, Phnom Penh',
    city: 'Phnom Penh',
    country: 'Cambodia',
    description: 'TripAdvisor Best of the Best winner with 4.9 rating. An exceptional hotel near the Royal Palace offering outstanding service, beautiful pool, and excellent value.',
    price: 70,
    rating: 4.9,
    reviews: 2696,
    stars: 4,
    propertyType: 'Hotel',
    images: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1e/9a/91/5e/palace-gate-hotel-resort.jpg?w=800&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1e/9a/91/4c/palace-gate-hotel-resort.jpg?w=800&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1e/9a/91/3a/palace-gate-hotel-resort.jpg?w=800&h=-1&s=1'
    ],
    amenities: ['Pool', 'Spa', 'Restaurant', 'Royal Palace Views', 'Free WiFi', 'Gym', 'Airport Transfer'],
    roomTypes: [
      {
        id: 'standard-room',
        name: 'Standard Room',
        price: 55,
        capacity: 2,
        beds: '1 Queen Bed',
        size: 28,
        amenities: ['City View', 'Air Conditioning', 'TV', 'Safe'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1e/9a/91/3a/palace-gate-hotel-resort.jpg?w=800&h=-1&s=1',
        available: 12
      },
      {
        id: 'superior-room',
        name: 'Superior Room',
        price: 70,
        capacity: 2,
        beds: '1 King Bed',
        size: 35,
        amenities: ['City View', 'Air Conditioning', 'Rain Shower', 'Safe'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1e/9a/91/3a/palace-gate-hotel-resort.jpg?w=800&h=-1&s=1',
        available: 10
      },
      {
        id: 'deluxe-suite',
        name: 'Deluxe Suite',
        price: 140,
        capacity: 3,
        beds: '1 King Bed',
        size: 55,
        amenities: ['Palace View', 'Living Area', 'Bathtub', 'Mini Bar'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1e/9a/91/4c/palace-gate-hotel-resort.jpg?w=800&h=-1&s=1',
        available: 5
      }
    ],
    coordinates: { lat: 11.5656, lng: 104.9312 }
  },
  {
    id: 'sofitel-phnom-penh',
    name: 'Sofitel Phnom Penh Phokeethra',
    location: '26 Old August Site, Sothearos Boulevard',
    city: 'Phnom Penh',
    country: 'Cambodia',
    description: 'A riverside oasis combining French elegance with Khmer charm. Located near the Royal Palace with stunning river views, magnificent pool, and acclaimed Métissage restaurant.',
    price: 188,
    rating: 4.7,
    reviews: 2174,
    stars: 5,
    propertyType: 'Hotel',
    images: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/f1/b4/d9/sofitel-phnom-penh-phokeethra.jpg?w=800&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/f1/b4/c7/sofitel-phnom-penh-phokeethra.jpg?w=800&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/f1/b4/b5/sofitel-phnom-penh-phokeethra.jpg?w=800&h=-1&s=1'
    ],
    amenities: ['Pool', 'So Spa', 'Riverside Dining', 'Free WiFi', 'Gym', 'Royal Palace Views', 'Bar'],
    roomTypes: [
      {
        id: 'superior-room',
        name: 'Superior Room',
        price: 150,
        capacity: 2,
        beds: '1 King Bed or 2 Twin Beds',
        size: 35,
        amenities: ['City View', 'Air Conditioning', 'Rain Shower', 'Mini Bar'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/f1/b4/b5/sofitel-phnom-penh-phokeethra.jpg?w=800&h=-1&s=1',
        available: 15
      },
      {
        id: 'luxury-room',
        name: 'Luxury Room',
        price: 188,
        capacity: 2,
        beds: '1 King Bed',
        size: 40,
        amenities: ['River View', 'Balcony', 'Rain Shower', 'Mini Bar'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/f1/b4/b5/sofitel-phnom-penh-phokeethra.jpg?w=800&h=-1&s=1',
        available: 10
      },
      {
        id: 'prestige-suite',
        name: 'Prestige Suite',
        price: 350,
        capacity: 3,
        beds: '1 King Bed',
        size: 70,
        amenities: ['River View', 'Living Room', 'Bathtub', 'Club Access'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/f1/b4/c7/sofitel-phnom-penh-phokeethra.jpg?w=800&h=-1&s=1',
        available: 4
      },
      {
        id: 'imperial-suite',
        name: 'Imperial Suite',
        price: 650,
        capacity: 4,
        beds: '1 King Bed + Sofa Bed',
        size: 120,
        amenities: ['Panoramic River View', 'Dining Room', 'Butler Service', 'Jacuzzi', 'Private Bar'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/f1/b4/d9/sofitel-phnom-penh-phokeethra.jpg?w=800&h=-1&s=1',
        available: 2
      }
    ],
    coordinates: { lat: 11.5656, lng: 104.9312 }
  },
  {
    id: 'the-pavilion',
    name: 'The Pavilion',
    location: 'Street 19, Phnom Penh',
    city: 'Phnom Penh',
    country: 'Cambodia',
    description: 'A charming boutique hotel in a beautifully restored French colonial villa with tropical gardens and a stunning pool. Intimate atmosphere with exceptional service.',
    price: 75,
    rating: 4.6,
    reviews: 3353,
    stars: 3,
    propertyType: 'Boutique',
    images: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/63/24/5e/the-pavilion.jpg?w=800&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/63/24/4c/the-pavilion.jpg?w=800&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/63/24/3a/the-pavilion.jpg?w=800&h=-1&s=1'
    ],
    amenities: ['Pool', 'Garden', 'Restaurant', 'Free WiFi', 'Colonial Architecture', 'Quiet Location'],
    roomTypes: [
      {
        id: 'garden-room',
        name: 'Garden Room',
        price: 75,
        capacity: 2,
        beds: '1 Queen Bed',
        size: 30,
        amenities: ['Garden View', 'Air Conditioning', 'Safe', 'Mini Fridge'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/63/24/4c/the-pavilion.jpg?w=800&h=-1&s=1',
        available: 8
      },
      {
        id: 'pool-room',
        name: 'Pool Room',
        price: 95,
        capacity: 2,
        beds: '1 King Bed',
        size: 38,
        amenities: ['Pool View', 'Private Terrace', 'Air Conditioning', 'Mini Bar'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/63/24/3a/the-pavilion.jpg?w=800&h=-1&s=1',
        available: 5
      },
      {
        id: 'pool-suite',
        name: 'Pool Suite',
        price: 120,
        capacity: 2,
        beds: '1 King Bed',
        size: 45,
        amenities: ['Pool Access', 'Private Terrace', 'Bathtub', 'Living Area'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/63/24/3a/the-pavilion.jpg?w=800&h=-1&s=1',
        available: 3
      }
    ],
    coordinates: { lat: 11.5763, lng: 104.9217 }
  },
  {
    id: 'rosewood-phnom-penh',
    name: 'Rosewood Phnom Penh',
    location: 'Vattanac Capital Tower, Phnom Penh',
    city: 'Phnom Penh',
    country: 'Cambodia',
    description: 'Ultra-luxury hotel occupying the top floors of Cambodia\'s tallest building. Stunning panoramic views, world-class dining, and impeccable service in the heart of the city.',
    price: 380,
    rating: 4.9,
    reviews: 1456,
    stars: 5,
    propertyType: 'Hotel',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'
    ],
    amenities: ['Infinity Pool', 'Sense Spa', 'Sky Bar', 'Fine Dining', 'Free WiFi', 'Gym', 'Butler Service'],
    roomTypes: [
      {
        id: 'premier-room',
        name: 'Premier Room',
        price: 380,
        capacity: 2,
        beds: '1 King Bed',
        size: 52,
        amenities: ['City View', 'Floor-to-Ceiling Windows', 'Rain Shower', 'Mini Bar'],
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        available: 20
      },
      {
        id: 'skyline-suite',
        name: 'Skyline Suite',
        price: 580,
        capacity: 2,
        beds: '1 King Bed',
        size: 85,
        amenities: ['Panoramic Views', 'Living Room', 'Soaking Tub', 'Walk-in Closet'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
        available: 8
      },
      {
        id: 'manor-suite',
        name: 'Manor Suite',
        price: 950,
        capacity: 3,
        beds: '1 King Bed',
        size: 120,
        amenities: ['360 Views', 'Dining Room', 'Butler Service', 'Jacuzzi', 'Office'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        available: 3
      },
      {
        id: 'house-suite',
        name: 'House Suite',
        price: 2200,
        capacity: 4,
        beds: '2 King Beds',
        size: 240,
        amenities: ['Entire Floor', 'Private Kitchen', 'Personal Chef', 'Butler Service', 'Private Elevator'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        available: 1
      }
    ],
    coordinates: { lat: 11.5686, lng: 104.9256 }
  },
  {
    id: 'mad-monkey-hostel',
    name: 'Mad Monkey Phnom Penh',
    location: 'Street 302, BKK1, Phnom Penh',
    city: 'Phnom Penh',
    country: 'Cambodia',
    description: 'Award-winning social hostel with rooftop pool and bar. Perfect for backpackers and young travelers looking for fun atmosphere and affordable accommodation.',
    price: 12,
    rating: 4.4,
    reviews: 3876,
    stars: 2,
    propertyType: 'Guesthouse',
    images: [
      'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800'
    ],
    amenities: ['Rooftop Pool', 'Bar', 'Restaurant', 'Free WiFi', 'Tours', 'Events', 'Air Conditioning'],
    roomTypes: [
      {
        id: '6-bed-dorm',
        name: '6-Bed Mixed Dorm',
        price: 8,
        capacity: 1,
        beds: '1 Bunk Bed',
        size: 8,
        amenities: ['Shared Bathroom', 'Locker', 'Air Conditioning', 'Reading Light'],
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        available: 24
      },
      {
        id: '4-bed-dorm',
        name: '4-Bed Female Dorm',
        price: 10,
        capacity: 1,
        beds: '1 Bunk Bed',
        size: 8,
        amenities: ['Shared Bathroom', 'Locker', 'Air Conditioning', 'Privacy Curtain'],
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        available: 16
      },
      {
        id: 'private-double',
        name: 'Private Double Room',
        price: 28,
        capacity: 2,
        beds: '1 Double Bed',
        size: 14,
        amenities: ['Private Bathroom', 'Air Conditioning', 'TV', 'Safe'],
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
        available: 8
      },
      {
        id: 'deluxe-twin',
        name: 'Deluxe Twin Room',
        price: 35,
        capacity: 2,
        beds: '2 Single Beds',
        size: 18,
        amenities: ['Private Bathroom', 'Air Conditioning', 'TV', 'Mini Fridge', 'Balcony'],
        image: 'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800',
        available: 6
      }
    ],
    coordinates: { lat: 11.5543, lng: 104.9198 }
  },

  // ========== SIHANOUKVILLE & ISLANDS ==========
  {
    id: 'song-saa-private-island',
    name: 'Song Saa Private Island',
    location: 'Koh Rong Archipelago, Sihanoukville',
    city: 'Sihanoukville',
    country: 'Cambodia',
    description: 'Cambodia\'s most exclusive private island resort, spanning two islands connected by a footbridge. Experience overwater villas, pristine beaches, and world-class dining.',
    price: 1200,
    rating: 5.0,
    reviews: 876,
    stars: 5,
    propertyType: 'Resort',
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800'
    ],
    amenities: ['Private Beach', 'Overwater Villas', 'Spa', 'Marine Reserve', 'Fine Dining', 'Yoga', 'Diving'],
    roomTypes: [
      {
        id: 'jungle-villa',
        name: 'Jungle Villa',
        price: 1200,
        capacity: 2,
        beds: '1 King Bed',
        size: 115,
        amenities: ['Private Pool', 'Rainforest Views', 'Outdoor Shower', 'Butler Service'],
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800',
        available: 8
      },
      {
        id: 'ocean-villa',
        name: 'Ocean View Villa',
        price: 1500,
        capacity: 2,
        beds: '1 King Bed',
        size: 130,
        amenities: ['Ocean Views', 'Private Pool', 'Outdoor Bathtub', 'Butler Service'],
        image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800',
        available: 6
      },
      {
        id: 'overwater-villa',
        name: 'Overwater Villa',
        price: 1800,
        capacity: 2,
        beds: '1 King Bed',
        size: 145,
        amenities: ['Ocean Views', 'Private Deck', 'Glass Floor', 'Direct Ocean Access'],
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
        available: 4
      },
      {
        id: 'royal-villa',
        name: 'Royal Villa',
        price: 3500,
        capacity: 4,
        beds: '2 King Beds',
        size: 280,
        amenities: ['Private Beach', 'Infinity Pool', 'Personal Chef', 'Spa Treatment Room', 'Private Boat'],
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
        available: 2
      }
    ],
    coordinates: { lat: 10.7456, lng: 103.2134 }
  },
  {
    id: 'royal-sands-koh-rong',
    name: 'The Royal Sands Koh Rong',
    location: 'Koh Rong Island, Sihanoukville',
    city: 'Sihanoukville',
    country: 'Cambodia',
    description: 'A luxury beach resort on the pristine shores of Koh Rong Island. Enjoy powdery white sand beaches, crystal-clear waters, and bioluminescent plankton at night.',
    price: 380,
    rating: 4.8,
    reviews: 1234,
    stars: 5,
    propertyType: 'Resort',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    ],
    amenities: ['Private Beach', 'Pool', 'Spa', 'Water Sports', 'Restaurant', 'Diving Center', 'Sunset Bar'],
    roomTypes: [
      {
        id: 'garden-bungalow',
        name: 'Garden Bungalow',
        price: 280,
        capacity: 2,
        beds: '1 King Bed',
        size: 40,
        amenities: ['Garden View', 'Private Terrace', 'Air Conditioning', 'Mini Bar'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        available: 10
      },
      {
        id: 'beach-villa',
        name: 'Beach Villa',
        price: 380,
        capacity: 2,
        beds: '1 King Bed',
        size: 55,
        amenities: ['Beachfront', 'Private Terrace', 'Outdoor Shower', 'Mini Bar'],
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        available: 6
      },
      {
        id: 'ocean-pool-villa',
        name: 'Ocean Pool Villa',
        price: 650,
        capacity: 3,
        beds: '1 King Bed',
        size: 85,
        amenities: ['Private Pool', 'Ocean View', 'Butler Service', 'Jacuzzi'],
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        available: 4
      }
    ],
    coordinates: { lat: 10.7234, lng: 103.2456 }
  },
  {
    id: 'sok-san-beach-resort',
    name: 'Sok San Beach Resort',
    location: 'Sok San Beach, Koh Rong',
    city: 'Sihanoukville',
    country: 'Cambodia',
    description: 'Eco-friendly beach resort on the stunning 7km white sand Sok San Beach. Rustic luxury meets sustainable tourism with solar power and local community initiatives.',
    price: 150,
    rating: 4.5,
    reviews: 987,
    stars: 3,
    propertyType: 'Resort',
    images: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
    ],
    amenities: ['Private Beach', 'Restaurant', 'Beach Bar', 'Kayaks', 'Snorkeling', 'Eco Tours'],
    roomTypes: [
      {
        id: 'garden-room',
        name: 'Garden Room',
        price: 95,
        capacity: 2,
        beds: '1 Queen Bed',
        size: 25,
        amenities: ['Garden View', 'Fan', 'Private Bathroom', 'Mosquito Net'],
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800',
        available: 12
      },
      {
        id: 'beach-bungalow',
        name: 'Beach Bungalow',
        price: 150,
        capacity: 2,
        beds: '1 King Bed',
        size: 35,
        amenities: ['Beachfront', 'Air Conditioning', 'Private Terrace', 'Mini Fridge'],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        available: 8
      },
      {
        id: 'family-bungalow',
        name: 'Family Bungalow',
        price: 220,
        capacity: 4,
        beds: '1 King + 2 Singles',
        size: 50,
        amenities: ['Beach View', 'Air Conditioning', 'Living Area', 'Mini Kitchen'],
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        available: 4
      }
    ],
    coordinates: { lat: 10.7512, lng: 103.2287 }
  },
  {
    id: 'monkey-maya-koh-rong',
    name: 'Monkey Maya Beach Club',
    location: 'Koh Touch, Koh Rong',
    city: 'Sihanoukville',
    country: 'Cambodia',
    description: 'Popular beach club and bungalows on Koh Rong\'s main tourist beach. Perfect for backpackers seeking beach parties, water activities, and budget accommodation.',
    price: 35,
    rating: 4.2,
    reviews: 2345,
    stars: 2,
    propertyType: 'Guesthouse',
    images: [
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
      'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800'
    ],
    amenities: ['Beach Bar', 'Restaurant', 'Water Sports', 'Parties', 'Free WiFi', 'Boat Transfers'],
    roomTypes: [
      {
        id: 'dorm-bed',
        name: 'Beach Dorm Bed',
        price: 12,
        capacity: 1,
        beds: '1 Bunk Bed',
        size: 6,
        amenities: ['Shared Bathroom', 'Fan', 'Locker', 'Beach Access'],
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        available: 20
      },
      {
        id: 'basic-bungalow',
        name: 'Basic Beach Bungalow',
        price: 35,
        capacity: 2,
        beds: '1 Double Bed',
        size: 18,
        amenities: ['Beach View', 'Fan', 'Private Bathroom', 'Mosquito Net'],
        image: 'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800',
        available: 10
      },
      {
        id: 'deluxe-bungalow',
        name: 'Deluxe Bungalow',
        price: 65,
        capacity: 2,
        beds: '1 Queen Bed',
        size: 25,
        amenities: ['Beachfront', 'Air Conditioning', 'Private Bathroom', 'Terrace'],
        image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
        available: 6
      }
    ],
    coordinates: { lat: 10.7089, lng: 103.2634 }
  },

  // ========== KAMPOT ==========
  {
    id: 'rikitikitavi',
    name: 'Rikitikitavi',
    location: 'Riverside, Kampot',
    city: 'Kampot',
    country: 'Cambodia',
    description: 'Iconic riverside boutique hotel with stunning views of Bokor Mountain. Famous for its rooftop bar, excellent restaurant, and perfect sunset views over the Kampot River.',
    price: 85,
    rating: 4.7,
    reviews: 2156,
    stars: 3,
    propertyType: 'Boutique',
    images: [
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    ],
    amenities: ['Rooftop Bar', 'Restaurant', 'River Views', 'Free WiFi', 'Tours', 'Bicycle Rental'],
    roomTypes: [
      {
        id: 'standard-room',
        name: 'Standard Room',
        price: 55,
        capacity: 2,
        beds: '1 Queen Bed',
        size: 22,
        amenities: ['Air Conditioning', 'Private Bathroom', 'TV', 'Safe'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        available: 8
      },
      {
        id: 'river-view-room',
        name: 'River View Room',
        price: 85,
        capacity: 2,
        beds: '1 King Bed',
        size: 28,
        amenities: ['River View', 'Balcony', 'Air Conditioning', 'Mini Bar'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
        available: 6
      },
      {
        id: 'suite',
        name: 'River Suite',
        price: 125,
        capacity: 3,
        beds: '1 King Bed',
        size: 42,
        amenities: ['Panoramic River View', 'Living Area', 'Bathtub', 'Private Balcony'],
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        available: 3
      }
    ],
    coordinates: { lat: 10.5937, lng: 104.1791 }
  },
  {
    id: 'the-columns',
    name: 'The Columns',
    location: 'Old Town, Kampot',
    city: 'Kampot',
    country: 'Cambodia',
    description: 'Elegant colonial boutique hotel set in a beautifully restored 1930s building. Experience the charm of old Kampot with modern comforts and exceptional cuisine.',
    price: 120,
    rating: 4.8,
    reviews: 1432,
    stars: 4,
    propertyType: 'Boutique',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'
    ],
    amenities: ['Pool', 'Restaurant', 'Bar', 'Free WiFi', 'Colonial Architecture', 'Garden'],
    roomTypes: [
      {
        id: 'heritage-room',
        name: 'Heritage Room',
        price: 95,
        capacity: 2,
        beds: '1 Queen Bed',
        size: 28,
        amenities: ['Colonial Style', 'Air Conditioning', 'Safe', 'Coffee Maker'],
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
        available: 6
      },
      {
        id: 'deluxe-room',
        name: 'Deluxe Room',
        price: 120,
        capacity: 2,
        beds: '1 King Bed',
        size: 35,
        amenities: ['Pool View', 'Balcony', 'Air Conditioning', 'Mini Bar'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        available: 5
      },
      {
        id: 'grand-suite',
        name: 'Grand Suite',
        price: 180,
        capacity: 3,
        beds: '1 King Bed',
        size: 55,
        amenities: ['Garden View', 'Living Room', 'Bathtub', 'Private Terrace'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
        available: 2
      }
    ],
    coordinates: { lat: 10.5923, lng: 104.1756 }
  },
  {
    id: 'sabay-beach-kep',
    name: 'Sabay Beach Kep',
    location: 'Kep Beach, Kep',
    city: 'Kampot',
    country: 'Cambodia',
    description: 'Charming beachfront resort in the sleepy coastal town of Kep. Famous for its fresh crab, peaceful atmosphere, and stunning sunsets over the Gulf of Thailand.',
    price: 95,
    rating: 4.5,
    reviews: 876,
    stars: 3,
    propertyType: 'Resort',
    images: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
    ],
    amenities: ['Beach Access', 'Pool', 'Restaurant', 'Free WiFi', 'Crab Market Tours', 'Kayaks'],
    roomTypes: [
      {
        id: 'garden-bungalow',
        name: 'Garden Bungalow',
        price: 65,
        capacity: 2,
        beds: '1 Queen Bed',
        size: 25,
        amenities: ['Garden View', 'Air Conditioning', 'Private Bathroom', 'Terrace'],
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800',
        available: 8
      },
      {
        id: 'sea-view-room',
        name: 'Sea View Room',
        price: 95,
        capacity: 2,
        beds: '1 King Bed',
        size: 32,
        amenities: ['Sea View', 'Balcony', 'Air Conditioning', 'Mini Bar'],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        available: 5
      },
      {
        id: 'beachfront-villa',
        name: 'Beachfront Villa',
        price: 150,
        capacity: 3,
        beds: '1 King Bed',
        size: 48,
        amenities: ['Beach Access', 'Private Pool', 'Outdoor Shower', 'Living Area'],
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        available: 3
      }
    ],
    coordinates: { lat: 10.4831, lng: 104.2934 }
  },
  {
    id: 'arcadia-backpackers',
    name: 'Arcadia Backpackers',
    location: 'Riverside, Kampot',
    city: 'Kampot',
    country: 'Cambodia',
    description: 'Legendary party hostel and backpacker haven on the Kampot River. Famous for river swimming, rope swings, fire shows, and incredible sunsets.',
    price: 8,
    rating: 4.3,
    reviews: 4567,
    stars: 1,
    propertyType: 'Guesthouse',
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
      'https://images.unsplash.com/photo-1504858700536-882c978a3464?w=800',
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800'
    ],
    amenities: ['River Swimming', 'Bar', 'Restaurant', 'Free WiFi', 'Fire Shows', 'Live Music'],
    roomTypes: [
      {
        id: 'dorm-bed',
        name: 'Riverside Dorm',
        price: 5,
        capacity: 1,
        beds: '1 Bunk Bed',
        size: 5,
        amenities: ['Shared Bathroom', 'Fan', 'Locker', 'River Views'],
        image: 'https://images.unsplash.com/photo-1504858700536-882c978a3464?w=800',
        available: 30
      },
      {
        id: 'private-fan',
        name: 'Private Fan Room',
        price: 12,
        capacity: 2,
        beds: '1 Double Bed',
        size: 12,
        amenities: ['Fan', 'Private Bathroom', 'River View'],
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
        available: 8
      },
      {
        id: 'private-ac',
        name: 'Private AC Room',
        price: 25,
        capacity: 2,
        beds: '1 Double Bed',
        size: 15,
        amenities: ['Air Conditioning', 'Private Bathroom', 'River View', 'Balcony'],
        image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800',
        available: 4
      }
    ],
    coordinates: { lat: 10.6012, lng: 104.1834 }
  },

  // ========== BATTAMBANG ==========
  {
    id: 'battambang-resort',
    name: 'Battambang Resort',
    location: 'Wat Kor Village, Battambang',
    city: 'Battambang',
    country: 'Cambodia',
    description: 'A charming boutique resort in the historic Wat Kor village, surrounded by traditional wooden houses and rice paddies. Experience authentic rural Cambodia.',
    price: 120,
    rating: 4.6,
    reviews: 567,
    stars: 4,
    propertyType: 'Resort',
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'
    ],
    amenities: ['Pool', 'Restaurant', 'Bicycle Rental', 'Cooking Class', 'Free WiFi', 'Village Tours'],
    roomTypes: [
      {
        id: 'garden-room',
        name: 'Garden Room',
        price: 85,
        capacity: 2,
        beds: '1 King Bed',
        size: 32,
        amenities: ['Garden View', 'Air Conditioning', 'Private Bathroom', 'Safe'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        available: 8
      },
      {
        id: 'superior-room',
        name: 'Superior Room',
        price: 120,
        capacity: 2,
        beds: '1 King Bed',
        size: 40,
        amenities: ['Pool View', 'Balcony', 'Air Conditioning', 'Mini Bar'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
        available: 6
      },
      {
        id: 'pool-villa',
        name: 'Pool Villa',
        price: 220,
        capacity: 3,
        beds: '1 King Bed',
        size: 55,
        amenities: ['Pool Access', 'Private Terrace', 'Bathtub', 'Mini Bar'],
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        available: 3
      }
    ],
    coordinates: { lat: 13.0957, lng: 103.2022 }
  },
  {
    id: 'maisons-wat-kor',
    name: 'Maisons Wat Kor',
    location: 'Wat Kor Village, Battambang',
    city: 'Battambang',
    country: 'Cambodia',
    description: 'Award-winning heritage boutique hotel set in beautifully restored traditional Khmer wooden houses. Discover the soul of old Cambodia while supporting local community.',
    price: 95,
    rating: 4.7,
    reviews: 423,
    stars: 3,
    propertyType: 'Boutique',
    images: [
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
      'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'
    ],
    amenities: ['Pool', 'Heritage Tours', 'Restaurant', 'Bicycle Rental', 'Free WiFi', 'Organic Garden'],
    roomTypes: [
      {
        id: 'heritage-room',
        name: 'Heritage Room',
        price: 75,
        capacity: 2,
        beds: '1 Queen Bed',
        size: 28,
        amenities: ['Traditional Design', 'Air Conditioning', 'Garden View', 'Safe'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
        available: 6
      },
      {
        id: 'deluxe-heritage',
        name: 'Deluxe Heritage Room',
        price: 95,
        capacity: 2,
        beds: '1 King Bed',
        size: 35,
        amenities: ['Private Terrace', 'Air Conditioning', 'Mini Bar', 'Outdoor Shower'],
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
        available: 4
      },
      {
        id: 'khmer-house',
        name: 'Traditional Khmer House',
        price: 165,
        capacity: 4,
        beds: '1 King + 2 Singles',
        size: 65,
        amenities: ['Entire Wooden House', 'Private Garden', 'Kitchen', 'Living Area'],
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800',
        available: 2
      }
    ],
    coordinates: { lat: 13.0923, lng: 103.1987 }
  },
  {
    id: 'here-be-dragons',
    name: 'Here Be Dragons',
    location: 'Street 1.5, Battambang',
    city: 'Battambang',
    country: 'Cambodia',
    description: 'Quirky and colorful guesthouse popular with backpackers and cyclists. Known for excellent travel advice, bamboo train tours, and genuine Khmer hospitality.',
    price: 18,
    rating: 4.5,
    reviews: 1876,
    stars: 2,
    propertyType: 'Guesthouse',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'
    ],
    amenities: ['Free Breakfast', 'Free WiFi', 'Tours', 'Bicycle Rental', 'Laundry', 'Travel Desk'],
    roomTypes: [
      {
        id: 'dorm',
        name: 'Dormitory Bed',
        price: 6,
        capacity: 1,
        beds: '1 Bunk Bed',
        size: 5,
        amenities: ['Shared Bathroom', 'Fan', 'Locker'],
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
        available: 12
      },
      {
        id: 'standard-fan',
        name: 'Standard Fan Room',
        price: 12,
        capacity: 2,
        beds: '1 Double Bed',
        size: 14,
        amenities: ['Fan', 'Private Bathroom', 'Hot Water'],
        image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800',
        available: 6
      },
      {
        id: 'standard-ac',
        name: 'Standard AC Room',
        price: 18,
        capacity: 2,
        beds: '1 Double Bed',
        size: 16,
        amenities: ['Air Conditioning', 'Private Bathroom', 'TV', 'Hot Water'],
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
        available: 8
      },
      {
        id: 'family-room',
        name: 'Family Room',
        price: 32,
        capacity: 4,
        beds: '1 Double + 2 Singles',
        size: 24,
        amenities: ['Air Conditioning', 'Private Bathroom', 'TV', 'Balcony'],
        image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800',
        available: 3
      }
    ],
    coordinates: { lat: 13.0989, lng: 103.1967 }
  }
];

// Utility functions
export const getHotelById = (id: string): Hotel | undefined => {
  return hotels.find(hotel => hotel.id === id);
};

export const searchHotels = (query: string): Hotel[] => {
  const lowerQuery = query.toLowerCase();
  return hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(lowerQuery) ||
    hotel.location.toLowerCase().includes(lowerQuery) ||
    hotel.city.toLowerCase().includes(lowerQuery) ||
    hotel.country.toLowerCase().includes(lowerQuery) ||
    hotel.propertyType.toLowerCase().includes(lowerQuery)
  );
};

export const filterHotels = (filters: {
  priceRange?: [number, number];
  amenities?: string[];
  stars?: number[];
  propertyTypes?: string[];
}): Hotel[] => {
  return hotels.filter(hotel => {
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (hotel.price < min || hotel.price > max) return false;
    }
    
    if (filters.amenities && filters.amenities.length > 0) {
      const hotelAmenities = hotel.amenities.map(a => a.toLowerCase());
      const hasAllAmenities = filters.amenities.every(amenity => 
        hotelAmenities.some(ha => ha.includes(amenity.toLowerCase()))
      );
      if (!hasAllAmenities) return false;
    }

    if (filters.stars && filters.stars.length > 0) {
      if (!filters.stars.includes(hotel.stars)) return false;
    }

    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      if (!filters.propertyTypes.includes(hotel.propertyType)) return false;
    }
    
    return true;
  });
};

export const getHotelsByCity = (city: string): Hotel[] => {
  return hotels.filter(hotel => hotel.city.toLowerCase() === city.toLowerCase());
};

export const getHotelsByPropertyType = (type: PropertyType): Hotel[] => {
  return hotels.filter(hotel => hotel.propertyType === type);
};
