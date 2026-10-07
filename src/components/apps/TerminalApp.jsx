"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  terminalCommands,
  neofetchAscii,
  initialTerminalOutput,
} from "@/data/terminaldata";
import { projects } from "@/data/projectdata";
import { skillCategories } from "@/data/skillsdata";
import { profileData } from "@/data/aboutdata";

export default function TerminalApp() {
  const [history, setHistory] = useState(() => initialTerminalOutput);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);
  const pageLoadTimeRef = useRef(0);

  useEffect(() => {
    pageLoadTimeRef.current = Date.now();
  }, []);

  // Auto-scroll to bottom on update
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const getUptime = () => {
    const start = pageLoadTimeRef.current || Date.now();
    const elapsedMs = Math.max(1000, Date.now() - start);
    const totalSecs = Math.floor(elapsedMs / 1000);
    const mins = Math.floor(totalSecs / 60);
    if (mins === 0) return `${totalSecs} secs`;
    return `${mins} min${mins === 1 ? "" : "s"}`;
  };

  const getResolution = () => {
    if (typeof window !== "undefined") {
      return `${window.innerWidth}x${window.innerHeight}`;
    }
    return "1920x1080";
  };

  const getMemory = () => {
    if (
      typeof window !== "undefined" &&
      window.performance &&
      window.performance.memory &&
      window.performance.memory.usedJSHeapSize
    ) {
      const used = Math.round(window.performance.memory.usedJSHeapSize / (1024 * 1024));
      const total = Math.round(window.performance.memory.jsHeapSizeLimit / (1024 * 1024));
      return `${used}MiB / ${total}MiB`;
    }
    const randomUsed = 1024 + Math.floor(Math.random() * 450);
    return `${randomUsed}MiB / 8192MiB`;
  };

  // Dynamic Command Registry consuming modular data files
  const commandHandlers = {
    help: () => terminalCommands.help.map((line) => ({ type: "output", text: line })),

    about: () => [
      { type: "output", text: `=== ${profileData.name} (${profileData.title}) ===` },
      { type: "output", text: `Bio:        ${profileData.bio}` },
      { type: "output", text: `Focus:      ${profileData.stats.focus}` },
      { type: "output", text: `Experience: ${profileData.stats.experience}` },
    ],

    skills: () => [
      { type: "output", text: "=== Technical Proficiencies ===" },
      ...skillCategories.map((cat) => ({
        type: "output",
        text: `${(cat.category + ":").padEnd(20)} ${cat.skills
          .map((s) => (s.level ? `${s.name} [${s.level}]` : s.name))
          .join(", ")}`,
      })),
    ],

    projects: () => [
      { type: "output", text: "=== Featured Builds & Projects ===" },
      ...projects.map((p, idx) => ({
        type: "output",
        text: `${idx + 1}. ${p.title} (${p.tags.join(", ")})\n   ${p.description}\n   URL: ${p.liveUrl || p.githubUrl}`,
      })),
    ],

    contact: () => [
      { type: "output", text: "=== Contact & Socials ===" },
      { type: "output", text: `Email:    ${profileData.email}` },
      { type: "output", text: `GitHub:   ${profileData.socials.github}` },
      { type: "output", text: `LinkedIn: ${profileData.socials.linkedin}` },
      { type: "output", text: `X:        ${profileData.socials.x}` },
    ],

    neofetch: () => [
      {
        type: "neofetch",
        data: {
          info: [
            { key: "OS", val: "xCM OS (Web)" },
            { key: "Host", val: "xCM WebViewENV" },
            { key: "Kernel", val: "Next.js v16" },
            { key: "Uptime", val: getUptime() },
            { key: "Shell", val: "web-bash" },
            { key: "Resolution", val: getResolution() },
            { key: "Stack", val: "Data Science & Ai , Agentic enviroment dev" },
            { key: "Recent Build", val: projects[0]?.title || "AI Mock Interview Platform" },
            { key: "CPU", val: "JavaScript V8 Engine" },
            { key: "Memory", val: getMemory() },
          ],
        },
      },
    ],

    date: () => [{ type: "output", text: new Date().toString() }],

    sudo: () => [
      {
        type: "error",
        text: "sudo: Permission denied. Nice try! With great power comes great responsibility.",
      },
    ],
  };

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) {
      setHistory((prev) => [...prev, { type: "prompt", text: `guest@xcm-os:~$` }]);
      return;
    }

    const [cmd, ...args] = trimmed.split(" ");
    const lowerCmd = cmd.toLowerCase();

    // Clear buffer directly
    if (lowerCmd === "clear") {
      setHistory([]);
      return;
    }

    // Append user input to history
    const newEntry = { type: "prompt", text: `guest@xcm-os:~$ ${trimmed}` };
    let response = [];

    if (commandHandlers[lowerCmd]) {
      response = commandHandlers[lowerCmd]();
    } else if (lowerCmd === "echo") {
      response = [{ type: "output", text: args.join(" ") }];
    } else {
      response = [
        {
          type: "error",
          text: `zsh: command not found: ${cmd}. Type "help" for a list of commands.`,
        },
      ];
    }

    setHistory((prev) => [...prev, newEntry, ...response]);
    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIdx(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIdx + 1 < cmdHistory.length) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal("");
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex-1 bg-black/95 text-emerald-400 font-mono text-xs sm:text-[13px] p-4 overflow-y-auto leading-relaxed cursor-text select-text touch-pan-y overscroll-contain"
    >
      {/* Output History */}
      <div className="space-y-1">
        {history.map((item, idx) => {
          if (item.type === "system") {
            return (
              <div key={idx} className="text-neutral-500">
                {item.text}
              </div>
            );
          }
          if (item.type === "prompt") {
            return (
              <div key={idx} className="text-white font-medium">
                {item.text}
              </div>
            );
          }
          if (item.type === "error") {
            return (
              <div key={idx} className="text-rose-400">
                {item.text}
              </div>
            );
          }
          if (item.type === "info") {
            return (
              <div key={idx} className="text-cyan-400">
                {item.text}
              </div>
            );
          }
          if (item.type === "neofetch") {
            return (
              <div
                key={idx}
                className="my-3 flex items-start gap-4 sm:gap-7 overflow-x-auto max-w-full pb-2 pt-1 font-mono"
              >
                {/* Left Column: ASCII Art */}
                <pre className="text-cyan-400 select-none text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs leading-[1.1] font-mono shrink-0 whitespace-pre">
                  {neofetchAscii}
                </pre>

                {/* Right Column: System Information */}
                <div className="flex flex-col justify-center space-y-1 min-w-[220px] text-xs sm:text-[13px] leading-relaxed shrink-0">
                  <div className="text-white font-bold text-sm sm:text-base">
                    <span className="text-emerald-400">guest</span>@<span className="text-cyan-400">xcm-os</span>
                  </div>
                  <div className="text-neutral-600 font-mono text-xs select-none -mt-1 mb-1">
                    ----------------------------------
                  </div>

                  {item.data.info.map((row, i) => (
                    <div key={i} className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-cyan-400 font-semibold shrink-0">{row.key}:</span>
                      <span className="text-neutral-200">{row.val}</span>
                    </div>
                  ))}

                  {/* Terminal Color Palette */}
                  <div className="flex items-center gap-1.5 pt-2 select-none">
                    <span className="w-3 h-3 rounded-sm bg-neutral-900 border border-neutral-700" />
                    <span className="w-3 h-3 rounded-sm bg-red-500" />
                    <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                    <span className="w-3 h-3 rounded-sm bg-yellow-400" />
                    <span className="w-3 h-3 rounded-sm bg-blue-500" />
                    <span className="w-3 h-3 rounded-sm bg-purple-500" />
                    <span className="w-3 h-3 rounded-sm bg-cyan-400" />
                    <span className="w-3 h-3 rounded-sm bg-neutral-200" />
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div key={idx} className="text-neutral-300 whitespace-pre-wrap">
              {item.text}
            </div>
          );
        })}
      </div>

      {/* Active Input Line */}
      <div className="flex items-center gap-2 mt-1 text-white">
        <span className="text-emerald-400 font-bold select-none">guest@xcm-os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[16px] md:text-sm p-0"
        />
      </div>

      <div ref={terminalEndRef} />
    </div>
  );
}
