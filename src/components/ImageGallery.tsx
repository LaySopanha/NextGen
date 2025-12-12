import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageGalleryProps {
  images: string[];
  hotelName: string;
}

const ImageGallery = ({ images, hotelName }: ImageGalleryProps) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set(prev).add(index));
  };

  const getImageSrc = (index: number) => {
    return failedImages.has(index) ? fallbackImage : images[index];
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="relative grid grid-cols-1 gap-2 overflow-hidden rounded-2xl md:grid-cols-4 md:grid-rows-2">
        {/* Main large image */}
        <div
          className="relative col-span-1 row-span-2 aspect-[4/3] cursor-pointer bg-muted md:col-span-2 md:aspect-auto"
          onClick={() => {
            setCurrentIndex(0);
            setShowModal(true);
          }}
        >
          <img
            src={getImageSrc(0)}
            alt={`${hotelName} - Main`}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => handleImageError(0)}
          />
        </div>

        {/* Smaller images */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className={`relative hidden cursor-pointer overflow-hidden bg-muted md:block ${
              index === 3 ? 'relative' : ''
            }`}
            onClick={() => {
              setCurrentIndex(index + 1);
              setShowModal(true);
            }}
          >
            <img
              src={getImageSrc(index + 1)}
              alt={`${hotelName} - ${index + 2}`}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              onError={() => handleImageError(index + 1)}
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/50">
                <span className="text-lg font-semibold text-background">
                  +{images.length - 5} more
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Show all photos button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-4 right-4 gap-2"
          onClick={() => setShowModal(true)}
        >
          <Grid className="h-4 w-4" />
          Show all photos
        </Button>
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-foreground border-0">
          <div className="relative flex h-[90vh] items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 text-background hover:bg-background/20"
              onClick={() => setShowModal(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 z-10 text-background hover:bg-background/20"
              onClick={prevImage}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 z-10 text-background hover:bg-background/20"
              onClick={nextImage}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Image */}
            <img
              src={getImageSrc(currentIndex)}
              alt={`${hotelName} - ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain"
              onError={() => handleImageError(currentIndex)}
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/20 px-4 py-2 text-sm text-background">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
