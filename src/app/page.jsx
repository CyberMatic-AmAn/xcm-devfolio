"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "@/components/boot/BootScreen";
import LockScreen from "@/components/lock/LockScreen";
import Desktop from "@/components/desktop/Desktop";

/**
 * Main OS Lifecycle Coordinator
 * State Machine: 'boot' -> 'lock' -> 'desktop'
 * AnimatePresence manages seamless cross-fades between system stages.
 */
export default function Home() {
  const [stage, setStage] = useState("boot"); // 'boot' -> 'lock' -> 'desktop'

  return (
    <main className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black select-none">
      <AnimatePresence mode="wait">
        {/* Phase 1: Minimalist Boot Screen */}
        {stage === "boot" && (
          <BootScreen
            key="boot"
            onBootComplete={() => setStage("lock")}
          />
        )}

        {/* Phase 2: macOS Lock Screen */}
        {stage === "lock" && (
          <LockScreen
            key="lock"
            onUnlock={() => setStage("desktop")}
            onRestart={() => setStage("boot")}
          />
        )}

        {/* Phase 3: Desktop Environment */}
        {stage === "desktop" && (
          <Desktop
            key="desktop"
            onLock={() => setStage("lock")}
            onRestart={() => setStage("boot")}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
