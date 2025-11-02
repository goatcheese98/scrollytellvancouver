'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const BASE_PRICE = 8.5;
const CURRENT_PRICE = 16;

const MENU_IMAGES = {
  baseline: '/images/menu-2015.svg',
  current: '/images/menu-2025.svg',
};

export const CompareDemo = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percent)));
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const rect = e.currentTarget.getBoundingClientRect();
      handleMove(e.clientX, rect);
    },
    [handleMove, isDragging],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const rect = e.currentTarget.getBoundingClientRect();
      handleMove(e.touches[0].clientX, rect);
    },
    [handleMove, isDragging],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      handleMove(e.clientX, rect);
      setIsDragging(true);
    },
    [handleMove],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      handleMove(e.touches[0].clientX, rect);
      setIsDragging(true);
    },
    [handleMove],
  );

  const formattedDifference = useMemo(() => {
    const diff = CURRENT_PRICE - BASE_PRICE;
    return diff.toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative h-[480px] cursor-ew-resize overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-950/90 shadow-[0_35px_90px_-45px_rgba(2,6,23,0.85)] transition-shadow duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={() => setIsDragging(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(248,113,113,0.15),_transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '140px 140px' }}
      />

      {/* 2015 Menu (Left) */}
      <div className="absolute inset-6 rounded-[22px] overflow-hidden ring-1 ring-white/10">
        <Image
          src={MENU_IMAGES.baseline}
          alt="2015 large pho menu price"
          fill
          sizes="(min-width: 1024px) 760px, 90vw"
          className="object-cover pointer-events-none"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/60 to-transparent" />
      </div>

      {/* 2025 Menu (Right Reveal) */}
      <div
        className="absolute inset-6 rounded-[22px] overflow-hidden ring-1 ring-white/10"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <Image
          src={MENU_IMAGES.current}
          alt="2025 large pho menu price"
          fill
          sizes="(min-width: 1024px) 760px, 90vw"
          priority
          className="object-cover pointer-events-none"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/75 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/30" />
      </div>
      <div className="pointer-events-none absolute inset-6 rounded-[22px] border border-white/10" />

      {/* Slider Line & Handle */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-30 w-px bg-gradient-to-b from-transparent via-white to-transparent drop-shadow-[0_0_18px_rgba(255,255,255,0.4)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <motion.div
          initial={false}
          animate={{ scale: isDragging ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center"
        >
          <motion.div
            animate={{ y: isDragging ? -4 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="pointer-events-auto rounded-full border border-white/20 bg-white/90 p-3 shadow-[0_18px_35px_-18px_rgba(2,6,23,0.65)] transition-transform duration-200 ease-out hover:scale-105"
            onMouseDown={(e) => {
              e.preventDefault();
              const rect = containerRef.current?.getBoundingClientRect();
              if (rect) {
                handleMove(e.clientX, rect);
              }
              setIsDragging(true);
            }}
            onTouchStart={(e) => {
              const rect = containerRef.current?.getBoundingClientRect();
              if (rect) {
                handleMove(e.touches[0].clientX, rect);
              }
              setIsDragging(true);
            }}
          >
            <svg
              className="h-6 w-6 text-slate-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </motion.div>
          <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
            {formattedDifference} more today
          </div>
        </motion.div>
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100">
        2015
      </div>
      <div className="pointer-events-none absolute top-6 right-6 inline-flex items-center gap-2 rounded-full border border-rose-300/40 bg-rose-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-rose-100">
        2025
      </div>
    </div>
  );
};
