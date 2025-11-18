'use client';

import React, { useState, useEffect } from "react";
import { Compare } from "@/components/ui/compare";
import { LinkPreview } from "@/components/ui/link-preview";
import { CompactSource } from "@/components/ui/compact-source";
import { ExternalLink, Calendar, TrendingUp } from "lucide-react";

export const CompareDemo = () => {
  const [showAutoplay, setShowAutoplay] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showGlow, setShowGlow] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const compareRef = React.useRef<HTMLDivElement>(null);

  // Easing functions for natural momentum
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInCubic = (t: number) => t * t * t;

  useEffect(() => {
    if (!showAutoplay || isUserInteracting) return;

    const sequence = async () => {
      // Phase 1: Start from 25% and move to 95% with ease-out (natural deceleration)
      const startTime = Date.now();
      const phase1Duration = 1600;

      return new Promise<void>((resolve) => {
        const phase1Interval = setInterval(() => {
          // Stop animation if user starts interacting
          if (isUserInteracting) {
            clearInterval(phase1Interval);
            resolve();
            return;
          }

          const elapsed = Date.now() - startTime;
          if (elapsed >= phase1Duration) {
            setSliderPosition(95);
            clearInterval(phase1Interval);

            // Phase 2: Pause at 95% for 0.8 seconds
            setTimeout(() => {
              if (isUserInteracting) return;

              // Phase 3: Move from 95% to 50% (center) with ease-in-out (natural acceleration and deceleration)
              const phase3Start = Date.now();
              const phase3Duration = 1600;

              const phase3Interval = setInterval(() => {
                if (isUserInteracting) {
                  clearInterval(phase3Interval);
                  return;
                }

                const elapsed = Date.now() - phase3Start;
                const progress = Math.min(elapsed / phase3Duration, 1);

                // Use ease-in-out for smooth acceleration and deceleration
                let easedProgress = progress < 0.5
                  ? 2 * progress * progress
                  : -1 + (4 - 2 * progress) * progress;

                const position = 95 + (50 - 95) * easedProgress;
                setSliderPosition(position);

                if (progress >= 1) {
                  clearInterval(phase3Interval);
                  setSliderPosition(50);
                  setShowGlow(true);
                  setShowAutoplay(false);
                  resolve();
                }
              }, 16);
            }, 800);
          } else {
            const progress = elapsed / phase1Duration;
            // Apply ease-out cubic for natural deceleration on the outward motion
            const easedProgress = easeOutCubic(progress);
            const position = 25 + (95 - 25) * easedProgress;
            setSliderPosition(position);
          }
        }, 16);
      });
    };

    sequence();
  }, [showAutoplay, isUserInteracting]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground tracking-tight">Pho Goodness, Vancouver</h3>
      </div>

      {/* Compare Interface - Menu Card Style */}
      <div className="relative p-6 rounded-2xl shadow-2xl w-full max-w-[660px] mx-auto border-4 border-amber-900/30 bg-amber-50/40">

        {/* Menu card texture overlay */}
        <div className="absolute inset-0 rounded-2xl bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEzOSwgNjksIDkzLCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60 pointer-events-none"></div>

        {/* Hover prompt text at the top with glowing effect */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-40">
          <span
            className={`text-xs font-semibold text-amber-900 pointer-events-none px-3 py-1.5 rounded-full bg-amber-100/40 backdrop-blur-sm border border-amber-900/20 shadow-lg inline-block transition-all duration-300 ${
              showGlow
                ? 'shadow-amber-400/80 bg-amber-100/70 border-amber-400/60'
                : 'shadow-amber-500/20'
            }`}
          >
            ✦ Move your cursor left & right to compare
          </span>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-900/30 rounded-tl-lg"></div>
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-900/30 rounded-tr-lg"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-900/30 rounded-bl-lg"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-900/30 rounded-br-lg"></div>

        <div
          className="relative"
          ref={compareRef}
          onMouseEnter={() => setIsUserInteracting(true)}
          onMouseLeave={() => setIsUserInteracting(false)}
          onTouchStart={() => setIsUserInteracting(true)}
          onTouchEnd={() => setIsUserInteracting(false)}
        >
          <Compare
            firstImage="/images/menu-2015.svg"
            secondImage="/images/menu-2025.svg"
            firstImageClassName="object-contain object-center"
            secondImageClassname="object-contain object-center"
            className="h-[560px] w-full md:h-[700px] md:w-full rounded-lg"
            slideMode="hover"
            showHandlebar={true}
            autoplay={false}
            sliderPercentage={isUserInteracting ? undefined : sliderPosition}
            initialSliderPercentage={50}
            onSliderChange={(percent) => {
              if (isUserInteracting) {
                setSliderPosition(percent);
              }
            }}
          />
        </div>
      </div>

      {/* Price Increase Indicator */}
      <div className="text-center pb-2">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4 text-destructive" />
          <span className="text-sm font-semibold text-destructive">+100% price increase</span>
        </div>
      </div>

      {/* Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* 2015 Card */}
        <LinkPreview
          url="https://web.archive.org/web/20150309061033/http://www.phogoodness.com/menu.html"
          preview={{
            title: "Pho Goodness Menu - Wayback Machine (2015)",
            description: "Archived restaurant menu from March 9, 2015, showing original pho pricing at $8.00-$8.50. Captured via Internet Archive's Wayback Machine.",
            domain: "web.archive.org",
            image: "/images/Pho-Goodness-menu-2015.png"
          }}
        >
          <div className="group block p-3 rounded-lg border border-border bg-[#F4E8C1]/10 hover:bg-[#F4E8C1]/20 transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F4E8C1] border-2 border-[#8B2E1F] flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-foreground text-sm">2015 Menu</span>
                  <span className="text-[10px] text-muted-foreground/70 ml-2">1183 Davie St</span>
                </div>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5" />
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="text-[11px]">March 9, 2015 · Wayback Archive</span>
            </div>
          </div>
        </LinkPreview>

        {/* 2025 Card */}
        <LinkPreview
          url="https://www.phogoodness.com/menu-west-end.html"
          preview={{
            title: "Pho Goodness West End - Current Menu (2025)",
            description: "Current restaurant menu showing pho pricing at $16.00-$17.00. West End location in Downtown Vancouver, BC.",
            domain: "phogoodness.com",
            image: "/images/Pho-Goodness-menu-2025.png"
          }}
        >
          <div className="group block p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-gray-400 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-foreground text-sm">2025 Menu</span>
                  <span className="text-[10px] text-muted-foreground/70 ml-2">1150 Davie St</span>
                </div>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5" />
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="text-[11px]">Current (2025) · (604) 568-3253</span>
            </div>
          </div>
        </LinkPreview>
      </div>

      {/* Context and Attribution */}
      <div className="text-center space-y-2 pt-3">
        <p className="text-sm text-muted-foreground font-medium">The same restaurant, 10 years apart</p>
        <p className="text-[10px] text-muted-foreground/70">
          Data sourced from authentic restaurant menus for journalism purposes
        </p>
      </div>
    </div>
  );
};
