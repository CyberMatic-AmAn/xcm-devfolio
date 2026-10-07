import chaoslangImg from "@/images/projects/chaoslang.webp";
import cleaneasyImg from "@/images/projects/cleaneasy.webp";
import aimiImg from "@/images/projects/aimi.webp";
import aivdImg from "@/images/projects/aivd.webp";

export const projects = [
  {
    id: "ChaosLang",
    title: "ChaosLang",
    description: "ChaosLang is an experimental programming language built in JavaScript that thrives on unpredictability and chaos, designed to challenge conventional programming paradigms.",
    tags: ["JavaScript", "HTML/CSS", "esbuild", "Compiler Design"],
    githubUrl: "https://github.com/CyberMatic-AmAn/chaoslang",
    liveUrl: "https://cybermatic-aman.github.io/chaoslang/",
    image: chaoslangImg?.src || "/images/projects/chaoslang.png",
    featured: true,
    category: "Featured",
    badge: "Live",
    gradient: "from-red-500 via-black-900 to-red-500",
  },
  {
    id: "cleaneasy",
    title: "CleanEasy",
    description: "A powerful, user-friendly Python library published on PyPI designed to simplify data cleaning, normalization, and preprocessing for data scientists and analysts.",
    tags: ["Python", "ML/DS", "EDA", "Data Cleaning"],
    githubUrl: "https://github.com/CyberMatic-AmAn/cleaneasy",
    liveUrl: "https://pypi.org/project/cleaneasy/",
    image: cleaneasyImg?.src || "/images/projects/cleaneasy.png",
    featured: true,
    category: "DS",
    badge: "PyPI Package",
    gradient: "from-emerald-600 via-teal-700 to-cyan-800",
  },
  {
    id: "Ai-Voice-detector",
    title: "AI Voice Detector",
    description: "Designed a real-time detection and prevention architecture against voice-cloning impersonation attacks on calls.",
    tags: ["Python", "ML/DS", "LLM", "Audio Processing", "Guardrails"],
    githubUrl: "https://github.com/CyberMatic-AmAn/Ai-Voice-detector-final",
    // liveUrl: "https://pypi.org/project/cleaneasy/",
    image: aivdImg?.src || "/images/projects/aivd.webp",
    featured: true,
    category: "AI",
    badge: "Local-Setup",
    gradient: "from-emerald-600 via-teal-700 to-cyan-800",
  },
  {
    id: "Ai-Mock Interview",
    title: "AI Mock Interview",
    description: "An AI-powered mock interview platform designed to help users practice and improve their interview skills.",
    tags: ["Python", "Agentic Ai", "LLM", "API" ,"Agent Memory"],
    githubUrl: "https://github.com/CyberMatic-AmAn/ai-interviewer",
    // liveUrl: "https://pypi.org/project/cleaneasy/",
    image: aimiImg?.src || "/images/projects/aimi.webp",
    featured: true,
    category: "AI",
    badge: "Local-Setup",
    gradient: "from-emerald-600 via-teal-700 to-cyan-800",
  },

];
