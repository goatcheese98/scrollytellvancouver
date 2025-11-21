'use client';

import { motion } from 'framer-motion';

export default function Scene5() {
  return (
    <section className="relative min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Side - Phone Mockup - Sticky */}
          <div className="lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Phone Frame */}
              <div className="relative mx-auto w-full max-w-[360px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-3 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />

                {/* Screen */}
                <div className="relative bg-white rounded-[2.5rem] overflow-hidden">
                  {/* DoorDash Header */}
                  <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold">DoorDash</h3>
                    <button className="text-2xl">🛒</button>
                  </div>

                  {/* Order Content */}
                  <div className="p-6 space-y-4">
                    <h4 className="text-xl font-bold text-gray-900">Your Order</h4>

                    {/* Order Items */}
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex justify-between text-gray-700">
                        <span>Large Pho Bowl</span>
                        <span>$16.00</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Spring Rolls</span>
                        <span>$8.00</span>
                      </div>
                    </motion.div>

                    {/* Subtotal */}
                    <div className="flex justify-between text-gray-700 pt-2 border-t border-gray-200">
                      <span>Subtotal</span>
                      <span>$24.00</span>
                    </div>

                    {/* Fees - Animated */}
                    <motion.div
                      className="space-y-2 text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, staggerChildren: 0.1 }}
                    >
                      <motion.div
                        className="flex justify-between text-red-600 font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span>Delivery Fee</span>
                        <span>$3.99</span>
                      </motion.div>
                      <motion.div
                        className="flex justify-between text-red-600 font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <span>Service Fee</span>
                        <span>$4.20</span>
                      </motion.div>
                      <motion.div
                        className="flex justify-between text-red-600 font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <span>Regulatory Fee</span>
                        <span>$2.00</span>
                      </motion.div>
                      <div className="flex justify-between text-gray-600">
                        <span>Taxes</span>
                        <span>$1.70</span>
                      </div>
                    </motion.div>

                    {/* Total - Emphasized */}
                    <motion.div
                      className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t-2 border-gray-300"
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8, type: 'spring' }}
                    >
                      <span>Total</span>
                      <span className="text-red-600">$35.89</span>
                    </motion.div>
                    <p className="text-xs text-gray-500">Tip not included</p>

                    {/* Restaurant Notice - Pulsing */}
                    <motion.div
                      className="bg-amber-50 border border-amber-300 rounded-lg p-3 mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(251, 191, 36, 0)',
                          '0 0 0 8px rgba(251, 191, 36, 0.1)',
                          '0 0 0 0 rgba(251, 191, 36, 0)'
                        ]
                      }}
                      transition={{
                        opacity: { delay: 1 },
                        y: { delay: 1 },
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }
                      }}
                    >
                      <p className="text-xs text-amber-900 font-bold">
                        ⚠️ Restaurant only receives $20.00 after fees
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Content */}
          <div
            className="space-y-12"
          >

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-6xl font-bold text-foreground">The Accelerant</h2>
              <p className="text-xl text-muted-foreground">
                How delivery apps turned a lifeline into a burden
              </p>
              <div className="h-2 w-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
            </motion.div>

            {/* Intro Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-muted-foreground text-lg"
            >
              <p>
                During COVID-19, delivery apps promised to save struggling restaurants. Instead, they became another cost squeeze in an already impossible equation.
              </p>
              <p>
                While labor shortages and rising food costs squeezed restaurants from one side, delivery platforms extracted value from the other—leaving establishments caught in a vice with no escape.
              </p>
            </motion.div>

            {/* The Provincial Fee Cap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-xl p-8 space-y-4"
            >
              <h3 className="text-3xl font-bold text-foreground">The Provincial Fee Cap</h3>
              <p className="text-muted-foreground">
                B.C. implemented a permanent <span className="text-blue-500 font-bold">20% cap</span> on delivery app fees to help restaurants.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded p-4">
                <p className="text-sm text-blue-900 dark:text-blue-200 font-medium">
                  First permanent delivery-fee cap in Canada (2023)
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                The regulation aimed to protect restaurants by limiting how much platforms could charge them per order. On paper, it looked like a win for the industry.
              </p>
            </motion.div>

            {/* But Platforms Responded */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-xl p-8 space-y-4"
            >
              <h3 className="text-3xl font-bold text-foreground">But Platforms Responded...</h3>
              <p className="text-muted-foreground">
                Apps added new <span className="text-red-500 font-bold">regulatory response fees</span> to offset the cap.
              </p>
              <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded p-4">
                <p className="text-sm text-red-900 dark:text-red-200 font-medium">
                  The cost was simply passed to consumers instead
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Rather than absorb the cost, platforms introduced "regulatory response fees," "service fees," and "small order fees"—all charged directly to customers. The cap didn't reduce costs; it just shifted who paid them.
              </p>
            </motion.div>

            {/* The Unintended Consequence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-xl p-8 space-y-6"
            >
              <h3 className="text-3xl font-bold text-foreground">The Unintended Consequence</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">Surplus</div>
                  <div className="text-sm font-medium text-foreground">Delivery Drivers</div>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-500 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">-16,000</div>
                  <div className="text-sm font-medium text-foreground">Kitchen Staff</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Better wages attracted drivers, but restaurants could not afford kitchen staff. The gig economy flourished while restaurant kitchens remained desperately understaffed—a labor market imbalance that makes no economic sense.
              </p>
            </motion.div>

            {/* The Math Doesn't Work */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/50 rounded-xl p-8 space-y-4"
            >
              <h3 className="text-3xl font-bold text-foreground">The Math Doesn't Work</h3>
              <p className="text-muted-foreground text-lg">
                Customers are priced out. Restaurants earn less per order. And the platforms? They extract value from both sides while neither party benefits.
              </p>
              <p className="text-sm text-muted-foreground">
                This isn't sustainable economics—it's a system designed to extract maximum value from a struggling industry. While delivery apps were meant to expand restaurant reach, they've instead become another cost burden that accelerates closures rather than preventing them.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
