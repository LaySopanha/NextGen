import { Clock, Info, Baby, PawPrint } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface HotelPoliciesProps {
    policies?: {
        checkIn: string;
        checkOut: string;
        cancellation: string;
        children: string;
        pets: string;
    };
}

const HotelPolicies = ({ policies }: HotelPoliciesProps) => {
    if (!policies) return null;

    return (
        <div id="policies" className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Hotel Policies</h2>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Check-in/out */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Check-in & Check-out</h3>
                        <p className="text-sm text-muted-foreground mb-1">Check-in from: <span className="text-foreground font-medium">{policies.checkIn}</span></p>
                        <p className="text-sm text-muted-foreground">Check-out before: <span className="text-foreground font-medium">{policies.checkOut}</span></p>
                    </div>
                </div>

                {/* Children */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-orange-600">
                        <Baby className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Children & Extra Beds</h3>
                        <p className="text-sm text-muted-foreground">{policies.children}</p>
                    </div>
                </div>

                {/* Cancellation */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 text-green-600">
                        <Info className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Cancellation Policy</h3>
                        <p className="text-sm text-muted-foreground">{policies.cancellation}</p>
                    </div>
                </div>

                {/* Pets */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0 text-pink-600">
                        <PawPrint className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Pets</h3>
                        <p className="text-sm text-muted-foreground">{policies.pets}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelPolicies;
