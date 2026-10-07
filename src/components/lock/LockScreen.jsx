"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoginCard from "./LoginCard";
import wallpaperImg from "@/images/wallpaper/wall.webp";

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "TH";
  switch (day % 10) {
    case 1:
      return "ST";
    case 2:
      return "ND";
    case 3:
      return "RD";
    default:
      return "TH";
  }
}

function formatLockDate(date) {
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const month = date.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
  return `${weekday}, ${day}${suffix} ${month}`;
}

function formatLockTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return {
    time: `${hours}:${minutes}`,
    ampm,
  };
}

/**
 * LockScreen Component
 * Minimalist Interactive UI:
 * - Huge Typographic Time & Date Widget in the upper half
 * - Only interactive element is the password input pill & submit button in LoginCard
 * - Auxiliary action buttons (Sleep, Restart, Shut Down, etc.) removed
 */
export default function LockScreen({ onUnlock }) {
  const [timeData, setTimeData] = useState(() => formatLockTime(new Date()));
  const [dateText, setDateText] = useState(() => formatLockDate(new Date()));

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeData(formatLockTime(now));
      setDateText(formatLockDate(now));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 w-full h-[100dvh] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* High-res Wallpaper Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('${wallpaperImg.src}')`,
          backgroundColor: "#0d1117",
        }}
      >
        {/* Subtle Dark Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-indigo-950/60 to-purple-950/40 mix-blend-multiply" />
      </div>

      {/* Dim Overlay for legibility */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Upper Half: Large Typographic Time & Date Widget */}
      <header className="relative z-10 w-full pt-14 sm:pt-20 flex flex-col items-center justify-center text-center">
        {/* Time Container: Flex layout aligning the main time and AM/PM marker */}
        <div className="flex items-baseline gap-2.5 sm:gap-3.5">
          <span className="text-8xl sm:text-9xl font-bold tracking-tight text-white drop-shadow-lg font-sans leading-none">
            {timeData.time}
          </span>
          <span className="text-2xl sm:text-3xl font-semibold tracking-wider text-white drop-shadow-md uppercase">
            {timeData.ampm}
          </span>
        </div>

        {/* Date Subtext: Uppercase, widely tracked, drop shadow */}
        <div className="mt-3 sm:mt-4 text-base sm:text-xl font-medium tracking-[0.2em] uppercase text-white drop-shadow-md">
          {dateText}
        </div>
      </header>

      {/* Center Section: User Login Card (Only interactive element on screen) */}
      <main className="relative z-10 flex flex-col items-center justify-center pb-12 sm:pb-16">
        <LoginCard onUnlock={onUnlock} userName="Developer" />
      </main>

      {/* Subtle bottom spacing to keep composition balanced without any buttons */}
      <div className="h-6" />
    </motion.div>
  );
}
