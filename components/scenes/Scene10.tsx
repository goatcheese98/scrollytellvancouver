'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Scene10() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-background" />

        {/* Main content */}
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          {/* Main message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-12"
          >
            {/* Title */}
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold text-foreground mb-8 leading-tight">
              The Math
              <br />
              <span className="text-red-500">No Longer</span>
              <br />
              Adds Up
            </h2>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              When a bowl of pho doubles in price but restaurants still can't survive,
              <br />
              <span className="text-foreground font-semibold">something is fundamentally broken.</span>
            </p>

            {/* Key stats in a row */}
            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm"
              >
                <div className="text-4xl font-bold text-red-400 mb-2">+88%</div>
                <div className="text-sm text-muted-foreground">Price Increase</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm"
              >
                <div className="text-4xl font-bold text-red-400 mb-2">16,000</div>
                <div className="text-sm text-muted-foreground">Worker Shortage</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm"
              >
                <div className="text-4xl font-bold text-red-400 mb-2">1,200+</div>
                <div className="text-sm text-muted-foreground">Closures</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm"
              >
                <div className="text-4xl font-bold text-red-400 mb-2">0%</div>
                <div className="text-sm text-muted-foreground">Profit Margin</div>
              </motion.div>
            </div>

            {/* Final thought */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-20 pt-12 border-t border-border"
            >
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Vancouver's restaurant industry is at a crossroads.
                <br />
                <span className="text-foreground font-semibold">
                  Without systemic change, the middle will continue to vanish.
                </span>
              </p>
            </motion.div>

            {/* Data source */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-16 text-sm text-muted-foreground"
            >
              <p>Data sources: BC Restaurant and Food Services Association, Statistics Canada,</p>
              <p>BC Labour Market Outlook, Vancouver Economic Commission (2015-2025)</p>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
