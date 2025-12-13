import siemReapImg from '@/assets/destinations/siem-reap.jpg';
import phnomPenhImg from '@/assets/destinations/phnom-penh.jpg';
import sihanoukvilleImg from '@/assets/destinations/sihanoukville.jpg';
import kampotImg from '@/assets/destinations/kampot.jpg';
import battambangImg from '@/assets/destinations/battambang.jpg';

export type PropertyType = 'Hotel' | 'Resort' | 'Villa' | 'Boutique' | 'Apartment' | 'Guesthouse' | 'Glamping' | 'Lodge';

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
  policies?: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    children: string;
    pets: string;
  };
  scoreBreakdown?: {
    cleanliness: number;
    service: number;
    amenities: number;
    location: number;
  };
  paymentMethods?: string[];
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
    hotelCount: 3,
    description: 'Riverside charm, pepper plantations, and Bokor Mountain'
  },
  {
    id: 'battambang',
    name: 'Battambang',
    country: 'Cambodia',
    image: battambangImg,
    hotelCount: 3,
    description: 'Colonial charm and authentic Cambodian culture'
  },
  {
    id: 'kep',
    name: 'Kep',
    country: 'Cambodia',
    image: 'https://www.indochinavoyages.com/wp-content/uploads/2019/11/kep_cambodia.jpg',
    hotelCount: 3,
    description: 'Coastal town known for crabs'
  },
  {
    id: 'koh-kong',
    name: 'Koh Kong',
    country: 'Cambodia',
    image: 'https://www.asiakingtravel.com/cuploads/files/Koh-Kong-1(1).jpg',
    hotelCount: 1,
    description: 'Eco-tourism and waterfalls'
  },
  {
    id: 'mondulkiri',
    name: 'Mondulkiri',
    country: 'Cambodia',
    image: 'https://www.greeneratravel.com/userfiles/850bousrawaterfall.jpg',
    hotelCount: 1,
    description: 'Elephants and rolling hills'
  },
  {
    id: 'ratanakiri',
    name: 'Ratanakiri',
    country: 'Cambodia',
    image: 'https://lh6.googleusercontent.com/proxy/777hqkVb_NVAycLnawF4SkvEsRGkUXSUX9qJKrd9KqOf2RkuwKiXQVMYmAsZwM1gfYoDxiMHgUmtPK4OiOthFzvNRJ9sXs1-aNPk7ej0tsMM62ftGvdEVW6TSkx5SU-cC2RMaJDga8YXN24Mim3mxA-8nnZVU2AHzVil4DcU5tv2',
    hotelCount: 1,
    description: 'Volcanic lakes and trekking'
  },
  {
    id: 'kampong-cham',
    name: 'Kampong Cham',
    country: 'Cambodia',
    image: 'https://www.asiakingtravel.com/cuploads/files/Kampong-Cham-1(1).jpg',
    hotelCount: 1,
    description: 'Mekong river life'
  },
  {
    id: 'kampong-thom',
    name: 'Kampong Thom',
    country: 'Cambodia',
    image: 'https://www.vivutravel.com/images/des-cambodia3/kampong-thom-travel-guide.jpg',
    hotelCount: 0,
    description: 'Sambor Prei Kuk temples'
  },
  {
    id: 'preah-vihear',
    name: 'Preah Vihear',
    country: 'Cambodia',
    image: 'https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/w4gaxj3iaysci0tb0dke.jpg',
    hotelCount: 1,
    description: 'Mountain top temple'
  },
  {
    id: 'kratie',
    name: 'Kratie',
    country: 'Cambodia',
    image: 'https://angkorfocus.com/userfiles/kratie-2.jpg',
    hotelCount: 0,
    description: 'Irrawaddy Dolphins'
  },
  {
    id: 'stung-treng',
    name: 'Stung Treng',
    country: 'Cambodia',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/ea/74/da/stung-treng-province.jpg?w=1400&h=1400&s=1',
    hotelCount: 0,
    description: 'Mekong rapids'
  },
  {
    id: 'takeo',
    name: 'Takeo',
    country: 'Cambodia',
    image: 'https://www.asiakingtravel.com/cuploads/images/Cambodia/takeo-1.jpg',
    hotelCount: 0,
    description: 'Ancient history'
  },
  {
    id: 'banteay-meanchey',
    name: 'Banteay Meanchey',
    country: 'Cambodia',
    image: 'https://www.asiakingtravel.com/cuploads/files/Banteay%20Meanchey%20-%202.jpg',
    hotelCount: 0,
    description: 'Border province'
  },
  {
    id: 'pailin',
    name: 'Pailin',
    country: 'Cambodia',
    image: 'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/pailin-1.jpg?fit=785%2C475&ssl=1',
    hotelCount: 0,
    description: 'Cardamom mountains'
  },
  {
    id: 'tbong-khmum',
    name: 'Tbong Khmum',
    country: 'Cambodia',
    image: 'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Tbong-Khmum-1.jpg?fit=750%2C440&ssl=1',
    hotelCount: 0,
    description: 'Eastern plains'
  },
  {
    id: 'prey-veng',
    name: 'Prey Veng',
    country: 'Cambodia',
    image: 'https://construction-property.com/wp-content/uploads/2018/05/chinese-firm-to-build-a-new-300-hectare-satellite-city-in-prey-veng.jpg',
    hotelCount: 0,
    description: 'Agriculture heartland'
  },
  {
    id: 'svay-rieng',
    name: 'Svay Rieng',
    country: 'Cambodia',
    image: 'https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Svay-Rieng-5.jpg?fit=1000%2C719&ssl=1',
    hotelCount: 0,
    description: 'Border trade'
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
      'https://ak-d.tripcdn.com/images/0205n120008jh97pd8228_R_960_660_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/0201g120008jh9ht967A6_R_339_206_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/200b1e000001flw6g2FD1_R_339_206_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/02042120008uk3qokD7A0_R_339_206_R5_D.jpg'
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
        image: 'https://ak-d.tripcdn.com/images/0201b120008ced42xEF47_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/02024120008cee4l8B9A7_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/200313000000u1yl0B129_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/20041b000001ats577E7C_R_200_100_R5.webp',
        available: 2
      }
    ],
    coordinates: { lat: 13.3621, lng: 103.8542 },
    policies: {
      checkIn: '14:00',
      checkOut: '12:00',
      cancellation: 'Free cancellation until 24 hours before check-in',
      children: 'Children under 12 stay free when using existing bedding',
      pets: 'Pets are not allowed'
    },
    scoreBreakdown: {
      cleanliness: 4.9,
      service: 4.8,
      amenities: 4.8,
      location: 4.7
    },
    paymentMethods: ['Credit Card', 'Cash', 'UnionPay']
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
      'https://ak-d.tripcdn.com/images/200s0q000000ga9skAB2E_R_960_660_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/0201t1200093qfa5m1122_R_339_206_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/200v1c000001ch1lz964F_R_339_206_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/0222r12000amspsvs4CE1_R_339_206_R5_D.jpg'
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
        image: 'https://ak-d.tripcdn.com/images/20030q000000g54co4AD5_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/200s0q000000gaa502484_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0201t1200093qfa5m1122_R_200_100_R5.webp',
        available: 2
      }
    ],
    coordinates: { lat: 13.3548, lng: 103.8554 },
    policies: {
      checkIn: '14:00',
      checkOut: '12:00',
      cancellation: 'Free cancellation until 48 hours before check-in',
      children: 'Extra bed available for $30/night',
      pets: 'Small pets allowed upon request'
    },
    scoreBreakdown: {
      cleanliness: 5.0,
      service: 5.0,
      amenities: 4.9,
      location: 4.9
    },
    paymentMethods: ['Credit Card', 'AliPay', 'WeChat Pay']
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
      'https://ak-d.tripcdn.com/images/200715000000yhaj576D8_R_339_206_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/1mc3d12000f6sgixjD495_R_339_206_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/200j0r000000gp5um6914_R_339_206_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/1mc0212000b8n1be4E7EB_R_339_206_R5_D.jpg'
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
        image: 'https://ak-d.tripcdn.com/images/200f1e000001eu96k1330_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc1i12000f6rahy0ED4D_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc6i12000p9a3i247B1D_R_690_360_R5.webp',
        available: 4
      }
    ],
    coordinates: { lat: 13.3847, lng: 103.8588 },
    policies: {
      checkIn: '14:00',
      checkOut: '12:00',
      cancellation: 'Non-refundable',
      children: 'Children welcome',
      pets: 'No pets allowed'
    },
    scoreBreakdown: {
      cleanliness: 4.6,
      service: 4.7,
      amenities: 4.8,
      location: 4.5
    },
    paymentMethods: ['Credit Card', 'Cash']
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
      'https://ak-d.tripcdn.com/images/1mc0k12000in2ph62FA7E_R_339_206_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/0225012000azo9r7jE25D_R_339_206_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/200a1a00000190wmh9EC9_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/22041c000001czdd3AF65_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/0584x12000d9t4qjc2275_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc5z12000bgs1vi23312_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0206k12000a3xfik218EA_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0221u12000azo8xe61649_R_690_360_R5.webp',
        available: 1
      }
    ],
    coordinates: { lat: 13.3633, lng: 103.8564 },
    policies: {
      checkIn: '15:00',
      checkOut: '12:00',
      cancellation: 'Free cancellation until 7 days before check-in',
      children: 'Children stay free',
      pets: 'No pets allowed'
    },
    scoreBreakdown: {
      cleanliness: 5.0,
      service: 4.9,
      amenities: 4.9,
      location: 4.9
    },
    paymentMethods: ['Credit Card', 'UnionPay', 'JCB']
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
      'https://ak-d.tripcdn.com/images/1mc6j12000bederqi082F_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc1g12000bedew7f5525_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0224s12000p4v8svl005F_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc1712000bedeqn10871_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/1mc4l12000bedjr412990_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc5e12000bedjjgc7F48_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc6f12000bedigy3D82E_R_200_100_R5.webp',
        available: 4
      }
    ],
    coordinates: { lat: 13.3612, lng: 103.8612 },
    policies: {
      checkIn: '14:00',
      checkOut: '12:00',
      cancellation: 'Free cancellation until 3 days before check-in',
      children: 'Family friendly',
      pets: 'Upon request'
    },
    scoreBreakdown: {
      cleanliness: 4.5,
      service: 4.6,
      amenities: 4.4,
      location: 4.5
    },
    paymentMethods: ['Cash', 'Credit Card']
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
      'https://ak-d.tripcdn.com/images/0227312000kz1jghn7775_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0224u120009zrbjvp1939_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0586712000l2jnj681906_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0222612000j98ahlzA08E_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/0223712000kz1j3kgDD4B_R_600_400_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0225g12000kz1jg0mF69A_R_600_400_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0225q12000kz1j7o70E10_R_600_400_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0224r12000fkemywn2EAE_R_600_400_R5.webp',
        available: 3
      }
    ],
    coordinates: { lat: 13.3587, lng: 103.8598 },
    policies: {
      checkIn: '12:00',
      checkOut: '11:00',
      cancellation: 'Free cancellation until 24 hours before check-in',
      children: 'Children welcome',
      pets: 'No pets allowed'
    },
    scoreBreakdown: {
      cleanliness: 4.7,
      service: 4.9,
      amenities: 4.2,
      location: 4.8
    },
    paymentMethods: ['Cash']
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
      'https://ak-d.tripcdn.com/images/1mc5r12000nhjmh0nB50B_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc6x12000dxcczdgECF2_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/200o0t000000ij3ahF6C6_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/22010u000000jp3a9319C_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/0201o1200090q9r4bC82F_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc4x12000erbi6r1AD36_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc1q12000erbmeccA5E5_R_200_100_R5.webp',
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
      'https://ak-d.tripcdn.com/images/1mc1b12000bd2dj7v3C7A_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc5g12000i6plcxu3416_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc6112000i6pl8nqD92A_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/02056120009f3eis6533B_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/0203k120009v8k5e527EF_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc6o12000o03479k5DD3_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc3q12000o0300el4D8A_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0203k120009v8k5e527EF_R_690_360_R5.webp',
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
      'https://ak-d.tripcdn.com/images/200j14000000vq31r1545_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/200u14000000vqk3fCA99_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0206f120009zpl6x58FF7_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0220z12000kwqndw23D9A_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/200j14000000vq31r1545_R_600_400_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/200s14000000w69yz0C22_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/200s14000000w69qsF560_R_690_360_R5.webp',
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
      'https://ak-d.tripcdn.com/images/1mc1f12000jn54o32E1CB_R_339_206_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/1mc2c12000atrplnsA62D_R_960_660_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/200t0p000000fzecu6442_R_339_206_R5_D.jpg',
      'https://ak-d.tripcdn.com/images/02274120008c5il2lBD49_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/0202u120008t4bj8qFA8A_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0200y120008t4bfqd5777_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0202u120008t4bj8qFA8A_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0205h120008t4bj8l32BA_R_690_360_R5.webp',
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
      'https://ak-d.tripcdn.com/images/1mc5q12000bpwuk2k573A_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/02001120009ibhzjnE950_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/02038120009ibiz8s7438_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc0312000bpwy5ur5729_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/02038120009ibiz8s7438_R_600_400_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc0w12000cmmtyqi05BA_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc7412000cmmtrmc79D4_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc3312000b5n7u0r5E0A_R_690_360_R5.webp',
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
      'https://ak-d.tripcdn.com/images/t1/hotel/1103000/1102203/1e8b3ca0e7284d04bfb0ef0f9b400fb2_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/200k160000010bdq9E907_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0221g12000kzw4u5vC1FE_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/200k160000010bdq9E907_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/200k160000010bdq9E907_R_400_200_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/200i1600000105zum31AA_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0224512000cana4t445DA_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0224k12000kzw4v0hED5D_R_690_360_R5.webp',
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
      'https://ak-d.tripcdn.com/images/1mc3e12000jedfpvvBC81_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc3j12000jed90x2BBB1_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc3712000jed9bk7246E_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc2t12000jed97mk6CD7_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/1mc3t12000jedke7i20F3_R_400_200_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc2512000jedhlbs5D0D_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc6d12000jedk3f33C8C_R_690_360_R5.webp',
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
      'https://ak-d.tripcdn.com/images/0204p120008ceoioq9C05_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0205k1200099egtfgB8E7_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/200a0u000000iwbffEB20_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0221e120009thnzfa8E18_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/0206m120008cenvyrD22C_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/020211200086sunmr9AF8_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/020341200099egypx3FD2_R_690_360_R5.webp',
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
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/223027811.jpg?k=59739551bfcc734d3932580b7c50e7f6cec20f25c745794de49d29284454f788&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/152687931.jpg?k=f440001d46b0c63a384fef2981ad3c961185098bb41dacd0f5e8d1b276b29501&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/433148230.jpg?k=b499a8d404839bdd84a080147a5fe2a57fee3f9e344c265c051abc514a499d97&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/222765803.jpg?k=b97c035057d8c373b5608c3313b073ded584d17d4c777a62ba9cfab7b6436099&o='
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
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/223030286.jpg?k=315f21b650e153d438cbda4c88fb70cd8c88cac5f73610a392a4e3d6a0ac0170&o=',
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
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/223030286.jpg?k=315f21b650e153d438cbda4c88fb70cd8c88cac5f73610a392a4e3d6a0ac0170&o=',
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
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/223030286.jpg?k=315f21b650e153d438cbda4c88fb70cd8c88cac5f73610a392a4e3d6a0ac0170&o=',
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
      'https://ak-d.tripcdn.com/images/0584412000nd99xfv722D_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0581u12000nd99vkdF931_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0226r12000nl8fo7u9C44_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/02X17120008u7cp9gADE0_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/0220c12000kz33u7u2381_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0224412000nm9z4msA5E1_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0220c12000kz33u7u2381_R_200_100_R5.webp',
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
      'https://ak-d.tripcdn.com/images/0223y12000pwqinwo64A3_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0224h12000l78jz7d0505_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0226u12000l78k0xjB24F_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0225812000l78jodbEB5B_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/0225012000l0p785nA379_R_600_400_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0223712000l0audgl7827_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0225912000k2i2ykoD134_R_200_100_R5.webp',
        available: 2
      }
    ],
    coordinates: { lat: 10.5923, lng: 104.1756 }
  },
  {
    id: 'sabay-beach-kep',
    name: 'Sabay Beach Kep',
    location: 'Kep Beach, Kep',
    city: 'Kep',
    country: 'Cambodia',
    description: 'Charming beachfront resort in the sleepy coastal town of Kep. Famous for its fresh crab, peaceful atmosphere, and stunning sunsets over the Gulf of Thailand.',
    price: 95,
    rating: 4.5,
    reviews: 876,
    stars: 3,
    propertyType: 'Resort',
    images: [
      'https://ak-d.tripcdn.com/images/0220k12000pweapjk0815_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc3h12000ok5ivv9E568_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc0j12000ok4y22s6DE9_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/020461200086g4qpp46E4_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/1mc2012000ok4tqjqD2EF_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0226d12000pwebc0i3C74_R_200_100_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc6p12000ok5cilkBDFE_R_200_100_R5.webp',
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
      'https://ak-d.tripcdn.com/images/1ik4912000lzdey3hC657_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1ik3a12000mgeg6x9A5B8_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0581a12000jrx5wb26C69_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1ik6n12000mrjwpkrC46A_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/1ik3y12000mp9crybA84C_R_600_400_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1ik0x12000mkrcopnECF8_R_600_400_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1ik5612000mpam42mD68D_R_600_400_R5.webp',
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
      'https://ak-d.tripcdn.com/images/0221g12000klum248FBC7_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0224p12000l0dugtoD066_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0583712000hql78pxA6DA_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0580b12000l7f0rb77D1E_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/0221n12000l0du69fEC6E_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0224p12000l0dugtoD066_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/0223k12000lxf5r96B099_R_600_400_R5.webp',
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
      'https://ak-d.tripcdn.com/images/1mc0v12000m1r9c6v93ED_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc3c12000m1qmkm505A6_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc0l12000m0mag38ACE1_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc7212000m0madhs4C66_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/1mc5612000m0olp8d5AC4_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc1j12000m1qqijl6529_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc6912000m0m7od1B8F3_R_690_360_R5.webp',
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
      'https://ak-d.tripcdn.com/images/020721200098xdwhuC23C_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc6v12000cl6kqu45BEF_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/02X5a120009iu31nh26DF_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0205k1200099esx014A21_R_600_400_R5.webp'
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
        image: 'https://ak-d.tripcdn.com/images/1mc3j12000cl6hsgs6C42_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc2b12000cl6e9fg2F72_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/020171200099es6vg4F82_R_690_360_R5.webp',
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
        image: 'https://ak-d.tripcdn.com/images/1mc6v12000cl6kqu45BEF_R_690_360_R5.webp',
        available: 3
      }
    ],
    coordinates: { lat: 13.0989, lng: 103.1967 }
  },

  // ========== KEP ==========
  {
    id: 'knai-bang-chatt',
    name: 'Knai Bang Chatt Resort',
    location: 'Phum Thmey, Kep',
    city: 'Kep',
    country: 'Cambodia',
    description: 'A luxurious coastal resort dedicated to the art of living. Set in restored 1970s villas with a saltwater pool and sailing club right on the oceanfront.',
    price: 250,
    rating: 4.8,
    reviews: 654,
    stars: 5,
    propertyType: 'Resort',
    images: [
      'https://ak-d.tripcdn.com/images/200r0v000000jkq5kF7C7_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0205c120008azdz33F293_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc3d12000cw7m50p2D4D_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0586n12000lk5vm6hE72E_R_600_400_R5.webp'
    ],
    amenities: ['Saltwater Pool', 'Sailing Club', 'Spa', 'Fine Dining', 'Yoga', 'Cooking Class'],
    roomTypes: [
      {
        id: 'sea-view',
        name: 'Sea View Room',
        price: 250,
        capacity: 2,
        beds: '1 King Bed',
        size: 35,
        amenities: ['Ocean View', 'Terrace', 'Air Conditioning', 'Safe'],
        image: 'https://ak-d.tripcdn.com/images/0221h120009zraxdz5C8F_R_690_360_R5.webp',
        available: 5
      }
    ],
    coordinates: { lat: 10.4812, lng: 104.2956 }
  },
  {
    id: 'veranda-natural-resort',
    name: 'Veranda Natural Resort',
    location: 'Kep National Park, Kep',
    city: 'Kep',
    country: 'Cambodia',
    description: 'A nature lover\'s paradise tucked into the hillside of Kep National Park. Stunning ocean views, wooden walkways, and a bakery famous across the region.',
    price: 85,
    rating: 4.6,
    reviews: 1243,
    stars: 4,
    propertyType: 'Resort',
    images: [
      'https://ak-d.tripcdn.com/images/1mc3d12000ag4p0yiDC10_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0203l1200082kc6ro8030_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc1c12000meubhaj51D2_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0227312000l1qh697CE5A_R_600_400_R5.webp'
    ],
    amenities: ['2 Pools', 'Bakery', 'Sky Bar', 'Nature Trails', 'Free WiFi'],
    roomTypes: [
      {
        id: 'bungalow',
        name: 'Hillside Bungalow',
        price: 85,
        capacity: 2,
        beds: '1 Queen Bed',
        size: 30,
        amenities: ['Mountain View', 'Private Balcony', 'AC', 'Mini Bar'],
        image: 'https://ak-d.tripcdn.com/images/1mc3s12000mbzjjxi86FC_R_690_360_R5.webp',
        available: 8
      }
    ],
    coordinates: { lat: 10.4891, lng: 104.3012 }
  },

  // ========== KOH KONG ==========
  {
    id: '4-rivers-floating-lodge',
    name: '4 Rivers Floating Lodge',
    location: 'TataI River, Koh Kong',
    city: 'Koh Kong',
    country: 'Cambodia',
    description: 'An environmentally friendly luxury tented camp floating on the Tatai River. Wake up to the sounds of the jungle and clear water all around you.',
    price: 220,
    rating: 4.9,
    reviews: 890,
    stars: 4,
    propertyType: 'Glamping',
    images: [
      'https://ak-d.tripcdn.com/images/0224n12000cu9pxbaB15F_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0220612000kvygev9B648_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0224w12000kvygmk7FD49_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1ik0v12000o5nezz66D3C_R_600_400_R5.webp'
    ],
    amenities: ['River Kayaking', 'Waterfall Tours', 'Restaurant', 'Private Deck', 'Eco-Friendly'],
    roomTypes: [
      {
        id: 'tented-villa',
        name: 'Floating Tent',
        price: 220,
        capacity: 2,
        beds: '1 King Bed',
        size: 45,
        amenities: ['River View', 'Private Deck', 'Fan', 'Safe'],
        image: 'https://ak-d.tripcdn.com/images/0224n12000cu9pxbaB15F_R_600_400_R5.webp',
        available: 12
      }
    ],
    coordinates: { lat: 11.5542, lng: 103.1234 }
  },

  // ========== MONDULKIRI ==========
  {
    id: 'mayura-hill-resort',
    name: 'Mayura Hill Resort',
    location: 'Sen Monorom, Mondulkiri',
    city: 'Mondulkiri',
    country: 'Cambodia',
    description: 'Nestled in the hills of Sen Monorom, this resort offers luxurious villas, a beautiful pool, and easy access to the famous Bou Sra Waterfall.',
    price: 110,
    rating: 4.5,
    reviews: 321,
    stars: 4,
    propertyType: 'Resort',
    images: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/c2/2b/03/mayura-hill-resort.jpg?w=700&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/5a/9b/3e/mayura-hill-resort.jpg?w=900&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/5a/9c/97/mayura-hill-resort.jpg?w=900&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/c2/2a/fb/mayura-hill-resort.jpg?w=700&h=-1&s=1'
    ],
    amenities: ['Pool', 'Gym', 'Restaurant', 'Zip Line', 'Elephant Tours'],
    roomTypes: [
      {
        id: 'villa',
        name: 'Hilltop Villa',
        price: 110,
        capacity: 2,
        beds: '1 King Bed',
        size: 50,
        amenities: ['Mountain View', 'Jacuzzi', 'AC', 'Terrace'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/c2/2a/ff/mayura-hill-resort.jpg?w=700&h=-1&s=1',
        available: 6
      }
    ],
    coordinates: { lat: 12.4567, lng: 107.1892 }
  },

  // ========== RATANAKIRI ==========
  {
    id: 'terres-rouges-lodge',
    name: 'Terres Rouges Lodge',
    location: 'Banlung, Ratanakiri',
    city: 'Ratanakiri',
    country: 'Cambodia',
    description: 'A historic lodge set in a tropical garden by the Boeung Kansaign Lake. Features colonial architecture, a pool, and is a great base for trekking.',
    price: 65,
    rating: 4.4,
    reviews: 450,
    stars: 3,
    propertyType: 'Lodge',
    images: [
      'https://ak-d.tripcdn.com/images/0224112000kz1de0d1917_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0220e12000l1a0hfv5716_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0226i120009zrbii82FB3_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0585l12000mfbgnf492FC_R_600_400_R5.webp'
    ],
    amenities: ['Lake View', 'Pool', 'Restaurant', 'Spa', 'Trekking Guides'],
    roomTypes: [
      {
        id: 'standard-bungalow',
        name: 'Garden Bungalow',
        price: 65,
        capacity: 2,
        beds: '1 Double Bed',
        size: 28,
        amenities: ['Garden View', 'AC', 'Private Bathroom'],
        image: 'https://ak-d.tripcdn.com/images/1ik4512000o2qw4mk408B_R_200_100_R5.webp',
        available: 10
      }
    ],
    coordinates: { lat: 13.7394, lng: 106.9821 }
  },

  // ========== KAMPONG CHAM ==========
  {
    id: 'lbn-asian-hotel',
    name: 'LBN Asian Hotel',
    location: 'Riverfront, Kampong Cham',
    city: 'Kampong Cham',
    country: 'Cambodia',
    description: 'A modern landmark hotel on the Mekong riverfront. Offering comfortable rooms, panoramic river views, and a sky bar.',
    price: 45,
    rating: 4.2,
    reviews: 560,
    stars: 3,
    propertyType: 'Hotel',
    images: [
      'https://ak-d.tripcdn.com/images/1mc3g12000pplqz9r570A_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/0223s12000m4b7tovE161_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc3b12000bzeb2oa34D5_R_600_400_R5.webp',
      'https://ak-d.tripcdn.com/images/1mc0x12000ppkg2280FD8_R_600_400_R5.webp'
    ],
    amenities: ['Sky Bar', 'River View', 'Conference Room', 'Spa', 'Free WiFi'],
    roomTypes: [
      {
        id: 'deluxe-river',
        name: 'Deluxe River View',
        price: 45,
        capacity: 2,
        beds: '1 King Bed',
        size: 32,
        amenities: ['River View', 'AC', 'TV', 'Fridge'],
        image: 'https://ak-d.tripcdn.com/images/1mc5r12000ps9gqe3843B_R_200_100_R5.webp',
        available: 15
      }
    ],
    coordinates: { lat: 11.9924, lng: 105.4645 }
  },

  // ========== PREAH VIHEAR ==========
  {
    id: 'preah-vihear-boutique',
    name: 'Preah Vihear Boutique Hotel',
    location: 'Sra Em, Preah Vihear',
    city: 'Preah Vihear',
    country: 'Cambodia',
    description: 'Convenient and comfortable accommodation located near the Preah Vihear Temple. Features a large pool and clean, modern rooms.',
    price: 55,
    rating: 4.0,
    reviews: 230,
    stars: 3,
    propertyType: 'Hotel',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'
    ],
    amenities: ['Pool', 'Restaurant', 'Temple Tours', 'Parking', 'Garden'],
    roomTypes: [
      {
        id: 'superior',
        name: 'Superior Room',
        price: 55,
        capacity: 2,
        beds: '1 King or 2 Twins',
        size: 30,
        amenities: ['Pool View', 'AC', 'TV', 'Kettle'],
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
        available: 20
      }
    ],
    coordinates: { lat: 14.1623, lng: 104.8765 }
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
