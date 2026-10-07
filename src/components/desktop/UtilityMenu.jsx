"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  Battery,
  Activity,
  Cpu,
  HardDrive,
} from "lucide-react";

export default function UtilityMenu({ isOpen, onClose }) {
  // 1. Hardware Specs & Fluctuation State
  const [hardware, setHardware] = useState(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      return {
        cores: navigator.hardwareConcurrency || 8,
        totalRam: navigator.deviceMemory || 8,
      };
    }
    return { cores: 8, totalRam: 8 };
  });
  const [cpuUsage, setCpuUsage] = useState(5);
  const [ramUsage, setRamUsage] = useState(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const totalRam = navigator.deviceMemory || 8;
      return Number((totalRam * 0.28).toFixed(1));
    }
    return 2.2;
  });

  // Realistic Resource Monitor Simulation (fluctuates every 1.5s when open)
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      // CPU fluctuates between 2% and 15%
      setCpuUsage(Math.floor(Math.random() * 13) + 2);

      // RAM fluctuates gently around baseline
      setHardware((prev) => {
        const base = prev.totalRam * 0.28;
        const delta = Math.random() * 0.3 - 0.15;
        const current = Math.min(prev.totalRam - 0.5, Math.max(1.2, base + delta));
        setRamUsage(Number(current.toFixed(1)));
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const ramPercentage = Math.round((ramUsage / hardware.totalRam) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle click-outside backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-[99] bg-black/20"
          />

          {/* Utility Menu Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-[100] w-[calc(100vw-24px)] max-w-sm sm:w-80 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-5 text-white select-none ring-1 ring-white/10 flex flex-col gap-4 font-sans"
          >
            {/* Header: Quick Status */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-semibold tracking-tight text-white">Quick Settings</h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                xCM OS
              </span>
            </div>

            {/* Quick Status Cards: Wi-Fi & Battery */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Wi-Fi Card */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Wifi className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-white truncate">Wi-Fi</div>
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span>Connected</span>
                  </div>
                </div>
              </div>

              {/* Battery Card */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Battery className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-white truncate">Battery</div>
                  <div className="text-[10px] text-neutral-300 font-mono">100% Full</div>
                </div>
              </div>
            </div>

            {/* Resource Monitor */}
            <div className="flex flex-col gap-3 border-t border-white/10 pt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white/90">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Resource Monitor</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">
                  {hardware.cores} Cores / {hardware.totalRam} GB
                </span>
              </div>

              {/* CPU Meter */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-neutral-500" /> CPU Usage
                  </span>
                  <span className="font-mono text-white font-medium">{cpuUsage}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700 ease-out rounded-full"
                    style={{ width: `${Math.min(100, Math.max(3, cpuUsage))}%` }}
                  />
                </div>
              </div>

              {/* Memory Meter */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <HardDrive className="w-3 h-3 text-neutral-500" /> Memory (RAM)
                  </span>
                  <span className="font-mono text-white font-medium">
                    {ramUsage} / {hardware.totalRam} GB ({ramPercentage}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-700 ease-out rounded-full"
                    style={{ width: `${Math.min(100, Math.max(5, ramPercentage))}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
