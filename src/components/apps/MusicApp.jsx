// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Play,
//   Pause,
//   SkipBack,
//   SkipForward,
//   Volume1,
//   Volume2,
//   VolumeX,
//   X,
//   Music as MusicIcon,
// } from "lucide-react";
// import { useDesktop } from "@/context/DesktopContext";

// export default function MusicApp() {
//   const { closeWindow } = useDesktop();
//   const audioRef = useRef(null);

//   const playlist = [
//     "/lib/song1.mp3",
//     "/lib/song2.mp3",
//     "/lib/song3.mp3",
//     "/lib/song4.mp3",
//   ];
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(0.75);

//   // Sync volume state with audio element
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume;
//     }
//   }, [volume]);

//   // Auto-play when track index changes
//   useEffect(() => {
//     if (audioRef.current) {
//       setCurrentTime(0);
//       setProgress(0);
//       if (isPlaying) {
//         audioRef.current.load();
//         const playPromise = audioRef.current.play();
//         if (playPromise !== undefined) {
//           playPromise.catch((err) => {
//             console.warn("Auto-play error on track change:", err);
//           });
//         }
//       }
//     }
//   }, [currentTrackIndex]);

//   // Audio time update handler
//   const handleTimeUpdate = () => {
//     if (!audioRef.current) return;
//     const cur = audioRef.current.currentTime;
//     const dur = audioRef.current.duration || 0;
//     setCurrentTime(cur);
//     if (dur > 0) {
//       setProgress((cur / dur) * 100);
//     }
//   };

//   // Audio metadata loaded handler
//   const handleLoadedMetadata = () => {
//     if (!audioRef.current) return;
//     setDuration(audioRef.current.duration || 0);
//   };

//   // Toggle Play / Pause
//   const togglePlay = () => {
//     if (!audioRef.current) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       audioRef.current
//         .play()
//         .then(() => {
//           setIsPlaying(true);
//         })
//         .catch((err) => {
//           console.warn("Audio playback interrupted or restricted:", err);
//           setIsPlaying(false);
//         });
//     }
//   };

//   // Skip to previous track
//   const handlePrev = () => {
//     setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
//   };

//   // Skip to next track
//   const handleNext = () => {
//     setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
//   };

//   // Progress scrubbing / clicking
//   const handleSeek = (e) => {
//     if (!audioRef.current || !duration) return;
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const fraction = Math.max(0, Math.min(1, clickX / rect.width));
//     const newTime = fraction * duration;
//     audioRef.current.currentTime = newTime;
//     setCurrentTime(newTime);
//     setProgress(fraction * 100);
//   };

//   // Volume slider
//   const handleVolumeChange = (newVal) => {
//     const clamped = Math.max(0, Math.min(1, newVal));
//     setVolume(clamped);
//     if (audioRef.current) {
//       audioRef.current.volume = clamped;
//     }
//   };

//   // Format seconds to mm:ss
//   const formatTime = (timeInSeconds) => {
//     if (!timeInSeconds || isNaN(timeInSeconds) || timeInSeconds < 0) return "0:00";
//     const mins = Math.floor(timeInSeconds / 60);
//     const secs = Math.floor(timeInSeconds % 60);
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return (
//     <div className="relative select-none w-80 filter drop-shadow-2xl">
//       <audio
//         ref={audioRef}
//         src={playlist[currentTrackIndex]}
//         onTimeUpdate={handleTimeUpdate}
//         onLoadedMetadata={handleLoadedMetadata}
//         onEnded={handleNext}
//         preload="metadata"
//       />

//       {/* Main Container: Heavy frosted glassmorphism */}
//       <div className="bg-black/85 backdrop-blur-3xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] rounded-3xl pb-8 text-white relative overflow-hidden pt-4">
//         {/* Top Header Strip with Close Button */}
//         <div className="flex items-center justify-between px-6 pb-1 handle drag-handle cursor-grab active:cursor-grabbing select-none">
//           <div className="flex items-center gap-1.5 opacity-80 pointer-events-none">
//             <MusicIcon className="w-3.5 h-3.5 text-white" />
//             <span className="text-[11px] font-mono tracking-wider uppercase text-white/90">
//               Music
//             </span>
//           </div>

//           <button
//             type="button"
//             onClick={() => closeWindow("music")}
//             className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
//             title="Close Player"
//             aria-label="Close Music Player"
//           >
//             <X className="w-3.5 h-3.5" />
//           </button>
//         </div>

//         {/* Album Art Placeholder: Frosted glass backdrop */}
//         <div className="bg-white/10 border border-white/10 shadow-inner rounded-2xl w-[85%] mx-auto mt-6 aspect-square flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
//           {/* Animated Vinyl Disc Visualizer */}
//           <div
//             className={`w-3/4 h-3/4 rounded-full border-4 border-white/10 bg-black/50 shadow-2xl flex items-center justify-center relative ${
//               isPlaying ? "animate-[spin_8s_linear_infinite]" : ""
//             }`}
//           >
//             {/* Concentric vinyl groove rings */}
//             <div className="absolute inset-2 rounded-full border border-white/5" />
//             <div className="absolute inset-5 rounded-full border border-white/5" />
//             <div className="absolute inset-8 rounded-full border border-white/5" />

//             {/* Center Label */}
//             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
//               <MusicIcon className="w-5 h-5 text-white drop-shadow" />
//             </div>
//           </div>
//         </div>

//         {/* Progress Bar Container & Fill */}
//         <div className="px-6 mt-6">
//           <div
//             onClick={handleSeek}
//             className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden mt-2 cursor-pointer relative group flex items-center"
//             title="Seek"
//           >
//             <div
//               className="h-full bg-white/90 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all"
//               style={{ width: `${progress}%` }}
//             />
//           </div>

//           {/* Time row: current time and remaining time */}
//           <div className="flex justify-between items-center text-xs text-white/60 mt-2 font-mono">
//             <span>{formatTime(currentTime)}</span>
//             <span>-{formatTime(Math.max(0, duration - currentTime))}</span>
//           </div>
//         </div>

//         {/* Playback Controls with subtle hover state */}
//         <div className="flex items-center justify-center gap-6 mt-6">
//           <button
//             type="button"
//             onClick={handlePrev}
//             className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all cursor-pointer drop-shadow-sm active:scale-90"
//             title="Previous"
//             aria-label="Previous Track"
//           >
//             <SkipBack className="w-6 h-6 fill-current" />
//           </button>

//           <button
//             type="button"
//             onClick={togglePlay}
//             className="w-12 h-12 rounded-full bg-white text-neutral-900 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center shadow-lg cursor-pointer drop-shadow-md"
//             title={isPlaying ? "Pause" : "Play"}
//             aria-label={isPlaying ? "Pause" : "Play"}
//           >
//             {isPlaying ? (
//               <Pause className="w-6 h-6 fill-current" />
//             ) : (
//               <Play className="w-6 h-6 fill-current ml-0.5" />
//             )}
//           </button>

//           <button
//             type="button"
//             onClick={handleNext}
//             className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all cursor-pointer drop-shadow-sm active:scale-90"
//             title="Next"
//             aria-label="Next Track"
//           >
//             <SkipForward className="w-6 h-6 fill-current" />
//           </button>
//         </div>

//         {/* Volume Slider: bg-white/20 track and bg-white/90 level */}
//         <div className="flex items-center gap-3 mt-6 px-6">
//           <button
//             type="button"
//             onClick={() => handleVolumeChange(volume === 0 ? 0.75 : 0)}
//             className="text-white/60 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all cursor-pointer"
//             title={volume === 0 ? "Unmute" : "Mute"}
//             aria-label="Toggle Mute"
//           >
//             {volume === 0 ? (
//               <VolumeX className="w-4 h-4" />
//             ) : (
//               <Volume1 className="w-4 h-4" />
//             )}
//           </button>

//           <div
//             className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
//             onClick={(e) => {
//               const rect = e.currentTarget.getBoundingClientRect();
//               const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
//               handleVolumeChange(fraction);
//             }}
//           >
//             <div
//               className="h-full bg-white/90 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.4)]"
//               style={{ width: `${volume * 100}%` }}
//             />
//           </div>

//           <button
//             type="button"
//             onClick={() => handleVolumeChange(1)}
//             className="text-white/60 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all cursor-pointer"
//             title="Max Volume"
//             aria-label="Max Volume"
//           >
//             <Volume2 className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
  X,
  Music as MusicIcon,
  Shuffle,
  Repeat,
  Repeat1,
  ListMusic,
} from "lucide-react";
import { useDesktop } from "@/context/DesktopContext";

// TODO: edit titles and artists to match your songs
const playlist = [
  { src: "/lib/song1.mp3", title: "Faded", artist: "Alan Walker",},
  { src: "/lib/song2.mp3", title: "Headlights", artist: "Alok",},
  { src: "/lib/song3.mp3", title: "Alone", artist: "Ava Max",},
  
];

// Animated equalizer bars. Each bar gets its own speed and offset so they look random.
function Equalizer({ playing, bars = 4, className = "h-4 gap-[3px]", barClass = "w-[3px] bg-white/90" }) {
  return (
    <div className={`flex items-end ${className}`}>
      {Array.from({ length: bars }).map((_, i) => {
        const duration = 0.6 + ((i * 37) % 10) / 14;
        const delay = -(((i * 53) % 10) / 10);
        return (
          <span
            key={i}
            className={`flex-1 rounded-full ${barClass}`}
            style={{
              height: "100%",
              transformOrigin: "bottom",
              animation: playing ? `eq ${duration}s ease-in-out ${delay}s infinite` : "none",
              transform: playing ? undefined : "scaleY(0.12)",
              transition: "transform 0.4s ease-out",
            }}
          />
        );
      })}
    </div>
  );
}

// Shared styling for range sliders (filled track + round thumb on hover)
const sliderClass =
  "w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/15 " +
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 " +
  "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md " +
  "[&::-webkit-slider-thumb]:scale-0 hover:[&::-webkit-slider-thumb]:scale-100 [&::-webkit-slider-thumb]:transition-transform " +
  "[&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full " +
  "[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0";

const fillStyle = (pct) => ({
  background: `linear-gradient(to right, rgba(255,255,255,0.95) ${pct}%, rgba(255,255,255,0.15) ${pct}%)`,
});

export default function MusicApp() {
  const { closeWindow } = useDesktop();
  const audioRef = useRef(null);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off"); // 'off' | 'all' | 'one'
  const [showQueue, setShowQueue] = useState(false);

  const track = playlist[currentTrackIndex];

  // Sync volume state with audio element
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Auto-play when track index changes
  useEffect(() => {
    if (audioRef.current) {
      setCurrentTime(0);
      setProgress(0);
      if (isPlaying) {
        audioRef.current.load();
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => console.warn("Auto-play error on track change:", err));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setCurrentTime(cur);
    if (dur > 0) setProgress((cur / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback interrupted or restricted:", err);
          setIsPlaying(false);
        });
    }
  };

  const handlePrev = () => {
    // Restart the track if we're more than 3s in, otherwise go back
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => {
      if (shuffle && playlist.length > 1) {
        let next = prev;
        while (next === prev) next = Math.floor(Math.random() * playlist.length);
        return next;
      }
      return (prev + 1) % playlist.length;
    });
  };

  const handleEnded = () => {
    if (repeat === "one" && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }
    if (repeat === "off" && !shuffle && currentTrackIndex === playlist.length - 1) {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      return;
    }
    handleNext();
  };

  const cycleRepeat = () =>
    setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const pct = Number(e.target.value);
    const newTime = (pct / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(pct);
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const formatTime = (t) => {
    if (!t || isNaN(t) || t < 0) return "0:00";
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const RepeatIcon = repeat === "one" ? Repeat1 : Repeat;

  return (
    <div className="relative select-none w-80 filter drop-shadow-2xl">
      <style>{`
        @keyframes eq { 0%,100% { transform: scaleY(0.12); } 50% { transform: scaleY(1); } }
      `}</style>

      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Main Container */}
      <div className="relative bg-black/85 backdrop-blur-3xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] rounded-3xl text-white overflow-hidden">
        {/* Header / drag handle */}
        <div className="flex items-center justify-between px-5 pt-4 handle drag-handle cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-2 pointer-events-none">
            <Equalizer playing={isPlaying} />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/70">
              {isPlaying ? "Now Playing" : "Paused"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => closeWindow("music")}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close Player"
            aria-label="Close Music Player"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Rotating disk */}
        <div className="px-5 mt-5 flex justify-center">
          <div className="relative w-52 h-52">
            {/* Soft outer ring */}
            <div className="absolute -inset-2 rounded-full border border-white/5" />

            {/* Disk: keeps its angle when paused instead of snapping back */}
            <div
              className="absolute inset-0 rounded-full border border-white/10 shadow-2xl flex items-center justify-center animate-[spin_5s_linear_infinite]"
              style={{
                animationPlayState: isPlaying ? "running" : "paused",
                background:
                  "repeating-radial-gradient(circle at center, #0a0a0a 0, #0a0a0a 2px, #161616 3px, #0a0a0a 4px)",
              }}
            >
              {/* Light sheen so the rotation is visible */}
              <div
                className="absolute inset-0 rounded-full opacity-60"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.12) 40deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.12) 220deg, transparent 270deg)",
                }}
              />
              {/* Groove rings */}
              <div className="absolute inset-4 rounded-full border border-white/5" />
              <div className="absolute inset-8 rounded-full border border-white/5" />
              <div className="absolute inset-12 rounded-full border border-white/5" />

              {/* Center label */}
              <div className="relative w-16 h-16 rounded-full bg-blue-600 border-2 border-white/20 flex items-center justify-center shadow-md">
                <MusicIcon className="w-5 h-5 text-white drop-shadow" />
                <div className="absolute w-2 h-2 rounded-full bg-black bottom-1.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Equalizer */}
        <div className="px-6 mt-5">
          <Equalizer
            playing={isPlaying}
            bars={28}
            className="h-12 gap-[3px] w-full"
            barClass="bg-blue-400/80"
          />
        </div>

        {/* Track info */}
        <div className="px-6 mt-4 text-center">
          <h2 className="text-lg font-semibold tracking-tight truncate">{track.title}</h2>
          <p className="text-xs text-white/50 mt-0.5 truncate">{track.artist}</p>
        </div>

        {/* Seek bar */}
        <div className="px-6 mt-4">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className={sliderClass}
            style={fillStyle(progress)}
            aria-label="Seek"
          />
          <div className="flex justify-between text-[11px] text-white/50 mt-2 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(Math.max(0, duration - currentTime))}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-6 mt-3">
          <button
            type="button"
            onClick={() => setShuffle((s) => !s)}
            className={`p-2 rounded-full transition-all cursor-pointer active:scale-90 ${
              shuffle ? "text-blue-400 bg-blue-500/15" : "text-white/40 hover:text-white"
            }`}
            title={shuffle ? "Shuffle on" : "Shuffle off"}
            aria-label="Toggle shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all cursor-pointer active:scale-90"
              title="Previous"
              aria-label="Previous Track"
            >
              <SkipBack className="w-6 h-6 fill-current" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-white text-neutral-900 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.25)] cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all cursor-pointer active:scale-90"
              title="Next"
              aria-label="Next Track"
            >
              <SkipForward className="w-6 h-6 fill-current" />
            </button>
          </div>

          <button
            type="button"
            onClick={cycleRepeat}
            className={`p-2 rounded-full transition-all cursor-pointer active:scale-90 ${
              repeat !== "off" ? "text-blue-400 bg-blue-500/15" : "text-white/40 hover:text-white"
            }`}
            title={`Repeat: ${repeat}`}
            aria-label="Cycle repeat mode"
          >
            <RepeatIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Volume + queue toggle */}
        <div className="flex items-center gap-2 px-6 mt-4 pb-5">
          <button
            type="button"
            onClick={() => setVolume(volume === 0 ? 0.75 : 0)}
            className="text-white/60 hover:text-white p-1 transition-colors cursor-pointer"
            title={volume === 0 ? "Unmute" : "Mute"}
            aria-label="Toggle Mute"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume1 className="w-4 h-4" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className={sliderClass}
            style={fillStyle(volume * 100)}
            aria-label="Volume"
          />

          <button
            type="button"
            onClick={() => setVolume(1)}
            className="text-white/60 hover:text-white p-1 transition-colors cursor-pointer"
            title="Max Volume"
            aria-label="Max Volume"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-white/10 mx-1" />

          <button
            type="button"
            onClick={() => setShowQueue((q) => !q)}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              showQueue ? "text-blue-400 bg-blue-500/15" : "text-white/60 hover:text-white"
            }`}
            title="Queue"
            aria-label="Toggle queue"
          >
            <ListMusic className="w-4 h-4" />
          </button>
        </div>

        {/* Collapsible queue */}
        <div
          className={`grid transition-all duration-300 ease-out ${
            showQueue ? "grid-rows-[1fr] border-t border-white/10" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="p-2 space-y-0.5">
              {playlist.map((t, i) => {
                const active = i === currentTrackIndex;
                return (
                  <li key={t.src}>
                    <button
                      type="button"
                      onClick={() => playTrack(i)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                        active ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                        {active ? (
                          <Equalizer playing={isPlaying} bars={3} className="h-3.5 gap-[2px] w-3.5" barClass="bg-blue-400" />
                        ) : (
                          <MusicIcon className="w-3.5 h-3.5 text-white/70" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs font-medium truncate ${active ? "text-white" : "text-white/80"}`}>
                          {t.title}
                        </p>
                        <p className="text-[11px] text-white/40 truncate">{t.artist}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}