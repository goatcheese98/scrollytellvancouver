'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CompareDemo } from '@/components/ui/compare-demo';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { CompactSource } from '@/components/ui/compact-source';

export default function Scene1() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Title animation: visible at start, fades out early
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.12], [0, -50]);

  // Context block: appears early, exits mid-way
  const contextOpacity = useTransform(scrollYProgress, [0.12, 0.2, 0.35, 0.42], [0, 1, 1, 0]);
  const contextY = useTransform(scrollYProgress, [0.12, 0.2, 0.35, 0.42], [50, 0, 0, -50]);

  // Stat cards: appear after context exits
  const statsOpacity = useTransform(scrollYProgress, [0.42, 0.5, 0.65, 0.72], [0, 1, 1, 0]);
  const statsY = useTransform(scrollYProgress, [0.42, 0.5], [50, 0]);

  // Final call to action: appears after stats
  const numbersOpacity = useTransform(scrollYProgress, [0.72, 0.8, 0.92, 1], [0, 1, 1, 0]);
  const numbersY = useTransform(scrollYProgress, [0.72, 0.8], [50, 0]);

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
                className="absolute inset-0 flex flex-col justify-center pointer-events-none"
              >
                <div className="pointer-events-auto">
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
                </div>
              </motion.div>

              {/* Context Block - Appears second with text generate effect */}
              <motion.div
                style={{ opacity: contextOpacity, y: contextY }}
                className="absolute inset-0 flex items-center pointer-events-none"
              >
                <div className="rounded-xl border border-border bg-card p-8 max-w-2xl pointer-events-auto">
                  <TextGenerateEffect
                    words="In 2015, a large pho was a $8-10 staple that fed families across Vancouver's neighborhoods. By 2025, that same bowl requires the equivalent of a 2015 dinner for two."
                    className="text-lg text-muted-foreground"
                    duration={0.5}
                  />
                  <TextGenerateEffect
                    words="This isn't just inflation—it's a fundamental shift in Vancouver's food accessibility."
                    className="text-lg font-semibold text-foreground pt-4"
                    duration={0.5}
                    delay={3.2}
                  />
                </div>
              </motion.div>

              {/* Numbers Block - Appears third */}
              <motion.div
                style={{ opacity: statsOpacity, y: statsY }}
                className="absolute inset-0 flex items-center pointer-events-none"
              >
                <div className="space-y-8 w-full max-w-2xl pointer-events-auto">
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
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border space-y-2">
                      <p className="text-3xl font-bold text-foreground">1,200+</p>
                      <p className="text-sm text-muted-foreground mt-1">Restaurants closed</p>
                      <div className="flex justify-center pt-2">
                        <CompactSource
                          url="https://nomsmagazine.com/longtime-vancouver-restaurants-close-2025/"
                          domain="nomsmagazine.com"
                          title="15 Longtime Vancouver Restaurants Locals Lost in 2025"
                          description="Beloved legacy businesses closing in 2025 including Zefferelli's (36 years), Ma Dang Goul (30 years), Solly's Bagels, and many more mid-market restaurants."
                          label="Noms Magazine"
                        />
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border space-y-2">
                      <p className="text-3xl font-bold text-foreground">1/week</p>
                      <p className="text-sm text-muted-foreground mt-1">Current closure rate</p>
                      <div className="flex justify-center pt-2">
                        <CompactSource
                          url="https://do604.com/p/rip-vancouver-2025"
                          domain="do604.com"
                          title="R.I.P Vancouver 2025 - Restaurant Closures Tracker"
                          description="Ongoing documentation of restaurant closures across Vancouver in 2025, showing the accelerating pace of beloved establishments shutting down."
                          label="Do604"
                        />
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border space-y-2">
                      <p className="text-3xl font-bold text-foreground">75%</p>
                      <p className="text-sm text-muted-foreground mt-1">Families eating out less</p>
                      <div className="flex justify-center pt-2">
                        <CompactSource
                          url="https://vancouver.citynews.ca/2025/09/22/restaurants-struggle-as-more-canadians-look-for-value-dine-out-less-report/"
                          domain="citynews.ca"
                          title="Restaurants struggle as more Canadians look for value, dine out less"
                          description="September 2025 Restaurants Canada report found that three in four Canadians (75%) are eating out less, citing the high cost of living as the main reason."
                          label="CityNews"
                        />
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50 border border-border space-y-2">
                      <p className="text-3xl font-bold text-foreground">41%</p>
                      <p className="text-sm text-muted-foreground mt-1">Unprofitable</p>
                      <div className="flex justify-center pt-2">
                        <CompactSource
                          url="https://vancouver.citynews.ca/2025/09/22/restaurants-struggle-as-more-canadians-look-for-value-dine-out-less-report/"
                          domain="citynews.ca"
                          title="41% of B.C. restaurants operating at a loss or break-even"
                          description="As of June 2025, 41% of B.C. restaurants were operating at a loss or merely breaking even, despite raising prices to cover costs."
                          label="CityNews"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Call to action - Appears fourth */}
              <motion.div
                style={{ opacity: numbersOpacity, y: numbersY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="text-center space-y-6 max-w-2xl pointer-events-auto">
                  <TypewriterEffect
                    words={[
                      { text: "What's", className: "text-foreground" },
                      { text: "really", className: "text-foreground" },
                      { text: "happening", className: "text-foreground" },
                      { text: "to", className: "text-foreground" },
                      { text: "Vancouver's", className: "text-foreground" },
                      { text: "restaurant", className: "text-foreground" },
                      { text: "scene?", className: "text-foreground" },
                    ]}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold"
                    cursorClassName="bg-orange-500"
                  />
                  <p className="text-lg text-muted-foreground mt-8">
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
