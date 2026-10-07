"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { DesktopProvider, useDesktop } from "@/context/DesktopContext";
import Dock from "./Dock";
import StartMenu from "./StartMenu";
import UtilityMenu from "./UtilityMenu";
import WindowFrame from "./WindowFrame";

import ProjectsApp from "@/components/apps/ProjectsApp";
import TerminalApp from "@/components/apps/TerminalApp";
import SkillsApp from "@/components/apps/SkillsApp";
import ContactApp from "@/components/apps/ContactApp";
import ChatApp from "@/components/apps/ChatApp";
import AboutApp from "@/components/apps/AboutApp";
import ModelTrainerApp from "@/components/apps/ModelTrainerApp";
import ResumeApp from "@/components/apps/ResumeApp";
import MusicApp from "@/components/apps/MusicApp";

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

function formatDesktopDate(date) {
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const month = date.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
  return `${weekday}, ${day}${suffix} ${month}`;
}

function formatDesktopTime(date) {
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

function EqualizerWidget({ onOpenMusic }) {
  const COLUMNS = 16;
  const ROWS = 10;
  const [levels, setLevels] = useState(() => Array(COLUMNS).fill(0));

  useEffect(() => {
    // Initial random levels
    setLevels(Array.from({ length: COLUMNS }, () => Math.floor(Math.random() * (ROWS + 1))));

    const interval = setInterval(() => {
      setLevels((prev) => prev.map(() => Math.floor(Math.random() * (ROWS + 1))));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Helper to determine row color
  const getBlockColor = (rowIndex, isActive) => {
    if (!isActive) return "bg-white/5";
    if (rowIndex < 3) return "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"; // Bottom (Blue)
    if (rowIndex < 7) return "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"; // Middle (Purple)
    return "bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]"; // Top (Pink)
  };

  return (
    <div
      onClick={onOpenMusic}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenMusic();
      }}
      title="Launch Secret Music Player"
      aria-label="Launch Secret Music Player"
      className="w-full h-32 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/5 transition-colors flex flex-col justify-end shadow-xl group pointer-events-auto"
    >
      <div className="flex justify-between items-end w-full h-full gap-[2px] md:gap-1">
        {levels.map((colHeight, colIdx) => (
          <div
            key={colIdx}
            className="flex flex-col-reverse justify-start gap-[2px] md:gap-1 w-full h-full"
          >
            {Array.from({ length: ROWS }).map((_, rowIdx) => (
              <div
                key={rowIdx}
                className={`w-full flex-1 rounded-[1px] md:rounded-sm transition-colors duration-[150ms] ${getBlockColor(
                  rowIdx,
                  rowIdx < colHeight
                )}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopContent({ onLock, onRestart }) {
  const { openApp } = useDesktop();
  const [timeData, setTimeData] = useState(() => formatDesktopTime(new Date()));
  const [dateText, setDateText] = useState(() => formatDesktopDate(new Date()));
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isUtilityMenuOpen, setIsUtilityMenuOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState("");

  useEffect(() => {
    const availableGifs = [
      "/images/wallpapers/scene1.gif",
      "/images/wallpapers/scene2.gif",
      "/images/wallpapers/scene3.gif",
      "/images/wallpapers/scene4.gif",
      "/images/wallpapers/scene5.gif",
      "/images/wallpapers/scene6.gif",
      "/images/wallpapers/scene7.gif",
      // "/images/wallpapers/scene8.gif",
    ];

    const randomIndex = Math.floor(Math.random() * availableGifs.length);
    setWallpaper(availableGifs[randomIndex]);
  }, []);

  const handleToggleStartMenu = useCallback(() => {
    setIsStartMenuOpen((prev) => {
      const next = !prev;
      if (next) setIsUtilityMenuOpen(false);
      return next;
    });
  }, []);

  const handleCloseStartMenu = useCallback(() => {
    setIsStartMenuOpen(false);
  }, []);

  const handleToggleUtilityMenu = useCallback(() => {
    setIsUtilityMenuOpen((prev) => {
      const next = !prev;
      if (next) setIsStartMenuOpen(false);
      return next;
    });
  }, []);

  const handleCloseUtilityMenu = useCallback(() => {
    setIsUtilityMenuOpen(false);
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeData(formatDesktopTime(now));
      setDateText(formatDesktopDate(now));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden select-none bg-black relative z-0">
      {/* Dynamic Time-of-Day GIF Wallpaper Background */}
      <div className="absolute inset-0 w-full h-full z-[-1] overflow-hidden bg-black pointer-events-none">
        {wallpaper && (
          <img
            src={wallpaper}
            alt="Desktop Wallpaper"
            className="w-full h-full object-cover opacity-90 transition-opacity duration-1000"
          />
        )}
        {/* Subtle dark ambient gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Background Layer (z-0): Massive Typographic Time & Date Widget and Heatmap Equalizer */}
      <div className="absolute top-[8%] sm:top-[12%] left-1/2 -translate-x-1/2 z-0 flex flex-col items-center text-center select-none w-[90%] max-w-sm sm:max-w-md pointer-events-none">
        {/* Time Container: Flex layout aligning main time & AM/PM marker */}
        <div className="flex items-baseline gap-2.5 sm:gap-3.5 pointer-events-none">
          <span className="text-8xl sm:text-9xl font-bold tracking-tight text-white drop-shadow-lg font-sans leading-none">
            {timeData.time}
          </span>
          <span className="text-2xl sm:text-3xl font-semibold tracking-wider text-white drop-shadow-md uppercase">
            {timeData.ampm}
          </span>
        </div>

        {/* Date Subtext: Uppercase, widely tracked, drop shadow */}
        <div className="mt-3 sm:mt-4 text-base sm:text-xl font-medium tracking-[0.2em] uppercase text-white drop-shadow-md pointer-events-none">
          {dateText}
        </div>

        {/* Heatmap Equalizer Widget: Matching exact width directly below the clock */}
        <div className="w-full mt-6 pointer-events-auto">
          <EqualizerWidget onOpenMusic={() => openApp("music")} />
        </div>
      </div>

      {/* Desktop Workspace & Active Windows (z-10+ floats naturally above the background widget) */}
      <div className="relative w-full h-full pb-20 overflow-hidden pointer-events-none z-10">
        {/* Projects / Finder Window */}
        <WindowFrame
          id="projects"
          title="Projects — Explorer"
          defaultWidth={820}
          defaultHeight={530}
          defaultPosition={{ x: 70, y: 55 }}
        >
          <ProjectsApp />
        </WindowFrame>

        {/* Terminal Window */}
        <WindowFrame
          id="terminal"
          title="Terminal — PowerShell / zsh"
          defaultWidth={680}
          defaultHeight={460}
          defaultPosition={{ x: 160, y: 95 }}
        >
          <TerminalApp />
        </WindowFrame>

        {/* Skills Window */}
        <WindowFrame
          id="skills"
          title="Technical Stack & Proficiencies"
          defaultWidth={720}
          defaultHeight={480}
          defaultPosition={{ x: 230, y: 75 }}
        >
          <SkillsApp />
        </WindowFrame>

        {/* Contact Window */}
        <WindowFrame
          id="contact"
          title="Mail — Send Inquiry"
          defaultWidth={620}
          defaultHeight={490}
          defaultPosition={{ x: 200, y: 110 }}
        >
          <ContactApp />
        </WindowFrame>

        {/* AI Chatbot Window */}
        <WindowFrame
          id="chat"
          title="AI Assistant — Ask xCM"
          defaultWidth={660}
          defaultHeight={520}
          defaultPosition={{ x: 240, y: 70 }}
        >
          <ChatApp />
        </WindowFrame>

        {/* About / Profile Window */}
        <WindowFrame
          id="about"
          title="About — Admin Information"
          defaultWidth={740}
          defaultHeight={520}
          defaultPosition={{ x: 120, y: 60 }}
        >
          <AboutApp />
        </WindowFrame>

        {/* Notebooks Data Science Directory Window */}
        <WindowFrame
          id="modeltrainer"
          title="Notebooks — Data Science Directory"
          defaultWidth={820}
          defaultHeight={560}
          defaultPosition={{ x: 160, y: 65 }}
        >
          <ModelTrainerApp />
        </WindowFrame>

        {/* Resume CV Window */}
        <WindowFrame
          id="resume"
          title="Resume — Curriculum Vitae"
          defaultWidth={720}
          defaultHeight={520}
          defaultPosition={{ x: 200, y: 75 }}
        >
          <ResumeApp />
        </WindowFrame>

        {/* Secret Music Player Window */}
        <WindowFrame
          id="music"
          title="Music"
          defaultWidth={320}
          defaultHeight={560}
          defaultPosition={{ x: 260, y: 65 }}
          frameless={true}
        >
          <MusicApp />
        </WindowFrame>
      </div>

      {/* Floating Three-Zone Dock with System Tray */}
      <Dock
        onLock={onLock}
        onRestart={onRestart}
        isStartOpen={isStartMenuOpen}
        onToggleStart={handleToggleStartMenu}
        isUtilityOpen={isUtilityMenuOpen}
        onToggleUtility={handleToggleUtilityMenu}
      />

      {/* Centered Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={handleCloseStartMenu}
        onLock={onLock}
        onRestart={onRestart}
      />

      {/* Bottom-Right Quick Settings / Utility Menu */}
      <UtilityMenu
        isOpen={isUtilityMenuOpen}
        onClose={handleCloseUtilityMenu}
      />
    </div>
  );
}

export default function Desktop({ onLock, onRestart }) {
  return (
    <DesktopProvider>
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        <DesktopContent onLock={onLock} onRestart={onRestart} />
      </motion.div>
    </DesktopProvider>
  );
}
