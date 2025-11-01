'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import cn from 'classnames';

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample carousel images - replace with your actual images
  const carouselImages = [
    {
      src: '/images/banner.png',
      alt: 'Fashion Collection Banner',
      title: 'New Collection',
      subtitle: 'Discover the latest trends'
    },
    {
      src: '/images/banner3.jpg',
      alt: 'Elegant Dresses',
      title: 'Elegant Dresses',
      subtitle: 'Perfect for every occasion'
    },
    {
      src: '/images/banner2.jpg',
      alt: 'Summer Collection',
      title: 'Summer Vibes',
      subtitle: 'Light and breezy styles'
    },
    {
      src: '/images/banner4.jpg',
      alt: 'Summer Collection',
      title: 'Summer Vibes',
      subtitle: 'Light and breezy styles'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, carouselImages.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl group">
      {/* Main carousel container */}
      <div className="relative w-full aspect-[16/6] md:aspect-[16/6] lg:aspect-[16/6]">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover w-full h-full"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4">
                  <h1 className={cn(
                    "text-4xl md:text-6xl lg:text-7xl font-black mb-4",
                    "animate-fade-in-up",
                    "drop-shadow-lg"
                  )}>
                    {image.title}
                  </h1>
                  <p className={cn(
                    "text-lg md:text-xl lg:text-2xl font-medium mb-8",
                    "animate-fade-in-up animation-delay-300",
                    "drop-shadow-md"
                  )}>
                    {image.subtitle}
                  </p>
                  <button className={cn(
                    "px-8 py-4 rounded-full font-bold text-lg",
                    "bg-white/90 text-gray-900 backdrop-blur-sm",
                    "hover:bg-white hover:scale-105",
                    "transition-all duration-300",
                    "shadow-lg hover:shadow-xl",
                    "animate-fade-in-up animation-delay-500"
                  )}>
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2",
            "w-12 h-12 rounded-full",
            "bg-white/20 backdrop-blur-md",
            "text-white hover:bg-white/30",
            "transition-all duration-300",
            "opacity-0 group-hover:opacity-100",
            "hover:scale-110",
            "border border-white/20",
            "flex items-center justify-center"
          )}
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2",
            "w-12 h-12 rounded-full",
            "bg-white/20 backdrop-blur-md",
            "text-white hover:bg-white/30",
            "transition-all duration-300",
            "opacity-0 group-hover:opacity-100",
            "hover:scale-110",
            "border border-white/20",
            "flex items-center justify-center"
          )}
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/75 hover:scale-110"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress indicators */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {carouselImages.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                index === currentIndex ? "w-8 bg-white" : "w-4 bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Pause/Play indicator */}
      {!isAutoPlaying && (
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          Paused
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
