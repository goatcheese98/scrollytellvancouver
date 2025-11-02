'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CompareDemo } from '@/components/ui/compare-demo';
import { TypingText } from '@/components/ui/typing-text';

export default function Scene1() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Title animation: visible at start, fades out early
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Context block: appears early, exits mid-way
  const contextOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [0, 1, 1, 0]);
  const contextY = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [50, 0, 0, -50]);

  // Stat cards: appear after context exits
  const statsOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.85, 0.95], [0, 1, 1, 0]);
  const statsY = useTransform(scrollYProgress, [0.45, 0.55], [50, 0]);

  // Numbers block: appears after stats
  const numbersOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0]);
  const numbersY = useTransform(scrollYProgress, [0.65, 0.75], [50, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh] bg-background"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Side - Dynamic Content */}
            <div className="relative h-[600px]">

              {/* Title - Appears first, fades out */}
              <motion.div
                style={{ opacity: titleOpacity, y: titleY }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
                  2015 → 2025
                </span>
                <h1 className="text-5xl font-semibold leading-tight sm:text-6xl text-foreground mb-6">
                  The Sticker Shock
                </h1>
                <p className="text-lg text-muted-foreground sm:text-xl max-w-xl">
                  Vancouver&apos;s go-to comfort bowl now costs nearly double. Explore how a simple large pho went from an easy
                  weeknight staple to a luxury line item.
                </p>
              </motion.div>

              {/* Context Block - Appears second with typing effect */}
              <motion.div
                style={{ opacity: contextOpacity, y: contextY }}
                className="absolute inset-0 flex items-center"
              >
                <div className="rounded-xl border border-border bg-card p-8 max-w-2xl">
                  <div className="mb-3 text-4xl">💡</div>
                  <h3 className="mb-4 text-2xl font-semibold text-foreground">CONTEXT</h3>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    <TypingText
                      text="In 2015, a large pho was a $8-10 staple that fed families across Vancouver's neighborhoods. By 2025, that same bowl requires the equivalent of a 2015 dinner for two."
                      delay={0.5}
                      speed={0.02}
                    />
                    <p className="font-semibold text-foreground pt-4">
                      This isn&apos;t just inflation—it&apos;s a fundamental shift in Vancouver&apos;s food accessibility.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Numbers Block - Appears third */}
              <motion.div
                style={{ opacity: statsOpacity, y: statsY }}
                className="absolute inset-0 flex items-center"
              >
                <div className="space-y-8 w-full max-w-2xl">
                  {/* Main stat */}
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    >
                      <p className="text-8xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent leading-none">
                        +100%
                      </p>
                    </motion.div>
                    <p className="text-xl text-muted-foreground font-medium">
                      Price increase in 10 years
                    </p>
                  </div>

                  {/* Key numbers grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border">
                      <p className="text-3xl font-bold text-foreground">1,200+</p>
                      <p className="text-sm text-muted-foreground mt-1">Restaurants closed</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border">
                      <p className="text-3xl font-bold text-foreground">1/week</p>
                      <p className="text-sm text-muted-foreground mt-1">Current closure rate</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border">
                      <p className="text-3xl font-bold text-foreground">75%</p>
                      <p className="text-sm text-muted-foreground mt-1">Families eating out less</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border">
                      <p className="text-3xl font-bold text-foreground">~0</p>
                      <p className="text-sm text-muted-foreground mt-1">Mid-market options left</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Call to action - Appears fourth */}
              <motion.div
                style={{ opacity: numbersOpacity, y: numbersY }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center space-y-6 max-w-2xl">
                  <h3 className="text-4xl font-bold text-foreground leading-tight">
                    What&apos;s really happening to<br />Vancouver&apos;s restaurant scene?
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Continue scrolling to investigate
                  </p>
                  <div className="flex items-center justify-center">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-3xl"
                    >
                      ↓
                    </motion.div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right Side - Menu Comparison (Always Visible) */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[720px]">
                <CompareDemo />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
