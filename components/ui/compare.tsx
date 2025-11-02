'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CompareProps {
  firstImage: string;
  secondImage: string;
  firstImageClassName?: string;
  secondImageClassName?: string;
  className?: string;
  slideMode?: 'hover' | 'drag';
}

export const Compare = ({
  firstImage,
  secondImage,
  firstImageClassName,
  secondImageClassName,
  className,
  slideMode = 'drag',
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setSliderXPercent(Math.max(0, Math.min(100, percent)));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (slideMode === 'drag' && !isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (slideMode === 'drag' && !isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseDown={() => slideMode === 'drag' && setIsDragging(true)}
      onMouseUp={() => slideMode === 'drag' && setIsDragging(false)}
      onMouseLeave={() => slideMode === 'drag' && setIsDragging(false)}
      onTouchMove={handleTouchMove}
      onTouchStart={() => slideMode === 'drag' && setIsDragging(true)}
      onTouchEnd={() => slideMode === 'drag' && setIsDragging(false)}
    >
      {/* First Image (Background) */}
      <div className="absolute inset-0">
        <img
          src={firstImage}
          alt="First"
          className={`w-full h-full object-cover ${firstImageClassName}`}
        />
      </div>

      {/* Second Image (Foreground with clip) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
        }}
      >
        <img
          src={secondImage}
          alt="Second"
          className={`w-full h-full object-cover ${secondImageClassName}`}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderXPercent}%` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
