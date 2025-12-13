import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, QrCode, Check, Calendar, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getHotelById } from '@/data/hotels';

const Checkout = () => {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('visa');
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock booking data
    const checkIn = '2024-12-20';
    const checkOut = '2024-12-23';
    const guests = 2;
    const nights = 3;

    // Get hotel data
    const hotel = getHotelById(hotelId || '');

    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Hotel not found</h2>
                    <Button onClick={() => navigate('/')}>Go Home</Button>
                </div>
            </div>
        );
    }

    const subtotal = hotel.price * nights;
    const tax = subtotal * 0.1;
    const serviceFee = 15;
    const total = subtotal + tax + serviceFee;

    const confirmationNumber = `NK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const handlePayment = () => {
        setShowSuccess(true);
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">Booking Confirmation</h1>
                            <Button variant="outline" onClick={() => navigate('/')}>
                                Return Home
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Success Banner */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-12 h-12 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
                            <p className="text-green-50 text-lg">Your reservation has been successfully processed</p>
                        </div>

                        {/* Confirmation Number */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-y border-blue-200 p-6">
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-1">Confirmation Number</p>
                                <p className="text-3xl font-bold text-gray-900 tracking-wider">{confirmationNumber}</p>
                                <p className="text-xs text-gray-500 mt-2">Please save this number for your records</p>
                            </div>
                        </div>

                        {/* Guest Information */}
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Guest Information</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Guest Name</p>
                                    <p className="font-semibold text-gray-900">Nithie Lim</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-semibold text-gray-900">nithie.lim@example.com</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-semibold text-gray-900">+855 12 345 678</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Booking Date</p>
                                    <p className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Hotel & Itinerary */}
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Reservation Details</h3>

                            {/* Hotel Card */}
                            <div className="flex gap-4 mb-6 bg-gray-50 rounded-lg p-4">
                                <img
                                    src={hotel.images[0]}
                                    alt={hotel.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-lg">{hotel.name}</h4>
                                    <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{hotel.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                            {hotel.rating} / 5
                                        </div>
                                        <span className="text-xs text-gray-500">{hotel.reviews} reviews</span>
                                    </div>
                                </div>
                            </div>

                            {/* Itinerary */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Check-in</span>
                                    </div>
                                    <p className="font-bold text-gray-900">{checkIn}</p>
                                    <p className="text-xs text-gray-500 mt-1">After 2:00 PM</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Check-out</span>
                                    </div>
                                    <p className="font-bold text-gray-900">{checkOut}</p>
                                    <p className="text-xs text-gray-500 mt-1">Before 12:00 PM</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <Users className="w-4 h-4" />
                                        <span>Guests</span>
                                    </div>
                                    <p className="font-bold text-gray-900">{guests} Adults</p>
                                    <p className="text-xs text-gray-500 mt-1">{nights} nights</p>
                                </div>
                            </div>

                            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm text-blue-900">
                                    <span className="font-semibold">Room Type:</span> Deluxe Double Room
                                </p>
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">${hotel.price} × {nights} nights</span>
                                    <span className="font-medium text-gray-900">${subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Service fee</span>
                                    <span className="font-medium text-gray-900">${serviceFee}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Taxes (10%)</span>
                                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-300 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-900 text-lg">Total Paid</span>
                                        <div className="text-right">
                                            <span className="font-bold text-2xl text-green-600">${total.toFixed(2)}</span>
                                            <p className="text-xs text-gray-500">= ៛{(total * 4100).toLocaleString()} KHR</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                                    <p className="text-sm text-green-800 font-medium">
                                        ✓ Payment completed via {paymentMethod === 'visa' ? 'Visa Card' : 'KHQR'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Important Information */}
                        <div className="p-6 bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>

                            <div className="space-y-4 text-sm">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Cancellation Policy</h4>
                                    <p className="text-gray-600">
                                        Free cancellation until 48 hours before check-in. Cancellations made within 48 hours will incur a charge of one night's stay.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Hotel Contact</h4>
                                    <p className="text-gray-600">
                                        Phone: +855 63 760 000<br />
                                        Email: info@{hotel.name.toLowerCase().replace(/\s+/g, '')}.com
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">What to Bring</h4>
                                    <p className="text-gray-600">
                                        Please bring a valid photo ID and the credit card used for booking at check-in.
                                    </p>
                                </div>

                                <div className="border-t border-gray-300 pt-4 mt-4">
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        <strong>Disclaimer:</strong> This booking is subject to availability and the hotel's terms and conditions.
                                        NextGen acts as an intermediary between you and the hotel. All rates are subject to change without notice.
                                        By completing this booking, you agree to our Terms of Service and Privacy Policy.
                                        A confirmation email has been sent to your registered email address.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-6 bg-white">
                            <div className="grid md:grid-cols-3 gap-3">
                                <Button variant="outline" className="w-full">
                                    Email Confirmation
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Print Receipt
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Download PDF
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Message */}
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">
                            Thank you for booking with NextGen! We hope you have a wonderful stay.
                        </p>
                        <Button onClick={() => navigate('/')} size="lg">
                            Return to Home
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back</span>
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
                        <div className="w-20"></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
                            <div className="relative h-48">
                                <img
                                    src={hotel.images[0]}
                                    alt={hotel.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-xl mb-1">{hotel.name}</h3>
                                    <div className="flex items-center gap-1 text-white/90 text-sm">
                                        <MapPin className="w-4 h-4" />
                                        <span>{hotel.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Booking Details</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500">Check-in</p>
                                                <p className="font-medium text-gray-900">{checkIn}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500">Check-out</p>
                                                <p className="font-medium text-gray-900">{checkOut}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500">Guests</p>
                                                <p className="font-medium text-gray-900">{guests} Adults</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <h4 className="font-semibold text-gray-900 mb-3">Price Details</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">${hotel.price} × {nights} nights</span>
                                            <span className="font-medium text-gray-900">${subtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Service fee</span>
                                            <span className="font-medium text-gray-900">${serviceFee}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Taxes (10%)</span>
                                            <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-2 mt-2">
                                            <div className="flex justify-between">
                                                <span className="font-bold text-gray-900">Total</span>
                                                <span className="font-bold text-xl text-primary">${total.toFixed(2)}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                = ៛{(total * 4100).toLocaleString()} KHR
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment Methods */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>

                            <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-8">
                                    <TabsTrigger value="visa" className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        Visa / Card
                                    </TabsTrigger>
                                    <TabsTrigger value="khqr" className="flex items-center gap-2">
                                        <QrCode className="w-4 h-4" />
                                        KHQR
                                    </TabsTrigger>
                                </TabsList>

                                {/* Visa Card Payment */}
                                <TabsContent value="visa" className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="cardNumber">Card Number</Label>
                                            <Input
                                                id="cardNumber"
                                                placeholder="1234 5678 9012 3456"
                                                className="mt-1.5"
                                                maxLength={19}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="cardName">Cardholder Name</Label>
                                            <Input
                                                id="cardName"
                                                placeholder="JOHN DOE"
                                                className="mt-1.5"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="expiry">Expiry Date</Label>
                                                <Input
                                                    id="expiry"
                                                    placeholder="MM/YY"
                                                    className="mt-1.5"
                                                    maxLength={5}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="cvv">CVV</Label>
                                                <Input
                                                    id="cvv"
                                                    placeholder="123"
                                                    className="mt-1.5"
                                                    maxLength={3}
                                                    type="password"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                                            <div className="flex gap-3">
                                                <div className="shrink-0">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <CreditCard className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-blue-900 mb-1">Secure Payment</h4>
                                                    <p className="text-sm text-blue-700">
                                                        Your payment information is encrypted and secure. We accept Visa, Mastercard, and American Express.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handlePayment}
                                        className="w-full h-12 text-base font-semibold"
                                        size="lg"
                                    >
                                        Pay ${total.toFixed(2)}
                                    </Button>
                                </TabsContent>

                                {/* KHQR Payment */}
                                <TabsContent value="khqr" className="space-y-6">
                                    <div className="text-center">
                                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 inline-block">
                                            <img
                                                src="/khqr-code.png"
                                                alt="KHQR Code"
                                                className="w-64 h-64 mx-auto object-contain"
                                            />
                                            <div className="mt-4">
                                                <p className="text-sm font-semibold text-gray-900">Scan to Pay</p>
                                                <p className="text-2xl font-bold text-primary mt-1">${total.toFixed(2)}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    = ៛{(total * 4100).toLocaleString()} KHR
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                                            <h4 className="font-semibold text-gray-900 mb-3">How to pay with KHQR</h4>
                                            <ol className="text-left space-y-2 text-sm text-gray-700">
                                                <li className="flex gap-3">
                                                    <span className="font-bold text-primary shrink-0">1.</span>
                                                    <span>Open your banking app (ABA, Wing, ACLEDA, etc.)</span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="font-bold text-primary shrink-0">2.</span>
                                                    <span>Select "Scan QR" or "KHQR Payment"</span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="font-bold text-primary shrink-0">3.</span>
                                                    <span>Scan the QR code above</span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="font-bold text-primary shrink-0">4.</span>
                                                    <span>Confirm the payment amount and complete</span>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handlePayment}
                                        className="w-full h-12 text-base font-semibold"
                                        size="lg"
                                    >
                                        I've Completed Payment
                                    </Button>
                                </TabsContent>
                            </Tabs>

                            <p className="text-xs text-gray-500 text-center mt-6">
                                By completing this booking, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
