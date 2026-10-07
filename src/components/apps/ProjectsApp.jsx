// "use client";

// import React, { useState } from "react";
// import {
//   Folder,
//   Star,
//   Code2,
//   ExternalLink,
//   Search,
//   Grid,
//   List,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   Layers,
// } from "lucide-react";
// import { GithubIcon } from "@/components/ui/Icons";
// import { projects } from "@/data/projectdata";

// export default function ProjectsApp() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

//   const filteredProjects = projects.filter((p) => {
//     const matchesCat =
//       selectedCategory === "All" ||
//       (selectedCategory === "Featured" && p.featured) ||
//       p.category?.toLowerCase().includes(selectedCategory.toLowerCase());

//     const matchesSearch =
//       p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

//     return matchesCat && matchesSearch;
//   });

//   return (
//     <div className="flex-1 flex h-full select-none overflow-hidden">
//       {/* Finder Left Sidebar */}
//       <aside className="w-44 bg-neutral-900/60 border-r border-white/10 p-3 flex flex-col justify-between hidden sm:flex">
//         <div className="space-y-4">
//           <div>
//             <span className="text-[10px] font-semibold text-neutral-400 tracking-wider uppercase px-2">
//               Favorites
//             </span>
//             <div className="mt-1 space-y-0.5">
//               {[
//                 { name: "All Projects", key: "All", icon: Folder },
//                 { name: "Featured", key: "Featured", icon: Star },
//                 { name: "AI & Tools", key: "AI", icon: Sparkles },
//                 { name: "Data Science", key: "DS", icon: Code2 },
//                 { name: "Full Stack", key: "Full Stack", icon: Layers },
//               ].map(({ name, key, icon: Icon }) => (
//                 <button
//                   key={key}
//                   onClick={() => setSelectedCategory(key)}
//                   className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium transition cursor-pointer text-left ${
//                     selectedCategory === key
//                       ? "bg-blue-600 text-white shadow-sm"
//                       : "text-neutral-300 hover:bg-white/10 hover:text-white"
//                   }`}
//                 >
//                   <Icon className="w-3.5 h-3.5" />
//                   <span>{name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="text-[10px] text-neutral-500 px-2 font-mono">
//           {projects.length} builds • Ready
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col bg-neutral-950/70 overflow-hidden">
//         {/* Finder Toolbar */}
//         <div className="h-10 px-4 border-b border-white/10 flex items-center justify-between gap-3 bg-neutral-900/40">
//           <div className="flex items-center gap-2 text-neutral-400">
//             <button className="p-1 rounded hover:bg-white/10 hover:text-white transition cursor-pointer">
//               <ChevronLeft className="w-4 h-4" />
//             </button>
//             <button className="p-1 rounded hover:bg-white/10 hover:text-white transition cursor-pointer">
//               <ChevronRight className="w-4 h-4" />
//             </button>
//             <span className="text-xs font-semibold text-white ml-2">Projects</span>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Search Input */}
//             <div className="relative flex items-center">
//               <Search className="w-3 h-3 text-neutral-400 absolute left-2 pointer-events-none" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-28 sm:w-36 bg-white/10 text-[16px] md:text-xs rounded-full pl-6 pr-2 py-1 text-white placeholder-neutral-400 outline-none focus:bg-white/15 focus:ring-1 focus:ring-white/30 transition"
//               />
//             </div>

//             {/* View Mode Toggle */}
//             <div className="flex items-center bg-white/10 rounded-md p-0.5 border border-white/10">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`p-1 rounded transition cursor-pointer ${
//                   viewMode === "grid" ? "bg-white/20 text-white" : "text-neutral-400 hover:text-white"
//                 }`}
//                 title="Grid View"
//               >
//                 <Grid className="w-3 h-3" />
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`p-1 rounded transition cursor-pointer ${
//                   viewMode === "list" ? "bg-white/20 text-white" : "text-neutral-400 hover:text-white"
//                 }`}
//                 title="List View"
//               >
//                 <List className="w-3 h-3" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Projects View */}
//         <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
//           {viewMode === "grid" ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {filteredProjects.map((project) => {
//                 const githubLink = project.githubUrl || project.github;
//                 const liveLink = project.liveUrl || project.live;
//                 const gradient = project.gradient || "from-neutral-900 to-neutral-800";
//                 const badgeText = project.badge || (project.featured ? "Featured" : null);
//                 const imageSrc =
//                   typeof project.image === "object" && project.image !== null
//                     ? project.image.src
//                     : project.image;

//                 return (
//                   <div
//                     key={project.id}
//                     className="flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:border-white/20 hover:shadow-xl transition-all duration-300 group"
//                   >
//                     {/* Top Image Header */}
//                     <div className="h-48 w-full overflow-hidden relative bg-neutral-900/60 flex items-center justify-center">
//                       {/* Subtle ambient gradient & placeholder fallback */}
//                       <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-30`} />
//                       <Code2 className="w-10 h-10 text-white/20" />

//                       {/* Project Image */}
//                       {imageSrc && (
//                         /* eslint-disable-next-line @next/next/no-img-element */
//                         <img
//                           src={imageSrc}
//                           alt={project.title}
//                           className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 absolute inset-0 z-[1]"
//                           onError={(e) => {
//                             e.currentTarget.style.display = "none";
//                           }}
//                         />
//                       )}

//                       {/* Top Corner Status Badge */}
//                       {badgeText && (
//                         <div className="absolute top-3 right-3 z-10">
//                           <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-black/60 backdrop-blur-md text-white/90 border border-white/20 shadow-sm">
//                             {badgeText}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Bottom Content Body */}
//                     <div className="p-5 flex flex-col flex-1 justify-between gap-4">
//                       {/* Title & Description */}
//                       <div>
//                         <h3 className="text-lg font-semibold text-white tracking-tight">
//                           {project.title}
//                         </h3>
//                         <p className="text-sm text-white/70 line-clamp-2 leading-relaxed mt-1.5">
//                           {project.description}
//                         </p>
//                       </div>

//                       {/* Tech Stack Tags */}
//                       <div className="flex flex-wrap gap-1.5">
//                         {project.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 font-medium"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>

//                       {/* Action Links */}
//                       <div className="flex items-center gap-3 pt-2 border-t border-white/5">
//                         {liveLink && (
//                           <a
//                             href={liveLink}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
//                             title="Open Live Demo"
//                           >
//                             <ExternalLink className="w-3.5 h-3.5" />
//                             <span>Live Demo</span>
//                           </a>
//                         )}
//                         {githubLink && (
//                           <a
//                             href={githubLink}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
//                             title="View GitHub Source"
//                           >
//                             <GithubIcon className="w-3.5 h-3.5" />
//                             <span>GitHub</span>
//                           </a>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="space-y-1">
//               {filteredProjects.map((project) => {
//                 const githubLink = project.githubUrl || project.github;
//                 const liveLink = project.liveUrl || project.live;

//                 return (
//                   <div
//                     key={project.id}
//                     className="px-3 py-2 rounded-lg bg-neutral-900/40 hover:bg-white/10 border border-transparent hover:border-white/10 flex items-center justify-between text-xs transition"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Folder className="w-4 h-4 text-blue-400" />
//                       <span className="font-medium text-white">{project.title}</span>
//                       <span className="text-neutral-400 text-[11px] hidden sm:inline">{project.tags.join(" • ")}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {githubLink && (
//                         <a
//                           href={githubLink}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="p-1 text-neutral-400 hover:text-white"
//                           title="GitHub Source"
//                         >
//                           <GithubIcon className="w-3.5 h-3.5" />
//                         </a>
//                       )}
//                       {liveLink && (
//                         <a
//                           href={liveLink}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="p-1 text-neutral-400 hover:text-white"
//                           title="Live Preview"
//                         >
//                           <ExternalLink className="w-3.5 h-3.5" />
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import {
  Folder,
  Star,
  Code2,
  ExternalLink,
  Search,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/projectdata";

// Shared by the desktop sidebar and the mobile chips
const categories = [
  { name: "All Projects", key: "All", icon: Folder },
  { name: "Featured", key: "Featured", icon: Star },
  { name: "AI & Tools", key: "AI", icon: Sparkles },
  { name: "Data Science", key: "DS", icon: Code2 },
  { name: "Full Stack", key: "Full Stack", icon: Layers },
];

export default function ProjectsApp() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      selectedCategory === "All" ||
      (selectedCategory === "Featured" && p.featured) ||
      p.category?.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 flex h-full select-none overflow-hidden">
      {/* Finder Left Sidebar - hidden below sm */}
      <aside className="hidden sm:flex w-44 bg-neutral-900/60 border-r border-white/10 p-3 flex-col justify-between">
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-semibold text-neutral-400 tracking-wider uppercase px-2">
              Favorites
            </span>
            <div className="mt-1 space-y-0.5">
              {categories.map(({ name, key, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium transition cursor-pointer text-left ${
                    selectedCategory === key
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-neutral-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-[10px] text-neutral-500 px-2 font-mono">
          {projects.length} builds • Ready
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-neutral-950/70 overflow-hidden min-w-0">
        {/* Finder Toolbar */}
        <div className="h-10 px-4 border-b border-white/10 flex items-center justify-between gap-3 bg-neutral-900/40 shrink-0">
          <div className="flex items-center gap-2 text-neutral-400 min-w-0">
            <button className="p-1 rounded hover:bg-white/10 hover:text-white transition cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-white/10 hover:text-white transition cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-white ml-2 truncate">Projects</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="w-3 h-3 text-neutral-400 absolute left-2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-28 sm:w-36 bg-white/10 text-[16px] md:text-xs rounded-full pl-6 pr-2 py-1 text-white placeholder-neutral-400 outline-none focus:bg-white/15 focus:ring-1 focus:ring-white/30 transition"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/10 rounded-md p-0.5 border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 rounded transition cursor-pointer ${
                  viewMode === "grid" ? "bg-white/20 text-white" : "text-neutral-400 hover:text-white"
                }`}
                title="Grid View"
              >
                <Grid className="w-3 h-3" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded transition cursor-pointer ${
                  viewMode === "list" ? "bg-white/20 text-white" : "text-neutral-400 hover:text-white"
                }`}
                title="List View"
              >
                <List className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile category chips (sidebar is hidden below sm) */}
        <div className="sm:hidden flex gap-1.5 px-4 py-2 overflow-x-auto border-b border-white/10 bg-neutral-900/30 shrink-0">
          {categories.map(({ name, key }) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`shrink-0 text-xs px-2.5 py-1 rounded-full border transition cursor-pointer ${
                selectedCategory === key
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-white/5 border-white/10 text-neutral-300"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Projects View */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredProjects.map((project) => {
                const githubLink = project.githubUrl || project.github;
                const liveLink = project.liveUrl || project.live;
                const gradient = project.gradient || "from-neutral-900 to-neutral-800";
                const badgeText = project.badge || (project.featured ? "Featured" : null);
                const imageSrc =
                  typeof project.image === "object" && project.image !== null
                    ? project.image.src
                    : project.image;

                return (
                  <div
                    key={project.id}
                    className="flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:border-white/20 hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Top Image Header */}
                    <div className="h-48 w-full overflow-hidden relative bg-neutral-900/60 flex items-center justify-center">
                      {/* Subtle ambient gradient & placeholder fallback */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-30`} />
                      <Code2 className="w-10 h-10 text-white/20" />

                      {/* Project Image */}
                      {imageSrc && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={imageSrc}
                          alt={project.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 absolute inset-0 z-[1]"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}

                      {/* Top Corner Status Badge */}
                      {badgeText && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-black/60 backdrop-blur-md text-white/90 border border-white/20 shadow-sm">
                            {badgeText}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Content Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                      {/* Title & Description */}
                      <div>
                        <h3 className="text-lg font-semibold text-white tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-sm text-white/70 line-clamp-2 leading-relaxed mt-1.5">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                        {liveLink && (
                          <a
                            href={liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            title="Open Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                        {githubLink && (
                          <a
                            href={githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            title="View GitHub Source"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredProjects.map((project) => {
                const githubLink = project.githubUrl || project.github;
                const liveLink = project.liveUrl || project.live;

                return (
                  <div
                    key={project.id}
                    className="px-3 py-2 rounded-lg bg-neutral-900/40 hover:bg-white/10 border border-transparent hover:border-white/10 flex items-center justify-between text-xs transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Folder className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="font-medium text-white truncate">{project.title}</span>
                      <span className="text-neutral-400 text-[11px] hidden sm:inline truncate">
                        {project.tags.join(" • ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {githubLink && (
                        <a
                          href={githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-neutral-400 hover:text-white"
                          title="GitHub Source"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {liveLink && (
                        <a
                          href={liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-neutral-400 hover:text-white"
                          title="Live Preview"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}