"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";

interface IImageSliderProps {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplayInterval?: number;
  indicatorClassName?: string;
  indicatorContainerClassName?: string;
  videoUrl?: string;
  slideIntervals?: number[];
  slideLinks?: string[];
  onSlideClick?: (index: number) => void;
  onSlideChange?: (index: number) => void;
}

interface IImageData {
  src: string;
  width: number;
  height: number;
}

interface IVimeoPlayer extends HTMLIFrameElement {
  contentWindow: Window & {
    postMessage: (message: unknown, targetOrigin: string) => void;
  };
}

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplayInterval = 3000,
  indicatorClassName = "w-2 h-2 rounded-full [&.active]:bg-blue-400",
  indicatorContainerClassName = "space-x-[20px] -translate-y-[40px]",
  videoUrl,
  slideIntervals = [17000, 3000, 3000],
  slideLinks = [],
  onSlideClick,
  onSlideChange,
}: IImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<IImageData[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const playerRef = useRef<IVimeoPlayer | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    const newIndex = currentIndex - 1;
    const result = newIndex < 0 ? images.length + (videoUrl ? 0 : -1) : newIndex;
    setCurrentIndex(result);
    onSlideChange?.(result);
  }, [currentIndex, images.length, videoUrl, onSlideChange]);

  const handleNext = useCallback(() => {
    const result = (currentIndex + 1) % (images.length + (videoUrl ? 1 : 0));
    setCurrentIndex(result);
    onSlideChange?.(result);
  }, [currentIndex, images.length, videoUrl, onSlideChange]);

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
    onSlideChange?.(index);
  }, [onSlideChange]);

  const handleSlideClick = () => {
    if (onSlideClick) {
      onSlideClick(currentIndex);
    } else if (slideLinks[currentIndex]) {
      window.open(slideLinks[currentIndex], '_blank');
    }
  };

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    if (!autoplayInterval || isVideoPlaying) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, slideIntervals[currentIndex]);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoplayInterval, handleNext, currentIndex, slideIntervals, isVideoPlaying]);

  useEffect(() => {
    if (!videoUrl || !playerRef.current) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://player.vimeo.com') return;
      
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data.event === 'ended') {
          setIsVideoPlaying(false);
          setTimeout(() => {
            handleNext();
          }, 100);
        } else if (data.event === 'play') {
          setIsVideoPlaying(true);
        }
      } catch (error) {
        console.error('Error parsing Vimeo message:', error);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [videoUrl, handleNext]);

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
          <AnimatePresence mode="wait">
            {currentIndex === 0 && videoUrl ? (
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 cursor-pointer"
                onClick={handleSlideClick}
              >
                <div style={{ padding: '40.625% 0 0 0', position: 'relative' }}>
                  <iframe
                    ref={playerRef}
                    src={videoUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%'
                    }}
                    title="Vimeo Video"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={images[currentIndex - (videoUrl ? 1 : 0)]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 cursor-pointer"
                onClick={handleSlideClick}
              >
                <Image
                  src={images[currentIndex - (videoUrl ? 1 : 0)]}
                  alt={`Slide ${currentIndex}`}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={cn("absolute bottom-4 left-1/2 transform -translate-x-1/2 flex", indicatorContainerClassName)}>
            {videoUrl && (
              <button
                className={cn(
                  `w-2 h-2 rounded-full transition-colors`,
                  currentIndex === 0 ? 'bg-blue-400 active' : 'bg-white',
                  indicatorClassName
                )}
                onClick={() => handleDotClick(0)}
              />
            )}
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  `w-2 h-2 rounded-full transition-colors`,
                  currentIndex === index + (videoUrl ? 1 : 0) ? 'bg-blue-400 active' : 'bg-white',
                  indicatorClassName
                )}
                onClick={() => handleDotClick(index + (videoUrl ? 1 : 0))}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};