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
        start: 0.6 + (overflowIndex * 0.02),
        end: 0.62 + (overflowIndex * 0.02),
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
    [0.66, 0.7],
    [0, 1]
  );

  return (
    <div className="relative w-full h-full">
      {/* Revenue background (always visible for normal squares) */}
      {!square.isOverflow && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-sm" />
      )}

      {/* Cost overlay (fades in progressively) */}
      {!isRevenue && square.category !== 'overflow' && (
        <motion.div
          style={{ opacity: fillOpacity }}
          className={`absolute inset-0 bg-gradient-to-br ${categoryColors[square.category]} rounded-sm`}
        />
      )}

      {/* Overflow squares - start purple, turn red */}
      {square.isOverflow && (
        <>
          {/* Purple base layer */}
          <motion.div
            style={{ opacity: fillOpacity }}
            className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-500 rounded-sm"
          />
          {/* Red overlay that fades in */}
          <motion.div
            style={{ opacity: overflowRedOpacity }}
            className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-sm border-2 border-red-600 shadow-lg"
          />
        </>
      )}
    </div>
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
  const otherGridLabelOpacity = useTransform(scrollYProgress, [0.62, 0.66], [0, 1]);

  // Grid container shift when overflow appears (includes border)
  const gridContainerX = useTransform(scrollYProgress, [0.64, 0.68], [0, -60]); // Shift entire container left

  // Lateral scroll - push entire grid further left to transition to final scene
  const lateralScrollX = useTransform(scrollYProgress, [0.75, 0.85], [0, -1200]); // Push grid left off screen - FASTER

  // Negative margin scene - slides in from right and stops at center (starts after overflow animation)
  const marginSlideX = useTransform(scrollYProgress, [0.75, 0.85], [1200, 0]); // Slide in from right, stop at center - FASTER
  const marginOpacity = useTransform(scrollYProgress, [0.74, 0.75], [0, 1]); // Appear right before slide-in starts
  const costSummaryOpacity = useTransform(scrollYProgress, [0.72, 0.76], [0, 1]);

  // Highlight progress based on scroll AFTER the card is centered (0.85 to 0.98)
  const highlight1 = useTransform(scrollYProgress, [0.86, 0.88], [0, 1]);
  const highlight2 = useTransform(scrollYProgress, [0.89, 0.91], [0, 1]);
  const highlight3 = useTransform(scrollYProgress, [0.92, 0.94], [0, 1]);
  const highlight4 = useTransform(scrollYProgress, [0.95, 0.97], [0, 1]);

  const squares = generateSquares();

  return (
    <section
      ref={sectionRef}
      className="relative h-[1000vh] bg-background"
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
                <div className="relative rounded-2xl border-2 border-border/60 overflow-visible bg-gradient-to-br from-card/95 via-card to-card shadow-xl p-4">
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
                    className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-500/90 text-white px-3 py-1 rounded-lg shadow-lg z-10 pointer-events-none"
                  >
                    <div className="text-[10px] font-bold">FOOD COSTS</div>
                    <div className="text-lg font-bold text-center">38%</div>
                  </motion.div>

                  <motion.div
                    style={{ opacity: labourGridLabelOpacity }}
                    className="absolute top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500/90 text-white px-3 py-1 rounded-lg shadow-lg z-10 pointer-events-none"
                  >
                    <div className="text-[10px] font-bold">LABOUR</div>
                    <div className="text-lg font-bold text-center">38%</div>
                  </motion.div>

                  <motion.div
                    style={{ opacity: rentGridLabelOpacity }}
                    className="absolute top-[78%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500/90 text-white px-3 py-1 rounded-lg shadow-lg z-10 pointer-events-none"
                  >
                    <div className="text-[10px] font-bold">RENT</div>
                    <div className="text-lg font-bold text-center">18%</div>
                  </motion.div>

                  <motion.div
                    style={{ opacity: otherGridLabelOpacity }}
                    className="absolute bottom-[5%] left-1/2 -translate-x-1/2 bg-purple-500/90 text-white px-2 py-0.5 rounded-lg shadow-lg z-10 pointer-events-none"
                  >
                    <div className="text-[10px] font-bold">OTHER</div>
                    <div className="text-base font-bold text-center">10%</div>
                  </motion.div>

                  {/* Grid wrapper to hold 10x10 + overflow on same row */}
                  <div className="relative">
                    {/* Main 10x10 Grid */}
                    <div className="grid grid-cols-10 gap-1 aspect-square">
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
                    <div className="absolute bottom-0 -right-[41%] grid grid-cols-4 gap-1" style={{ width: '40%' }}>
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
                      opacity: useTransform(scrollYProgress, [0.62, 0.65, 0.68, 0.7], [0, 1, 1, 0])
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
                      opacity: useTransform(scrollYProgress, [0.68, 0.72], [0, 1])
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
                  <div className="group relative bg-gradient-to-br from-white to-red-50 dark:from-neutral-900 dark:to-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-500 hover:-translate-y-1 text-center">
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-20">1</div>
                    <div className="mb-3">
                      <span className="relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500">
                        <motion.span
                          style={{
                            scaleX: highlight1,
                            transformOrigin: "left",
                            display: "inline-block"
                          }}
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500 opacity-40"
                        />
                        <span className="relative z-10 text-lg font-bold text-red-700 dark:text-red-400 px-2 py-1">
                          Rising Costs
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      Exploding costs for labour, food, and rent <span className="text-red-500 font-bold">erase</span> the industry's thin profit margins.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="group relative bg-gradient-to-br from-white to-red-50 dark:from-neutral-900 dark:to-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-500 hover:-translate-y-1 text-center">
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-20">2</div>
                    <div className="mb-3">
                      <span className="relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500">
                        <motion.span
                          style={{
                            scaleX: highlight2,
                            transformOrigin: "left",
                            display: "inline-block"
                          }}
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500 opacity-40"
                        />
                        <span className="relative z-10 text-lg font-bold text-red-700 dark:text-red-400 px-2 py-1">
                          Forced Hikes
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      To survive, operators must <span className="text-red-500 font-bold">raise prices</span>, reduce staff, and cut operating hours.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="group relative bg-gradient-to-br from-white to-red-50 dark:from-neutral-900 dark:to-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-500 hover:-translate-y-1 text-center">
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-20">3</div>
                    <div className="mb-3">
                      <span className="relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500">
                        <motion.span
                          style={{
                            scaleX: highlight3,
                            transformOrigin: "left",
                            display: "inline-block"
                          }}
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500 opacity-40"
                        />
                        <span className="relative z-10 text-lg font-bold text-red-700 dark:text-red-400 px-2 py-1">
                          Customer Retreat
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      Higher prices cause <span className="text-red-500 font-bold">sticker shock</span>, driving customers away from dining out.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="group relative bg-gradient-to-br from-white to-red-50 dark:from-neutral-900 dark:to-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-500 hover:-translate-y-1 text-center">
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-20">4</div>
                    <div className="mb-3">
                      <span className="relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500">
                        <motion.span
                          style={{
                            scaleX: highlight4,
                            transformOrigin: "left",
                            display: "inline-block"
                          }}
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500 opacity-40"
                        />
                        <span className="relative z-10 text-lg font-bold text-red-700 dark:text-red-400 px-2 py-1">
                          The Death Spiral
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      Lower volume forces <span className="text-red-500 font-bold">further hikes</span> on remaining guests, accelerating collapse.
                    </p>
                  </div>
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
