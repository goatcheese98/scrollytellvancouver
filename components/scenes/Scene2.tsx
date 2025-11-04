'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { AnimatedNumber } from '@/components/ui/animated-number';

export default function Scene2() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Title section
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [1, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -100]);

  // Stats section
  const statsOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const statsY = useTransform(scrollYProgress, [0.3, 0.4], [50, 0]);

  // Quote section
  const quoteOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0]);
  const quoteY = useTransform(scrollYProgress, [0.65, 0.75], [50, 0]);

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

              {/* Title and Context */}
              <motion.div
                style={{ opacity: titleOpacity, y: titleY }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <h2 className="text-5xl font-bold text-foreground mb-6">
                  The Consumer Retreat
                </h2>
                <TextGenerateEffect
                  words="Three in four Canadians are eating out less, with young diners aged 18-34 hit the hardest. The result? A fundamental shift in dining behavior."
                  className="text-xl text-muted-foreground"
                  duration={0.5}
                />
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                style={{ opacity: statsOpacity, y: statsY }}
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full space-y-6">
                  <h3 className="text-2xl font-bold text-foreground mb-6">The Trade-Down Effect</h3>

                  {/* Main stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-2 border-red-500/20 rounded-xl p-6"
                    >
                      <div className="text-4xl font-bold text-red-500 mb-2">
                        <AnimatedNumber value={11} prefix="-" suffix="%" />
                      </div>
                      <div className="text-sm text-foreground font-medium">Full-service spending</div>
                      <div className="text-xs text-muted-foreground mt-1">$1,165 → $1,035</div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/20 rounded-xl p-6"
                    >
                      <div className="text-4xl font-bold text-green-500 mb-2">
                        <AnimatedNumber value={7.6} prefix="+" suffix="%" />
                      </div>
                      <div className="text-sm text-foreground font-medium">QSR lunch traffic</div>
                      <div className="text-xs text-muted-foreground mt-1">Above pre-pandemic</div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-2 border-orange-500/20 rounded-xl p-6"
                    >
                      <div className="text-4xl font-bold text-orange-500 mb-2">
                        <AnimatedNumber value={81} suffix="%" />
                      </div>
                      <div className="text-sm text-foreground font-medium">Young diners cutting back</div>
                      <div className="text-xs text-muted-foreground mt-1">Ages 18-34</div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-2 border-blue-500/20 rounded-xl p-6"
                    >
                      <div className="text-4xl font-bold text-blue-500 mb-2">
                        <AnimatedNumber value={65} suffix="%" />
                      </div>
                      <div className="text-sm text-foreground font-medium">Replace meals with snacks</div>
                      <div className="text-xs text-muted-foreground mt-1">At least monthly</div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-card/50 border border-border rounded-xl p-4 mt-4"
                  >
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Key insight:</span> Diners aren't eating out less—they're trading down from full-service to quick-service restaurants and snacks.
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Closing Quote */}
              <motion.div
                style={{ opacity: quoteOpacity, y: quoteY }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-2 border-purple-500/20 rounded-2xl p-8"
                  >
                    <div className="text-6xl text-purple-500/30 mb-4">"</div>
                    <blockquote className="text-2xl text-foreground font-medium mb-6 leading-relaxed">
                      Millennials and Gen Z remain the most likely to purchase restaurant food at least once a week, but they feel the financial pressure most acutely.
                    </blockquote>
                    <cite className="text-sm text-muted-foreground not-italic font-medium">
                      — Restaurants Canada, 2025 Foodservice Facts Report
                    </cite>
                  </motion.div>
                </div>
              </motion.div>

            </div>

            {/* Right Side - Visualization */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-[600px]"
              >
                {/* Enhanced bar chart */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-foreground mb-6">Who's Cutting Back?</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="text-foreground font-semibold">18-34 year-olds</span>
                        <span className="text-foreground font-bold text-xl">81%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-6 overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '81%' }}
                          viewport={{ once: false }}
                          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                          className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full relative overflow-hidden"
                        >
                          <motion.div
                            animate={{
                              x: ["-100%", "100%"],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          />
                        </motion.div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="text-foreground font-semibold">All Canadians</span>
                        <span className="text-foreground font-bold text-xl">75%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-6 overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '75%' }}
                          viewport={{ once: false }}
                          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full relative overflow-hidden"
                        >
                          <motion.div
                            animate={{
                              x: ["-100%", "100%"],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="text-sm text-muted-foreground text-center">
                      <span className="font-semibold text-foreground">The youngest diners</span> are leading the retreat from restaurants, driven by financial pressure and rising costs.
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
