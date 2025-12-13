export type OfferPerk = {
  title: string;
  description: string;
  icon: "calendar" | "shield" | "sparkles" | "heart" | "clock" | "users" | "sun" | "plane" | "ticket" | "chef";
};

export type OfferPackage = {
  title: string;
  description: string;
  price: string;
  includes: string[];
  badge?: string;
};

export type OfferDestination = {
  title: string;
  subtitle: string;
  price: string;
  image: string;
  badge?: string;
};

export type OfferStat = {
  label: string;
  value: string;
  caption: string;
};

export type Offer = {
  id: number;
  slug: string;
  title: string;
  headline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  image: string;
  tag: string;
  color: string;
  stats: OfferStat[];
  perks: OfferPerk[];
  packages: OfferPackage[];
  destinations: OfferDestination[];
  steps: string[];
};

export const offers: Offer[] = [
  {
    id: 1,
    slug: "early-bird-saver",
    title: "Early Bird Saver",
    headline: "Lock in tomorrow's trip at today's rate.",
    description: "Book 60 days in advance and save up to 20% on selected premium hotels.",
    longDescription: "Secure the best rates on signature stays when you book ahead. From Angkor Wat sunrise escapes to skyline city breaks, enjoy flexible dates, free Wi-Fi, and breakfast-first perks inspired by Trip.com's lead-in offers.",
    heroImage: "https://mediaim.expedia.com/destination/1/70981b9f24e4825958eff982f8e1d2f6.jpg",
    image: "https://mediaim.expedia.com/destination/1/70981b9f24e4825958eff982f8e1d2f6.jpg",
    tag: "Limited Time",
    color: "from-blue-600 to-blue-400",
    stats: [
      { label: "Avg. advance savings", value: "18%", caption: "Compared with standard rates" },
      { label: "Flex window", value: "1 free change", caption: "Adjust dates up to 7 days prior" },
      { label: "Curated stays", value: "220+", caption: "Premium & boutique hotels" },
    ],
    perks: [
      { title: "48h Price Hold", description: "Reserve now, lock your fare while you finalize flights.", icon: "clock" },
      { title: "Flexible Dates", description: "One complimentary date change on participating stays.", icon: "calendar" },
      { title: "Breakfast & Wi-Fi", description: "Daily breakfast and fast Wi-Fi included on most picks.", icon: "sparkles" },
      { title: "Priority Support", description: "Concierge chat with response in under 5 minutes.", icon: "shield" },
    ],
    packages: [
      {
        title: "Angkor Sunrise Escape",
        description: "Pool-view suite with late checkout and temple shuttle.",
        price: "From $109/night",
        includes: ["Breakfast for 2", "Private sunrise transfer", "Late checkout 2 PM"],
        badge: "Top Pick",
      },
      {
        title: "Bangkok Skyline Stay",
        description: "Sathorn high-rise with club lounge access and welcome drinks.",
        price: "From $189/night",
        includes: ["Club lounge access", "Airport pick-up", "Evening cocktails"],
      },
      {
        title: "Phuket Beach Advance",
        description: "Beachfront villa with daily spa credit and sunset cruise upgrade.",
        price: "From $149/night",
        includes: ["Daily spa credit", "Sunset cruise upgrade", "Kids under 6 stay free"],
      },
    ],
    destinations: [
      {
        title: "Siem Reap Heritage",
        subtitle: "Boutique stays near Angkor Wat with guided dawn tours.",
        price: "Save up to 20%",
        image: "https://images.unsplash.com/photo-1580129934810-9e66c67da9d5?auto=format&fit=crop&w=900&q=80",
        badge: "Culture",
      },
      {
        title: "Phuket Seaside",
        subtitle: "Pool villas and barefoot brunches by the Andaman Sea.",
        price: "From $149/night",
        image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=80",
        badge: "Beach",
      },
      {
        title: "Singapore Stopover",
        subtitle: "Skyline hotels with lounge access and late checkout.",
        price: "From $199/night",
        image: "https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?auto=format&fit=crop&w=900&q=80",
        badge: "City",
      },
    ],
    steps: [
      "Pick your dates 30–90 days out and choose an Early Bird label.",
      "Hold the rate for 48 hours or confirm instantly with one free date change.",
      "Arrive to priority check-in, welcome drinks, and breakfast on us.",
    ],
  },
  {
    id: 2,
    slug: "couples-retreat",
    title: "Couple's Retreat",
    headline: "Hideaways designed for two.",
    description: "Romantic getaways with special amenities included. Perfect for honeymooners.",
    longDescription: "Candlelit dinners, sunset cruises, and suites with private tubs—crafted with the same curated, high-touch vibe you see on Trip.com short getaways. Every stay comes with privacy-friendly perks and concierge moments for two.",
    heroImage: "https://airial.travel/_next/image?url=https%3A%2F%2Fcoinventmediastorage.blob.core.windows.net%2Fmedia-storage-container%2Fgphoto_ChIJoSJWb-vBBzERWB2aRlr3aoM_0.jpg&w=3840&q=75",
    image: "https://airial.travel/_next/image?url=https%3A%2F%2Fcoinventmediastorage.blob.core.windows.net%2Fmedia-storage-container%2Fgphoto_ChIJoSJWb-vBBzERWB2aRlr3aoM_0.jpg&w=3840&q=75",
    tag: "Trending",
    color: "from-rose-500 to-pink-400",
    stats: [
      { label: "Late checkout", value: "2 PM", caption: "On select stays" },
      { label: "Signature perks", value: "Spa + wine", caption: "Welcome extras on arrival" },
      { label: "Curated spots", value: "150+", caption: "Adults-first hideaways" },
    ],
    perks: [
      { title: "Private Check-in", description: "Seamless arrivals with privacy-first concierge desks.", icon: "shield" },
      { title: "Romance Setups", description: "Petals, candle kits, and welcome bubbles in-room.", icon: "heart" },
      { title: "Slow Mornings", description: "Breakfast in bed and 2 PM checkout where available.", icon: "sun" },
      { title: "Memorable Moments", description: "Sunset cruise or couple's spa credit included on top picks.", icon: "sparkles" },
    ],
    packages: [
      {
        title: "Mekong Sunset Cruise",
        description: "Riverside suite with evening cruise and champagne pairing.",
        price: "From $229/night",
        includes: ["Couple's spa credit", "Champagne on arrival", "Sunset cruise tickets"],
        badge: "Editor’s pick",
      },
      {
        title: "Bali Cliffside Hideout",
        description: "Infinity pool villa with floating breakfast and yoga for two.",
        price: "From $279/night",
        includes: ["Floating breakfast", "Private yoga session", "Airport fast-track"],
      },
      {
        title: "Kyoto Ryokan Evening",
        description: "Garden-view tatami suite with kaiseki dinner and onsen access.",
        price: "From $249/night",
        includes: ["Seasonal kaiseki dinner", "Onsen passes", "Guided temple stroll"],
      },
    ],
    destinations: [
      {
        title: "Luang Prabang",
        subtitle: "French-colonial villas with riverside dining for two.",
        price: "From $189/night",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
        badge: "Quiet",
      },
      {
        title: "Ubud Jungle",
        subtitle: "Treetop pools, spa rituals, and candlelit deck dinners.",
        price: "From $205/night",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
        badge: "Wellness",
      },
      {
        title: "Phuket Cape Panwa",
        subtitle: "Private plunge pools with panoramic Andaman views.",
        price: "From $259/night",
        image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=900&q=80",
        badge: "Seaview",
      },
    ],
    steps: [
      "Choose a retreat with the Romance tag and lock in your dates.",
      "Add your arrival time and preferences for in-room setup.",
      "Unwind with spa credits, slow breakfasts, and late checkout for two.",
    ],
  },
  {
    id: 3,
    slug: "family-fun-pack",
    title: "Family Fun Pack",
    headline: "Space to play, perks for everyone.",
    description: "Kids stay free! Enjoy family-friendly resorts with activities for everyone.",
    longDescription: "Water slides, kids clubs, and adjoining suites that keep everyone comfortable. Inspired by Trip.com's playful family deals, these stays bundle breakfast, activity credits, and flexible sleep setups for the whole crew.",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    tag: "Family Special",
    color: "from-emerald-500 to-teal-400",
    stats: [
      { label: "Kids stay & eat", value: "Free", caption: "Up to 2 kids under 12" },
      { label: "Activity credit", value: "$50/night", caption: "Clubs, water fun, rentals" },
      { label: "Roomy options", value: "Suite + bunk", caption: "Family & connecting rooms" },
    ],
    perks: [
      { title: "Guaranteed Bedding", description: "Family suites or guaranteed twin + sofa setup.", icon: "users" },
      { title: "Daily Breakfast", description: "Buffet spreads with kid-friendly picks included.", icon: "chef" },
      { title: "Activity Credits", description: "Use on kids club, kayak rentals, or slides.", icon: "ticket" },
      { title: "Early Check-in", description: "Arrive and drop bags from noon where available.", icon: "clock" },
    ],
    packages: [
      {
        title: "Siem Reap Explorer",
        description: "Family suite with pool access and temple day tour seats.",
        price: "From $139/night",
        includes: ["Breakfast for 4", "Kids club day-pass", "Two-way airport transfer"],
        badge: "Best value",
      },
      {
        title: "Da Nang Splash Resort",
        description: "Beach resort with water slides and daily activity credits.",
        price: "From $169/night",
        includes: ["$50 activity credit", "Late checkout 1 PM", "Free extra bed"],
      },
      {
        title: "Singapore Family Stop",
        description: "City suite near attractions with MRT cards included.",
        price: "From $189/night",
        includes: ["Daily breakfast", "Attraction day-pass", "Guaranteed twin + sofa"],
      },
    ],
    destinations: [
      {
        title: "Phnom Penh Riverside",
        subtitle: "Large river-view suites with kids club and pool play zones.",
        price: "From $129/night",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
        badge: "City break",
      },
      {
        title: "Nha Trang Coast",
        subtitle: "Beachfront resorts with daily snorkel and paddle rentals.",
        price: "From $159/night",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
        badge: "Beach",
      },
      {
        title: "Kuala Lumpur Duo",
        subtitle: "Twin + bunk rooms close to malls, aquariums, and parks.",
        price: "From $129/night",
        image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
        badge: "Urban fun",
      },
    ],
    steps: [
      "Pick a Family Fun Pack stay with the kids-stay-free badge.",
      "Add guest ages so we prep the right bedding and breakfast setup.",
      "Spend activity credits on slides, rentals, and kids club passes daily.",
    ],
  },
];

export const getOfferBySlug = (slug: string) => offers.find((offer) => offer.slug === slug);
