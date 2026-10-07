"use client";

import React from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { useDesktop } from "@/context/DesktopContext";

/**
 * WindowFrame Component
 * Draggable, stackable window wrapper with:
 * - Windows-style top-right window controls (Minus, Square, X)
 * - Custom hover states: subtle gray for Minimize/Maximize, classic red for Close
 * - Full header drag handle and double-click maximize
 * - Dynamic zIndex focus elevation
 * - Seamless maximized / restored layout transitions
 */
export default function WindowFrame({
  id,
  title,
  children,
  defaultWidth = 750,
  defaultHeight = 500,
  defaultPosition = { x: 100, y: 60 },
  frameless = false,
}) {
  const {
    windows,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
  } = useDesktop();

  const dragControls = useDragControls();

  const win = windows[id];

  if (!win || !win.isOpen || win.isMinimized) {
    return null;
  }

  const isActive = activeWindowId === id;
  const isMaximized = win.isMaximized;

  return (
    <AnimatePresence>
      <motion.div
        drag={!isMaximized}
        dragControls={dragControls}
        dragListener={frameless}
        dragMomentum={false}
        dragElastic={0}
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onPointerDown={() => focusWindow(id)}
        style={{
          zIndex: win.zIndex,
          ...(isMaximized
            ? {
                top: 0, // Full top edge since TopBar is removed
                left: 0,
                right: 0,
                bottom: 70, // Above Dock
                width: "100%",
                height: "calc(100vh - 72px)",
                position: "fixed",
              }
            : {
                width: frameless
                  ? win.size?.width || defaultWidth
                  : Math.min(
                      win.size?.width || defaultWidth,
                      typeof window !== "undefined" ? window.innerWidth - 30 : defaultWidth
                    ),
                height: frameless ? "auto" : win.size?.height || defaultHeight,
                top: defaultPosition.y,
                left: defaultPosition.x,
                position: "absolute",
              }),
        }}
        className={`flex flex-col select-none transition-shadow pointer-events-auto ${
          frameless
            ? "bg-transparent border-0 shadow-none overflow-visible"
            : `bg-neutral-900/90 backdrop-blur-2xl border text-white overflow-hidden ${
                isMaximized ? "rounded-none border-x-0" : "rounded-xl border-white/15"
              } ${
                isActive
                  ? "shadow-[0_22px_70px_rgba(0,0,0,0.7)] border-white/25 ring-1 ring-white/10"
                  : "shadow-[0_12px_35px_rgba(0,0,0,0.5)] border-white/10 opacity-95"
              }`
        }`}
      >
        {/* Window Header Bar / Drag Handle (Hidden if frameless) */}
        {!frameless && (
          <div
            onPointerDown={(e) => {
              focusWindow(id);
              if (e.button === 0 && !e.target.closest("button")) {
                dragControls.start(e);
              }
            }}
            onDoubleClick={() => toggleMaximizeWindow(id)}
            style={{ touchAction: "none" }}
            className={`h-9 flex items-center justify-between border-b border-white/10 handle drag-handle cursor-grab active:cursor-grabbing select-none ${
              isActive ? "bg-white/[0.08]" : "bg-white/[0.03]"
            }`}
          >
            {/* Left: Window Title */}
            <div className="px-3 flex items-center gap-2 pointer-events-none">
              {(win.iconSrc || `/images/icons/${id}.png`) && (
                <img
                  src={
                    win.iconSrc ||
                    (id === "chat"
                      ? "/images/icons/chatbot.png"
                      : id === "contact"
                      ? "/images/icons/mail.png"
                      : `/images/icons/${id}.png`)
                  }
                  alt=""
                  className="w-4 h-4 object-contain drop-shadow-sm select-none"
                />
              )}
              <span className="text-xs font-medium text-white/90 tracking-tight">
                {title || win.title}
              </span>
            </div>

            {/* Right: Windows-Style Control Buttons sitting flush */}
            <div className="flex items-center h-full">
              {/* Minimize */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(id);
                }}
                className="h-full px-3.5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Minimize"
                title="Minimize"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {/* Maximize */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMaximizeWindow(id);
                }}
                className="h-full px-3.5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Maximize"
                title="Maximize"
              >
                <Square className="w-3 h-3" />
              </button>

              {/* Close */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(id);
                }}
                className="h-full px-3.5 flex items-center justify-center text-white/70 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Window Content Body */}
        <div
          className={`flex-1 flex flex-col ${
            frameless ? "bg-transparent overflow-visible" : "overflow-auto bg-neutral-950/80 text-white"
          }`}
        >
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
