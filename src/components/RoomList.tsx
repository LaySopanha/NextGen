import { RoomType, MealPlan, mealPlans } from '@/data/hotels';
import { Button } from '@/components/ui/button';
import { Users, Bed, Check, Info } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface RoomListProps {
    rooms: RoomType[];
    onBook: (room: RoomType, mealPlan: MealPlan) => void;
}

const RoomList = ({ rooms, onBook }: RoomListProps) => {
    return (
        <div id="rooms" className="space-y-6">
            <h2 className="text-2xl font-bold">Available Rooms</h2>

            <div className="hidden md:block rounded-xl border border-border overflow-hidden bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[300px]">Room Type</TableHead>
                            <TableHead className="w-[200px]">Benefits</TableHead>
                            <TableHead className="w-[100px]">Sleeps</TableHead>
                            <TableHead className="text-right">Price per night</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rooms.map((room) => (
                            <TableRow key={room.id}>
                                <TableCell className="align-top py-6">
                                    <div className="flex gap-4">
                                        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                                            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base mb-1 text-blue-600 cursor-pointer hover:underline">{room.name}</h3>
                                            <div className="text-xs text-muted-foreground space-y-1">
                                                <div className="flex items-center gap-1"><Bed className="w-3 h-3" /> {room.beds}</div>
                                                <div className="flex items-center gap-1">Size: {room.size} m²</div>
                                                {room.amenities.slice(0, 2).map(a => <div key={a} className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> {a}</div>)}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="align-top py-6">
                                    <div className="space-y-3">
                                        <div className="text-sm">
                                            <span className="font-semibold text-green-600 block mb-1">Free Cancellation</span>
                                            <span className="text-xs text-muted-foreground">Before 24 hours</span>
                                        </div>
                                        <Separator />
                                        <div className="text-sm">
                                            <span className="font-medium block mb-1">Breakfast Included</span>
                                            <span className="text-xs text-muted-foreground block text-green-600 font-medium">Excellent breakfast</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="align-top py-6">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm">x {room.capacity}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="align-top text-right py-6">
                                    <div className="flex flex-col items-end gap-2">
                                        <div>
                                            <span className="block text-2xl font-bold text-blue-600">${room.price}</span>
                                            <span className="text-xs text-muted-foreground">Includes taxes & fees</span>
                                        </div>
                                        <Button onClick={() => onBook(room, mealPlans[1])}>
                                            Select Room
                                        </Button>
                                        <div className="text-xs text-red-500 font-medium">
                                            Only {room.available} left!
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile View (Cards) */}
            <div className="md:hidden space-y-4">
                {rooms.map((room) => (
                    <div key={room.id} className="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
                        <div className="h-48 relative">
                            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-bold">
                                {room.size} m²
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-2">{room.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-1"><Users className="w-4 h-4" /> x{room.capacity}</div>
                                <div className="flex items-center gap-1"><Bed className="w-4 h-4" /> {room.beds}</div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div>
                                    <span className="block text-2xl font-bold text-primary">${room.price}</span>
                                    <span className="text-xs text-muted-foreground">Per night</span>
                                </div>
                                <Button onClick={() => onBook(room, mealPlans[1])}>Select</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomList;
