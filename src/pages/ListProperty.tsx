import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Building2,
    MapPin,
    Camera,
    BedDouble,
    FileText,
    CheckCircle2,
    Upload,
    Plus,
    X,
    Wifi,
    Car,
    Utensils,
    Waves,
    Dumbbell,
    Coffee,
    ArrowRight,
    ArrowLeft,
    Lightbulb,
    ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ListProperty = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        type: 'hotel',
        description: '',
        address: '',
        city: '',
        amenities: [] as string[],
        rooms: [] as any[],
        photos: [] as string[], // simulated URLs
        contract: null as File | null
    });

    const handleNext = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate('/owner-dashboard');
    };

    const toggleAmenity = (amenity: string) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const addRoom = () => {
        setFormData(prev => ({
            ...prev,
            rooms: [...prev.rooms, { name: 'Standard Room', price: 0, capacity: 2 }]
        }));
    };

    const updateRoom = (index: number, field: string, value: any) => {
        const newRooms = [...formData.rooms];
        newRooms[index] = { ...newRooms[index], [field]: value };
        setFormData(prev => ({ ...prev, rooms: newRooms }));
    };

    const removeRoom = (index: number) => {
        setFormData(prev => ({
            ...prev,
            rooms: prev.rooms.filter((_, i) => i !== index)
        }));
    };

    const steps = [
        { id: 1, label: "Basic Info", icon: Building2, description: "Name & location" },
        { id: 2, label: "Amenities", icon: Wifi, description: "Facilities" },
        { id: 3, label: "Photos", icon: Camera, description: "Gallery" },
        { id: 4, label: "Rooms", icon: BedDouble, description: "Pricing" },
        { id: 5, label: "Contract", icon: FileText, description: "Finalize" },
    ];

    const currentStepInfo = steps.find(s => s.id === step);

    // Sidebar Tips Content
    const getSidebarContent = () => {
        switch (step) {
            case 1:
                return {
                    title: "Let's start locally",
                    content: "Guests love knowing exactly where they'll be staying. Be precise with your location to help them explore the neighborhood.",
                    tip: "Properties with detailed descriptions get 20% more views."
                };
            case 2:
                return {
                    title: "Stand out with amenities",
                    content: "Travelers look for specific features. Make sure you check everything you offer, even the small things.",
                    tip: "Free Wi-Fi and Breakfast are the most searched amenities."
                };
            case 3:
                return {
                    title: "A picture is worth 1000 bookings",
                    content: "High-quality photos are the #1 driver for bookings. Show your property in the best light.",
                    tip: "Upload at least 5 photos, including the bathroom and exterior."
                };
            case 4:
                return {
                    title: "Set your rooms & rates",
                    content: "Define the different types of rooms you have. You can adjust prices later in your dashboard.",
                    tip: "Offering a 'Standard' and 'Deluxe' option covers most traveler needs."
                };
            case 5:
                return {
                    title: "Make it official",
                    content: "We need a signed agreement to list your property. This ensures safety for both you and the guests.",
                    tip: "Our team reviews contracts within 24 hours."
                };
            default:
                return { title: "", content: "", tip: "" };
        }
    };

    const sidebarInfo = getSidebarContent();

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            <Header />

            {/* HERO SECTION */}
            <div className="bg-primary pt-24 pb-24 px-4">
                <div className="max-w-7xl mx-auto text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Become a <span className="text-accent">NextGen</span> Host
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                        Earn extra income and unlock new opportunities by leasing your home or hotel.
                    </p>
                </div>
            </div>

            <div className="flex-1 max-w-7xl mx-auto w-full px-4 -mt-16 pb-12">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT COLUMN: Main Form (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Progress Header */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">{currentStepInfo?.label}</h1>
                                    <p className="text-slate-500 text-sm">Step {step} of 5</p>
                                </div>
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    {currentStepInfo && <currentStepInfo.icon className="w-6 h-6" />}
                                </div>
                            </div>
                            {/* Visual Progress Bar */}
                            <div className="text-sm font-medium text-slate-500 mb-2 flex justify-between">
                                <span>Progress</span>
                                <span>{Math.round((step / 5) * 100)}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-500 ease-out"
                                    style={{ width: `${(step / 5) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* STEP CONTENT */}
                        <Card className="border-none shadow-xl overflow-hidden">
                            <CardContent className="p-6 md:p-8">

                                {/* STEP 1: BASIC INFO */}
                                {step === 1 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2 md:col-span-2">
                                                <Label className="text-base">Property Name</Label>
                                                <Input
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="e.g. Grand Siem Reap Hotel"
                                                    className="h-12 text-lg"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Property Type</Label>
                                                <Select value={formData.type} onValueChange={v => setFormData({ ...formData, type: v })}>
                                                    <SelectTrigger className="h-11">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="hotel">Hotel</SelectItem>
                                                        <SelectItem value="resort">Resort</SelectItem>
                                                        <SelectItem value="guesthouse">Guesthouse</SelectItem>
                                                        <SelectItem value="apartment">Apartment</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Location / City</Label>
                                                <Input
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    placeholder="e.g. Siem Reap"
                                                    className="h-11"
                                                />
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label>Address</Label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        value={formData.address}
                                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                                        placeholder="Street address, P.O. box, etc."
                                                        className="pl-9 h-11"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label>Description</Label>
                                                <Textarea
                                                    value={formData.description}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                    placeholder="Tell guests what makes your place unique..."
                                                    className="min-h-[120px] resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: AMENITIES */}
                                {step === 2 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {[
                                                { name: "Free Wi-Fi", icon: Wifi },
                                                { name: "Swimming Pool", icon: Waves },
                                                { name: "Gym", icon: Dumbbell },
                                                { name: "Restaurant", icon: Utensils },
                                                { name: "Parking", icon: Car },
                                                { name: "Breakfast", icon: Coffee },
                                                { name: "Room Service", icon: Coffee }, // Reusing coffee for now
                                                { name: "Airport Shuttle", icon: Car },
                                                { name: "Security", icon: ShieldCheck }
                                            ].map(amenity => (
                                                <div
                                                    key={amenity.name}
                                                    onClick={() => toggleAmenity(amenity.name)}
                                                    className={`
                                                        relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 h-32 hover:bg-slate-50
                                                        ${formData.amenities.includes(amenity.name)
                                                            ? 'border-primary bg-primary/5 text-primary shadow-sm hover:bg-primary/10'
                                                            : 'border-slate-100 text-slate-600 hover:border-slate-300'}
                                                    `}
                                                >
                                                    <amenity.icon className={`w-8 h-8 ${formData.amenities.includes(amenity.name) ? 'text-primary' : 'text-slate-400'}`} />
                                                    <span className="font-semibold text-sm text-center">{amenity.name}</span>
                                                    {formData.amenities.includes(amenity.name) && (
                                                        <div className="absolute top-3 right-3">
                                                            <CheckCircle2 className="w-5 h-5 fill-primary text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: PHOTOS */}
                                {step === 3 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="border-3 border-dashed border-primary/20 rounded-2xl p-12 text-center bg-slate-50/50 hover:bg-primary/5 hover:border-primary/50 transition-all cursor-pointer group">
                                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                <Upload className="w-10 h-10 text-primary" />
                                            </div>
                                            <h3 className="font-bold text-xl mb-2 text-slate-800">Drag & Drop photos here</h3>
                                            <p className="text-slate-500 mb-6 max-w-sm mx-auto">Upload high-resolution images. First image will be your cover.</p>
                                            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                                                Browse Files
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="aspect-[4/3] bg-slate-100 rounded-xl relative group overflow-hidden border border-slate-200">
                                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs font-medium">Placeholder {i}</div>
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                        <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full">
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* STEP 4: ROOMS */}
                                {step === 4 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex justify-end">
                                            <Button onClick={addRoom} className="gap-2 shadow-md">
                                                <Plus className="w-4 h-4" /> Add Room Type
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            {formData.rooms.length === 0 ? (
                                                <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                                    <BedDouble className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                                    <p>No room types added yet.</p>
                                                    <p className="text-sm">Click "Add Room Type" to get started.</p>
                                                </div>
                                            ) : (
                                                formData.rooms.map((room, idx) => (
                                                    <div key={idx} className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow relative">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="bg-primary/10 p-2 rounded-lg">
                                                                    <BedDouble className="w-5 h-5 text-primary" />
                                                                </div>
                                                                <span className="font-bold text-lg text-slate-800">Room Type #{idx + 1}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => removeRoom(idx)}
                                                                className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                                            >
                                                                <X className="w-5 h-5" />
                                                            </button>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                            <div className="space-y-2">
                                                                <Label>Room Name</Label>
                                                                <Input
                                                                    value={room.name}
                                                                    onChange={(e) => updateRoom(idx, 'name', e.target.value)}
                                                                    placeholder="e.g. Deluxe Suite"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label>Price per Night ($)</Label>
                                                                <div className="relative">
                                                                    <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                                                                    <Input
                                                                        type="number"
                                                                        value={room.price}
                                                                        onChange={(e) => updateRoom(idx, 'price', e.target.value)}
                                                                        className="pl-7"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label>Capacity</Label>
                                                                <Input
                                                                    type="number"
                                                                    value={room.capacity}
                                                                    onChange={(e) => updateRoom(idx, 'capacity', e.target.value)}
                                                                    placeholder="2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* STEP 5: CONTRACT */}
                                {step === 5 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                                <FileText className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div className="flex-1 text-center md:text-left">
                                                <h4 className="font-bold text-blue-900 text-lg">Partner Agreement</h4>
                                                <p className="text-blue-700 text-sm mt-1">Please download, sign, and upload the partnership agreement to finalize your listing.</p>
                                            </div>
                                            <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                                                Download Template
                                            </Button>
                                        </div>

                                        <div className="border-3 border-dashed border-slate-200 rounded-2xl p-16 text-center hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer">
                                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Upload className="w-10 h-10 text-slate-400" />
                                            </div>
                                            <h3 className="font-bold text-lg mb-1 text-slate-700">Upload Signed PDF</h3>
                                            <p className="text-sm text-slate-400">Supported: PDF, JPG. Max 10MB.</p>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Footer */}
                                <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100">
                                    <Button
                                        variant="ghost"
                                        onClick={handleBack}
                                        disabled={step === 1}
                                        className="text-slate-500 hover:text-slate-900 gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </Button>

                                    {step < 5 ? (
                                        <Button onClick={handleNext} size="lg" className="min-w-[140px] gap-2 shadow-lg shadow-primary/20">
                                            Continue <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleSubmit}
                                            size="lg"
                                            className="min-w-[160px] bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Processing...' : 'Complete Listing'}
                                        </Button>
                                    )}
                                </div>

                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN: Sticky Sidebar (4 cols) */}
                    <div className="hidden lg:block lg:col-span-4 sticky top-28">
                        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden relative">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full pointer-events-none opacity-50"></div>

                            <div className="p-6">
                                <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{sidebarInfo.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">{sidebarInfo.content}</p>

                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        Pro Tip
                                    </p>
                                    <p className="text-sm text-slate-600 italic">"{sidebarInfo.tip}"</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 border-t border-slate-100">
                                <p className="text-xs text-center text-slate-400">Need help? Call our support team 24/7.</p>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-6 flex flex-col gap-3">
                            <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg border border-white/60">
                                <ShieldCheck className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium text-slate-600">Secure Data Transmission</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg border border-white/60">
                                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                <span className="text-sm font-medium text-slate-600">No Hidden Fees</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ListProperty;
