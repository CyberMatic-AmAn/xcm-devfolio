"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/**
 * DockItem Component
 * Individual application icon with:
 * - Distance-based dynamic spring scaling powered by shared pointer mouseX
 * - Support for mouse hover and mobile touch-gliding physics
 * - Conflict-free onTap / onClick triggers with visual tap feedback
 * - Mobile responsive visibility
 */
export default function DockItem({ mouseX, app, isOpen, onTrigger }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Compute distance between pointer X coordinate and this item's center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current ? ref.current.getBoundingClientRect() : { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Dynamic width: scales smoothly from 48px up to 72px (1.5x) when pointer is directly overhead
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 12 });

  return (
    <div
      className={`relative flex-col items-center z-10 ${
        app.hideOnMobile ? "hidden sm:flex" : "flex"
      }`}
    >
      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-9 px-2.5 py-0.5 rounded-md bg-neutral-900/90 text-white text-[11px] font-medium tracking-tight whitespace-nowrap shadow-lg border border-white/15 pointer-events-none z-50 backdrop-blur-md"
          >
            {app.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock Item Button */}
      <motion.button
        ref={ref}
        type="button"
        style={{ width, height: width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTap={onTrigger}
        onClick={onTrigger}
        whileTap={{ scale: 0.92 }}
        className="relative z-10 rounded-2xl flex items-center justify-center cursor-pointer select-none touch-manipulation group"
        aria-label={app.label}
      >
        <img
          src={app.iconSrc || `/images/icons/${app.id}.png`}
          alt={app.label}
          className="w-10 h-10 object-contain drop-shadow-md hover:scale-105 transition-transform select-none pointer-events-none"
        />
      </motion.button>

      {/* Active Dot Indicator under app */}
      <div className="h-1 mt-1 flex items-center justify-center pointer-events-none">
        {isOpen && (
          <motion.span
            layoutId={`dot-${app.id}`}
            className="w-1 h-1 rounded-full bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)]"
          />
        )}
      </div>
    </div>
  );
}
