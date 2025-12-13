import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import Destinations from "./pages/Destinations";
import Contact from "./pages/Contact";
import ListProperty from "./pages/ListProperty";
import Support from "./pages/Support";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MapSearch from "./pages/MapSearch";
import OwnerDashboard from "./pages/OwnerDashboard";
import Checkout from "./pages/Checkout";
import Offers from "./pages/Offers";
import OfferDetails from "./pages/OfferDetails";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CurrencyProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/hotel/:id" element={<HotelDetails />} />
              <Route path="/booking/:hotelId" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/list-property" element={<ListProperty />} />
              <Route path="/support" element={<Support />} />
              <Route path="/owner-dashboard" element={<OwnerDashboard />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/map-search" element={<MapSearch />} />
              <Route path="/checkout/:hotelId" element={<Checkout />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/offers/:slug" element={<OfferDetails />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </CurrencyProvider>
  </QueryClientProvider>
);

export default App;
