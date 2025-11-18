'use client';

import { motion } from 'framer-motion';
import { CompareDemo } from '@/components/ui/compare-demo';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { CompactSource } from '@/components/ui/compact-source';

export default function Scene1() {
  return (
    <section className="relative bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left Side - Scrolling Content */}
          <div className="space-y-6 md:space-y-8">

            {/* Section 1: Title and Intro - Always visible */}
            <div className="space-y-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
                2015 → 2025
              </span>
              <TextGenerateEffect
                words="The Sticker Shock"
                className="text-4xl font-semibold leading-tight sm:text-5xl text-foreground"
                duration={0.5}
              />
            </div>

            {/* All content below title */}
            <div className="space-y-6">
              {/* Restaurant Storefront Photo - Appears after title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="relative rounded-xl overflow-hidden border-2 border-border shadow-lg"
              >
                <img
                  src="/images/pho-goodness-storefront.jpg"
                  alt="Pho Goodness Vietnamese Restaurant storefront on Davie Street, Vancouver"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3">
                  <p className="text-white text-xs md:text-sm font-medium">
                    Pho Goodness on Davie Street — it's a fundamental shift in Vancouver's food accessibility.
                  </p>
                </div>
              </motion.div>

              {/* Original intro text - Appears 0.5s after image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.6 }}
                className="space-y-4"
              >
                <p className="text-base text-muted-foreground md:text-lg">
                  Vancouver's go-to comfort bowl now costs nearly double. Explore how a simple large pho went from an easy weeknight staple to a luxury line item.
                </p>
                <p className="text-base text-muted-foreground md:text-lg">
                  In 2015, a large pho was a $8-10 staple that fed families across Vancouver's neighborhoods. By 2025, that same bowl requires the equivalent of a 2015 dinner for two. This isn't just inflation—<span className="font-bold text-indigo-600 dark:text-indigo-400">it's a fundamental shift in Vancouver's food accessibility.</span>
                </p>
                <p className="text-base text-muted-foreground md:text-lg">
                  A 100% price increase in just 10 years has pushed Vancouver's restaurant industry to a critical threshold. What was once an $8.50 comfort meal now costs $17.00—doubling faster than wages, rent, or nearly any other living expense.
                </p>
                <p className="text-base text-muted-foreground md:text-lg">
                  This isn't just about one restaurant. Across Vancouver, over 1,200 establishments have closed their doors since 2020, with the pace accelerating to roughly one closure per week in 2025.
                </p>
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded">
                  <p className="text-sm text-red-900 dark:text-red-200 font-medium">
                    41% of BC restaurants are now operating at a loss or break-even, while 75% of Canadians report eating out less due to high costs.
                  </p>
                </div>
                <p className="text-base text-muted-foreground md:text-lg">
                  The math is simple and brutal: when costs rise faster than customers can afford, something has to give. For many beloved Vancouver institutions, that breaking point has already arrived.
                </p>
              </motion.div>

              {/* +100% Price increase - Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.2 }}
                className="text-center space-y-3 py-6"
              >
                <p className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent leading-none">
                  +100%
                </p>
                <p className="text-lg md:text-xl text-muted-foreground font-semibold">
                  Price increase in 10 years
                </p>
                <p className="text-sm text-muted-foreground">
                  Pho Dac Biet: $8.50 (2015) → $17.00 (2025)
                </p>
              </motion.div>

              {/* 4 Statistical Cards - Appears after +100% */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.8 }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="text-center p-4 rounded-xl bg-card border-2 border-border space-y-2 hover:border-red-500/50 transition-colors">
                  <p className="text-2xl md:text-3xl font-bold text-red-500">1,200+</p>
                  <p className="text-xs font-medium text-foreground">Restaurants Closed</p>
                  <p className="text-[10px] text-muted-foreground">Since 2020</p>
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
                <div className="text-center p-4 rounded-xl bg-card border-2 border-border space-y-2 hover:border-orange-500/50 transition-colors">
                  <p className="text-2xl md:text-3xl font-bold text-orange-500">1/week</p>
                  <p className="text-xs font-medium text-foreground">Closure Rate</p>
                  <p className="text-[10px] text-muted-foreground">Current pace (2025)</p>
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
                <div className="text-center p-4 rounded-xl bg-card border-2 border-border space-y-2 hover:border-blue-500/50 transition-colors">
                  <p className="text-2xl md:text-3xl font-bold text-blue-500">75%</p>
                  <p className="text-xs font-medium text-foreground">Eating Out Less</p>
                  <p className="text-[10px] text-muted-foreground">All Canadians</p>
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
                <div className="text-center p-4 rounded-xl bg-card border-2 border-border space-y-2 hover:border-purple-500/50 transition-colors">
                  <p className="text-2xl md:text-3xl font-bold text-purple-500">41%</p>
                  <p className="text-xs font-medium text-foreground">Unprofitable</p>
                  <p className="text-[10px] text-muted-foreground">BC restaurants</p>
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
              </motion.div>

              {/* Scroll indicator - at the very bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center justify-center mt-12"
              >
                <p className="text-xs text-muted-foreground mb-2">Scroll to continue</p>
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-muted-foreground"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </motion.div>
              </motion.div>
            </div>

          </div>

          {/* Right Side - Menu Comparison (Sticky) */}
          <div className="hidden lg:block">
            <div className="sticky top-8 w-full max-w-[720px]">
              <CompareDemo />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
