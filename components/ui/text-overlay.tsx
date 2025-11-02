"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextOverlayProps {
  isVisible: boolean;
  children: React.ReactNode;
  className?: string;
  onComplete?: () => void;
  duration?: number;
}

export const TextOverlay = ({
  isVisible,
  children,
  className,
  onComplete,
  duration = 4000,
}: TextOverlayProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onAnimationComplete={() => {
            if (onComplete && duration > 0) {
              setTimeout(onComplete, duration);
            }
          }}
          className={cn(
            "absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm",
            className
          )}
        >
          <div className="max-w-3xl px-6 text-center">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface TextBlockProps {
  icon?: string;
  title: string;
  content: string | React.ReactNode;
  className?: string;
}

export const TextBlock = ({ icon, title, content, className }: TextBlockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className={cn("space-y-4", className)}
    >
      {icon && (
        <div className="text-4xl mb-2">{icon}</div>
      )}
      <h3 className="text-2xl font-semibold text-foreground">
        {title}
      </h3>
      <div className="text-lg text-muted-foreground leading-relaxed">
        {content}
      </div>
    </motion.div>
  );
};
