import React, { useState } from 'react';
import { User, ExternalLink, Code2 } from 'lucide-react';
import { aboutData } from '@/data/aboutdata';
import Image from "next/image";

const codingProfiles = [
  {
    name: 'LeetCode',
    handle: 'AmAn',
    url: 'https://leetcode.com/u/F8uHcUstNr/',
    icon: 'https://cdn.simpleicons.org/leetcode',
  },
  {
    name: 'Codeforces',
    handle: 'AmAn',
    url: 'https://codeforces.com/profile/amansonwani005',
    icon: 'https://cdn.simpleicons.org/codeforces',
  },
  {
    name: 'CodeChef',
    handle: 'AmAn',
    url: 'https://www.codechef.com/users/amanx13',
    icon: 'https://cdn.simpleicons.org/codechef',
  },
];

function ProfileIcon({ profile }) {
  const [failed, setFailed] = useState(false);

  if (failed) return <Code2 className="w-4 h-4 text-white/60" />;

  return (
    <img
      src={profile.icon}
      alt={profile.name}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className="w-7 h-7 object-contain"
    />
  );
}

export default function AboutApp() {
  const [avatarError, setAvatarError] = useState(false);
  const { profile, bio, currentFocus, trivia, socials } = aboutData;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#1a1a1a] text-white overflow-y-auto md:overflow-hidden select-none font-sans">
      {/* 1. Left Pane (Profile) */}
      <aside className="w-full md:w-1/3 bg-[#141414] border-b md:border-b-0 md:border-r border-white/10 p-6 md:p-8 shrink-0 flex flex-col items-center justify-center text-center">
        {/* Avatar */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/10 mb-3 md:mb-4 shadow-xl bg-white/5 flex items-center justify-center shrink-0 relative">
          {!avatarError ? (
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={112}
              height={112}
              className="w-full h-full object-cover"
              onError={() => setAvatarError(true)}
              priority
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-black/90 flex items-center justify-center text-white">
              <User className="w-12 h-12 text-white/80" />
            </div>
          )}
        </div>

        {/* Name & Title */}
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-white">
          {profile.name}
        </h1>
        <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2 leading-snug max-w-xs">
          {profile.title}
        </p>
        {profile.tagline && (
          <p className="text-[11px] md:text-xs text-white/40 mt-1 italic max-w-xs">
            {profile.tagline}
          </p>
        )}

        {/* Social Links */}
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-sm group"
            >
              <i className={`${social.icon} text-base md:text-lg group-hover:scale-110 transition-transform`} />
            </a>
          ))}
        </div>
      </aside>

      {/* 2. Right Pane (Scrollable Content) */}
      <main className="flex-1 p-6 md:p-8 space-y-8 md:space-y-10 md:overflow-y-auto">
        {/* Bio Section */}
        <section>
          <h2 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">
            About Me
          </h2>
          <p className="text-white/80 leading-relaxed text-sm md:text-base">
            {bio}
          </p>
        </section>

        {/* Competitive Programming (List) */}
        <section>
          <h2 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
            Competitive Programming
          </h2>
          <div className="flex flex-wrap gap-3">
            {codingProfiles.map((cp) => (
              <a
                key={cp.name}
                href={cp.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${cp.name} (@${cp.handle})`}
                aria-label={`${cp.name} profile`}
                className="group flex flex-col items-center gap-1.5 w-20"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105 transition-all shadow-sm">
                  <ProfileIcon profile={cp} />
                </div>
                <span className="text-[11px] font-medium text-white/60 group-hover:text-white text-center leading-tight truncate w-full transition-colors">
                  {cp.name}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Current Focus (List) */}
        <section>
          <h2 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
            Currently Building
          </h2>
          <ul className="divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden bg-white/5">
            {currentFocus.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3 px-4 py-3.5 hover:bg-white/10 transition-colors"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Personal Trivia (List) */}
        <section>
          <h2 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">
            Beyond the Code
          </h2>
          <div className="divide-y divide-white/5 border-t border-b border-white/5">
            {trivia.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center py-3 gap-4"
              >
                <span className="text-xs font-medium text-white/50 uppercase tracking-wider shrink-0">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-white/90 text-right">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}