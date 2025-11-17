'use client';

import { motion } from 'framer-motion';
import { CompareDemo } from '@/components/ui/compare-demo';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export default function Scene1() {
  return (
    <section className="relative bg-background py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Side - Scrolling Content */}
          <div className="space-y-12">

            {/* Section 1: Title and Intro - Always visible */}
            <div className="space-y-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
                2015 → 2025
              </span>
              <h1 className="text-5xl font-semibold leading-tight sm:text-6xl text-foreground">
                The Sticker Shock
              </h1>
            </div>

            {/* All content below title with text generate effect */}
            <div className="space-y-12">
              {/* Section 2: Intro and Context Block - Text Generate Effect */}
              <div className="space-y-4">
                <TextGenerateEffect
                  words="Vancouver's go-to comfort bowl now costs nearly double. Explore how a simple large pho went from an easy weeknight staple to a luxury line item."
                  className="text-lg text-muted-foreground sm:text-xl"
                  duration={0.1}
                />
                <div className="text-lg text-muted-foreground sm:text-xl">
                  <TextGenerateEffect
                    words="In 2015, a large pho was a $8-10 staple that fed families across Vancouver's neighborhoods. By 2025, that same bowl requires the equivalent of a 2015 dinner for two. This isn't just inflation—"
                    className="text-lg text-muted-foreground sm:text-xl inline"
                    duration={0.1}
                    delay={2}
                  />
                  <TextGenerateEffect
                    words="it's a fundamental shift in Vancouver's food accessibility."
                    className="text-lg font-bold inline text-indigo-600 dark:text-indigo-400"
                    duration={0.2}
                    delay={6.5}
                  />
                </div>
              </div>

              {/* Scroll indicator - appears after final text completes */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 8.5 }}
                className="flex flex-col items-center justify-center mt-12"
              >
                <p className="text-sm text-muted-foreground mb-2">Scroll to continue</p>
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
                    width="24"
                    height="24"
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
