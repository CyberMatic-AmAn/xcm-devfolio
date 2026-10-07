"use client";

import React, { useState } from "react";
import { Send, Mail, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, XTwitterIcon } from "@/components/ui/Icons";
import { profileData } from "@/data/aboutdata";

export default function ContactApp() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // A mailto link can't set the sender, so the visitor's address goes in the body
    const body = senderEmail.trim()
      ? `${message.trim()}\n\n--\nReply to: ${senderEmail.trim()}`
      : message.trim();

    const mailto =
      `mailto:${profileData.email}` +
      `?subject=${encodeURIComponent(subject.trim() || "Portfolio enquiry")}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSubject("");
      setMessage("");
      setSenderEmail("");
    }, 4000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col h-full bg-neutral-950/80 text-white select-none"
    >
      {/* Mail Header / Form Fields */}
      <div className="border-b border-white/10 p-4 space-y-2.5 bg-neutral-900/50">
        <div className="flex items-center text-xs">
          <span className="w-16 text-neutral-400 font-medium">To:</span>
          <span className="px-2 py-0.5 rounded-md bg-blue-600/30 text-blue-300 font-mono text-[11px] border border-blue-500/30 truncate">
            {profileData.email}
          </span>
        </div>

        <div className="flex items-center text-xs">
          <span className="w-16 text-neutral-400 font-medium">From:</span>
          <input
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="your-email@domain.com (optional)"
            className="flex-1 min-w-0 bg-transparent border-b border-white/10 pb-0.5 outline-none text-white text-[16px] md:text-xs placeholder-neutral-500 focus:border-white/30"
          />
        </div>

        <div className="flex items-center text-xs">
          <span className="w-16 text-neutral-400 font-medium">Subject:</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Project collaboration / Opportunity"
            className="flex-1 min-w-0 bg-transparent border-b border-white/10 pb-0.5 outline-none text-white text-[16px] md:text-xs placeholder-neutral-500 focus:border-white/30"
          />
        </div>
      </div>

      {/* Message Body Input */}
      <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Hi ${profileData.name}, I'd love to connect regarding...`}
          className="w-full flex-1 min-h-[120px] bg-transparent border-none outline-none resize-none text-[16px] md:text-sm text-neutral-200 placeholder-neutral-500 leading-relaxed font-sans"
        />

        {/* Footer with Send Button & Social Links */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition flex items-center justify-center"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition flex items-center justify-center"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.x}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition flex items-center justify-center"
              title="X"
            >
              <XTwitterIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition flex items-center justify-center"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={sent || !message.trim()}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium shadow-md transition cursor-pointer"
          >
            {sent ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Opening Mail App...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}