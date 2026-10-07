"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * AnimatedSignature Component
 * Minimalist SVG pen handwriting animation of "xCM".
 * Strict minimalist styling: pure black background, pure white stroke,
 * no extra text, no pen-tip glows, no filters.
 */
export default function AnimatedSignature({
  onAnimationComplete,
  className = "",
  strokeWidth = 3.5,
}) {
  // Precise cursive / signature path coordinates for "xCM" + flourish underline
  // 1. 'x' main down-right stroke with entrance loop
  const pathX1 = "M 95 130 C 110 105, 125 90, 142 90 C 158 90, 162 108, 148 135 C 132 165, 145 182, 168 172";
  // 2. 'x' cross slash
  const pathX2 = "M 160 92 C 145 120, 120 155, 102 176";
  // 3. 'C' sweeping crest and curve
  const pathC = "M 285 75 C 270 58, 235 55, 212 82 C 185 114, 182 158, 210 182 C 238 206, 282 196, 305 170 C 315 159, 310 152, 298 156";
  // 4. 'M' ascending first arch
  const pathM1 = "M 322 175 C 328 140, 336 98, 345 78 C 352 64, 365 68, 380 98 L 406 154";
  // 5. 'M' second arch and descending tail
  const pathM2 = "M 406 154 C 418 118, 434 76, 448 76 C 462 76, 470 94, 478 122 L 490 175 C 496 186, 508 184, 525 168";
  // 6. Signature flourish underline with dynamic curve
  const pathUnderline = "M 85 208 C 180 200, 320 216, 510 188 C 532 184, 538 194, 505 204 C 445 220, 240 220, 140 212";

  // Individual stroke timing for realistic penmanship
  const strokeTransition = (delay, duration) => ({
    pathLength: {
      delay,
      duration,
      ease: [0.33, 1, 0.68, 1],
    },
    opacity: {
      delay,
      duration: 0.1,
    },
  });

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 600 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] h-auto"
        aria-label="xCM Signature Animation"
      >
        <g
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Letter 'x' loop */}
          <motion.path
            d={pathX1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={strokeTransition(0.2, 0.55)}
          />

          {/* Letter 'x' cross slash */}
          <motion.path
            d={pathX2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={strokeTransition(0.7, 0.35)}
          />

          {/* Letter 'C' swoop */}
          <motion.path
            d={pathC}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={strokeTransition(1.0, 0.75)}
          />

          {/* Letter 'M' First Peak */}
          <motion.path
            d={pathM1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={strokeTransition(1.7, 0.55)}
          />

          {/* Letter 'M' Second Peak & Flourish */}
          <motion.path
            d={pathM2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={strokeTransition(2.2, 0.55)}
          />

          {/* Calligraphic Flourish Underline */}
          <motion.path
            d={pathUnderline}
            strokeWidth={strokeWidth - 0.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={strokeTransition(2.7, 0.7)}
            onAnimationComplete={onAnimationComplete}
          />
        </g>
      </svg>
    </div>
  );
}
