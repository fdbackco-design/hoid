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
}

interface IMediaData {
  src: string;
  type: 'image' | 'video';
  width?: number;
  height?: number;
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
}: IImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedMedia, setLoadedMedia] = useState<IMediaData[]>([]);

  const loadMedia = useCallback(async () => {
    try {
      const mediaPromises = images.map(async (src) => {
        if (src.endsWith('.mov') || src.endsWith('.mp4')) {
          return {
            src,
            type: 'video' as const
          };
        } else {
          const img = new window.Image();
          return new Promise<IMediaData>((resolve) => {
            img.onload = () => {
              resolve({
                src,
                type: 'image' as const,
                width: img.width,
                height: img.height
              });
            };
            img.src = src;
          });
        }
      });
      const loadedMediaData = await Promise.all(mediaPromises);
      setLoadedMedia(loadedMediaData);
    } catch (error) {
      console.error('Error loading media:', error);
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
    loadMedia();
  }, [loadMedia]);

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

  const areMediaLoaded = loadedMedia.length > 0;

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
      {areMediaLoaded && children}
      {areMediaLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      <div className="relative w-full h-full">
        <div className="relative w-full h-full">
          {loadedMedia.map((media, index) => (
            <div
              key={media.src}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {media.type === 'video' ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop={false}
                  playsInline
                  onEnded={handleNext}
                  style={{ display: index === currentIndex ? 'block' : 'none' }}
                >
                  <source src={media.src} type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={media.src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              )}
            </div>
          ))}
        </div>

        <div className={cn("absolute bottom-4 left-1/2 transform -translate-x-1/2 flex", indicatorContainerClassName)}>
          {loadedMedia.map((_, index) => (
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
    </div>
  );
};