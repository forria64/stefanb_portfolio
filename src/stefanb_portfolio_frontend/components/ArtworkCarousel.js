// File: src/stefanb_portfolio_frontend/components/ArtworkCarousel.js
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ArtworkCarousel({ artwork, showArrows = true, loop = true }) {
  const [shuffledArtwork, setShuffledArtwork] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasManualNavigation, setHasManualNavigation] = useState(false);
  const intervalRef = useRef(null);

  // Shuffle the artwork on mount
  useEffect(() => {
    const temp = [...artwork].sort(() => Math.random() - 0.5);
    setShuffledArtwork(temp);
  }, [artwork]);

  // Reset image loaded state when slide changes
  useEffect(() => {
    setIsLoaded(false);
  }, [currentIndex, shuffledArtwork]);

  // Auto-advance (only if no manual navigation has occurred)
  useEffect(() => {
    if (hasManualNavigation) return;
    if (!shuffledArtwork.length) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (loop) {
          return nextIndex % shuffledArtwork.length;
        } else {
          return nextIndex < shuffledArtwork.length ? nextIndex : prev;
        }
      });
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [shuffledArtwork, loop, hasManualNavigation]);

  // Manual navigation
  function goPrev() {
    if (!hasManualNavigation) {
      setHasManualNavigation(true);
      clearInterval(intervalRef.current);
    }
    setCurrentIndex((prev) => {
      if (loop) {
        return (prev - 1 + shuffledArtwork.length) % shuffledArtwork.length;
      } else {
        return prev > 0 ? prev - 1 : prev;
      }
    });
  }

  function goNext() {
    if (!hasManualNavigation) {
      setHasManualNavigation(true);
      clearInterval(intervalRef.current);
    }
    setCurrentIndex((prev) => {
      if (loop) {
        return (prev + 1) % shuffledArtwork.length;
      } else {
        return prev < shuffledArtwork.length - 1 ? prev + 1 : prev;
      }
    });
  }

  if (!shuffledArtwork.length) {
    return (
      <div className="h-full flex items-center justify-center bg-dark-primary text-white">
        No artwork
      </div>
    );
  }

  const item = shuffledArtwork[currentIndex];

  return (
    <div className="relative w-full h-full bg-dark-primary flex flex-col items-center justify-center">
      {/* Slide container: increased height (625px) & moved down by 100px */}
      <div className="relative mt-[200px] w-full max-w-[80vw] md:max-w-[700px] h-[625px] mx-auto flex items-center justify-center overflow-hidden">
        <Image
          src={item.imagePath}
          alt={item.description}
          fill
          sizes="(max-width: 600px) 70vw, (max-width: 1000px) 600px, 600px"
          className={`object-contain transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadingComplete={() => setIsLoaded(true)}
          priority={currentIndex < 2}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-white border-gray-300 rounded-full animate-spin"></div>
            <span className="mt-2 text-white text-sm">Loading...</span>
          </div>
        )}
      </div>

      {/* Description / Info */}
      <div className="text-center p-4 pt-2 pb-0 max-w-2xl">
        <p className="flex flex-wrap items-center justify-center text-sm md:text-base dark:text-gray-300 text-gray-800 font-light tracking-wide">
          {item.category === 'collaborations' && (item.logo || item.url || item.name) && (
            <span className="inline-flex items-center mr-1">
              {item.logo && (
                <Image
                  src={item.logo}
                  alt={item.name || 'collaboration logo'}
                  width={20}
                  height={20}
                  className="inline-block align-middle"
                />
              )}
              {item.url && item.name && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm md:text-base text-accent hover:underline ml-1 align-middle"
                >
                  {item.name}
                </a>
              )}
            </span>
          )}
          {item.description.split('.').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-accent">.</span>}
            </span>
          ))}
          <Link
            href={`/${item.category}/${item.year}`}
            className="inline-block text-sm md:text-base text-accent ml-1 hover:underline"
          >
            .{item.year}
          </Link>
          {item.category === 'paintings' && item.available && (
            <span
              className={`inline-block text-sm md:text-base ml-1 ${
                item.available === 'available' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              ({item.available})
            </span>
          )}
        </p>
      </div>

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            onClick={goPrev}
            className="absolute top-1/2 left-4 bg-dark-secondary rounded-full p-2 transform -translate-y-1/2 hover:bg-dark-tertiary transition-colors"
          >
            <Image src="/left-arrow.png" alt="Previous" width={24} height={24} />
          </button>
          <button
            onClick={goNext}
            className="absolute top-1/2 right-4 bg-dark-secondary rounded-full p-2 transform -translate-y-1/2 hover:bg-dark-tertiary transition-colors"
          >
            <Image src="/right-arrow.png" alt="Next" width={24} height={24} />
          </button>
        </>
      )}
    </div>
  );
}

