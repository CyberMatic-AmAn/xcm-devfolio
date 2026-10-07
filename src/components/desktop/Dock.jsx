"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Wifi,
  Battery,
} from "lucide-react";
import { useDesktop } from "@/context/DesktopContext";
import DockItem from "./DockItem";
import startIcon from "@/images/start/start.png";

const DOCK_APPS = [
  {
    id: "projects",
    label: "Projects",
    iconSrc: "/images/icons/projects.png",
    hideOnMobile: true,
  },
  {
    id: "terminal",
    label: "Terminal",
    iconSrc: "/images/icons/terminal.png",
    hideOnMobile: false,
  },
  {
    id: "skills",
    label: "Skills",
    iconSrc: "/images/icons/skills.png",
    hideOnMobile: true,
  },
  {
    id: "about",
    label: "About",
    iconSrc: "/images/icons/about.png",
    hideOnMobile: true,
  },
  {
    id: "modeltrainer",
    label: "Notebooks",
    iconSrc: "/images/icons/modeltrainer.png",
    hideOnMobile: true,
  },
  {
    id: "resume",
    label: "Resume",
    iconSrc: "/images/icons/resume.png",
    hideOnMobile: true,
  },
  {
    id: "contact",
    label: "Mail",
    iconSrc: "/images/icons/mail.png",
    hideOnMobile: true,
  },
  {
    id: "chat",
    label: "AI Chat",
    iconSrc: "/images/icons/chatbot.png",
    hideOnMobile: false,
  },
];

function StartButton({ mouseX, isOpen, onTrigger }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Compute distance from pointer X to Start button center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current ? ref.current.getBoundingClientRect() : { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate dynamic width with fluid spring curve matching dock physics (up to 1.5x)
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 12 });

  return (
    <div className="relative flex flex-col items-center z-10">
      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-9 px-2.5 py-0.5 rounded-md bg-neutral-900/90 text-white text-[11px] font-medium tracking-tight whitespace-nowrap shadow-lg border border-white/15 pointer-events-none z-50 backdrop-blur-md"
          >
            Start
          </motion.div>
        )}
      </AnimatePresence>

      {/* Semantic motion.button with proper touch/click handling */}
      <motion.button
        ref={ref}
        type="button"
        style={{ width, height: width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTap={onTrigger}
        onClick={onTrigger}
        whileTap={{ scale: 0.92 }}
        className={`relative z-10 rounded-2xl p-2.5 flex items-center justify-center shadow-lg border border-white/20 transition-shadow hover:shadow-2xl cursor-pointer select-none touch-manipulation group ${
          isOpen
            ? "bg-white/25 border-white/40 shadow-2xl ring-2 ring-white/20"
            : "bg-white/10 hover:bg-white/20 hover:border-white/30"
        }`}
        aria-label="Start Menu"
        aria-expanded={isOpen}
      >
        <div className="relative w-full h-full flex items-center justify-center [transform:translateZ(0)] pointer-events-none">
          <Image
            src={startIcon}
            alt="Start"
            width={64}
            height={64}
            className="w-full h-full object-contain drop-shadow-sm select-none pointer-events-none transform-gpu"
            priority
            unoptimized
          />
        </div>
      </motion.button>

      {/* Active Dot Indicator when Start Menu is open */}
      <div className="h-1 mt-1 flex items-center justify-center pointer-events-none">
        {isOpen && (
          <motion.span
            layoutId="start-dot"
            className="w-1 h-1 rounded-full bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)]"
          />
        )}
      </div>
    </div>
  );
}

export default function Dock({
  onLock,
  onRestart,
  isStartOpen: externalIsStartOpen,
  onToggleStart,
  isUtilityOpen: externalIsUtilityOpen,
  onToggleUtility,
}) {
  const { windows, openApp } = useDesktop();
  const mouseX = useMotionValue(Infinity);
  const [internalIsStartOpen, setInternalIsStartOpen] = useState(false);
  const isStartOpen = externalIsStartOpen !== undefined ? externalIsStartOpen : internalIsStartOpen;

  const [internalIsUtilityOpen, setInternalIsUtilityOpen] = useState(false);
  const isUtilityOpen = externalIsUtilityOpen !== undefined ? externalIsUtilityOpen : internalIsUtilityOpen;

  const lastActionTimeRef = useRef(0);

  // Robust debounce handler preventing tap+click collision double-toggles
  const handleToggleStart = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 250) return;
    lastActionTimeRef.current = now;
    if (onToggleStart) {
      onToggleStart();
    } else {
      setInternalIsStartOpen((prev) => !prev);
    }
  }, [onToggleStart]);

  const handleToggleUtility = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 250) return;
    lastActionTimeRef.current = now;
    if (onToggleUtility) {
      onToggleUtility();
    } else {
      setInternalIsUtilityOpen((prev) => !prev);
    }
  }, [onToggleUtility]);

  const handleAppLaunch = useCallback((appId) => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 250) return;
    lastActionTimeRef.current = now;
    openApp(appId);
  }, [openApp]);

  // Pointer tracking for dock hover/glide magnification
  const handlePointerMove = (e) => {
    mouseX.set(e.pageX || e.clientX);
  };

  const handlePointerLeave = () => {
    mouseX.set(Infinity);
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 select-none">
      {/* Unified Pointer-Tracked Floating Pill Container */}
      <motion.nav
        onPointerDown={(e) => mouseX.set(e.pageX || e.clientX)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
        onPointerLeave={handlePointerLeave}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ touchAction: "none" }}
        className="w-fit mx-auto flex items-end gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/10 max-w-[95vw] touch-none"
        aria-label="App Dock"
      >
        {/* Left Zone: Start Button */}
        <div className="flex items-end">
          <StartButton
            mouseX={mouseX}
            isOpen={isStartOpen}
            onTrigger={handleToggleStart}
          />
        </div>

        {/* Center Zone: Application Icons */}
        <div className="flex items-end gap-2 sm:gap-2.5">
          {DOCK_APPS.map((app) => (
            <DockItem
              key={app.id}
              mouseX={mouseX}
              app={app}
              isOpen={windows[app.id]?.isOpen}
              onTrigger={() => handleAppLaunch(app.id)}
            />
          ))}
        </div>

        {/* Subtle Vertical Divider between Apps and Utilities */}
        <div className="w-px h-8 bg-white/20 self-center mx-1 pointer-events-none" />

        {/* Right Zone: Bordered Utilities Container (Wi-Fi & Battery only, Strictly No Text) */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={handleToggleUtility}
            className={`h-12 flex items-center gap-3 px-3.5 rounded-2xl border transition-all shadow-sm cursor-pointer select-none touch-manipulation group ${
              isUtilityOpen
                ? "bg-white/25 border-white/40 ring-2 ring-white/20 shadow-xl"
                : "bg-white/5 hover:bg-white/15 border-white/20 hover:border-white/30"
            }`}
            title="Quick Settings & Utilities"
            aria-label="Quick Settings & Utilities"
            aria-expanded={isUtilityOpen}
          >
            {/* Wi-Fi */}
            <div
              title="Wi-Fi: Connected"
              aria-label="Wi-Fi"
              className="flex items-center justify-center text-white/90 select-none pointer-events-none group-hover:scale-105 transition-transform"
            >
              <Wifi className="w-6 h-6 drop-shadow-sm" />
            </div>

            {/* Battery */}
            <div
              title="Battery: 100%"
              aria-label="Battery"
              className="flex items-center justify-center text-emerald-400 select-none pointer-events-none group-hover:scale-105 transition-transform"
            >
              <Battery className="w-6 h-6 drop-shadow-sm" />
            </div>
          </button>

          {/* Active Dot Indicator when Utility Menu is open */}
          <div className="h-1 mt-1 flex items-center justify-center pointer-events-none">
            {isUtilityOpen && (
              <motion.span
                layoutId="utility-dot"
                className="w-1 h-1 rounded-full bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)]"
              />
            )}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
