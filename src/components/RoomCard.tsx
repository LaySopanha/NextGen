import { useState } from 'react';
import { Users, Maximize, Bed, Check, Coffee, UtensilsCrossed } from 'lucide-react';
import { RoomType, mealPlans, MealPlan } from '@/data/hotels';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RoomCardProps {
  room: RoomType;
  onSelect: (room: RoomType, mealPlan: MealPlan) => void;
}

const RoomCard = ({ room, onSelect }: RoomCardProps) => {
  const [selectedMealPlan, setSelectedMealPlan] = useState<string>('room-only');
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const currentMealPlan = mealPlans.find(m => m.id === selectedMealPlan) || mealPlans[0];
  const totalPrice = room.price + currentMealPlan.pricePerNight;

  const fallbackImage = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800';

  const getMealIcon = (mealId: string) => {
    switch (mealId) {
      case 'breakfast':
        return <Coffee className="h-4 w-4" />;
      case 'half-board':
      case 'full-board':
        return <UtensilsCrossed className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-medium md:flex-row">
      {/* Room Image */}
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted md:aspect-[4/3] md:w-48">
        <img
          src={imageError ? fallbackImage : room.image}
          alt={room.name}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>

      {/* Room Details */}
      <div className="flex flex-1 flex-col">
        <div className="mb-2">
          <h4 className="text-lg font-semibold text-foreground">{room.name}</h4>
        </div>

        {/* Room Info */}
        <div className="mb-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Up to {room.capacity} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{room.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{room.size} m²</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4 flex flex-wrap gap-2">
          {room.amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-1 text-xs text-muted-foreground">
              <Check className="h-3 w-3 text-turquoise" />
              <span>{amenity}</span>
            </div>
          ))}
        </div>

        {/* Meal Plan Selection */}
        <div className="mb-4 rounded-lg bg-muted/50 p-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full items-center justify-between text-sm font-medium text-foreground"
          >
            <div className="flex items-center gap-2">
              {getMealIcon(selectedMealPlan)}
              <span>{currentMealPlan.name}</span>
              {currentMealPlan.pricePerNight > 0 && (
                <span className="text-primary">+${currentMealPlan.pricePerNight}/night</span>
              )}
            </div>
            <span className="text-muted-foreground">{isExpanded ? '▲' : '▼'}</span>
          </button>

          {isExpanded && (
            <RadioGroup
              value={selectedMealPlan}
              onValueChange={setSelectedMealPlan}
              className="mt-3 space-y-2"
            >
              {mealPlans.map((plan) => (
                <div key={plan.id} className="flex items-center justify-between rounded-md border border-border bg-background p-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value={plan.id} id={`${room.id}-${plan.id}`} />
                    <Label htmlFor={`${room.id}-${plan.id}`} className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        {getMealIcon(plan.id)}
                        <div>
                          <p className="text-sm font-medium">{plan.name}</p>
                          <p className="text-xs text-muted-foreground">{plan.description}</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {plan.pricePerNight === 0 ? 'Included' : `+$${plan.pricePerNight}/night`}
                  </span>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* Price and Book */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
                <span className="text-xs text-slate-500 font-medium">៛{(totalPrice * 4100).toLocaleString()}</span>
              </div>
              <span className="text-xs text-gray-500">per night</span>
              <p className="text-[10px] text-gray-400">Includes taxes & fees</p>
              <Button onClick={() => onSelect(room, currentMealPlan)} className="mt-2 w-full font-bold">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
