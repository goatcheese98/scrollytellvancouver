'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function Scene2() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-slate-900"
      style={{
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(/images/vancouver-skyline.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Sticky */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-24 space-y-8"
          >
            <h2 className="text-5xl font-bold text-white">
              The Consumer Retreat
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              The result? A consumer retreat.
            </motion.p>

            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-semibold">18-34 year-olds cutting back</span>
                    <span className="text-white font-bold">81%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: '81%' } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.6 }}
                      className="bg-red-500 h-full rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-semibold">All Canadians cutting back</span>
                    <span className="text-white font-bold">75%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: '75%' } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                      className="bg-orange-500 h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Scrolling Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Testimonial 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <blockquote className="text-lg text-gray-200 italic mb-4">
                "Three-quarters of Canadians are looking for more value for their shrinking dollar."
              </blockquote>
              <cite className="text-sm text-gray-400 not-italic">
                 Restaurants Canada, 2025
              </cite>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <blockquote className="text-lg text-gray-200 italic mb-4">
                "Young diners are the ones most acutely feeling the financial pressure."
              </blockquote>
              <cite className="text-sm text-gray-400 not-italic">
                 Industry Report
              </cite>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <blockquote className="text-lg text-gray-200 italic mb-4">
                "Consumers are shifting their spending away from full-service restaurants and toward quick-service establishments."
              </blockquote>
              <cite className="text-sm text-gray-400 not-italic">
                 Market Analysis
              </cite>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
                <div className="text-3xl font-bold text-red-400 mb-2">-11%</div>
                <div className="text-sm text-gray-300">Full-service spending</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30">
                <div className="text-3xl font-bold text-green-400 mb-2">+7.6%</div>
                <div className="text-sm text-gray-300">QSR lunch traffic</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
