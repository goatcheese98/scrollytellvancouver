'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { AnimatedNumber } from '@/components/ui/animated-number';


// Define cost categories and their ranges
type CostCategory = 'revenue' | 'food' | 'labour' | 'rent' | 'other' | 'overflow';

interface SquareData {
  id: number;
  category: CostCategory;
  isOverflow: boolean;
}

// Helper to determine which category a square belongs to
const getSquareCategory = (index: number): CostCategory => {
  if (index >= 100) return 'overflow';
  if (index < 38) return 'food';
  if (index < 76) return 'labour';
  if (index < 94) return 'rent';
  if (index < 100) return 'other';
  return 'revenue';
};

// Color mapping for each category
const categoryColors = {
  revenue: 'from-emerald-500 to-emerald-600',
  food: 'from-rose-400 to-rose-500',
  labour: 'from-orange-400 to-orange-500',
  rent: 'from-amber-400 to-amber-500',
  other: 'from-purple-400 to-purple-500',
  overflow: 'from-red-500 to-red-600',
};

// Category labels
const categoryLabels = {
  food: { name: 'FOOD COSTS', detail: '+36% since 2019', percent: '38%' },
  labour: { name: 'LABOUR', detail: '+70% min wage', percent: '38%' },
  rent: { name: 'RENT', detail: 'Commercial real estate', percent: '18%' },
  other: { name: 'OTHER', detail: 'Insurance, fees', percent: '10%' },
  overflow: { name: 'OVERFLOW', detail: 'Exceeds revenue', percent: '4%' },
};

// Generate all squares (100 normal + 4 overflow)
const generateSquares = (): SquareData[] => {
  return Array.from({ length: 104 }, (_, i) => ({
    id: i,
    category: getSquareCategory(i),
    isOverflow: i >= 100,
  }));
};

interface GridSquareProps {
  square: SquareData;
  scrollProgress: MotionValue<number>;
  index: number;
}

const GridSquare = ({ square, scrollProgress, index }: GridSquareProps) => {
  // Calculate when this square should fill based on its category
  const getFillTiming = () => {
    if (square.category === 'overflow') {
      // Overflow squares appear later, starting as purple
      const overflowIndex = index - 100;
      return {
        start: 0.60 + (overflowIndex * 0.015),
        end: 0.62 + (overflowIndex * 0.015),
      };
    }

    // Regular squares fill progressively
    return {
      start: 0.2 + (index * 0.004),
      end: 0.22 + (index * 0.004),
    };
  };

  const timing = getFillTiming();
  const fillOpacity = useTransform(
    scrollProgress,
    [timing.start, timing.end],
    [0, 1]
  );

  const isRevenue = square.category === 'revenue';

  const overflowRedOpacity = useTransform(
    scrollProgress,
    [0.64, 0.68],
    [0, 1]
  );

  const dollarOpacity = useTransform(fillOpacity, [0, 0.4], [1, 0]);

  // Overflow squares visibility - only appear when needed
  const overflowVisible = useTransform(
    scrollProgress,
    [0.58, 0.60], // Appear just before they start filling
    [0, 1]
  );

  // Get icon for category
  const getCategoryIcon = (category: CostCategory) => {
    switch (category) {
      case 'food':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-[65%] h-[65%] text-white/95" xmlns="http://www.w3.org/2000/svg">
            {/* Plate */}
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            {/* Fork */}
            <path d="M9 7v8c0 .5.5 1 1 1s1-.5 1-1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 16v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            {/* Knife */}
            <path d="M14 7v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 7v9c0 1-1 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'labour':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-[65%] h-[65%] text-white/95" xmlns="http://www.w3.org/2000/svg">
            {/* Waiter Head */}
            <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
            {/* Body */}
            <path d="M5 19v-4c0-2 1.5-3.5 3.5-3.5H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Arm holding tray */}
            <path d="M11 14.5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Cloche Cover */}
            <path d="M12 14.5a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="2" />
            <path d="M15 11.5v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'rent':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-[65%] h-[65%] text-white/95" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 21V7l8-4 8 4v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 14a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'other':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-[65%] h-[65%] text-white/95" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="relative w-full h-full group"
      style={{ opacity: square.isOverflow ? overflowVisible : 1 }}
    >
      {/* Base slot (always visible for regular squares, controlled for overflow) */}
      <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-sm border border-black/5 dark:border-white/5" />

      {/* Revenue background with CAD Dollar Bill */}
      {!square.isOverflow && (
        <div className="absolute inset-0 bg-emerald-500/20 rounded-sm flex items-center justify-center overflow-hidden">
          <motion.svg
            style={{ opacity: dollarOpacity }}
            viewBox="0 0 40 24"
            fill="none"
            className="w-[85%] h-[85%] text-emerald-600/60 dark:text-emerald-400/60"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bill Border */}
            <rect x="2" y="2" width="36" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
            {/* Inner Border */}
            <rect x="5" y="5" width="30" height="14" rx="1" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
            {/* Center Circle */}
            <circle cx="20" cy="12" r="5" stroke="currentColor" strokeWidth="1" />
            {/* CAD Text */}
            <text x="20" y="13.5" textAnchor="middle" fontSize="5" fontWeight="bold" fill="currentColor" style={{ fontFamily: 'monospace' }}>CAD</text>
            {/* Corner Numbers */}
            <text x="7" y="9" fontSize="3" fontWeight="bold" fill="currentColor">1</text>
            <text x="33" y="19" fontSize="3" fontWeight="bold" fill="currentColor">1</text>
          </motion.svg>
        </div>
      )}

      {/* Cost overlay (fades in progressively) */}
      {!isRevenue && square.category !== 'overflow' && (
        <motion.div
          style={{ opacity: fillOpacity }}
          className={`absolute inset-0 bg-gradient-to-br ${categoryColors[square.category]} rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.2)] flex items-center justify-center`}
        >
          {getCategoryIcon(square.category)}
        </motion.div>
      )}

      {/* Overflow squares - start purple (Other), turn red (Hazard) */}
      {square.isOverflow && (
        <>
          {/* Purple base layer (Other Icon) */}
          <motion.div
            style={{ opacity: fillOpacity }}
            className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-500 rounded-sm shadow-[0_0_8px_rgba(168,85,247,0.4)] flex items-center justify-center"
          >
            {/* Show 'Other' icon initially */}
            <motion.div style={{ opacity: useTransform(overflowRedOpacity, [0, 0.5], [1, 0]) }} className="w-full h-full flex items-center justify-center">
              {getCategoryIcon('other')}
            </motion.div>
          </motion.div>

          {/* Red overlay (Hazard Icon) that fades in */}
          <motion.div
            style={{ opacity: overflowRedOpacity }}
            className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-sm border border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.6)] animate-pulse flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-[60%] h-[60%] text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default function Scene3() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Scale based on viewport height: at 1000px height = 1.0 scale, smaller heights scale down
      const newScale = Math.min(1, window.innerHeight / 1000);
      setScale(newScale);
    };

    handleResize(); // Set initial scale
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Title section
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1, 0.15], [1, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  // Grid container
  const gridOpacity = useTransform(scrollYProgress, [0.15, 0.2], [0, 1]);

  // Revenue label
  const revenueOpacity = useTransform(scrollYProgress, [0.18, 0.22, 0.28, 0.32], [0, 1, 1, 0]);
  const revenueScale = useTransform(scrollYProgress, [0.18, 0.22, 0.28, 0.32], [0.95, 1, 1, 0.9]);
  const revenueY = useTransform(scrollYProgress, [0.18, 0.22, 0.28, 0.32], [40, 0, 0, -40]);

  // Category legend cards persist through overflow transition
  const foodLabelOpacity = useTransform(scrollYProgress, [0.2, 0.24, 1], [0, 1, 1]);
  const labourLabelOpacity = useTransform(scrollYProgress, [0.32, 0.36, 1], [0, 1, 1]);
  const rentLabelOpacity = useTransform(scrollYProgress, [0.44, 0.48, 1], [0, 1, 1]);
  const otherLabelOpacity = useTransform(scrollYProgress, [0.52, 0.56, 1], [0, 1, 1]);

  // In-grid labels (appear when category is complete)
  const foodGridLabelOpacity = useTransform(scrollYProgress, [0.34, 0.38], [0, 1]);
  const labourGridLabelOpacity = useTransform(scrollYProgress, [0.48, 0.52], [0, 1]);
  const rentGridLabelOpacity = useTransform(scrollYProgress, [0.56, 0.6], [0, 1]);
  const otherGridLabelOpacity = useTransform(scrollYProgress, [0.60, 0.64], [0, 1]);

  // Grid container shift when overflow appears (includes border)
  const gridContainerX = useTransform(scrollYProgress, [0.62, 0.66], [0, -60]); // Shift entire container left

  // Lateral scroll - push entire grid further left to transition to final scene
  const lateralScrollX = useTransform(scrollYProgress, [0.66, 0.72], [0, -1200]); // Push grid left off screen

  // Negative margin scene - slides in from right and stops at center (starts after overflow animation)
  const marginSlideX = useTransform(scrollYProgress, [0.66, 0.72], [1200, 0]); // Slide in from right, stop at center
  const marginOpacity = useTransform(scrollYProgress, [0.65, 0.66], [0, 1]); // Appear right before slide-in starts
  const costSummaryOpacity = useTransform(scrollYProgress, [0.62, 0.66], [0, 1]);

  // Highlight progress based on scroll - starts when card becomes visible and continues to end
  // Spread all 4 steps evenly across 0.70-0.89 range, leaving LARGE buffer at end (0.89-1.0)
  // NO FADE OUT - steps stay red
  const highlight1 = useTransform(scrollYProgress, [0.70, 0.74], [0, 1]);
  const highlight2 = useTransform(scrollYProgress, [0.75, 0.79], [0, 1]);
  const highlight3 = useTransform(scrollYProgress, [0.80, 0.84], [0, 1]);
  const highlight4 = useTransform(scrollYProgress, [0.85, 0.89], [0, 1]);

  const squares = generateSquares();

  return (
    <section
      ref={sectionRef}
      className="relative h-[1200vh] bg-background"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6">

          {/* Title Section */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="text-5xl font-bold text-foreground mb-6 text-center">
              The Impossible Math
            </h2>
            <div className="max-w-3xl space-y-4">
              <TextGenerateEffect
                words="The grid below represents 100% of a restaurant's revenue. Each square is 1% of total income."
                className="text-lg text-foreground text-center font-semibold"
                duration={0.25}
              />
              <TextGenerateEffect
                words="Watch as costs progressively fill the grid—consuming all revenue, then overflowing into unsustainable territory."
                className="text-base text-muted-foreground text-center"
                duration={0.25}
                delay={1.25}
              />
            </div>
          </motion.div>

          {/* Grid Visualization */}
          <motion.div
            style={{
              opacity: gridOpacity,
              x: lateralScrollX,
              scale
            }}
            className="absolute inset-0 flex items-center justify-center origin-top"
          >
            <motion.div
              style={{ x: gridContainerX }}
              className="w-full max-w-4xl relative"
            >
              <div className="mb-6 text-center space-y-1">
                <h3 className="text-3xl font-bold text-foreground">
                  Restaurant Cost Breakdown (2025)
                </h3>
                <p className="text-sm text-muted-foreground">
                  100 squares = 100% of revenue
                </p>
              </div>

              {/* Main Grid Container */}
              <div className="relative">
                {/* Percentage scale */}
                <div className="absolute -left-10 top-0 bottom-0 flex flex-col justify-between text-[10px] text-muted-foreground font-mono py-3">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                {/* Bordered container that includes grid + overflow */}
                <div className="relative rounded-3xl border border-white/20 dark:border-white/10 overflow-visible bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-2xl p-8">

                  {/* Header Section moved INSIDE the card */}
                  <div className="mb-8 text-center space-y-2 border-b border-white/10 pb-6">
                    <h3 className="text-3xl font-bold text-foreground tracking-tight">
                      Restaurant Cost Breakdown
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
                      <span className="inline-block w-3 h-3 rounded-sm border border-foreground/20 bg-foreground/5"></span>
                      <span>1 Square</span>
                      <span>=</span>
                      <span>1% of Revenue</span>
                    </div>
                  </div>

                  {/* Revenue Label */}
                  <motion.div
                    style={{ opacity: revenueOpacity, scale: revenueScale, y: revenueY }}
                    className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                  >
                    <div className="pointer-events-auto bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-2xl rounded-2xl px-8 py-4 border border-emerald-400/60 backdrop-blur max-w-lg text-center">
                      <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/80">
                        Revenue Baseline
                      </div>
                      <div className="mt-3 space-y-1">
                        <div className="text-5xl font-bold leading-none">100%</div>
                        <div className="text-xs font-medium text-white/85">
                          Total income before costs are applied
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* In-Grid Category Labels (appear when category completes) */}
                  <motion.div
                    style={{ opacity: foodGridLabelOpacity }}
                    className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-500/90 text-white px-3 py-1 rounded-lg shadow-lg z-10 pointer-events-none backdrop-blur-md border border-white/20"
                  >
                    <div className="text-[10px] font-bold tracking-wider">FOOD COSTS</div>
                    <div className="text-lg font-bold text-center">38%</div>
                  </motion.div>

                  <motion.div
                    style={{ opacity: labourGridLabelOpacity }}
                    className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500/90 text-white px-3 py-1 rounded-lg shadow-lg z-10 pointer-events-none backdrop-blur-md border border-white/20"
                  >
                    <div className="text-[10px] font-bold tracking-wider">LABOUR</div>
                    <div className="text-lg font-bold text-center">38%</div>
                  </motion.div>

                  <motion.div
                    style={{ opacity: rentGridLabelOpacity }}
                    className="absolute top-[78%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500/90 text-white px-3 py-1 rounded-lg shadow-lg z-10 pointer-events-none backdrop-blur-md border border-white/20"
                  >
                    <div className="text-[10px] font-bold tracking-wider">RENT</div>
                    <div className="text-lg font-bold text-center">18%</div>
                  </motion.div>

                  <motion.div
                    style={{ opacity: otherGridLabelOpacity }}
                    className="absolute bottom-[8%] left-1/2 -translate-x-1/2 bg-purple-500/90 text-white px-2 py-0.5 rounded-lg shadow-lg z-10 pointer-events-none backdrop-blur-md border border-white/20"
                  >
                    <div className="text-[10px] font-bold tracking-wider">OTHER</div>
                    <div className="text-base font-bold text-center">10%</div>
                  </motion.div>

                  {/* Grid wrapper to hold 10x10 + overflow on same row */}
                  <div className="relative">
                    {/* Main 10x10 Grid */}
                    <div className="grid grid-cols-10 gap-1.5 aspect-square p-1 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                      {squares.slice(0, 100).map((square, index) => (
                        <GridSquare
                          key={square.id}
                          square={square}
                          scrollProgress={scrollYProgress}
                          index={index}
                        />
                      ))}
                    </div>

                    {/* Overflow squares - positioned on row 10, continuing after the grid */}
                    <div className="absolute bottom-1 -right-[42%] grid grid-cols-4 gap-1.5" style={{ width: '40%' }}>
                      {squares.slice(100, 104).map((square, index) => (
                        <div key={square.id} className="aspect-square w-full">
                          <GridSquare
                            square={square}
                            scrollProgress={scrollYProgress}
                            index={100 + index}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Flow arrow from "other" to overflow */}
                  <motion.div
                    style={{
                      opacity: useTransform(scrollYProgress, [0.60, 0.63, 0.66, 0.68], [0, 1, 1, 0])
                    }}
                    className="absolute bottom-[5%] right-[2%] z-20"
                  >
                    <motion.div
                      animate={{
                        x: [0, 10, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-3xl text-purple-500"
                    >
                      →
                    </motion.div>
                  </motion.div>

                  {/* Overflow label - positioned at the overflow squares on bottom row */}
                  <motion.div
                    style={{
                      opacity: useTransform(scrollYProgress, [0.64, 0.68], [0, 1])
                    }}
                    className="absolute bottom-[5%] -right-24 bg-red-500 text-white px-2 py-1 rounded-lg shadow-lg z-20"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-center"
                    >
                      <div className="text-[10px] font-bold">OVERFLOW</div>
                      <div className="text-lg font-bold">+4%</div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Category Legend & Total Costs */}
          <div className="absolute top-16 right-20 w-48 pointer-events-none z-30">
            <motion.div
              style={{ opacity: foodLabelOpacity }}
              className="relative rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 text-white px-4 py-3 shadow-xl shadow-rose-500/25 backdrop-blur"
            >
              <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/80">
                {categoryLabels.food.name}
              </div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-2xl font-bold">{categoryLabels.food.percent}</span>
                <span className="text-[9px] text-white/70 max-w-[100px] text-right">
                  {categoryLabels.food.detail}
                </span>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: labourLabelOpacity }}
              className="relative -mt-6 ml-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white px-4 py-3 shadow-xl shadow-orange-500/25 backdrop-blur"
            >
              <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/80">
                {categoryLabels.labour.name}
              </div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-2xl font-bold">{categoryLabels.labour.percent}</span>
                <span className="text-[9px] text-white/70 max-w-[100px] text-right">
                  {categoryLabels.labour.detail}
                </span>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: rentLabelOpacity }}
              className="relative -mt-6 ml-8 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white px-4 py-3 shadow-xl shadow-amber-500/25 backdrop-blur"
            >
              <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/80">
                {categoryLabels.rent.name}
              </div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-2xl font-bold">{categoryLabels.rent.percent}</span>
                <span className="text-[9px] text-white/70 max-w-[100px] text-right">
                  {categoryLabels.rent.detail}
                </span>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: otherLabelOpacity }}
              className="relative -mt-6 ml-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white px-4 py-3 shadow-xl shadow-purple-500/25 backdrop-blur"
            >
              <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/80">
                {categoryLabels.other.name}
              </div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-2xl font-bold">{categoryLabels.other.percent}</span>
                <span className="text-[9px] text-white/70 max-w-[100px] text-right">
                  {categoryLabels.other.detail}
                </span>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: costSummaryOpacity }}
              className="relative -mt-6 ml-16 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/15 to-red-500/10 px-4 py-3 text-center shadow-lg shadow-red-500/20 backdrop-blur"
            >
              <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-red-600">
                Total Costs
              </div>
              <div className="mt-3 text-3xl font-bold text-red-500">
                <AnimatedNumber value={104} suffix="%" />
              </div>
              <div className="mt-1 text-[9px] text-red-900/70">
                Exceeds revenue by 4%
              </div>
            </motion.div>
          </div>

          {/* Negative Margin Scene - slides in from right */}
          <motion.div
            style={{ x: marginSlideX, opacity: marginOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full max-w-3xl">
              <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-red-200 dark:border-red-900/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

                <h3 className="text-4xl font-black text-red-600 dark:text-red-500 mb-10 text-center uppercase tracking-widest drop-shadow-sm">
                  The Doom Loop
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {/* Step 1 */}
                  <motion.div
                    style={{
                      boxShadow: useTransform(highlight1, (h1) => {
                        return `0 0 ${h1 * 30}px rgba(239, 68, 68, ${h1 * 0.6})`;
                      })
                    }}
                    className="group relative bg-gradient-to-br from-white to-red-50 dark:from-neutral-900 dark:to-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-500 hover:-translate-y-1 text-center">
                    <motion.div
                      style={{
                        backgroundColor: useTransform(highlight1, [0, 1], ["rgb(107, 114, 128)", "rgb(239, 68, 68)"])
                      }}
                      className="absolute -top-4 -right-4 w-12 h-12 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-20">1</motion.div>
                    <div className="mb-3">
                      <span className="relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40">
                        <motion.span
                          style={{
                            scaleX: highlight1,
                            transformOrigin: "left",
                            display: "inline-block"
                          }}
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-200 to-red-300 dark:from-red-800 dark:to-red-700 opacity-40"
                        />
                        <span className="relative z-10 text-lg font-bold text-red-700 dark:text-red-400 px-2 py-1">
                          Rising Costs
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      Exploding costs for labour, food, and rent <span className="text-red-500 font-bold">erase</span> the industry's thin profit margins.
                    </p>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div
                    style={{
                      boxShadow: useTransform(highlight2, (h2) => {
                        return `0 0 ${h2 * 30}px rgba(239, 68, 68, ${h2 * 0.6})`;
                      })
                    }}
                    className="group relative bg-gradient-to-br from-white to-red-50 dark:from-neutral-900 dark:to-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-500 hover:-translate-y-1 text-center">
                    <motion.div
                      style={{
                        backgroundColor: useTransform(highlight2, [0, 1], ["rgb(107, 114, 128)", "rgb(239, 68, 68)"])
                      }}
                      className="absolute -top-4 -right-4 w-12 h-12 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-20">2</motion.div>
                    <div className="mb-3">
                      <span className="relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40">
                        <motion.span
                          style={{
                            scaleX: highlight2,
                            transformOrigin: "left",
                            display: "inline-block"
                          }}
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-200 to-red-300 dark:from-red-800 dark:to-red-700 opacity-40"
                        />
                        <span className="relative z-10 text-lg font-bold text-red-700 dark:text-red-400 px-2 py-1">
                          Forced Hikes
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      To survive, operators must <span className="text-red-500 font-bold">raise prices</span>, reduce staff, and cut operating hours.
                    </p>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div
                    style={{
                      boxShadow: useTransform(highlight3, (h3) => {
                        return `0 0 ${h3 * 30}px rgba(239, 68, 68, ${h3 * 0.6})`;
                      })
                    }}
                    className="group relative bg-gradient-to-br from-white to-red-50 dark:from-neutral-900 dark:to-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-500 hover:-translate-y-1 text-center">
                    <motion.div
                      style={{
                        backgroundColor: useTransform(highlight3, [0, 1], ["rgb(107, 114, 128)", "rgb(239, 68, 68)"])
                      }}
                      className="absolute -top-4 -right-4 w-12 h-12 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-20">3</motion.div>
                    <div className="mb-3">
                      <span className="relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40">
                        <motion.span
                          style={{
                            scaleX: highlight3,
                            transformOrigin: "left",
                            display: "inline-block"
                          }}
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-200 to-red-300 dark:from-red-800 dark:to-red-700 opacity-40"
                        />
                        <span className="relative z-10 text-lg font-bold text-red-700 dark:text-red-400 px-2 py-1">
                          Customer Retreat
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      Higher prices cause <span className="text-red-500 font-bold">sticker shock</span>, driving customers away from dining out.
                    </p>
                  </motion.div>

                  {/* Step 4 */}
                  <motion.div
                    style={{
                      boxShadow: useTransform(highlight4, [0, 1], ["0 0 0px rgba(239, 68, 68, 0)", "0 0 30px rgba(239, 68, 68, 0.6)"])
                    }}
                    className="group relative bg-gradient-to-br from-white to-red-50 dark:from-neutral-900 dark:to-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-500 hover:-translate-y-1 text-center">
                    <motion.div
                      style={{
                        backgroundColor: useTransform(highlight4, [0, 1], ["rgb(107, 114, 128)", "rgb(239, 68, 68)"])
                      }}
                      className="absolute -top-4 -right-4 w-12 h-12 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-20">4</motion.div>
                    <div className="mb-3">
                      <span className="relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40">
                        <motion.span
                          style={{
                            scaleX: highlight4,
                            transformOrigin: "left",
                            display: "inline-block"
                          }}
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-200 to-red-300 dark:from-red-800 dark:to-red-700 opacity-40"
                        />
                        <span className="relative z-10 text-lg font-bold text-red-700 dark:text-red-400 px-2 py-1">
                          The Death Spiral
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      Lower volume forces <span className="text-red-500 font-bold">further hikes</span> on remaining guests, accelerating collapse.
                    </p>
                  </motion.div>
                </div>

                <div className="mt-10 text-center">
                  <p className="text-red-500/80 italic font-medium text-lg">
                    &ldquo;A vicious cycle where survival tactics only accelerate the end.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
