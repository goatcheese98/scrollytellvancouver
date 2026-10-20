"use client";
import React from "react";
import { motion } from "framer-motion";

// Fixed low-discrepancy samples keep SSR, hydration and re-renders identical.
const sample = (index: number, offset: number) => ((index + 1) * (offset * 17 + 29) % 101) / 101;
const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: sample(i, 1) * 3 + 1,
    delay: sample(i, 2) * 2,
    duration: sample(i, 3) * 3 + 2,
    x: sample(i, 4) * 100,
    y: sample(i, 5) * 100,
  }));

export const SimpleSparkles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
