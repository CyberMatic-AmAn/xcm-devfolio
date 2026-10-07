# Project Structure: xCM — AmAn-OS Devfolio

This document provides a comprehensive structural reference for the entire **xCM Devfolio** repository. It maps every directory, source file, configuration, and asset across both the **frontend** and **backend** tiers.

---

## 1. High-Level Monorepo Overview

The project is structured as a two-tier architecture:
- **`frontend/`**: Next.js 16 (App Router + Turbopack) client application implementing the full macOS/Windows hybrid desktop OS interface, interactive window manager, built-in apps, widgets, and audio playback.
- **`backend/`**: Node.js + Express microservice delivering rate-limited, strictly persona-constrained AI responses powered by the Google Gemini API (`@google/generative-ai`).

```
X/
├── backend/                  # Node.js + Express API server (Gemini AI Chat service)
├── frontend/                 # Next.js 16 Web OS (React 19, Tailwind CSS, Framer Motion)
├── project structure.md      # Repository architecture & file map (this file)
├── linkup.md                 # Component & route connection matrix
└── workflow.md               # End-to-end data flow & operating lifecycle
```

---

## 2. Backend Directory Structure (`backend/`)

The backend is an independent service running on port `5000` (or `process.env.PORT`).

```
backend/
├── .env                      # Environment secrets (PORT, FRONTEND_URL, GEMINI_API_KEY, GEMINI_MODEL)
├── .env.example              # Blueprint template for environment configuration
├── .gitignore                # Ignores node_modules, .env, and logs
├── package.json              # Express, cors, dotenv, express-rate-limit, @google/generative-ai
├── package-lock.json         # Pinned dependency lockfile
└── server.js                 # Express server, CORS config, rate limiter, Gemini AI controller
```

### Key Backend Files Explained:
- **`server.js`**:
  - Initializes Express on port `5000`.
  - Configures strict CORS (allowing `http://localhost:3000` and `FRONTEND_URL`).
  - Sets up an IP-based rate limiter (maximum 10 prompts per 5 minutes).
  - Enforces the `SYSTEM_INSTRUCTION` system prompt that binds the AI to the xCM developer persona.
  - Implements multi-model fallback resiliency (`gemini-3.5-flash-lite`, `gemini-2.5-flash`, etc.).
  - Exposes `GET /api/health` and `POST /api/chat`.

---

## 3. Frontend Directory Structure (`frontend/`)

The frontend is built on **Next.js 16.3.6** using the **App Router**, **Framer Motion**, and **Tailwind CSS**.

```
frontend/
├── public/                               # Static public assets served at root
│   ├── images/                           # Icons, backgrounds, and wallpapers
│   │   ├── icons/                        # Application icons (PNG format)
│   │   │   ├── about.png                 # About / System Info icon
│   │   │   ├── chatbot.png               # AI Chatbot icon
│   │   │   ├── mail.png                  # Mail / Contact icon
│   │   │   ├── modeltrainer.png          # Notebooks directory icon
│   │   │   ├── projects.png              # Projects / Finder icon
│   │   │   ├── resume.png                # Resume CV icon
│   │   │   ├── skills.png                # Skills & Tech stack icon
│   │   │   ├── telementary.png           # System telemetry icon
│   │   │   └── terminal.png              # Terminal zsh/bash icon
│   │   ├── start/
│   │   │   └── start.png                 # Start button logo icon
│   │   └── wallpapers/                   # Desktop wallpaper GIF animations
│   │       ├── scene1.gif ... scene8.gif # Dynamic animated wallpapers
│   │       └── wall.webp                 # Lock screen fallback wallpaper
│   └── lib/                              # Audio assets for the Music Player
│       ├── song1.mp3                     # Predefined track 1
│       ├── song2.mp3                     # Predefined track 2
│       ├── song3.mp3                     # Predefined track 3
│       └── song4.mp3                     # Predefined track 4
│
├── src/
│   ├── app/                              # Next.js App Router root
│   │   ├── api/                          # Next.js server route handlers
│   │   │   └── music/
│   │   │       └── route.js              # Scans public/lib for dynamic audio list
│   │   ├── favicon.ico                   # Primary favicon
│   │   ├── favicon.png                   # PNG icon variant
│   │   ├── globals.css                   # Tailwind imports, custom scrollbars, animations
│   │   ├── layout.jsx                    # Root HTML/Body layout with Geist fonts
│   │   └── page.jsx                      # Main OS state machine (boot -> lock -> desktop)
│   │
│   ├── components/                       # UI Component tree
│   │   ├── apps/                         # Standalone OS Window Applications
│   │   │   ├── AboutApp.jsx              # System specifications, bio, credentials
│   │   │   ├── ChatApp.jsx               # AI Assistant interface communicating with backend
│   │   │   ├── ContactApp.jsx            # Interactive email composer & social links
│   │   │   ├── ModelTrainerApp.jsx       # Data Science notebooks directory (Colab/Kaggle)
│   │   │   ├── MusicApp.jsx              # Heavy frosted glass vinyl music player
│   │   │   ├── ProjectsApp.jsx           # Finder-style showcase with category filtering
│   │   │   ├── ResumeApp.jsx             # Interactive curriculum vitae & PDF viewer
│   │   │   ├── SkillsApp.jsx             # Technical proficiency radar and stack cards
│   │   │   └── TerminalApp.jsx           # Functional zsh/bash interactive terminal
│   │   │
│   │   ├── boot/                         # Startup sequence components
│   │   │   ├── AnimatedSignature.jsx     # SVG stroke signature path animation
│   │   │   └── BootScreen.jsx            # Minimalist boot sequence controller
│   │   │
│   │   ├── lock/                         # Lock Screen authentication
│   │   │   ├── LockScreen.jsx            # Lock wallpaper, oversized clock, and layout
│   │   │   └── LoginCard.jsx             # User avatar, password input, and unlock trigger
│   │   │
│   │   ├── desktop/                      # Desktop Shell & Window Management
│   │   │   ├── Desktop.jsx               # Main desktop canvas, widgets, wallpapers, windows
│   │   │   ├── Dock.jsx                  # macOS-style animated magnification dock
│   │   │   ├── DockItem.jsx              # Individual dock icon with hover tooltip & badge
│   │   │   ├── StartMenu.jsx             # Windows 11-style glassmorphic start menu
│   │   │   ├── TopBar.jsx                # macOS menu bar (Apple menu, active app name, clock)
│   │   │   ├── UtilityMenu.jsx           # Control center / telemetry quick toggles
│   │   │   └── WindowFrame.jsx           # Draggable, resizable, minimizable window wrapper
│   │   │
│   │   └── ui/                           # Reusable UI primitives
│   │       └── Icons.jsx                 # Custom SVG brand icons (GitHub, LinkedIn, X)
│   │
│   ├── context/                          # Global state management
│   │   └── DesktopContext.jsx            # Window manager, z-indices, active apps, clock
│   │
│   ├── data/                             # Static portfolio metadata & datasets
│   │   ├── aboutdata.js                  # Developer bio, education, hardware/software specs
│   │   ├── collabData.js                 # Colab & Kaggle notebook metadata for Notebooks app
│   │   ├── projectdata.js                # Showcase projects, descriptions, tags, repo links
│   │   ├── skillsdata.js                 # Categorized skills (Languages, ML/AI, Web, Cloud)
│   │   ├── telemetrydata.js              # Hardware resource stats, CPU/RAM benchmarks
│   │   └── terminaldata.js               # Terminal commands, banner ASCII art, help output
│   │
│   └── lib/                              # Source directory audio backups
│       ├── song1.mp3 ... song4.mp3       # Audio assets matching public/lib
│
├── .gitignore                            # Standard Next.js ignore rules
├── jsconfig.json                         # Path aliasing configuration (`@/*` -> `./src/*`)
├── next.config.mjs                       # Next.js build config, redirects, and rewrites
├── package.json                          # Next.js, React 19, Lucide, Framer Motion dependencies
├── postcss.config.mjs                    # PostCSS plugin setup for Tailwind CSS
└── README.md                             # Quickstart instructions
```

---

## 4. Key Subsystem Breakdown

### 4.1. OS Lifecycle Coordinator (`src/app/page.jsx`)
Coordinates three distinct phases using `Framer Motion`'s `<AnimatePresence mode="wait">`:
1. **`boot`**: Runs `BootScreen.jsx` with SVG animated signature stroke.
2. **`lock`**: Displays authentic macOS lock screen with password pill (`LockScreen.jsx`).
3. **`desktop`**: Launches the full interactive desktop shell (`Desktop.jsx`).

### 4.2. Global Window Management (`src/context/DesktopContext.jsx`)
Provides the central React Context:
- **`windows`**: Dictionary keyed by `appId` maintaining `{ isOpen, isMinimized, isMaximized, zIndex, position, size }`.
- **`activeWindowId`**: The currently focused window ID.
- **`openApp(id)` / `closeWindow(id)` / `toggleMinimize(id)` / `toggleMaximize(id)`**: CRUD operations for windows.
- **`bringToFront(id)`**: Dynamically increments `highestZ` so focused windows stack properly.
- **`formattedTime` & `formattedDate`**: Real-time 1-second system clock synced across all desktop bars.

### 4.3. Desktop UI Shell (`src/components/desktop/`)
- **`TopBar.jsx`**: Persistent 28px top menu bar. Displays the active app's name, Apple logo menu, lock/restart triggers, battery, Wi-Fi, and time.
- **`Dock.jsx`**: Bottom floating dock with parabolic icon scaling based on pointer distance (`useMotionValue` + `useSpring`).
- **`StartMenu.jsx`**: Floating Start drawer triggered via the Start button on the dock, offering app search, pin grids, power options, and social links.
- **`UtilityMenu.jsx`**: macOS Control Center pane displaying audio sliders, connection toggles, and live telemetry.
- **`EqualizerWidget` & Clock Widget**: Rendered directly on the wallpaper; clicking the equalizer unlocks the hidden `MusicApp`.
