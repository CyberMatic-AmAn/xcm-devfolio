"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedSignature from "./AnimatedSignature";

/**
 * Minimalist macOS Boot Screen
 * Strict Constraint: Screen contains only the centered "xCM" handwritten stroke animation.
 * Pure black background, white stroke.
 * Exit Sequence:
 * - On stroke completion: Pause for exactly 1 second
 * - Fade entire component out cleanly to black (opacity: 0, duration: 0.6s)
 * - Trigger onBootComplete() callback prop
 */
export default function BootScreen({ onBootComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleStrokeComplete = useCallback(() => {
    // Pause for exactly 1 second, then trigger 0.6s fade-out to black
    const pauseTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1000);

    return () => clearTimeout(pauseTimer);
  }, []);

  const handleFadeComplete = () => {
    if (isFadingOut && onBootComplete) {
      onBootComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onAnimationComplete={handleFadeComplete}
      className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center select-none overflow-hidden z-50"
    >
      <div className="flex items-center justify-center p-6 w-full max-w-lg">
        <AnimatedSignature
          onAnimationComplete={handleStrokeComplete}
          strokeWidth={8}
        />
      </div>
    </motion.div>
  );
}
