"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedNumber({
  value,
  className,
  suffix = "",
  prefix = "",
}: {
  value: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: false, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    } else {
      motionValue.set(0);
    }
  }, [motionValue, isInView, value]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Intl.NumberFormat("en-US").format(
            Number(latest.toFixed(0))
          )}${suffix}`;
        }
      }),
    [springValue, prefix, suffix]
  );

  return <span className={className} ref={ref} />;
}
