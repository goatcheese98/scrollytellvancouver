'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { AnimatedNumber } from '@/components/ui/animated-number';

export default function Scene3() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Title section
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1, 0.15], [1, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  // Grid visualization
  const gridOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.75, 0.82], [0, 1, 1, 0]);
  const gridScale = useTransform(scrollYProgress, [0.75, 0.82], [1, 1.5]);

  // Revenue (always visible, full grid)
  const revenueOpacity = useTransform(scrollYProgress, [0.12, 0.17], [0, 1]);

  // Food costs - takes 38% of the area
  const foodHeight = useTransform(scrollYProgress, [0.22, 0.3], [0, 38]);

  // Labour - takes another 38%
  const labourHeight = useTransform(scrollYProgress, [0.32, 0.4], [0, 38]);

  // Rent - takes 18%
  const rentHeight = useTransform(scrollYProgress, [0.42, 0.5], [0, 18]);

  // Other - takes 10%
  const otherHeight = useTransform(scrollYProgress, [0.52, 0.6], [0, 10]);

  // Overflow - the extra 4% that breaks the grid
  const overflowHeight = useTransform(scrollYProgress, [0.62, 0.7], [0, 4]);
  const overflowOpacity = useTransform(scrollYProgress, [0.62, 0.65], [0, 1]);

  // Total label
  const totalOpacity = useTransform(scrollYProgress, [0.65, 0.7], [0, 1]);

  // Negative margin zoom
  const marginOpacity = useTransform(scrollYProgress, [0.8, 0.87, 0.95, 1], [0, 1, 1, 1]);
  const marginScale = useTransform(scrollYProgress, [0.8, 0.87], [0.5, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[500vh] bg-background"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
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
              words="When operating costs exceed 100% of revenue, survival becomes impossible. Here's how 41% of B.C. restaurants are losing money."
              className="text-2xl text-muted-foreground text-center max-w-4xl"
              duration={0.5}
            />
          </motion.div>

          {/* Grid-Based Area Visualization */}
          <motion.div
            style={{ opacity: gridOpacity, scale: gridScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full max-w-4xl">
              <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
                Restaurant Cost Breakdown (2025)
              </h3>

              {/* Main Grid Container */}
              <div className="relative">
                {/* Total Costs Label */}
                <motion.div
                  style={{ opacity: totalOpacity }}
                  className="absolute -top-16 left-0 right-0 z-20"
                >
                  <div className="flex items-center justify-between bg-background/90 backdrop-blur-sm border-2 border-border rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-foreground">TOTAL COSTS</div>
                    <div className="flex items-center gap-3">
                      <div className="text-5xl font-bold text-red-500">
                        <AnimatedNumber value={104} suffix="%" />
                      </div>
                      <div className="text-sm text-muted-foreground max-w-xs">
                        Costs exceed revenue by 4%
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Grid visualization - using a 10x10 grid system (100 cells) */}
                <div className="relative border-4 border-border rounded-2xl overflow-visible bg-card p-4">
                  <div className="relative" style={{ height: '600px' }}>

                    {/* Revenue baseline - full grid background */}
                    <motion.div
                      style={{ opacity: revenueOpacity }}
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl overflow-hidden"
                    >
                      <div className="absolute top-8 left-8 z-10">
                        <div className="text-sm font-semibold text-white/80">REVENUE</div>
                        <div className="text-6xl font-bold text-white">100%</div>
                      </div>
                      <motion.div
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                    </motion.div>

                    {/* Food Costs - fills from bottom */}
                    <motion.div
                      style={{
                        height: foodHeight.get() > 0 ? `${foodHeight.get()}%` : '0%',
                      }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-rose-400 to-rose-500 rounded-b-xl transition-all duration-300 ease-out"
                    >
                      {foodHeight.get() > 10 && (
                        <div className="absolute top-4 left-8 right-8 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-white/90">FOOD COSTS</div>
                            <div className="text-xs text-white/70">+36% since 2019</div>
                          </div>
                          <div className="text-4xl font-bold text-white">38%</div>
                        </div>
                      )}
                    </motion.div>

                    {/* Labour - fills above food costs */}
                    <motion.div
                      style={{
                        height: labourHeight.get() > 0 ? `${labourHeight.get()}%` : '0%',
                        bottom: `${foodHeight.get()}%`,
                      }}
                      className="absolute left-0 right-0 bg-gradient-to-br from-orange-400 to-orange-500 transition-all duration-300 ease-out"
                    >
                      {labourHeight.get() > 10 && (
                        <div className="absolute top-4 left-8 right-8 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-white/90">LABOUR</div>
                            <div className="text-xs text-white/70">+70% min wage</div>
                          </div>
                          <div className="text-4xl font-bold text-white">38%</div>
                        </div>
                      )}
                    </motion.div>

                    {/* Rent - fills above labour */}
                    <motion.div
                      style={{
                        height: rentHeight.get() > 0 ? `${rentHeight.get()}%` : '0%',
                        bottom: `${foodHeight.get() + labourHeight.get()}%`,
                      }}
                      className="absolute left-0 right-0 bg-gradient-to-br from-amber-400 to-amber-500 transition-all duration-300 ease-out"
                    >
                      {rentHeight.get() > 8 && (
                        <div className="absolute top-4 left-8 right-8 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-white/90">RENT</div>
                            <div className="text-xs text-white/70">Commercial real estate</div>
                          </div>
                          <div className="text-3xl font-bold text-white">18%</div>
                        </div>
                      )}
                    </motion.div>

                    {/* Other - fills above rent */}
                    <motion.div
                      style={{
                        height: otherHeight.get() > 0 ? `${otherHeight.get()}%` : '0%',
                        bottom: `${foodHeight.get() + labourHeight.get() + rentHeight.get()}%`,
                      }}
                      className="absolute left-0 right-0 bg-gradient-to-br from-purple-400 to-purple-500 transition-all duration-300 ease-out"
                    >
                      {otherHeight.get() > 5 && (
                        <div className="absolute top-3 left-8 right-8 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-semibold text-white/90">OTHER</div>
                            <div className="text-xs text-white/70">Insurance, fees</div>
                          </div>
                          <div className="text-2xl font-bold text-white">10%</div>
                        </div>
                      )}
                    </motion.div>

                    {/* Overflow - breaks out of the grid! */}
                    <motion.div
                      style={{
                        height: overflowHeight.get() > 0 ? `${overflowHeight.get()}%` : '0%',
                        opacity: overflowOpacity,
                        bottom: '100%',
                      }}
                      className="absolute left-0 right-0 bg-gradient-to-br from-red-500 to-red-600 rounded-t-xl border-4 border-red-500 transition-all duration-300 ease-out"
                    >
                      <motion.div
                        animate={{
                          opacity: [0.7, 1, 0.7],
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">OVERFLOW</div>
                          <div className="text-4xl font-bold text-white">+4%</div>
                        </div>
                      </motion.div>
                    </motion.div>

                  </div>
                </div>

                {/* Grid percentage markers */}
                <div className="absolute top-0 -left-16 bottom-0 flex flex-col justify-between text-sm text-muted-foreground font-mono py-4">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
              </div>
            </div>
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
