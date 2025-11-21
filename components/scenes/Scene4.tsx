'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const content = [
  {
    title: "Labour Crisis",
    subtitle: "The Human Cost",
    color: "blue",
    image: "/images/chef-crisis.png",
    stats: [
      { value: "16,000", label: "Worker Shortage" },
      { value: "+70.8%", label: "Wage Increase" }
    ],
    quote: {
      text: "I've been looking for a sous chef for 6 months. No one applies. We're running on a skeleton crew every night.",
      author: "Marco, Head Chef"
    },
    description: "Only 800 people graduate from culinary school annually to fill 16,000 vacancies, forcing fierce competition for staff."
  },
  {
    title: "Supply Shock",
    subtitle: "The Market Reality",
    color: "orange",
    image: "/images/supply-shock.png",
    stats: [
      { value: "+36%", label: "Meat Costs" },
      { value: "+30%", label: "Veg Costs" }
    ],
    quote: {
      text: "Cauliflower is up 300%. Cooking oil has doubled. I have to rewrite my menu prices every week just to break even.",
      author: "Local Supplier"
    },
    description: "B.C. floods in 2021 and port strikes have created severe supply chain volatility, driving core ingredient prices to record highs."
  },
  {
    title: "Admin Burden",
    subtitle: "The Hidden Cost",
    color: "purple",
    image: "/images/admin-burden.png",
    stats: [
      { value: "+200%", label: "Insurance Premium" },
      { value: "New", label: "Health Tax & Sick Days" }
    ],
    quote: {
      text: "I spend more time on paperwork than with my customers. Between the new taxes and insurance hikes, it feels like death by a thousand cuts.",
      author: "Sarah, Owner"
    },
    description: "Mandatory costs have exploded with no room to absorb them. Insurance premiums alone have doubled or tripled due to climate change risks."
  }
];

export default function Scene4() {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="relative min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">

        {/* Header Section */}
        <div className="mb-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl font-bold text-foreground mb-6">
              The Investigation
            </h2>
            <div className="text-2xl text-muted-foreground">
              <TextGenerateEffect words="Three forces creating the perfect storm." />
            </div>
            <div className="h-2 w-32 bg-primary rounded-full mt-8" />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Scrolling Content */}
          <div className="relative z-10">
            <TracingBeam className="pl-4">
              <div className="space-y-64 pb-64">
                {content.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
                    onViewportEnter={() => setActiveCard(index)}
                    className="relative"
                  >
                    <div className={cn(
                      "absolute -left-[53px] top-0 w-6 h-6 rounded-full border-4 border-background z-20 transition-colors duration-500",
                      activeCard === index ? `bg-${item.color}-500` : "bg-muted"
                    )} />

                    <div className={cn(
                      "bg-card/80 backdrop-blur-sm border rounded-3xl overflow-hidden transition-all duration-500",
                      activeCard === index ? `border-${item.color}-500/50 shadow-2xl` : "border-border shadow-sm opacity-70 grayscale"
                    )}>
                      <div className="p-8 space-y-6">
                        <div>
                          <div className={cn("text-sm font-medium uppercase tracking-wider mb-1", `text-${item.color}-500`)}>
                            {item.subtitle}
                          </div>
                          <h3 className="text-4xl font-bold">{item.title}</h3>
                        </div>

                        <blockquote className={cn("border-l-4 pl-4 italic text-muted-foreground", `border-${item.color}-500`)}>
                          "{item.quote.text}"
                          <footer className="text-sm font-bold text-foreground mt-2">— {item.quote.author}</footer>
                        </blockquote>

                        <div className="grid grid-cols-2 gap-4">
                          {item.stats.map((stat, i) => (
                            <div key={i} className={cn("border rounded-xl p-4 text-center bg-background/50", `border-${item.color}-500/20`)}>
                              <div className={cn("text-2xl font-bold", `text-${item.color}-500`)}>{stat.value}</div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{stat.label}</div>
                            </div>
                          ))}
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TracingBeam>
          </div>

          {/* Right Side - Sticky Image */}
          <div className="hidden lg:block lg:sticky lg:top-32 h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
            {content.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  scale: activeCard === index ? 1 : 1.1
                }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Overlay Text on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: activeCard === index ? 1 : 0, y: activeCard === index ? 0 : 20 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className={cn("inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-white/20 backdrop-blur-md")}>
                      {item.subtitle}
                    </div>
                    <h3 className="text-4xl font-bold mb-2">{item.title}</h3>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
