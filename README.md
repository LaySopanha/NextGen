# NextGen Travel Booking Demo

Front-end demo for a Cambodia-focused travel marketplace. The experience showcases a modern booking flow: destination discovery, hotel search with filters and map view, offer detail pages, a checkout mock, and an owner dashboard preview. All data is static and intended for prototyping and design review.

**Live demo:** https://next-gen-rouge.vercel.app/

## Highlights
- Destination, hotel, and offer browsing with hero storytelling tailored to Cambodia.
- Search with filters (price, amenities, rating, property type), list/grid toggle, and optional map view (Leaflet).
- Hotel detail, booking, checkout, and My Bookings mock journeys with toast/sonner notifications.
- Owner and host tooling previews (List Property, Owner Dashboard, support flows).
- Responsive, mobile-first UI built with shadcn/ui components and Tailwind utility styling.

## Tech Stack
- ⚡ Vite + TypeScript
- ⚛️ React 18 with React Router
- 🎨 Tailwind CSS + shadcn/ui (Radix primitives)
- 📦 React Query for client-side state/caching
- 🗺️ Leaflet via `react-leaflet` for maps
- ▲ Vercel for hosting the live demo

## Project Structure
- `src/pages` – route-level pages (landing, search, destinations, offers, booking/checkout, owner flows)
- `src/components` – shared UI (header, search bar, hotel cards, filters, maps, layout)
- `src/data/hotels.ts` – seeded hotel, destination, and offer data powering the demo
- `public` – static assets

## Notes
- Booking, authentication, and payments are mocked for demonstration; no backend services are wired.
- Map tiles load from Leaflet defaults; adjust for production usage as needed.
