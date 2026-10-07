// "use client";

// import React from "react";
// import { Download, ExternalLink, Briefcase, GraduationCap, Award } from "lucide-react";

// export default function ResumeApp() {
//   return (
//     <div className="flex-1 p-6 bg-neutral-950/80 text-white select-none overflow-y-auto">
//       {/* Header bar */}
//       <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
//         <div>
//           <h1 className="text-xl font-bold tracking-tight text-white">xCM — Curriculum Vitae</h1>
//           <p className="text-xs text-neutral-400 mt-0.5">Staff Software Engineer & Creative Developer</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <a
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               alert("Resume PDF download link simulated.");
//             }}
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition"
//           >
//             <Download className="w-3.5 h-3.5" />
//             <span>Download PDF</span>
//           </a>
//         </div>
//       </div>

//       {/* Experience Section */}
//       <div className="space-y-6">
//         <div>
//           <div className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
//             <Briefcase className="w-4 h-4 text-amber-400" />
//             <span>Experience</span>
//           </div>

//           <div className="space-y-4 pl-6 border-l border-white/15">
//             <div>
//               <div className="flex items-baseline justify-between text-xs font-medium">
//                 <span className="text-white text-sm">Lead Frontend Architect</span>
//                 <span className="text-neutral-400 font-mono">2023 — Present</span>
//               </div>
//               <p className="text-neutral-300 text-xs mt-1">Autonomous Systems & Cloud Labs</p>
//               <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed">
//                 Spearheaded the redesign of enterprise reactive dashboards using Next.js App Router and WebGL visualization pipelines, decreasing p95 latency by 45%.
//               </p>
//             </div>

//             <div>
//               <div className="flex items-baseline justify-between text-xs font-medium">
//                 <span className="text-white text-sm">Senior Full Stack Engineer</span>
//                 <span className="text-neutral-400 font-mono">2021 — 2023</span>
//               </div>
//               <p className="text-neutral-300 text-xs mt-1">Distributed Computing Co.</p>
//               <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed">
//                 Architected low-latency microservices in Go and Rust with PostgreSQL and Redis. Mentored engineers across frontend best practices.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Education & Achievements */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
//           <div>
//             <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
//               <GraduationCap className="w-4 h-4 text-blue-400" />
//               <span>Education</span>
//             </div>
//             <p className="text-xs font-medium text-white">B.S. in Computer Science</p>
//             <p className="text-neutral-400 text-xs mt-0.5">Focus in Distributed Systems & HCI</p>
//           </div>

//           <div>
//             <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
//               <Award className="w-4 h-4 text-emerald-400" />
//               <span>Honors & Certifications</span>
//             </div>
//             <p className="text-xs font-medium text-white">AWS Certified Solutions Architect</p>
//             <p className="text-neutral-400 text-xs mt-0.5">Top Open Source Contributor</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import {
  Download,
  ExternalLink,
  Mail,
  FileText,
  Cpu,
  FolderGit2,
  GraduationCap,
  Award,
} from "lucide-react";


// Brand icons were removed from recent lucide-react versions, so they're inlined here.
function Github({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function Linkedin({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const CONTACT = [
  {
    icon: Mail,
    label: "amansonwani005@gmail.com",
    href: "mailto:amansonwani005@gmail.com",
  },
  {
    icon: Github,
    label: "github.com/CyberMatic-AmAn",
    href: "https://github.com/CyberMatic-AmAn",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/aman-sonwani-a95b0a326",
    href: "https://www.linkedin.com/in/aman-sonwani-a95b0a326/",
  },
];

const SUMMARY =
  "Data Science undergraduate (B.Tech CSE, CSVTU, CGPA 7.29) targeting Data Scientist and AI Engineer roles. Fine-tuned a Wav2Vec2 audio classifier in PyTorch for deepfake voice detection and built Cleaneasy, a Python library for data cleaning and preprocessing. Also built an AI mock-interview platform in React and Node.js. Works in Python, SQL, PyTorch, TensorFlow and Scikit-learn.";

const SKILLS = [
  { group: "Languages", items: "Python, SQL, C++" },
  { group: "Machine Learning", items: "PyTorch, TensorFlow, Scikit-learn" },
  {
    group: "Data Analysis & Visualization",
    items: "NumPy, Pandas, Matplotlib, R, Statistics",
  },
  { group: "Web", items: "React, Node.js, CSS" },
  { group: "Tools", items: "Git, GitHub, WolframAlpha, Oracle VM" },
];

const PROJECTS = [
  {
    name: "AI Voice Fraud Detection",
    stack: "Python, PyTorch, Wav2Vec2",
    link: "https://github.com/CyberMatic-AmAn/Ai-Voice-detector-final",
    points: [
      "Fine-tuned a Wav2Vec2 audio classifier in PyTorch for deepfake voice detection, labelling call audio as AI-generated or real human voice.",
      "Designed a real-time detection and prevention architecture against voice-cloning impersonation attacks on calls.",
    ],
  },
  {
    name: "AI Mock Interviewer",
    stack: "React, Node.js, LLM",
    link: "https://github.com/CyberMatic-AmAn/ai-interviewer",
    points: [
      "Built an AI-powered interview-preparation platform in React and Node.js, giving users one place to practise for interviews.",
    ],
  },
  {
    name: "Cleaneasy",
    stack: "Python, Data Cleaning, Data Analysis",
    link: "https://github.com/CyberMatic-AmAn/cleaneasy",
    points: [
      "Built a Python library that simplifies data cleaning and preprocessing for data scientists and analysts.",
    ],
  },
];

const ACHIEVEMENTS = [
  "Vice President, Nextronix Robotics Club",
  "Zonal place, KAMP NASTA Mathematics Olympiad 2023",
];

export default function ResumeApp() {
  return (
    <div className="flex-1 p-6 bg-neutral-950/80 text-white select-none overflow-y-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Aman Sonwani
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Data Science Student
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Put your PDF at /public/resume.pdf */}
          <a
            href="https://drive.google.com/file/d/1J7ZNtYaMxLFe1aTTAehvF6eTlBlBDjWT/view?usp=sharing"
            download="Aman_Sonwani_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      <div className="space-y-6">
        {/* Contact */}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {CONTACT.map(({ icon: Icon, label, href }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition"
            >
              <Icon className="w-3.5 h-3.5 text-neutral-400" />
              <span>{label}</span>
            </a>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
            <FileText className="w-4 h-4 text-rose-400" />
            <span>Summary</span>
          </div>
          <p className="pl-6 border-l border-white/15 text-neutral-400 text-xs leading-relaxed">
            {SUMMARY}
          </p>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Skills</span>
          </div>
          <div className="space-y-1.5 pl-6 border-l border-white/15">
            {SKILLS.map((s) => (
              <p key={s.group} className="text-xs leading-relaxed">
                <span className="text-white font-medium">{s.group}: </span>
                <span className="text-neutral-400">{s.items}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
            <FolderGit2 className="w-4 h-4 text-amber-400" />
            <span>Projects</span>
          </div>

          <div className="space-y-4 pl-6 border-l border-white/15">
            {PROJECTS.map((p) => (
              <div key={p.name}>
                <div className="flex items-baseline justify-between gap-3 text-xs font-medium">
                  <span className="text-white text-sm">{p.name}</span>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-neutral-400 hover:text-white font-mono transition shrink-0"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-neutral-300 text-xs mt-1">{p.stack}</p>
                <ul className="mt-1.5 space-y-1 list-disc list-outside pl-4 marker:text-neutral-600">
                  {p.points.map((pt) => (
                    <li key={pt} className="text-neutral-400 text-xs leading-relaxed">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Education</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-xs font-medium text-white">
                    Chhattisgarh Swami Vivekanand Technical University (CSVTU)
                  </p>
                  <span className="text-neutral-400 font-mono text-xs shrink-0">
                    2024 — Current
                  </span>
                </div>
                <p className="text-neutral-300 text-xs mt-0.5">
                  B.Tech (Hons.) in Computer Science and Engineering (Data Science)
                </p>
                <p className="text-neutral-400 text-xs mt-0.5">CGPA: 7.29</p>
                <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">
                  Coursework: Data Science, Artificial Intelligence, Probability &
                  Statistics, Discrete Mathematics
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-xs font-medium text-white">
                    Kendriya Vidyalaya Narayanpur, Chhattisgarh
                  </p>
                  <span className="text-neutral-400 font-mono text-xs shrink-0">
                    2024
                  </span>
                </div>
                <p className="text-neutral-400 text-xs mt-0.5">
                  Senior Secondary: 79.8%
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Achievements</span>
            </div>
            <div className="space-y-1.5">
              {ACHIEVEMENTS.map((a) => (
                <p key={a} className="text-xs font-medium text-white">
                  {a}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}