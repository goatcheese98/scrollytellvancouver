'use client';

import { useRef } from 'react';
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
  const lateralScrollX = useTransform(scrollYProgress, [0.75, 0.92], [0, -1200]); // Push grid left off screen - SLOWER

  // Negative margin scene - slides in from right and stops at center (starts after overflow animation)
  const marginSlideX = useTransform(scrollYProgress, [0.75, 0.92], [1200, 0]); // Slide in from right, stop at center - SLOWER
  const marginOpacity = useTransform(scrollYProgress, [0.74, 0.75], [0, 1]); // Appear right before slide-in starts
  const costSummaryOpacity = useTransform(scrollYProgress, [0.72, 0.76], [0, 1]);
  const costSummaryX = useTransform(scrollYProgress, [0.75, 0.92], [0, -360]);

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
            <h2 className="text-7xl font-bold text-foreground mb-8 text-center">
              The Impossible Math
            </h2>
            <div className="max-w-5xl space-y-6">
              <TextGenerateEffect
                words="The grid below represents 100% of a restaurant's revenue. Each square is 1% of total income."
                className="text-2xl text-foreground text-center font-semibold"
                duration={0.5}
              />
              <TextGenerateEffect
                words="Watch as costs progressively fill the grid—consuming all revenue, then overflowing into unsustainable territory."
                className="text-xl text-muted-foreground text-center"
                duration={0.5}
                delay={2.5}
              />
            </div>
          </motion.div>

          {/* Grid Visualization */}
          <motion.div
            style={{
              opacity: gridOpacity,
              x: lateralScrollX,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              style={{ x: gridContainerX }}
              className="w-full max-w-4xl relative"
            >
              <div className="mb-8 text-center space-y-2">
                <h3 className="text-5xl font-bold text-foreground">
                  Restaurant Cost Breakdown (2025)
                </h3>
                <p className="text-xl text-muted-foreground">
                  100 squares = 100% of revenue
                </p>
              </div>

              {/* Main Grid Container */}
              <div className="relative">
                {/* Percentage scale */}
                <div className="absolute -left-12 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground font-mono py-4">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                {/* Bordered container that includes grid + overflow */}
                <div className="relative rounded-3xl border-2 border-border/60 overflow-visible bg-gradient-to-br from-card/95 via-card to-card shadow-xl p-6">
                  {/* Revenue Label */}
                  <motion.div
                    style={{ opacity: revenueOpacity, scale: revenueScale, y: revenueY }}
                    className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                  >
                    <div className="pointer-events-auto bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-2xl rounded-3xl px-10 py-6 border border-emerald-400/60 backdrop-blur max-w-lg text-center">
                      <div className="text-xs font-semibold tracking-[0.4em] uppercase text-white/80">
                        Revenue Baseline
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="text-7xl font-bold leading-none">100%</div>
                        <div className="text-sm font-medium text-white/85">
                          Total income before costs are applied
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* In-Grid Category Labels (appear when category completes) */}
                  <motion.div
                    style={{ opacity: foodGridLabelOpacity }}
                    className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-500/90 text-white px-4 py-2 rounded-lg shadow-lg z-10 pointer-events-none"
                  >
                    <div className="text-xs font-bold">FOOD COSTS</div>
                    <div className="text-2xl font-bold text-center">38%</div>
                  </motion.div>

                  <motion.div
                    style={{ opacity: labourGridLabelOpacity }}
                    className="absolute top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500/90 text-white px-4 py-2 rounded-lg shadow-lg z-10 pointer-events-none"
                  >
                    <div className="text-xs font-bold">LABOUR</div>
                    <div className="text-2xl font-bold text-center">38%</div>
                  </motion.div>

                  <motion.div
                    style={{ opacity: rentGridLabelOpacity }}
                    className="absolute top-[78%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500/90 text-white px-4 py-2 rounded-lg shadow-lg z-10 pointer-events-none"
                  >
                    <div className="text-xs font-bold">RENT</div>
                    <div className="text-2xl font-bold text-center">18%</div>
                  </motion.div>

                  <motion.div
                    style={{ opacity: otherGridLabelOpacity }}
                    className="absolute bottom-[5%] left-1/2 -translate-x-1/2 bg-purple-500/90 text-white px-3 py-1 rounded-lg shadow-lg z-10 pointer-events-none"
                  >
                    <div className="text-xs font-bold">OTHER</div>
                    <div className="text-xl font-bold text-center">10%</div>
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
                      className="text-5xl text-purple-500"
                    >
                      →
                    </motion.div>
                  </motion.div>

                  {/* Overflow label - positioned at the overflow squares on bottom row */}
                  <motion.div
                    style={{
                      opacity: useTransform(scrollYProgress, [0.68, 0.72], [0, 1])
                    }}
                    className="absolute bottom-[5%] -right-32 bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg z-20"
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
                      <div className="text-xs font-bold">OVERFLOW</div>
                      <div className="text-2xl font-bold">+4%</div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
          </motion.div>
        </motion.div>

        {/* Category Legend & Total Costs */}
        <div className="absolute top-20 right-32 w-60 pointer-events-none z-30">
          <motion.div
            style={{ opacity: foodLabelOpacity }}
            className="relative rounded-3xl bg-gradient-to-br from-rose-500 to-rose-600 text-white px-6 py-5 shadow-xl shadow-rose-500/25 backdrop-blur"
          >
            <div className="text-xs font-semibold tracking-[0.35em] uppercase text-white/80">
              {categoryLabels.food.name}
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-bold">{categoryLabels.food.percent}</span>
              <span className="text-[11px] text-white/70 max-w-[140px] text-right">
                {categoryLabels.food.detail}
              </span>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: labourLabelOpacity }}
            className="relative -mt-8 ml-6 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 text-white px-6 py-5 shadow-xl shadow-orange-500/25 backdrop-blur"
          >
            <div className="text-xs font-semibold tracking-[0.35em] uppercase text-white/80">
              {categoryLabels.labour.name}
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-bold">{categoryLabels.labour.percent}</span>
              <span className="text-[11px] text-white/70 max-w-[140px] text-right">
                {categoryLabels.labour.detail}
              </span>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: rentLabelOpacity }}
            className="relative -mt-8 ml-12 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 text-white px-6 py-5 shadow-xl shadow-amber-500/25 backdrop-blur"
          >
            <div className="text-xs font-semibold tracking-[0.35em] uppercase text-white/80">
              {categoryLabels.rent.name}
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-bold">{categoryLabels.rent.percent}</span>
              <span className="text-[11px] text-white/70 max-w-[140px] text-right">
                {categoryLabels.rent.detail}
              </span>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: otherLabelOpacity }}
            className="relative -mt-8 ml-16 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 text-white px-6 py-5 shadow-xl shadow-purple-500/25 backdrop-blur"
          >
            <div className="text-xs font-semibold tracking-[0.35em] uppercase text-white/80">
              {categoryLabels.other.name}
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-bold">{categoryLabels.other.percent}</span>
              <span className="text-[11px] text-white/70 max-w-[140px] text-right">
                {categoryLabels.other.detail}
              </span>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: costSummaryOpacity, x: costSummaryX }}
            className="relative mt-6 ml-16 rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/15 to-red-500/10 px-6 py-5 text-center shadow-lg shadow-red-500/20 backdrop-blur"
          >
            <div className="text-xs font-semibold tracking-[0.35em] uppercase text-red-600">
              Total Costs
            </div>
            <div className="mt-4 text-4xl font-bold text-red-500">
              <AnimatedNumber value={104} suffix="%" />
            </div>
            <div className="mt-1 text-xs text-red-900/70">
              Exceeds revenue by 4%
            </div>
          </motion.div>
        </div>

        {/* Negative Margin Scene - slides in from right */}
        <motion.div
          style={{ x: marginSlideX, opacity: marginOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full max-w-4xl">
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border-4 border-red-500/40 rounded-3xl p-12 shadow-2xl">
                <div className="text-center space-y-6">
                  <div>
                    <div className="text-2xl font-semibold text-muted-foreground mb-2">
                      Net Margin
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-9xl font-bold text-red-500"
                    >
                      <AnimatedNumber value={-4} suffix="%" />
                    </motion.div>
                  </div>

                  <div className="border-t-2 border-red-500/30 pt-6">
                    <div className="text-xl text-foreground mb-4 font-semibold">
                      The Unsustainable Reality
                    </div>
                    <div className="grid grid-cols-2 gap-6 text-left">
                      <div className="bg-background/50 rounded-lg p-4">
                        <div className="text-4xl font-bold text-red-500 mb-2">
                          <AnimatedNumber value={41} suffix="%" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          of B.C. restaurants operate at a loss or break even
                        </div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-4">
                        <div className="text-4xl font-bold text-red-500 mb-2">
                          <AnimatedNumber value={1200} suffix="+" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          restaurants closed in Vancouver (2015-2025)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-lg text-muted-foreground italic">
                    &ldquo;When costs exceed revenue, there is no path to sustainability&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
