"use client";

import React, { useState } from "react";
import {
  Wifi,
  Battery,
  SlidersHorizontal,
  Search,
  Lock,
  RotateCcw,
} from "lucide-react";
import { useDesktop } from "@/context/DesktopContext";

const APP_NAMES = {
  projects: "Projects",
  terminal: "Terminal",
  skills: "Skills",
  contact: "Mail",
  chat: "AI Chat",
};

export default function TopBar({ onLock, onRestart }) {
  const { activeWindowId, formattedTime, formattedDate } = useDesktop();
  const [activeMenu, setActiveMenu] = useState(null);

  const currentAppName = activeWindowId ? APP_NAMES[activeWindowId] || "Finder" : "Finder";

  const handleMenuClick = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-7 w-full bg-black/40 backdrop-blur-md border-b border-white/10 text-xs px-3 sm:px-4 flex items-center justify-between select-none z-50 text-white/90">
      {/* Left Section: Apple Logo, App Name, Menus */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Apple Logo with System Menu */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("apple")}
            className="flex items-center font-bold text-sm text-white hover:text-white/80 transition cursor-pointer px-1 py-0.5 rounded hover:bg-white/10"
            title="Apple Menu"
          >
            
          </button>

          {activeMenu === "apple" && (
            <div className="absolute top-7 left-0 w-52 bg-neutral-900/90 backdrop-blur-xl border border-white/15 rounded-lg shadow-2xl py-1 z-50 text-[11px] text-white/90">
              <div className="px-3 py-1 font-semibold text-white border-b border-white/10">
                About This System (xCM Portfolio)
              </div>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={() => {
                  setActiveMenu(null);
                  if (onLock) onLock();
                }}
                className="w-full text-left px-3 py-1 hover:bg-blue-600 hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>Lock Screen...</span>
                <span className="text-[10px] text-white/50">⌘L</span>
              </button>
              <button
                onClick={() => {
                  setActiveMenu(null);
                  if (onRestart) onRestart();
                }}
                className="w-full text-left px-3 py-1 hover:bg-blue-600 hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>Restart to Boot...</span>
                <span className="text-[10px] text-white/50">⌘R</span>
              </button>
            </div>
          )}
        </div>

        {/* Current Active App Name */}
        <span className="font-semibold text-white tracking-tight">
          {currentAppName}
        </span>

        {/* Standard Menu Bar Items */}
        <div className="hidden md:flex items-center gap-2 text-white/70">
          <span className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white cursor-pointer transition">
            File
          </span>
          <span className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white cursor-pointer transition">
            Edit
          </span>
          <span className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white cursor-pointer transition">
            View
          </span>
          <span className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white cursor-pointer transition">
            Window
          </span>
          <span className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white cursor-pointer transition">
            Help
          </span>
        </div>
      </div>

      {/* Center Section: Dynamic Date and Time Clock Widget */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div
          className="flex items-center gap-2 px-2.5 py-0.5 rounded hover:bg-white/10 transition cursor-default text-white/90 font-medium text-[11px] sm:text-xs tracking-tight"
          title="macOS System Clock"
        >
          <span>{formattedDate}</span>
          <span className="font-semibold">{formattedTime}</span>
        </div>
      </div>

      {/* Right Section: System Tray */}
      <div className="flex items-center gap-3 text-white/80">
        {/* Search / Spotlight */}
        <button
          className="hover:text-white transition cursor-pointer p-0.5 rounded hover:bg-white/10"
          title="Spotlight Search"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Control Center */}
        <button
          className="hover:text-white transition cursor-pointer p-0.5 rounded hover:bg-white/10"
          title="Control Center"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>

        {/* Wi-Fi */}
        <div className="flex items-center" title="Wi-Fi: Connected">
          <Wifi className="w-3.5 h-3.5" />
        </div>

        {/* Battery with percentage */}
        <div className="flex items-center gap-1 text-[11px]" title="Battery: 100%">
          <span className="hidden sm:inline font-mono text-[10px] text-white/80">
            100%
          </span>
          <Battery className="w-4 h-4 text-emerald-400" />
        </div>

        {/* Quick Lock Button */}
        <button
          onClick={onLock}
          className="hover:text-white transition cursor-pointer p-0.5 rounded hover:bg-white/10 ml-0.5"
          title="Lock Screen"
        >
          <Lock className="w-3.5 h-3.5 text-white/70" />
        </button>
      </div>
    </header>
  );
}
