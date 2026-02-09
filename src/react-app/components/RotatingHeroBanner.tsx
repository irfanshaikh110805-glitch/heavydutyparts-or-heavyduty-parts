import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './RotatingHeroBanner.css';

interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  background: string;
  overlay: string;
}

const heroSlides: HeroSlide[] = [
  {
    title: "Premium Excavator Parts",
    subtitle: "High-Quality Components",
    description: "Genuine excavator parts for all major brands. Tracks, buckets, hydraulics, and more with quality guarantee.",
    buttonText: "Shop Excavator Parts",
    background: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&auto=format&fit=crop&q=80",
    overlay: "from-gray-900/80 to-gray-800/60"
  },
  {
    title: "Hydraulic Systems",
    subtitle: "Reliable Performance",
    description: "Complete hydraulic solutions including pumps, cylinders, valves, and accessories for industrial equipment.",
    buttonText: "Browse Hydraulics",
    background: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&auto=format&fit=crop&q=80",
    overlay: "from-blue-900/80 to-blue-800/60"
  },
  {
    title: "Engine Components",
    subtitle: "Power & Efficiency",
    description: "Filters, pistons, gaskets, and engine parts designed for maximum performance and durability.",
    buttonText: "View Engine Parts",
    background: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&auto=format&fit=crop&q=80",
    overlay: "from-orange-900/80 to-orange-800/60"
  }
];

interface RotatingHeroBannerProps {
  onCategorySelect: (category: string) => void;
}

export default function RotatingHeroBanner({ onCategorySelect }: RotatingHeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleCategoryClick = (index: number) => {
    const categoryMap = ['excavator-parts', 'hydraulics', 'engine-components'];
    onCategorySelect(categoryMap[index]);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 brightness-75 hero-background-slide-${currentSlide}`}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-white">
          <div className="max-w-2xl">
            <p className="text-orange-400 font-medium mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">
              {slide.subtitle}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
              {slide.title}
            </h1>
            <p className="text-sm sm:text-base lg:text-xl mb-6 sm:mb-8 text-gray-200 leading-relaxed">
              {slide.description}
            </p>
            <button
              onClick={() => handleCategoryClick(currentSlide)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg transition-colors inline-flex items-center space-x-2 text-sm sm:text-base"
            >
              <span>{slide.buttonText}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 sm:p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 sm:p-2 rounded-full transition-colors"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-orange-500' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
