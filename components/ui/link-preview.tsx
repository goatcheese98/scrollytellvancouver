'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface LinkPreviewProps {
  url: string;
  children: React.ReactNode;
  preview: {
    title: string;
    description: string;
    domain: string;
    image?: string;
  };
  className?: string;
  inline?: boolean;
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({
  url,
  children,
  preview,
  className = "",
  inline = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;
    
    // Calculate offset (-1 to 1 range)
    const offset = (x - centerX) / centerX;
    
    setMousePosition({ x: offset * 60 }); // Max 60px offset in either direction
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      ref={containerRef}
      className={`relative ${inline ? 'inline-block' : 'block w-full'} no-underline ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              x: mousePosition.x 
            }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ 
              opacity: { duration: 0.15, ease: 'easeOut' },
              scale: { duration: 0.15, ease: 'easeOut' },
              y: { duration: 0.15, ease: 'easeOut' },
              x: { duration: 0.1, ease: 'easeOut' }
            }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[340px] z-[100] pointer-events-none"
          >
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-2xl overflow-hidden">
              {/* Header Bar */}
              <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 flex items-center gap-1.5 bg-white dark:bg-zinc-950 rounded px-2 py-1">
                  <ExternalLink className="h-2.5 w-2.5 text-zinc-500" />
                  <span className="text-[9px] text-zinc-600 dark:text-zinc-400 truncate">{preview.domain}</span>
                </div>
              </div>
              
              {/* Image Preview */}
              {preview.image && (
                <div className="w-full h-48 bg-zinc-50 dark:bg-zinc-950 overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
                  <img
                    src={preview.image}
                    alt={preview.title}
                    className="w-full h-full object-contain object-center"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="p-4 space-y-3 bg-white dark:bg-zinc-900">
                <div>
                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-1.5 line-clamp-2 leading-snug">
                    {preview.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {preview.description}
                  </p>
                </div>
                
                {/* Domain Badge */}
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                  <div className="w-5 h-5 rounded flex items-center justify-center overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={`https://www.google.com/s2/favicons?domain=${preview.domain}&sz=128`}
                      alt={`${preview.domain} favicon`}
                      width={16}
                      height={16}
                      className="rounded-sm"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {preview.domain}
                    </p>
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400">
                      Click to visit
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
};


