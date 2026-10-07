"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Power,
  Lock,
  RotateCcw,
} from "lucide-react";
import { useDesktop } from "@/context/DesktopContext";

const START_APPS = [
  {
    id: "projects",
    label: "Projects",
    iconSrc: "/images/icons/projects.png",
  },
  {
    id: "terminal",
    label: "Terminal",
    iconSrc: "/images/icons/terminal.png",
  },
  {
    id: "skills",
    label: "Skills",
    iconSrc: "/images/icons/skills.png",
  },
  {
    id: "modeltrainer",
    label: "Notebooks",
    iconSrc: "/images/icons/modeltrainer.png",
  },
  {
    id: "resume",
    label: "Resume",
    iconSrc: "/images/icons/resume.png",
  },
  {
    id: "about",
    label: "About",
    iconSrc: "/images/icons/about.png",
  },
  {
    id: "contact",
    label: "Mail",
    iconSrc: "/images/icons/mail.png",
  },
  {
    id: "chat",
    label: "AI Chat",
    iconSrc: "/images/icons/chatbot.png",
  },
];

function Github({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function StartMenu({ isOpen, onClose, onLock, onRestart }) {
  const { openApp } = useDesktop();
  const [searchQuery, setSearchQuery] = useState("");
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const searchInputRef = useRef(null);
  const menuRef = useRef(null);

  // Auto-focus search input when menu opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setSearchQuery("");
    setShowPowerMenu(false);
    onClose();
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleAppClick = (appId) => {
    openApp(appId);
    handleClose();
  };

  const filteredApps = START_APPS.filter((app) =>
    app.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

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
            onClick={handleClose}
            className="fixed inset-0 z-[99] bg-black/25"
          />

          {/* Centered Start Menu Window */}
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 z-[100] w-[90%] max-w-md sm:max-w-lg bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-5 flex flex-col gap-6 text-white select-none ring-1 ring-white/10"
          >
            {/* Top Header (Profile & Search) */}
            <div className="flex items-center gap-3">
              {/* Profile Avatar */}
              <button
                type="button"
                onClick={() => handleAppClick("about")}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:bg-white/20 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white/30 overflow-hidden"
                title="Developer Profile — About"
                aria-label="Open About Profile"
              >
                <img
                  src="/images/icons/about.png"
                  alt="About"
                  className="w-7 h-7 object-contain select-none pointer-events-none"
                />
              </button>

              {/* Flexible Search Bar */}
              <div className="relative flex-1 flex items-center">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Type here to search apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 rounded-full text-[16px] md:text-sm outline-none text-white placeholder-white/50 focus:bg-white/10 focus:border-white/25 transition-colors font-sans"
                />
              </div>
            </div>

            {/* Middle Section (Pinned Apps Grid) */}
            <div className="flex flex-col gap-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/40 px-1">
                Pinned Applications
              </div>

              {filteredApps.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-y-6 gap-x-2">
                  {filteredApps.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => handleAppClick(app.id)}
                      className="flex flex-col items-center justify-center gap-2 cursor-pointer group p-1.5 rounded-xl hover:bg-white/5 transition-all text-center"
                    >
                      {/* App Icon Wrapper */}
                      <div className="w-12 h-12 flex items-center justify-center drop-shadow-md group-hover:scale-110 group-active:scale-95 transition-transform duration-200">
                        <img
                          src={app.iconSrc}
                          alt={app.label}
                          className="w-10 h-10 object-contain drop-shadow-md hover:scale-105 transition-transform select-none pointer-events-none"
                        />
                      </div>
                      {/* App Label */}
                      <span className="text-xs text-white/80 group-hover:text-white transition-colors truncate max-w-[72px]">
                        {app.label}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-white/40 font-mono">
                  No applications found matching &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>

            {/* Bottom Section (Footer: Social Links, Power Options, System Label) */}
            <div className="border-t border-white/10 pt-4 mt-auto flex items-center justify-between w-full">
              {/* Left Group: Power Button & Social Links */}
              <div className="flex items-center gap-2">
                {/* Power Button & Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPowerMenu((prev) => !prev)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors cursor-pointer"
                    title="Power Options"
                    aria-label="Power Options"
                  >
                    <Power className="w-4 h-4 transition-colors" />
                  </button>

                  {/* Power Options Dropdown Popover */}
                  <AnimatePresence>
                    {showPowerMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 bottom-full mb-2 w-44 p-1.5 rounded-xl bg-neutral-900/95 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col gap-1 z-50 ring-1 ring-white/10"
                      >
                        {onLock && (
                          <button
                            type="button"
                            onClick={() => {
                              setShowPowerMenu(false);
                              onClose();
                              onLock();
                            }}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer text-left w-full"
                          >
                            <Lock className="w-3.5 h-3.5 text-neutral-400" />
                            <span>Lock Screen</span>
                          </button>
                        )}
                        {onRestart && (
                          <button
                            type="button"
                            onClick={() => {
                              setShowPowerMenu(false);
                              onClose();
                              onRestart();
                            }}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer text-left w-full"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
                            <span>Restart System</span>
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* GitHub Link */}
                <a
                  href="https://github.com/CyberMatic-AmAn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/aman-sonwani-a95b0a326/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              {/* Right Side: Status / System Info */}
              <div className="text-xs text-white/40 font-mono">
                xCM OS Workstation
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
