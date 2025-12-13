import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MyBookings = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col pt-16">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
                <p className="text-muted-foreground">Booking history and management coming soon.</p>
            </main>
            <Footer />
        </div>
    );
};

export default MyBookings;
