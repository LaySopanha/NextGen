import { useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, CreditCard, Check, ArrowLeft, Coffee, UtensilsCrossed } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getHotelById, RoomType, mealPlans } from '@/data/hotels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { format, differenceInDays } from 'date-fns';

const Booking = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomId = searchParams.get('room');

  // Get search params for pre-filling
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  const adultsParam = searchParams.get('adults');
  const childrenParam = searchParams.get('children');
  const roomsParam = searchParams.get('rooms');
  const mealPlanId = searchParams.get('mealPlan') || 'room-only';
  const mealPlanPrice = parseInt(searchParams.get('mealPlanPrice') || '0');

  const hotel = getHotelById(hotelId || '');
  const room = hotel?.roomTypes.find((r) => r.id === roomId);
  const selectedMealPlan = mealPlans.find(m => m.id === mealPlanId) || mealPlans[0];

  // Parse dates and calculate total guests
  const parsedCheckIn = checkInParam ? new Date(checkInParam) : null;
  const parsedCheckOut = checkOutParam ? new Date(checkOutParam) : null;
  const totalGuests = (parseInt(adultsParam || '2') + parseInt(childrenParam || '0')).toString();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    clientFirstName: '',
    clientLastName: '',
    clientEmail: '',
    clientPhone: '',
    checkIn: parsedCheckIn ? format(parsedCheckIn, 'yyyy-MM-dd') : '',
    checkOut: parsedCheckOut ? format(parsedCheckOut, 'yyyy-MM-dd') : '',
    guests: totalGuests,
    rooms: roomsParam || '1',
    specialRequests: '',
  });

  if (!hotel || !room) {
    return (
      <div className="min-h-screen bg-background pt-14">
        <Header />
        <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Booking not found</h1>
          <Button onClick={() => navigate('/search')}>Browse Hotels</Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate nights dynamically
  const nights = useMemo(() => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const diff = differenceInDays(checkOutDate, checkInDate);
      return diff > 0 ? diff : 1;
    }
    return 1;
  }, [formData.checkIn, formData.checkOut]);

  const numRooms = parseInt(formData.rooms) || 1;
  const roomSubtotal = room.price * nights * numRooms;
  const mealSubtotal = mealPlanPrice * nights * numRooms;
  const subtotal = roomSubtotal + mealSubtotal;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate validation
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);

    // Navigate to checkout page for payment
    navigate(`/checkout/${hotel.id}`);

    toast({
      title: 'Proceeding to Payment',
      description: `Redirecting to secure checkout...`,
    });
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-background pt-14">
        <Header />
        <main className="container px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald/20">
              <Check className="h-10 w-10 text-emerald" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground">Booking Confirmed!</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Your booking at {hotel.name} has been confirmed. A confirmation email will be sent to {formData.clientEmail}.
            </p>

            <Card className="mb-8 text-left">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Confirmation Number</p>
                    <p className="font-mono font-semibold text-foreground">NG-{Date.now().toString().slice(-8)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Guest Name</p>
                    <p className="font-semibold text-foreground">
                      {formData.clientFirstName} {formData.clientLastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hotel</p>
                    <p className="font-semibold text-foreground">{hotel.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Room</p>
                    <p className="font-semibold text-foreground">{room.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-semibold text-foreground">${total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button onClick={() => navigate('/search')} className="rounded-full">
                Book Another Hotel
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} className="rounded-full">
                Back to Home
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-14">
      <Header />

      <main className="container px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(`/hotel/${hotel.id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to hotel
        </Button>

        <h1 className="mb-8 text-3xl font-bold text-foreground">Complete Booking</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Guest Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="clientFirstName">First Name</Label>
                      <Input
                        id="clientFirstName"
                        name="clientFirstName"
                        value={formData.clientFirstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientLastName">Last Name</Label>
                      <Input
                        id="clientLastName"
                        name="clientLastName"
                        value={formData.clientLastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="clientEmail">Email</Label>
                      <Input
                        id="clientEmail"
                        name="clientEmail"
                        type="email"
                        value={formData.clientEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientPhone">Phone</Label>
                      <Input
                        id="clientPhone"
                        name="clientPhone"
                        type="tel"
                        value={formData.clientPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Stay Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="checkIn">Check-in Date</Label>
                      <Input
                        id="checkIn"
                        name="checkIn"
                        type="date"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out Date</Label>
                      <Input
                        id="checkOut"
                        name="checkOut"
                        type="date"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input
                        id="guests"
                        name="guests"
                        type="number"
                        max={room.capacity * parseInt(formData.rooms)}
                        value={formData.guests}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="rooms">Number of Rooms</Label>
                      <Input
                        id="rooms"
                        name="rooms"
                        type="number"
                        min="1"
                        value={formData.rooms}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Special Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    placeholder="Any special requests or preferences for your stay..."
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </CardContent>
              </Card>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={isSubmitting}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                {isSubmitting ? 'Processing...' : `Confirm Booking · $${total}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-4">
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{hotel.name}</h3>
                    <p className="text-sm text-muted-foreground">{hotel.location}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="mb-4">
                  <h4 className="mb-2 font-medium text-foreground">{room.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {room.beds} · Up to {room.capacity} guests per room
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {numRooms} {numRooms === 1 ? 'room' : 'rooms'} · {nights} {nights === 1 ? 'night' : 'nights'}
                  </p>
                </div>

                {/* Meal Plan */}
                <div className="mb-4 rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2 text-sm">
                    {selectedMealPlan.id !== 'room-only' && (
                      selectedMealPlan.id === 'breakfast' ? (
                        <Coffee className="h-4 w-4 text-primary" />
                      ) : (
                        <UtensilsCrossed className="h-4 w-4 text-primary" />
                      )
                    )}
                    <span className="font-medium text-foreground">{selectedMealPlan.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{selectedMealPlan.description}</p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Room: ${room.price} × {nights} nights × {numRooms} rooms
                    </span>
                    <span className="text-foreground">${roomSubtotal}</span>
                  </div>
                  {mealSubtotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {selectedMealPlan.name}: ${mealPlanPrice} × {nights} nights × {numRooms} rooms
                      </span>
                      <span className="text-foreground">${mealSubtotal}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & fees (12%)</span>
                    <span className="text-foreground">${taxes}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${total}</span>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  By confirming this booking, you agree to our terms of service and cancellation policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
