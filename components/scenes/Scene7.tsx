'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Scene7() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-24"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10"></div>

                <div className="bg-white rounded-[2.5rem] overflow-hidden h-[600px]">
                  <div className="bg-red-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">DoorDash</h3>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                      </svg>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50">
                    <div className="bg-white rounded-lg p-4 shadow">
                      <h4 className="font-semibold text-gray-800 mb-3">Your Order</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Large Pho Bowl</span>
                          <span className="text-gray-800 font-medium">$16.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Spring Rolls</span>
                          <span className="text-gray-800 font-medium">$8.00</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 mt-3 pt-3 space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span>$24.00</span>
                        </div>
                        <div className="flex justify-between text-red-600 font-medium">
                          <span>Delivery Fee</span>
                          <span>$3.99</span>
                        </div>
                        <div className="flex justify-between text-red-600 font-medium">
                          <span>Service Fee</span>
                          <span>$4.20</span>
                        </div>
                        <div className="flex justify-between text-red-600 font-medium">
                          <span>Regulatory Fee</span>
                          <span>$2.00</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Taxes</span>
                          <span>$1.70</span>
                        </div>
                      </div>

                      <div className="border-t-2 border-gray-300 mt-3 pt-3">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-red-600">$35.89</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Tip not included</p>
                      </div>
                    </div>

                    <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs text-yellow-800">
                        Restaurant only receives $20.00 after fees
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              The Accelerant
            </h2>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">The Provincial Fee Cap</h3>
              <p className="text-gray-300 mb-4">
                B.C. implemented a permanent <span className="text-blue-400 font-bold">20% cap</span> on delivery app fees to help restaurants.
              </p>
              <div className="bg-green-950/30 border border-green-900/30 rounded-lg p-4">
                <p className="text-green-400 text-sm">
                  First permanent delivery-fee cap in Canada (2023)
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">But Platforms Responded...</h3>
              <p className="text-gray-300 mb-4">
                Apps added new <span className="text-red-400 font-bold">regulatory response fees</span> to offset the cap.
              </p>
              <div className="bg-red-950/30 border border-red-900/30 rounded-lg p-4">
                <p className="text-red-400 text-sm">
                  The cost was simply passed to consumers instead
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">The Unintended Consequence</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-950/30 rounded-xl p-4 border border-green-900/30">
                  <div className="text-3xl font-bold text-green-400">Surplus</div>
                  <div className="text-sm text-gray-400 mt-1">Delivery Drivers</div>
                </div>
                <div className="bg-red-950/30 rounded-xl p-4 border border-red-900/30">
                  <div className="text-3xl font-bold text-red-400">-16,000</div>
                  <div className="text-sm text-gray-400 mt-1">Kitchen Staff</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Better wages attracted drivers, but restaurants could not afford kitchen staff.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-950 to-slate-900 rounded-2xl p-6 border-2 border-red-500/50">
              <h3 className="text-xl font-bold text-white mb-4">The Fee Stack</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-8 overflow-hidden">
                    <div className="bg-blue-500 h-full flex items-center px-3 text-white text-sm font-medium" style={{ width: '67%' }}>
                      Food: $24.00
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-6 overflow-hidden">
                    <div className="bg-red-500 h-full flex items-center px-3 text-white text-xs" style={{ width: '11%' }}>
                      Delivery: $3.99
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-6 overflow-hidden">
                    <div className="bg-red-500 h-full flex items-center px-3 text-white text-xs" style={{ width: '12%' }}>
                      Service: $4.20
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-6 overflow-hidden">
                    <div className="bg-red-600 h-full flex items-center px-3 text-white text-xs animate-pulse" style={{ width: '6%' }}>
                      Regulatory: $2.00
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-red-400 font-bold text-center mt-4 text-xl">
                +49.5% in fees on top of food cost
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
