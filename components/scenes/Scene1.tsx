'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { CompareDemo } from '@/components/ui/compare-demo';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { CompactSource } from '@/components/ui/compact-source';

export default function Scene1() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative bg-background">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left Side - Scrolling Content */}
            <div className="space-y-20 py-20">

              {/* Section 1: Title and Intro */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
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

              {/* Section 2: Context Block */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-200px" }}
              >
                <TextGenerateEffect
                  words="In 2015, a large pho was a $8-10 staple that fed families across Vancouver's neighborhoods. By 2025, that same bowl requires the equivalent of a 2015 dinner for two."
                  className="text-lg text-muted-foreground"
                  duration={0.25}
                />
                <TextGenerateEffect
                  words="This isn't just inflation—it's a fundamental shift in Vancouver's food accessibility."
                  className="text-lg font-semibold text-foreground pt-4"
                  duration={0.25}
                  delay={1.6}
                />
              </motion.div>

              {/* Section 3: Stats Block */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-200px" }}
              >
                {/* Main stat */}
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: false }}
                  >
                    <p className="text-7xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent leading-none">
                      +100%
                    </p>
                  </motion.div>
                  <p className="text-lg text-muted-foreground font-medium">
                    Price increase in 10 years
                  </p>
                </div>

                {/* Key numbers - Single row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="text-center p-4 rounded-lg bg-card/50 border border-border space-y-2">
                    <p className="text-2xl font-bold text-foreground">1,200+</p>
                    <p className="text-xs text-muted-foreground">Restaurants closed</p>
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
                    <p className="text-2xl font-bold text-foreground">1/week</p>
                    <p className="text-xs text-muted-foreground">Current closure rate</p>
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
                    <p className="text-2xl font-bold text-foreground">75%</p>
                    <p className="text-xs text-muted-foreground">Eating out less</p>
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
                    <p className="text-2xl font-bold text-foreground">41%</p>
                    <p className="text-xs text-muted-foreground">Unprofitable</p>
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
              </motion.div>

            </div>

            {/* Right Side - Menu Comparison (Sticky) */}
            <div className="hidden lg:block relative z-10 pointer-events-auto">
              <div className="sticky top-8 w-full max-w-[720px]">
                <CompareDemo />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll spacer to enable scrolling through all content */}
      <div className="h-[300vh]" />
    </section>
  );
}
