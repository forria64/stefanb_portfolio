// File: src/stefanb_portfolio_frontend/components/ArtworkCarousel.js
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ArtworkCarousel({ artwork, showArrows = true }) {
  // Always loop
  const loop = true;
  const [shuffledArtwork, setShuffledArtwork] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasManualNavigation, setHasManualNavigation] = useState(false);

  // Arrow hover states
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);

  const intervalRef = useRef(null);

  // Shuffle artwork on mount
  useEffect(() => {
    const temp = [...artwork].sort(() => Math.random() - 0.5);
    setShuffledArtwork(temp);
  }, [artwork]);

  // Reset image loaded state when slide changes
  useEffect(() => {
    setIsLoaded(false);
  }, [currentIndex, shuffledArtwork]);

  // Auto-advance if no manual navigation has occurred
  useEffect(() => {
    if (hasManualNavigation) return;
    if (!shuffledArtwork.length) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledArtwork.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [shuffledArtwork, hasManualNavigation]);

  function goPrev() {
    if (!hasManualNavigation) {
      setHasManualNavigation(true);
      clearInterval(intervalRef.current);
    }
    setCurrentIndex((prev) => (prev - 1 + shuffledArtwork.length) % shuffledArtwork.length);
  }

  function goNext() {
    if (!hasManualNavigation) {
      setHasManualNavigation(true);
      clearInterval(intervalRef.current);
    }
    setCurrentIndex((prev) => (prev + 1) % shuffledArtwork.length);
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
    // Outer container fixed so the carousel stays centered
    <div className="fixed inset-0 bg-dark-primary flex items-center justify-center md:mt-[100px] mt-[0px]">
      <div className="w-full px-4">
        <div className="flex items-center justify-center">
          {/* Left arrow container */}
          <div className="flex-1 flex justify-center">
            {showArrows && (
              <button
                onClick={goPrev}
                onMouseEnter={() => setLeftHover(true)}
                onMouseLeave={() => setLeftHover(false)}
                className="p-0 bg-transparent border-none outline-none"
              >
                <Image
                  src={leftHover ? '/left-arrow_hover.png' : '/left-arrow.png'}
                  alt="Previous"
                  width={20}
                  height={20}
                  className="block"
                />
              </button>
            )}
          </div>

          {/* Image container – force a smaller width on mobile */}
          <div className="relative w-[calc(100%-80px)] md:max-w-[700px] h-[400px] md:h-[600px] mx-auto">
            <Image
              src={item.imagePath}
              alt={item.description}
              fill
              sizes="(max-width: 600px) 70vw, (max-width: 1000px) 600px, 600px"
              className={`object-contain object-center transition-opacity duration-500 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadingComplete={() => setIsLoaded(true)}
              priority={currentIndex < 2}
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-t-white border-gray-300 rounded-full animate-spin" />
                <span className="mt-2 text-white text-base">Loading...</span>
              </div>
            )}
          </div>

          {/* Right arrow container */}
          <div className="flex-1 flex justify-center">
            {showArrows && (
              <button
                onClick={goNext}
                onMouseEnter={() => setRightHover(true)}
                onMouseLeave={() => setRightHover(false)}
                className="p-0 bg-transparent border-none outline-none"
              >
                <Image
                  src={rightHover ? '/right-arrow_hover.png' : '/right-arrow.png'}
                  alt="Next"
                  width={20}
                  height={20}
                  className="block"
                />
              </button>
            )}
          </div>
        </div>

        {/* Description container with fixed height and narrower width */}
        <div className="text-center mt-8 md:mt-4 h-24 md:h-24 overflow-y-auto">
          <p className="mx-auto max-w-[500px] flex flex-wrap items-center justify-center text-base dark:text-gray-300 text-gray-800 font-light tracking-wide">
            {item.category === 'collaborations' &&
              (item.logo || item.url || item.name) && (
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
                      className="inline-block text-base text-accent hover:underline ml-1 align-middle"
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
              className="inline-block text-base text-accent ml-1 hover:underline"
            >
              .{item.year}
            </Link>
            {item.category === 'paintings' && item.available && (
              <span className="inline-block text-base ml-1 text-green-500">
                ({item.available})
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

