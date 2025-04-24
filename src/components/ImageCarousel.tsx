import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  src: string;
  title: string;
  description: string;
  alt: string;
}

// Define images directly in this file
const historicalImages: CarouselImage[] = [
  {
    src: "https://marcuswhitmanhotel.com/wp-content/uploads/2024/07/MWH-Homepage-Images-1.png", // Update with your actual image paths
    title: "Marcus Whitman Hotel, 1928",
    description: "Renaissance Revival landmark from 1928 that dominates the downtown skyline.",
    alt: "Historic photograph of the Marcus Whitman Hotel"
  },
  {
    src: "https://www.bakerboyer.com/Images/Locations/main-office-16x9-600px.png", // Update with your actual image paths
    title: "Baker Boyer Bank, 1869",
    description: "Washington's first bank, founded in 1869 with its impressive brick façade.",
    alt: "Baker Boyer Bank building in Walla Walla"
  },
  {
    src: "/heritagesquare.png", // Update with your actual image paths
    title: "Heritage Square",
    description: "Public plaza featuring the 'Odd Fellows Temple' historical display.",
    alt: "Heritage Square in downtown Walla Walla"
  }
];

interface ImageCarouselProps {
  autoPlayInterval?: number; // in milliseconds
  showIndicators?: boolean;
  showArrows?: boolean;
}

export default function ImageCarousel({ 
  autoPlayInterval = 5000, 
  showIndicators = true,
  showArrows = true
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const images = historicalImages; // Use the predefined images

  // Handle automatic slideshow
  useEffect(() => {
    let interval: number | undefined;
    
    if (isPlaying && autoPlayInterval > 0) {
      interval = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoPlayInterval);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, autoPlayInterval, images.length]);

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsPlaying(true);
  };

  if (!images || images.length === 0) {
    return <div className="text-muted-foreground text-center p-8">No images to display</div>;
  }

  return (
    <div 
      className="relative w-full rounded-lg overflow-hidden shadow-md border border-border mb-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image container */}
      <div className="relative h-96 bg-card">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 text-foreground p-4">
              <h3 className="text-lg font-semibold font-serif mb-1">{image.title}</h3>
              <p className="text-sm text-muted-foreground">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 text-foreground p-2 rounded-full transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 text-foreground p-2 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
      
      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-4'
                  : 'bg-primary/50 hover:bg-primary/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}