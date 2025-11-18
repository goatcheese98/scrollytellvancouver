'use client';

import { motion } from 'framer-motion';

export default function Scene2() {
  return (
    <section className="relative bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              Who's Cutting Back?
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                The restaurant price crisis isn't hitting all demographics equally. Young diners aged 18-34—traditionally the most frequent restaurant customers—are leading the retreat, with 81% reporting they've cut back on dining out.
              </p>
              <p className="text-lg text-muted-foreground">
                This generation faces a perfect storm: entry-level wages that haven't kept pace with inflation, student debt burdens, and housing costs that consume ever-larger portions of their income. A $17 pho bowl isn't just expensive—it's a discretionary expense they increasingly can't justify.
              </p>
              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-500 rounded">
                <p className="text-sm text-orange-900 dark:text-orange-200 font-medium">
                  "Millennials and Gen Z remain the most likely to purchase restaurant food at least once a week, but they feel the financial pressure most acutely." — Restaurants Canada, 2025
                </p>
              </div>
              <p className="text-lg text-muted-foreground">
                The data reveals a fundamental shift in dining behavior: younger consumers aren't abandoning restaurants entirely—they're trading down from full-service dining to quick-service options, delivery apps, and even replacing meals with snacks. The restaurant experience is becoming a luxury they reserve for special occasions rather than a regular part of their weekly routine.
              </p>
            </div>
          </div>

          {/* Right Side - Who's Cutting Back Chart */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[600px]">
              <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-foreground mb-8">Dining Out Frequency</h3>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-foreground font-semibold text-lg">18-34 year-olds</span>
                      <span className="text-foreground font-bold text-2xl">81%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-8 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '81%' }}
                        viewport={{ once: true }}
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
                    <p className="text-xs text-muted-foreground mt-2">Cutting back on dining out</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-foreground font-semibold text-lg">All Canadians</span>
                      <span className="text-foreground font-bold text-2xl">75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-8 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '75%' }}
                        viewport={{ once: true }}
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
                    <p className="text-xs text-muted-foreground mt-2">Reducing restaurant visits</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Young diners hit hardest:</span> Entry-level wages haven't kept pace with restaurant price increases
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Behavioral shift:</span> Trading down from full-service to quick-service restaurants
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
