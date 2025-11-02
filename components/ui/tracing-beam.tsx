'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const TracingBeam = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 20%', 'end 80%'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, svgHeight]);

  useEffect(() => {
    if (containerRef.current) {
      setSvgHeight(containerRef.current.offsetHeight);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* SVG Line */}
      <svg
        viewBox={`0 0 20 ${svgHeight}`}
        width="20"
        height={svgHeight}
        className="absolute left-0 top-0 block"
        aria-hidden="true"
      >
        {/* Background line */}
        <path
          d={`M 10 0 L 10 ${svgHeight}`}
          stroke="rgb(148 163 184 / 0.3)"
          strokeWidth="2"
          fill="none"
        />
        {/* Animated line */}
        <motion.path
          d={`M 10 0 L 10 ${svgHeight}`}
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="0 1"
          initial={{ pathLength: 0 }}
          style={{
            pathLength: scrollYProgress,
          }}
        />
        <defs>
          <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2={svgHeight}>
            <stop stopColor="#3b82f6" stopOpacity="0" />
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Content */}
      <div className="pl-12">{children}</div>
    </div>
  );
};
