'use client';

import { motion } from 'framer-motion';
import { TracingBeam } from '@/components/ui/tracing-beam';

export default function Scene4() {
  return (
    <section className="relative min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Sticky Title */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-6xl font-bold text-foreground">
                The Investigation
              </h2>
              <p className="text-xl text-muted-foreground">
                Three forces creating the perfect storm
              </p>
              <div className="h-2 w-24 bg-primary rounded-full" />
            </motion.div>
          </div>

          {/* Right Side - Tracing Beam Content */}
          <div className="relative">
            <TracingBeam>
              <div className="space-y-16">
                {/* Node 1: Labour Crisis */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, margin: '-100px' }}
                  className="relative"
                >
                  <div className="absolute -left-12 top-0 w-6 h-6 rounded-full bg-blue-500 border-4 border-background" />

                  <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-blue-400 text-4xl">01</span>
                      <h3 className="text-3xl font-bold text-foreground">Labour Crisis</h3>
                    </div>

                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-lg">
                        A <span className="text-red-400 font-bold">16,000 worker shortage</span> meets a{' '}
                        <span className="text-red-400 font-bold">+70.8% wage increase</span>.
                      </p>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                          <div className="text-3xl font-bold text-red-400">16,000</div>
                          <div className="text-sm text-muted-foreground mt-1">Chef shortage</div>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                          <div className="text-3xl font-bold text-red-400">+70.8%</div>
                          <div className="text-sm text-muted-foreground mt-1">Wage increase</div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-4 border-t border-border pt-4">
                        Only 800 people graduate from culinary school annually to fill 16,000 vacancies, forcing restaurants to pay well above minimum wage.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Node 2: Supply Chain Chaos */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, margin: '-100px' }}
                  className="relative"
                >
                  <div className="absolute -left-12 top-0 w-6 h-6 rounded-full bg-cyan-500 border-4 border-background" />

                  <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-cyan-400 text-4xl">02</span>
                      <h3 className="text-3xl font-bold text-foreground">Supply Shock</h3>
                    </div>

                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-lg">
                        Core ingredients have skyrocketed in price.
                      </p>

                      <div className="space-y-3 mt-6">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Meat</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-700 rounded-full h-3">
                              <div className="bg-orange-500 h-3 rounded-full" style={{ width: '36.2%' }} />
                            </div>
                            <span className="text-orange-400 font-bold">+36.2%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Dairy & Eggs</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-700 rounded-full h-3">
                              <div className="bg-orange-500 h-3 rounded-full" style={{ width: '30%' }} />
                            </div>
                            <span className="text-orange-400 font-bold">+30%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Vegetables</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-700 rounded-full h-3">
                              <div className="bg-orange-500 h-3 rounded-full" style={{ width: '30%' }} />
                            </div>
                            <span className="text-orange-400 font-bold">+30%</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-4 border-t border-border pt-4">
                        B.C. floods in 2021 and port strikes have created severe supply chain volatility.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Node 3: Administrative Burden */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, margin: '-100px' }}
                  className="relative"
                >
                  <div className="absolute -left-12 top-0 w-6 h-6 rounded-full bg-purple-500 border-4 border-background" />

                  <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-purple-400 text-4xl">03</span>
                      <h3 className="text-3xl font-bold text-foreground">Admin Burden</h3>
                    </div>

                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-lg">
                        Insurance costs have <span className="text-red-400 font-bold">doubled or tripled</span>, driven by climate change.
                      </p>

                      <div className="bg-card border border-border rounded-xl p-6 shadow-sm mt-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-purple-400 mb-2">+200%</div>
                          <div className="text-sm text-muted-foreground">Insurance Premium Increase</div>
                          <p className="text-xs text-muted-foreground mt-3">
                            "We're in a hard market for insurance... driven by hard costs from climate change"
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-card border border-border shadow-sm rounded-lg p-3 text-center">
                          <div className="text-sm text-muted-foreground">Employer Health Tax</div>
                          <div className="text-lg font-bold text-red-400">New (2019)</div>
                        </div>
                        <div className="bg-card border border-border shadow-sm rounded-lg p-3 text-center">
                          <div className="text-sm text-muted-foreground">Paid Sick Days</div>
                          <div className="text-lg font-bold text-red-400">New (2022)</div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-4 border-t border-border pt-4">
                        New mandatory costs with no room to absorb them in already-thin margins.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TracingBeam>
          </div>
        </div>
      </div>
    </section>
  );
}
