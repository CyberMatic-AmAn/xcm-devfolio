"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import Image from "next/image";
import avatar from "@/images/profile/profile.webp";

/**
 * LoginCard Component
 * Replicates the authentic macOS login card:
 * - Circular avatar with soft shadow and subtle border
 * - Crisp username
 * - Glassmorphic rounded password pill with embedded circular Enter button
 * - Enter key and click submission
 * - Graceful scale-down and fade-out unlock transition
 */
export default function LoginCard({ onUnlock, userName = "Developer" }) {
  const [password, setPassword] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const inputRef = useRef(null);

  const handleUnlock = useCallback(() => {
    if (isUnlocking) return;
    setIsUnlocking(true);

    // Allow subtle animation before signaling onUnlock
    setTimeout(() => {
      if (onUnlock) onUnlock();
    }, 450);
  }, [isUnlocking, onUnlock]);

  // Auto-focus the input on mount
  useEffect(() => {
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
    return () => clearTimeout(focusTimer);
  }, []);

  // Listen for Enter key globally while on lock screen
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === "Enter" && !isUnlocking) {
        handleUnlock();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isUnlocking, handleUnlock]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUnlock();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={
        isUnlocking
          ? { opacity: 0, scale: 0.9, y: -10, filter: "blur(8px)" }
          : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
      }
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center select-none"
    >
      {/* User Avatar */}
      <div className="relative group mb-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/20 shadow-2xl bg-neutral-800/80 backdrop-blur-md flex items-center justify-center ring-4 ring-black/10">
          {!avatarError ? (
            <Image
              src={avatar}
              alt={userName}
              width={112}
              height={112}
              className="w-full h-full object-cover"
              onError={() => setAvatarError(true)}
              priority
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-neutral-700 to-neutral-500 flex items-center justify-center text-white">
              <User className="w-12 h-12 text-white/80" />
            </div>
          )}
        </div>
      </div>

      {/* User Name */}
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] mb-4">
        {userName}
      </h1>

      {/* Password / Enter Pill Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="relative flex items-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg overflow-hidden transition-all duration-200 focus-within:bg-white/25 focus-within:border-white/50 focus-within:ring-2 focus-within:ring-white/25">
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            disabled={isUnlocking}
            className="w-48 sm:w-56 bg-transparent px-4 py-2 text-[16px] md:text-sm text-white placeholder-white/50 outline-none pr-10 font-sans tracking-wide"
          />

          {/* Circular Enter Button inside pill */}
          <button
            type="submit"
            disabled={isUnlocking}
            aria-label="Unlock system"
            className="absolute right-1 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 active:scale-90 flex items-center justify-center text-white transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
