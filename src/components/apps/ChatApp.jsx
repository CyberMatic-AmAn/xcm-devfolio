"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, AlertCircle } from "lucide-react";

const INITIAL_MESSAGES = [
  {
    id: "init-1",
    role: "ai",
    text: "Hello! I am an exclusive AI assistant created by and representing xCM. Feel free to ask me anything about xCM's engineering background, projects, or interests!",
    timestamp: "Just now",
  },
];

const SUGGESTED_PROMPTS = [
  "What is xCM's core tech stack?",
  "What are xCM's favorite foods?",
  "Who created you?",
];

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/chat`
  : "https://xcm-chatbot.onrender.com/api/chat";

export default function ChatApp() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const idCounterRef = useRef(1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setErrorMsg(null);
    idCounterRef.current += 1;
    const currentId = idCounterRef.current;
    const userMsg = {
      id: `user-${currentId}`,
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: messages
            .filter((m) => !m.isError)
            .map((m) => ({
              role: m.role,
              text: m.text,
            })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      const aiReply = data.reply || "I am unable to formulate a response at this time.";
      idCounterRef.current += 1;
      const aiId = idCounterRef.current;
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${aiId}`,
          role: "ai",
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      console.error("AI Chat Request Failed:", err);
      const isConnectionError =
        err.message.includes("Failed to fetch") || err.message.includes("NetworkError");
      const fallbackText = isConnectionError
        ? "Unable to connect to the server"
        : err.message || "An unexpected error occurred.";

      setErrorMsg(fallbackText);
      idCounterRef.current += 1;
      const errId = idCounterRef.current;
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${errId}`,
          role: "ai",
          text: fallbackText,
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [inputValue, isLoading, messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    setMessages(INITIAL_MESSAGES);
    setErrorMsg(null);
  };

  return (
    <div className="flex flex-col h-full w-full bg-neutral-950/95 text-neutral-100 select-text overflow-hidden font-sans">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/80 backdrop-blur-md border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-black-600 to-black-500 flex items-center justify-center shadow-md">
            <Bot className="w-4 h-4 text-white" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-neutral-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white">xCM AI</span>
            </div>
            <p className="text-[11px] text-neutral-400">Portfolio AI by xCM</p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-400 hover:text-white rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
          title="Reset conversation"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 touch-pan-y overscroll-contain">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 max-w-full ${
                isUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                  isUser
                    ? "bg-blue-600 text-white"
                    : msg.isError
                    ? "bg-rose-500 text-white"
                    : "bg-neutral-800 text-violet-400 border border-white/10"
                }`}
              >
                {isUser ? (
                  <User className="w-3.5 h-3.5" />
                ) : msg.isError ? (
                  <AlertCircle className="w-3.5 h-3.5" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`flex flex-col ${
                  isUser ? "items-end" : "items-start"
                } max-w-[85%] sm:max-w-[78%]`}
              >
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-md ${
                    isUser
                      ? "bg-blue-600 text-white rounded-tr-sm"
                      : msg.isError
                      ? "bg-rose-950/40 text-rose-200 border border-rose-800/40 rounded-tl-sm"
                      : "bg-neutral-800/90 text-neutral-100 border border-white/10 rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[10px] text-neutral-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}

        {/* Typing Bouncing Dots Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center shrink-0 text-violet-400 shadow-sm">
              <Bot className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-neutral-800/90 border border-white/10 flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts (when few messages) */}
      {messages.length <= 2 && !isLoading && (
        <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 border-t border-white/5">
          <span className="text-[11px] text-neutral-400 shrink-0 select-none">Suggested:</span>
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border border-white/10 transition whitespace-nowrap cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Sticky Input Container */}
      <div className="p-3 bg-neutral-900/90 backdrop-blur-md border-t border-white/10 shrink-0">
        <div className="flex items-center gap-2 bg-neutral-800/90 rounded-full px-3.5 py-1.5 border border-white/15 focus-within:border-violet-500/60 focus-within:ring-1 focus-within:ring-violet-500/40 transition shadow-inner">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Ask anything about xCM..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-500 text-[16px] md:text-sm font-sans"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputValue.trim()}
            className="w-7 h-7 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600 flex items-center justify-center text-white transition cursor-pointer shadow-sm shrink-0"
            title="Send Message"
            aria-label="Send Message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-neutral-500 text-center mt-1.5 select-none">
          Answers strictly restricted to verified xCM portfolio knowledge.
        </p>
      </div>
    </div>
  );
}
