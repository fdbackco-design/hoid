"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";
import Image from 'next/image';

interface IImageSliderProps {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplayInterval?: number;
  indicatorClassName?: string;
  indicatorContainerClassName?: string;
  currentPageClassName?: string;
  otherPageClassName?: string;
}

interface IImageData {
  src: string;
  width: number;
  height: number;
}

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplayInterval = 3000,
  indicatorClassName,
  indicatorContainerClassName,
  currentPageClassName = "w-[40px] h-[3px] bg-white",
  otherPageClassName = "w-[40px] h-[3px] bg-white/30",
}: IImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<IImageData[]>([]);

  const loadImages = useCallback(async () => {
    try {
      const imagePromises = images.map(async (src) => {
        const img = new window.Image();
        return new Promise<IImageData>((resolve) => {
          img.onload = () => {
            resolve({
              src,
              width: img.width,
              height: img.height
            });
          };
          img.src = src;
        });
      });
      const loadedImageData = await Promise.all(imagePromises);
      setLoadedImages(loadedImageData);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }, [images]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    if (!autoplayInterval) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplayInterval, handleNext]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrevious]);

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      {areImagesLoaded && (
        <div className="relative w-full h-full">
          <div className="relative w-full h-full">
            {loadedImages.map((image, index) => (
              <div
                key={image.src}
                className={`absolute w-full h-full transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image.src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-5">
            {loadedImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  `w-2 h-2 rounded-full transition-colors`,
                  index === currentIndex ? 'bg-blue-400 active' : 'bg-white',
                  indicatorClassName
                )}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};