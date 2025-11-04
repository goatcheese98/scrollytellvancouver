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

  // Overflow squares transition from purple to red
  const overflowColorTransition = useTransform(
    scrollProgress,
    [0.66, 0.7],
    [0, 1]
  );

  const isRevenue = square.category === 'revenue';

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
            style={{ opacity: useTransform(
              scrollProgress,
              [0.66, 0.7],
              [0, 1]
            )}}
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
  const gridOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.75, 0.82], [0, 1, 1, 0]);

  // Revenue label
  const revenueOpacity = useTransform(scrollYProgress, [0.18, 0.22], [0, 1]);

  // Category labels (appear when category starts filling, fade out when in-grid labels appear)
  const foodLabelOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.32, 0.36], [0, 1, 1, 0]);
  const labourLabelOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.46, 0.5], [0, 1, 1, 0]);
  const rentLabelOpacity = useTransform(scrollYProgress, [0.48, 0.52, 0.54, 0.58], [0, 1, 1, 0]);
  const otherLabelOpacity = useTransform(scrollYProgress, [0.56, 0.6, 0.6, 0.64], [0, 1, 1, 0]);

  // In-grid labels (appear when category is complete)
  const foodGridLabelOpacity = useTransform(scrollYProgress, [0.34, 0.38], [0, 1]);
  const labourGridLabelOpacity = useTransform(scrollYProgress, [0.48, 0.52], [0, 1]);
  const rentGridLabelOpacity = useTransform(scrollYProgress, [0.56, 0.6], [0, 1]);
  const otherGridLabelOpacity = useTransform(scrollYProgress, [0.62, 0.66], [0, 1]);

  // Total costs label
  const totalOpacity = useTransform(scrollYProgress, [0.68, 0.72], [0, 1]);

  // Grid container shift when overflow appears (includes border)
  const gridContainerX = useTransform(scrollYProgress, [0.64, 0.68], [0, -60]); // Shift entire container left

  // Overflow emphasis - zoom effect focusing on the overflow area on bottom row (no tilt, just zoom)
  const gridScale = useTransform(scrollYProgress, [0.72, 0.8], [1, 4.5]);
  const gridX = useTransform(scrollYProgress, [0.72, 0.8], [0, 320]); // Pan right to overflow squares
  const gridY = useTransform(scrollYProgress, [0.72, 0.8], [0, 320]); // Pan down to bottom row

  // Negative margin zoom
  const marginOpacity = useTransform(scrollYProgress, [0.8, 0.87, 0.95, 1], [0, 1, 1, 1]);
  const marginScale = useTransform(scrollYProgress, [0.8, 0.87], [0.5, 1]);

  const squares = generateSquares();

  return (
    <section
      ref={sectionRef}
      className="relative h-[600vh] bg-background"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden" style={{ perspective: '2000px' }}>
        <div className="container mx-auto max-w-7xl px-6">

          {/* Title Section */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="text-6xl font-bold text-foreground mb-6 text-center">
              The Impossible Math
            </h2>
            <TextGenerateEffect
              words="Watch as costs progressively consume 100% of revenue—then overflow into unsustainable territory."
              className="text-2xl text-muted-foreground text-center max-w-4xl"
              duration={0.5}
            />
          </motion.div>

          {/* Grid Visualization */}
          <motion.div
            style={{
              opacity: gridOpacity,
              scale: gridScale,
              x: gridX,
              y: gridY,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              style={{ x: gridContainerX }}
              className="w-full max-w-4xl relative"
            >
              <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
                Restaurant Cost Breakdown (2025)
              </h3>

              {/* Total Costs Label */}
              <motion.div
                style={{ opacity: totalOpacity }}
                className="absolute -top-16 left-0 right-0 z-30"
              >
                <div className="flex items-center justify-between bg-background/90 backdrop-blur-sm border-2 border-border rounded-xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-foreground">TOTAL COSTS</div>
                  <div className="flex items-center gap-3">
                    <div className="text-5xl font-bold text-red-500">
                      <AnimatedNumber value={104} suffix="%" />
                    </div>
                    <div className="text-sm text-muted-foreground max-w-xs">
                      Exceeds revenue by 4%
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Category Labels - closer to grid */}
              <motion.div
                style={{ opacity: foodLabelOpacity }}
                className="absolute top-32 -right-2 bg-rose-500 text-white px-3 py-2 rounded-lg shadow-lg z-20 text-sm"
              >
                <div className="font-bold">{categoryLabels.food.name}</div>
                <div className="text-xs opacity-90">{categoryLabels.food.detail}</div>
                <div className="text-xl font-bold">{categoryLabels.food.percent}</div>
              </motion.div>

              <motion.div
                style={{ opacity: labourLabelOpacity }}
                className="absolute top-56 -right-2 bg-orange-500 text-white px-3 py-2 rounded-lg shadow-lg z-20 text-sm"
              >
                <div className="font-bold">{categoryLabels.labour.name}</div>
                <div className="text-xs opacity-90">{categoryLabels.labour.detail}</div>
                <div className="text-xl font-bold">{categoryLabels.labour.percent}</div>
              </motion.div>

              <motion.div
                style={{ opacity: rentLabelOpacity }}
                className="absolute bottom-56 -right-2 bg-amber-500 text-white px-3 py-2 rounded-lg shadow-lg z-20 text-sm"
              >
                <div className="font-bold">{categoryLabels.rent.name}</div>
                <div className="text-xs opacity-90">{categoryLabels.rent.detail}</div>
                <div className="text-xl font-bold">{categoryLabels.rent.percent}</div>
              </motion.div>

              <motion.div
                style={{ opacity: otherLabelOpacity }}
                className="absolute bottom-32 -right-2 bg-purple-500 text-white px-3 py-2 rounded-lg shadow-lg z-20 text-sm"
              >
                <div className="font-bold">{categoryLabels.other.name}</div>
                <div className="text-xs opacity-90">{categoryLabels.other.detail}</div>
                <div className="text-xl font-bold">{categoryLabels.other.percent}</div>
              </motion.div>

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
                <div className="relative border-4 border-border rounded-2xl overflow-visible bg-card p-4">
                  {/* Revenue Label */}
                  <motion.div
                    style={{ opacity: revenueOpacity }}
                    className="absolute top-4 left-4 z-10 bg-emerald-600 text-white px-3 py-1 rounded-lg shadow-lg"
                  >
                    <div className="text-xs font-bold">REVENUE</div>
                    <div className="text-2xl font-bold">100%</div>
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

          {/* Negative Margin Zoom */}
          <motion.div
            style={{ opacity: marginOpacity, scale: marginScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full max-w-4xl">
              <motion.div
                initial={{ rotateX: 45 }}
                whileInView={{ rotateX: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-red-500/20 to-red-600/10 border-4 border-red-500/40 rounded-3xl p-12 shadow-2xl"
                style={{ perspective: "1000px" }}
              >
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

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg text-muted-foreground italic"
                  >
                    "When costs exceed revenue, there is no path to sustainability"
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
