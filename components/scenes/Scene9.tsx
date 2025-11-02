'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

interface MarketSegment {
  id: number;
  category: string;
  trend: 'thriving' | 'vanishing' | 'expanding';
  icon: string;
  examples: string[];
  revenue: string;
  description: string;
  color: string;
}

const marketSegments: MarketSegment[] = [
  {
    id: 1,
    category: 'High-End Dining',
    trend: 'thriving',
    icon: 'star',
    examples: ['Hawksworth', 'Boulevard', 'Published on Main'],
    revenue: '$100+ per person',
    description: 'Luxury dining survives by catering to affluent customers willing to pay premium prices.',
    color: 'emerald',
  },
  {
    id: 2,
    category: 'Mid-Market Casual',
    trend: 'vanishing',
    icon: 'heart',
    examples: ['Local diners', 'Family restaurants', 'Neighborhood bistros'],
    revenue: '$15-30 per person',
    description: 'The vanishing middle: caught between rising costs and price-sensitive customers.',
    color: 'red',
  },
  {
    id: 3,
    category: 'Quick Service',
    trend: 'expanding',
    icon: 'burger',
    examples: ['McDonalds', 'Subway', 'Chipotle'],
    revenue: '$10-15 per person',
    description: 'Chains with economies of scale can absorb costs that independent restaurants cannot.',
    color: 'blue',
  },
];

export default function Scene9() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [activeIndex, setActiveIndex] = useState(1);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const getIconElement = (icon: string) => {
    switch(icon) {
      case 'star':
        return (
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        );
      case 'burger':
        return (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-background py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold text-foreground mb-6">
            The Hollowing Out
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vancouver's restaurant industry is becoming barbell-shaped: luxury at the top, chains at the bottom, and the middle disappearing.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-6 perspective-1000">
            {marketSegments.map((segment, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={segment.id}
                  onClick={() => handleCardClick(index)}
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.8,
                    x: offset * 100,
                    opacity: isActive ? 1 : 0.5,
                    rotateY: offset * -15,
                    z: isActive ? 0 : -200,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                  }}
                  className={`
                    relative cursor-pointer
                    ${isActive ? 'z-10' : 'z-0'}
                    ${!isActive && 'hover:scale-90 transition-transform'}
                  `}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className={`
                      bg-card border border-border
                      rounded-xl p-8
                      shadow-sm
                      ${isActive ? 'w-[400px] h-[500px]' : 'w-[350px] h-[450px]'}
                      transition-all duration-500
                    `}
                  >
                    {/* Trend Badge */}
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className={`
                          px-4 py-2 rounded-full text-sm font-bold bg-card border border-border
                          ${segment.trend === 'thriving' && 'text-emerald-400'}
                          ${segment.trend === 'vanishing' && 'text-red-400'}
                          ${segment.trend === 'expanding' && 'text-blue-400'}
                        `}
                      >
                        {segment.trend === 'thriving' && 'Thriving'}
                        {segment.trend === 'vanishing' && 'Vanishing'}
                        {segment.trend === 'expanding' && 'Expanding'}
                      </div>
                      <div className={`
                        ${segment.trend === 'thriving' && 'text-emerald-400'}
                        ${segment.trend === 'vanishing' && 'text-red-400'}
                        ${segment.trend === 'expanding' && 'text-blue-400'}
                      `}>
                        {getIconElement(segment.icon)}
                      </div>
                    </div>

                    {/* Category */}
                    <h3 className="text-3xl font-bold text-foreground mb-4">
                      {segment.category}
                    </h3>

                    {/* Revenue */}
                    <div className="mb-6">
                      <div className={`
                        text-2xl font-bold
                        ${segment.trend === 'thriving' && 'text-emerald-400'}
                        ${segment.trend === 'vanishing' && 'text-red-400'}
                        ${segment.trend === 'expanding' && 'text-blue-400'}
                      `}>
                        {segment.revenue}
                      </div>
                      <div className="text-sm text-muted-foreground">Average check</div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {segment.description}
                    </p>

                    {/* Examples */}
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground font-semibold">Examples:</div>
                      {segment.examples.map((example, i) => (
                        <div
                          key={i}
                          className="bg-card border border-border rounded-xl px-3 py-2 text-sm text-muted-foreground shadow-sm"
                        >
                          {example}
                        </div>
                      ))}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {marketSegments.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`
                  h-3 rounded-full transition-all duration-300
                  ${index === activeIndex ? 'w-12 bg-foreground' : 'w-3 bg-border hover:bg-muted-foreground'}
                `}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              The Middle is Disappearing
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">+15%</div>
                <div className="text-sm text-muted-foreground">High-end restaurant growth</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">-40%</div>
                <div className="text-sm text-muted-foreground">Mid-market closures</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">+25%</div>
                <div className="text-sm text-muted-foreground">QSR expansion</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
