'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Scene3() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="w-full">
          <div className="container mx-auto px-4 mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold text-foreground text-center"
            >
              The Impossible Math
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted-foreground text-center mt-4"
            >
              How costs exceed 100% of revenue
            </motion.p>
          </div>

          <motion.div
            style={{ x }}
            className="flex gap-8 px-8"
          >
            <div className="flex-shrink-0 w-80">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-[500px] flex flex-col justify-end">
                <div className="bg-green-500 rounded-lg h-full flex items-center justify-center flex-col text-foreground">
                  <div className="text-6xl font-bold">100%</div>
                  <div className="text-xl mt-2">Revenue</div>
                </div>
              </div>
              <div className="text-foreground text-center mt-4 font-semibold">Starting Point</div>
            </div>

            <div className="flex-shrink-0 w-24 flex items-center justify-center">
              <svg className="w-16 h-16 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            <div className="flex-shrink-0 w-80">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-[500px] flex flex-col justify-end">
                <div className="bg-green-500 rounded-lg" style={{ height: '62%' }}>
                  <div className="text-foreground text-center pt-4">
                    <div className="text-2xl font-bold">62%</div>
                    <div className="text-sm">Remaining</div>
                  </div>
                </div>
                <div className="bg-red-500 rounded-lg mt-2 flex items-center justify-center flex-col text-foreground" style={{ height: '38%' }}>
                  <div className="text-4xl font-bold">38%</div>
                  <div className="text-lg">COGS</div>
                  <div className="text-xs mt-1">Food Costs</div>
                </div>
              </div>
              <div className="text-foreground text-center mt-4 font-semibold">Cost of Goods</div>
            </div>

            <div className="flex-shrink-0 w-24 flex items-center justify-center">
              <svg className="w-16 h-16 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            <div className="flex-shrink-0 w-80">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-[500px] flex flex-col justify-end">
                <div className="bg-green-500 rounded-lg" style={{ height: '24%' }}>
                  <div className="text-foreground text-center pt-4">
                    <div className="text-2xl font-bold">24%</div>
                    <div className="text-sm">Remaining</div>
                  </div>
                </div>
                <div className="bg-primary rounded-lg mt-2 flex items-center justify-center flex-col text-foreground" style={{ height: '38%' }}>
                  <div className="text-4xl font-bold">38%</div>
                  <div className="text-lg">Labour</div>
                  <div className="text-xs mt-1">+70% wages</div>
                </div>
                <div className="bg-red-600 rounded-lg mt-2" style={{ height: '38%' }}></div>
              </div>
              <div className="text-foreground text-center mt-4 font-semibold">Payroll</div>
            </div>

            <div className="flex-shrink-0 w-24 flex items-center justify-center">
              <svg className="w-16 h-16 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            <div className="flex-shrink-0 w-80">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-[500px] flex flex-col justify-end">
                <div className="bg-green-500 rounded-lg" style={{ height: '6%' }}>
                  <div className="text-foreground text-center pt-2">
                    <div className="text-xl font-bold">6%</div>
                  </div>
                </div>
                <div className="bg-yellow-500 rounded-lg mt-2 flex items-center justify-center flex-col text-foreground" style={{ height: '18%' }}>
                  <div className="text-3xl font-bold">18%</div>
                  <div className="text-base">Rent</div>
                </div>
                <div className="bg-orange-600 rounded-lg mt-2" style={{ height: '38%' }}></div>
                <div className="bg-red-600 rounded-lg mt-2" style={{ height: '38%' }}></div>
              </div>
              <div className="text-foreground text-center mt-4 font-semibold">Occupancy</div>
            </div>

            <div className="flex-shrink-0 w-24 flex items-center justify-center">
              <svg className="w-16 h-16 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            <div className="flex-shrink-0 w-80">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-[500px] relative overflow-visible">
                <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end h-full">
                  <div className="bg-purple-500 rounded-lg flex items-center justify-center flex-col text-foreground border-4 border-red-500 animate-pulse" style={{ height: '10%', marginBottom: '-10%' }}>
                    <div className="text-3xl font-bold">10%</div>
                    <div className="text-base">Other</div>
                    <div className="text-xs">OVERFLOW</div>
                  </div>
                  <div className="bg-yellow-600 rounded-lg" style={{ height: '18%' }}></div>
                  <div className="bg-orange-600 rounded-lg mt-2" style={{ height: '38%' }}></div>
                  <div className="bg-red-600 rounded-lg mt-2" style={{ height: '38%' }}></div>
                </div>
              </div>
              <div className="text-foreground text-center mt-4 font-semibold">Insurance & Fees</div>
            </div>

            <div className="flex-shrink-0 w-96 flex items-center">
              <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <div className="text-center text-foreground">
                  <div className="text-7xl font-bold text-red-400 mb-4">-4%</div>
                  <div className="text-2xl font-semibold mb-4">Net Margin</div>
                  <div className="text-lg text-muted-foreground border-t border-red-500/50 pt-4">
                    41% of restaurants operate at a loss
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">Scroll to see the breakdown</p>
          </div>
        </div>
      </div>
    </section>
  );
}
