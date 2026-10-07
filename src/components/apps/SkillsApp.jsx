// import React, { useState, useMemo } from 'react';
// import {
//   ChevronLeft,
//   ChevronRight,
//   Search,
//   Sparkles,
//   Code2,
//   Gamepad2,
//   Cpu,
//   Wrench,
//   Folder,
// } from 'lucide-react';
// import { skillCategories } from '@/data/skillsdata';

// // Sidebar category icon lookup
// const CATEGORY_ICONS = {
//   'All Skills': Sparkles,
//   'Data Science': Cpu,
//   'Agentic AI & LLMs': Code2,
//   'Web Development': Code2,
//   'Game Development': Gamepad2,
//   'DevOps & Tools': Wrench,
// };

// export default function SkillsApp() {
//   const [activeCategory, setActiveCategory] = useState('All Skills');
//   const [searchQuery, setSearchQuery] = useState('');
//   // Works with Vite/CRA (imports are strings) and Next.js (imports are objects with .src)
//   const getIconSrc = (icon) => (typeof icon === 'string' ? icon : icon?.src);

//   // Flattened total skills
//   const allSkills = useMemo(
//     () => skillCategories.flatMap((cat) => cat.skills),
//     []
//   );

//   // Filtered skills based on active category and optional search query
//   const displayedSkills = useMemo(() => {
//     let list =
//       activeCategory === 'All Skills'
//         ? allSkills
//         : skillCategories.find((cat) => cat.category === activeCategory)?.skills || [];

//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       list = list.filter((s) => s.name.toLowerCase().includes(q));
//     }

//     return list;
//   }, [activeCategory, allSkills, searchQuery]);

//   return (
//     <div className="flex h-full w-full bg-[#1a1a1a] text-white overflow-hidden select-none font-sans">
//       {/* 1. Left Sidebar (Navigation Pane) */}
//       <aside className="w-56 shrink-0 bg-[#141414] border-r border-white/10 flex flex-col justify-between">
//         <div className="flex flex-col">
//           {/* Section Header */}
//           <div className="text-[10px] font-bold text-white/50 px-4 pt-4 pb-2 tracking-widest">
//             FAVORITES
//           </div>

//           {/* Navigation Items */}
//           <nav className="flex flex-col gap-0.5 px-2">
//             {['All Skills', ...skillCategories.map((c) => c.category)].map((catName) => {
//               const IconComp = CATEGORY_ICONS[catName] || Folder;
//               const isActive = activeCategory === catName;

//               return (
//                 <button
//                   key={catName}
//                   type="button"
//                   onClick={() => setActiveCategory(catName)}
//                   className={`flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium transition-colors text-left ${
//                     isActive
//                       ? 'bg-blue-600 text-white rounded-lg shadow-sm'
//                       : 'text-white/70 hover:bg-white/5 hover:text-white rounded-lg'
//                   }`}
//                 >
//                   <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-white/60'}`} />
//                   <span className="truncate">{catName}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Status Footer */}
//         <div className="px-4 pb-4 text-xs text-white/40 border-t border-white/5 pt-3">
//           {displayedSkills.length} {displayedSkills.length === 1 ? 'item' : 'items'}
//         </div>
//       </aside>

//       {/* 2. Right Main Area (Explorer View) */}
//       <main className="flex-1 flex flex-col min-w-0 bg-[#1a1a1a]">
//         {/* Top Header Bar */}
//         <header className="h-14 border-b border-white/10 px-4 flex items-center justify-between shrink-0 bg-[#1a1a1a]/80 backdrop-blur-sm">
//           {/* Left Side: Navigation Chevrons + Category Title */}
//           <div className="flex items-center gap-3 min-w-0">
//             <div className="flex items-center gap-1 text-white/40">
//               <button
//                 type="button"
//                 className="p-1 rounded hover:bg-white/10 hover:text-white/80 transition-colors"
//                 aria-label="Previous folder"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button
//                 type="button"
//                 className="p-1 rounded hover:bg-white/10 hover:text-white/80 transition-colors"
//                 aria-label="Next folder"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//             <h1 className="text-sm font-semibold text-white truncate">
//               {activeCategory}
//             </h1>
//           </div>

//           {/* Right Side: Search Bar */}
//           <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 focus-within:border-white/30 focus-within:bg-white/10 transition-colors">
//             <Search className="w-3.5 h-3.5 text-white/40 shrink-0" />
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="bg-transparent border-none outline-none text-white text-xs w-28 sm:w-36 placeholder:text-white/30"
//             />
//           </div>
//         </header>

//         {/* Content Area - Vertical Icon View Grid with Colorful SVGs */}
//         <div className="flex-1 flex flex-wrap gap-8 p-6 overflow-y-auto content-start">
//           {displayedSkills.length === 0 ? (
//             <div className="w-full h-full flex flex-col items-center justify-center text-white/40 gap-2 py-12">
//               <Folder className="w-8 h-8 opacity-40" />
//               <p className="text-xs">No skills found</p>
//             </div>
//           ) : (
//             displayedSkills.map((skill) => (
//               <div
//                 key={skill.name}
//                 className="flex flex-col items-center gap-2 w-20 group cursor-default"
//               >
//                 <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-sm group-hover:scale-105 group-hover:shadow-md overflow-hidden">
//                   {/* Full-color SVG icon from skillicons.dev */}
//                   <img
//                     src={getIconSrc(skill.iconId)}
//                     alt={`${skill.name} icon`}
//                     className="w-10 h-10 object-contain drop-shadow-md"
//                     loading="lazy"
//                   />
//                 </div>
//                 <span className="text-xs font-medium text-center text-white/80 group-hover:text-white w-full leading-tight line-clamp-2">
//                   {skill.name}
//                 </span>
//               </div>
//             ))
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Code2,
  Gamepad2,
  Cpu,
  Wrench,
  Folder,
  Brain,
  Orbit,

} from 'lucide-react';
import { skillCategories } from '@/data/skillsdata';

// Sidebar category icon lookup
const CATEGORY_ICONS = {
  'All Skills': Sparkles,
  'Data Science': Orbit,
  'Agentic AI & LLMs': Brain,
  'Web Development': Code2,
  'Game Development': Gamepad2,
  'DevOps & Tools': Wrench,
};

// Works with Vite/CRA (imports are strings) and Next.js (imports are objects with .src)
const getIconSrc = (icon) => (typeof icon === 'string' ? icon : icon?.src);

export default function SkillsApp() {
  const [activeCategory, setActiveCategory] = useState('All Skills');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryNames = useMemo(
    () => ['All Skills', ...skillCategories.map((c) => c.category)],
    []
  );

  // Flattened total skills
  const allSkills = useMemo(
    () => skillCategories.flatMap((cat) => cat.skills),
    []
  );

  // Filtered skills based on active category and optional search query
  const displayedSkills = useMemo(() => {
    let list =
      activeCategory === 'All Skills'
        ? allSkills
        : skillCategories.find((cat) => cat.category === activeCategory)?.skills || [];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }

    return list;
  }, [activeCategory, allSkills, searchQuery]);

  return (
    <div className="flex h-full w-full bg-[#1a1a1a] text-white overflow-hidden select-none font-sans">
      {/* 1. Left Sidebar (Navigation Pane) - hidden below sm */}
      <aside className="hidden sm:flex w-56 shrink-0 bg-[#141414] border-r border-white/10 flex-col justify-between">
        <div className="flex flex-col">
          {/* Section Header */}
          <div className="text-[10px] font-bold text-white/50 px-4 pt-4 pb-2 tracking-widest">
            FAVORITES
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-0.5 px-2">
            {categoryNames.map((catName) => {
              const IconComp = CATEGORY_ICONS[catName] || Folder;
              const isActive = activeCategory === catName;

              return (
                <button
                  key={catName}
                  type="button"
                  onClick={() => setActiveCategory(catName)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white rounded-lg shadow-sm'
                      : 'text-white/70 hover:bg-white/5 hover:text-white rounded-lg'
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-white/60'}`} />
                  <span className="truncate">{catName}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Status Footer */}
        <div className="px-4 pb-4 text-xs text-white/40 border-t border-white/5 pt-3">
          {displayedSkills.length} {displayedSkills.length === 1 ? 'item' : 'items'}
        </div>
      </aside>

      {/* 2. Right Main Area (Explorer View) */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#1a1a1a]">
        {/* Top Header Bar */}
        <header className="h-14 border-b border-white/10 px-4 flex items-center justify-between gap-3 shrink-0 bg-[#1a1a1a]/80 backdrop-blur-sm">
          {/* Left Side: Navigation Chevrons + Category Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-1 text-white/40">
              <button
                type="button"
                className="p-1 rounded hover:bg-white/10 hover:text-white/80 transition-colors"
                aria-label="Previous folder"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1 rounded hover:bg-white/10 hover:text-white/80 transition-colors"
                aria-label="Next folder"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <h1 className="text-sm font-semibold text-white truncate">
              {activeCategory}
            </h1>
          </div>

          {/* Right Side: Search Bar */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 focus-within:border-white/30 focus-within:bg-white/10 transition-colors shrink-0">
            <Search className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-white text-[16px] md:text-xs w-28 sm:w-36 placeholder:text-white/30"
            />
          </div>
        </header>

        {/* Mobile category chips (sidebar is hidden below sm) */}
        <div className="sm:hidden flex gap-1.5 px-4 py-2 overflow-x-auto border-b border-white/10 bg-[#141414]/60 shrink-0">
          {categoryNames.map((catName) => (
            <button
              key={catName}
              type="button"
              onClick={() => setActiveCategory(catName)}
              className={`shrink-0 text-xs px-2.5 py-1 rounded-full border transition cursor-pointer ${
                activeCategory === catName
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-white/5 border-white/10 text-white/70'
              }`}
            >
              {catName}
            </button>
          ))}
        </div>

        {/* Content Area - Vertical Icon View Grid */}
        <div className="flex-1 flex flex-wrap gap-8 p-6 overflow-y-auto content-start">
          {displayedSkills.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-white/40 gap-2 py-12">
              <Folder className="w-8 h-8 opacity-40" />
              <p className="text-xs">No skills found</p>
            </div>
          ) : (
            displayedSkills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center gap-2 w-20 group cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-sm group-hover:scale-105 group-hover:shadow-md overflow-hidden">
                  <img
                    src={getIconSrc(skill.iconId)}
                    alt={`${skill.name} icon`}
                    className="w-10 h-10 object-contain drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs font-medium text-center text-white/80 group-hover:text-white w-full leading-tight line-clamp-2">
                  {skill.name}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}