"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const DesktopContext = createContext(null);

export const DEFAULT_APPS = [
  {
    id: "projects",
    title: "Projects — Finder",
    iconSrc: "/images/icons/projects.png",
    defaultWidth: 780,
    defaultHeight: 520,
    defaultPosition: { x: 60, y: 50 },
  },
  {
    id: "terminal",
    title: "Terminal — zsh — 80x24",
    iconSrc: "/images/icons/terminal.png",
    defaultWidth: 680,
    defaultHeight: 460,
    defaultPosition: { x: 140, y: 90 },
  },
  {
    id: "skills",
    title: "Technical Stack & Proficiencies",
    iconSrc: "/images/icons/skills.png",
    defaultWidth: 720,
    defaultHeight: 480,
    defaultPosition: { x: 220, y: 70 },
  },
  {
    id: "about",
    title: "About — System Information",
    iconSrc: "/images/icons/about.png",
    defaultWidth: 740,
    defaultHeight: 520,
    defaultPosition: { x: 120, y: 60 },
  },
  {
    id: "chat",
    title: "AI Assistant — Ask xCM",
    iconSrc: "/images/icons/chatbot.png",
    defaultWidth: 660,
    defaultHeight: 520,
    defaultPosition: { x: 240, y: 70 },
  },
  {
    id: "modeltrainer",
    title: "Notebooks — Data Science Directory",
    iconSrc: "/images/icons/modeltrainer.png",
    defaultWidth: 820,
    defaultHeight: 560,
    defaultPosition: { x: 160, y: 65 },
  },
  {
    id: "resume",
    title: "Resume — Curriculum Vitae",
    iconSrc: "/images/icons/resume.png",
    defaultWidth: 720,
    defaultHeight: 520,
    defaultPosition: { x: 200, y: 75 },
  },
  {
    id: "contact",
    title: "Mail — Send Inquiry",
    iconSrc: "/images/icons/mail.png",
    defaultWidth: 620,
    defaultHeight: 490,
    defaultPosition: { x: 180, y: 110 },
  },
];

export function DesktopProvider({ children }) {
  // Real-time time formatting (e.g., "Mon Sep 28  9:41 AM")
  const [formattedTime, setFormattedTime] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      setFormattedTime(timeStr);
      setFormattedDate(dateStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Window states dictionary keyed by appId
  const [windows, setWindows] = useState({
    projects: {
      id: "projects",
      title: "Projects — Finder",
      iconSrc: "/images/icons/projects.png",
      isOpen: true, // Open by default as the showcase
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 80, y: 45 },
      size: { width: 800, height: 530 },
    },
    terminal: {
      id: "terminal",
      title: "Terminal — zsh — 80x24",
      iconSrc: "/images/icons/terminal.png",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 11,
      position: { x: 160, y: 85 },
      size: { width: 680, height: 460 },
    },
    skills: {
      id: "skills",
      title: "Technical Stack & Proficiencies",
      iconSrc: "/images/icons/skills.png",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 12,
      position: { x: 220, y: 70 },
      size: { width: 720, height: 480 },
    },
    about: {
      id: "about",
      title: "About — Admin Information",
      iconSrc: "/images/icons/about.png",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 13,
      position: { x: 120, y: 60 },
      size: { width: 740, height: 520 },
    },
    chat: {
      id: "chat",
      title: "AI Assistant — Ask xCM",
      iconSrc: "/images/icons/chatbot.png",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 14,
      position: { x: 240, y: 70 },
      size: { width: 660, height: 520 },
    },
    modeltrainer: {
      id: "modeltrainer",
      title: "Notebooks — Data Science Directory",
      iconSrc: "/images/icons/modeltrainer.png",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 15,
      position: { x: 160, y: 65 },
      size: { width: 820, height: 560 },
    },
    resume: {
      id: "resume",
      title: "Resume — Curriculum Vitae",
      iconSrc: "/images/icons/resume.png",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 16,
      position: { x: 200, y: 75 },
      size: { width: 720, height: 520 },
    },
    contact: {
      id: "contact",
      title: "Mail — Send Inquiry",
      iconSrc: "/images/icons/mail.png",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 17,
      position: { x: 200, y: 100 },
      size: { width: 620, height: 490 },
    },
    music: {
      id: "music",
      title: "Music",
      iconSrc: null,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 18,
      position: { x: 260, y: 65 },
      size: { width: 320, height: 560 },
    },
  });

  const [activeWindowId, setActiveWindowId] = useState("projects");
  const [highestZIndex, setHighestZIndex] = useState(20);

  // Focus a window and bring it to top
  const focusWindow = useCallback((appId) => {
    setHighestZIndex((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prev) => {
        if (!prev[appId]) return prev;
        return {
          ...prev,
          [appId]: {
            ...prev[appId],
            zIndex: nextZ,
            isMinimized: false,
          },
        };
      });
      return nextZ;
    });
    setActiveWindowId(appId);
  }, []);

  // Open app or unminimize & focus if already open
  const openApp = useCallback((appId) => {
    setWindows((prev) => {
      const target = prev[appId];
      if (!target) return prev;
      return {
        ...prev,
        [appId]: {
          ...target,
          isOpen: true,
          isMinimized: false,
        },
      };
    });
    focusWindow(appId);
  }, [focusWindow]);

  // Close window
  const closeWindow = useCallback((appId) => {
    setWindows((prev) => {
      if (!prev[appId]) return prev;
      return {
        ...prev,
        [appId]: {
          ...prev[appId],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        },
      };
    });
    setActiveWindowId((prevActive) => {
      if (prevActive === appId) {
        return null;
      }
      return prevActive;
    });
  }, []);

  // Minimize window to dock
  const minimizeWindow = useCallback((appId) => {
    setWindows((prev) => {
      if (!prev[appId]) return prev;
      return {
        ...prev,
        [appId]: {
          ...prev[appId],
          isMinimized: true,
        },
      };
    });
    setActiveWindowId((prevActive) => (prevActive === appId ? null : prevActive));
  }, []);

  // Toggle maximize / fullscreen
  const toggleMaximizeWindow = useCallback((appId) => {
    setWindows((prev) => {
      if (!prev[appId]) return prev;
      return {
        ...prev,
        [appId]: {
          ...prev[appId],
          isMaximized: !prev[appId].isMaximized,
        },
      };
    });
    focusWindow(appId);
  }, [focusWindow]);

  return (
    <DesktopContext.Provider
      value={{
        windows,
        activeWindowId,
        openApp,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        focusWindow,
        formattedTime,
        formattedDate,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error("useDesktop must be used within a DesktopProvider");
  }
  return context;
}
