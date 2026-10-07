// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Folder,
//   Star,
//   Sparkles,
//   Code,
//   Layers,
//   ChevronLeft,
//   ChevronRight,
//   Search,
//   LayoutGrid,
//   List,
//   FileCode,
//   Database,
//   ExternalLink,
//   PanelLeft,
// } from "lucide-react";
// import { collabData } from "../../data/collabData";

// export default function ModelTrainerApp() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("All Notebooks");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("grid");

//   useEffect(() => {
//     // Check screen width on mount. 768px is Tailwind's default 'md' breakpoint.
//     if (typeof window !== "undefined" && window.innerWidth >= 768) {
//       setIsSidebarOpen(true);
//     }
//   }, []);

//   const tabs = [
//     { name: "All Notebooks", icon: <Folder className="w-4 h-4" /> },
//     { name: "Featured", icon: <Star className="w-4 h-4" /> },
//     { name: "AI & Tools", icon: <Sparkles className="w-4 h-4" /> },
//     { name: "Data Science", icon: <Layers className="w-4 h-4" /> },
//   ];

//   const filteredNotebooks = collabData.filter((notebook) => {
//     const q = searchQuery.toLowerCase().trim();
//     if (!q) return true;
//     return (
//       notebook.title.toLowerCase().includes(q) ||
//       notebook.description.toLowerCase().includes(q)
//     );
//   });

//   return (
//     <div className="flex h-full w-full bg-[#111]/90 backdrop-blur-2xl text-white overflow-hidden relative">
//       {/* Left Sidebar */}
//       <div
//         className={`
//           ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-0 md:translate-x-0 md:w-0"} 
//           absolute md:relative z-20 h-full flex flex-col bg-[#0a0a0a]/90 md:bg-black/40 backdrop-blur-2xl 
//           border-r border-white/10 shrink-0 transition-all duration-300 overflow-hidden
//         `}
//       >
//         {/* Ensure inner content has fixed width so it doesn't squish during animation */}
//         <div className="w-64 flex flex-col h-full p-4">
//           <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-4 px-2 uppercase">
//             Favorites
//           </h3>

//           {/* Navigation Links */}
//           <div className="space-y-1">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.name}
//                 type="button"
//                 onClick={() => {
//                   setActiveTab(tab.name);
//                   // On mobile screens, auto-close sidebar on select
//                   if (typeof window !== "undefined" && window.innerWidth < 768) {
//                     setIsSidebarOpen(false);
//                   }
//                 }}
//                 className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 cursor-pointer ${
//                   activeTab === tab.name
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-400 hover:bg-white/10 hover:text-gray-200"
//                 }`}
//               >
//                 {tab.icon}
//                 <span>{tab.name}</span>
//               </button>
//             ))}
//           </div>

//           {/* Sidebar Footer */}
//           <div className="mt-auto text-xs text-gray-500 font-mono px-2 pt-4 border-t border-white/5">
//             {filteredNotebooks.length} models • Ready
//           </div>
//         </div>
//       </div>

//       {/* Mobile Backdrop Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="absolute inset-0 bg-black/50 z-10 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Navigation Bar */}
//         <div className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-black/20 shrink-0">
//           <div className="flex items-center gap-4">
//             {/* Sidebar Toggle Button */}
//             <button
//               type="button"
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-1.5 hover:bg-white/10 rounded-md transition-colors cursor-pointer"
//               title="Toggle Sidebar"
//               aria-label="Toggle Sidebar"
//             >
//               <PanelLeft className="w-5 h-5 text-gray-400 hover:text-white" />
//             </button>

//             {/* History Chevrons */}
//             <div className="flex items-center gap-2 text-gray-400 hidden sm:flex">
//               <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
//               <ChevronRight className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
//             </div>
//             <h2 className="text-sm font-semibold truncate">{activeTab}</h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2 bg-[#222] border border-white/10 rounded-md px-3 py-1.5 focus-within:border-blue-500 transition-colors">
//               <Search className="w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="bg-transparent border-none outline-none text-sm text-white w-48 placeholder-gray-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <div className="flex items-center gap-1 bg-[#222] border border-white/10 rounded-md p-1">
//               <button
//                 type="button"
//                 onClick={() => setViewMode("grid")}
//                 className={`p-1 rounded cursor-pointer transition-colors ${
//                   viewMode === "grid"
//                     ? "bg-white/10 text-white"
//                     : "text-gray-400 hover:bg-white/10"
//                 }`}
//                 title="Grid View"
//               >
//                 <LayoutGrid className="w-4 h-4" />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setViewMode("list")}
//                 className={`p-1 rounded cursor-pointer transition-colors ${
//                   viewMode === "list"
//                     ? "bg-white/10 text-white"
//                     : "text-gray-400 hover:bg-white/10"
//                 }`}
//                 title="List View"
//               >
//                 <List className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Notebook Cards Grid */}
//         <div className="flex-1 p-6 overflow-y-auto">
//           {filteredNotebooks.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-48 text-white/50 text-sm">
//               <Search className="w-8 h-8 mb-2 opacity-40" />
//               <p>No notebooks found matching &ldquo;{searchQuery}&rdquo;</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
//               {filteredNotebooks.map((notebook) => (
//                 <a
//                   key={notebook.id}
//                   href={notebook.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex flex-col p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
//                 >
//                   {/* Icon & Title Row */}
//                   <div className="flex items-center">
//                     {notebook.type === "colab" ? (
//                       <FileCode className="text-orange-400 w-6 h-6 shrink-0" />
//                     ) : (
//                       <Database className="text-blue-400 w-6 h-6 shrink-0" />
//                     )}
//                     <span className="font-semibold text-lg ml-3 group-hover:text-blue-300 transition-colors truncate">
//                       {notebook.title}
//                     </span>
//                   </div>

//                   {/* Description */}
//                   <p className="text-sm text-white/60 mt-3 line-clamp-2">
//                     {notebook.description}
//                   </p>

//                   {/* Footer with Source Tag and External Link */}
//                   <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
//                     <span className="capitalize font-mono">
//                       {notebook.type === "colab" ? "Google Colab" : "Kaggle"}
//                     </span>
//                     <ExternalLink className="w-3.5 h-3.5 group-hover:text-white/70 transition-colors" />
//                   </div>
//                 </a>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import {
  Folder,
  Star,
  Sparkles,
  Layers,
  Search,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileCode,
  Database,
  Play,
} from "lucide-react";
import { collabData } from "../../data/collabData";

// Icons are fetched online from the Simple Icons CDN
const sourceMeta = {
  colab: {
    label: "Google Colab",
    icon: "https://cdn.simpleicons.org/googlecolab",
    accent: "text-orange-400",
    bar: "bg-orange-400",
    runBtn: "bg-orange-500/15 text-orange-300 border-orange-400/30 hover:bg-orange-500/25",
  },
  kaggle: {
    label: "Kaggle",
    icon: "https://cdn.simpleicons.org/kaggle",
    accent: "text-sky-400",
    bar: "bg-sky-400",
    runBtn: "bg-sky-500/15 text-sky-300 border-sky-400/30 hover:bg-sky-500/25",
  },
};

const getMeta = (n) => sourceMeta[n.type] || sourceMeta.kaggle;

const slugify = (s = "") =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "notebook";

function SourceIcon({ notebook, className = "" }) {
  const [failed, setFailed] = useState(false);
  const meta = getMeta(notebook);

  if (failed) {
    return notebook.type === "colab" ? (
      <FileCode title={meta.label} className={`text-orange-400 ${className}`} />
    ) : (
      <Database title={meta.label} className={`text-blue-400 ${className}`} />
    );
  }

  return (
    <img
      src={meta.icon}
      alt={meta.label}
      title={meta.label}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={`object-contain ${className}`}
    />
  );
}

// One numbered line inside the code cell
function CodeLine({ n, children }) {
  return (
    <div className="flex">
      <span className="w-9 shrink-0 text-right pr-3 text-white/25 select-none">{n}</span>
      <div className="min-w-0 flex-1 pr-3">{children}</div>
    </div>
  );
}

const categories = [
  { name: "All Notebooks", key: "All", icon: Folder },
  { name: "Featured", key: "Featured", icon: Star },
  { name: "AI & Tools", key: "AI", icon: Sparkles },
  { name: "Data Science", key: "Data Science", icon: Layers },
];

export default function ModelTrainerApp() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  const q = searchQuery.toLowerCase().trim();

  const filteredNotebooks = collabData.filter((n) => {
    const matchesCat =
      selectedCategory === "All" ||
      (selectedCategory === "Featured" && n.featured) ||
      n.category?.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      !q ||
      n.title.toLowerCase().includes(q) ||
      n.description.toLowerCase().includes(q) ||
      (n.tags || []).some((t) => t.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  const sourceLabel = (n) => getMeta(n).label;

  const currentTitle =
    categories.find((c) => c.key === selectedCategory)?.name || "All Notebooks";

  return (
    <div className="flex-1 flex h-full select-none overflow-hidden">
      {/* Finder Left Sidebar */}
      <aside className="w-44 bg-neutral-900/60 border-r border-white/10 p-3 flex flex-col justify-between hidden sm:flex">
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
          {collabData.length} models • Ready
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
            <span className="text-xs font-semibold text-white ml-2 truncate">
              {currentTitle}
            </span>
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
                  viewMode === "grid"
                    ? "bg-white/20 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
                title="Grid View"
              >
                <Grid className="w-3 h-3" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded transition cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white/20 text-white"
                    : "text-neutral-400 hover:text-white"
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

        {/* Notebooks View */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
          {filteredNotebooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-white/50 text-sm">
              <Search className="w-8 h-8 mb-2 opacity-40" />
              <p>
                {q
                  ? <>No notebooks found matching &ldquo;{searchQuery}&rdquo;</>
                  : "No notebooks in this folder"}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredNotebooks.map((notebook, index) => {
                const meta = getMeta(notebook);
                const badgeText =
                  notebook.badge || (notebook.featured ? "Featured" : null);
                const cellNo = index + 1;
                const tags = notebook.tags || [];

                return (
                  <article
                    key={notebook.id}
                    className="group relative flex flex-col rounded-xl border border-white/10 bg-neutral-900/70 overflow-hidden hover:border-white/25 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Accent bar on the left, colored by source */}
                    <span className={`absolute left-0 top-0 bottom-0 w-0.5 ${meta.bar} opacity-60 group-hover:opacity-100 transition-opacity`} />

                    {/* Window title bar */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/10">
                      <div className="flex gap-1.5 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <span className="ml-2 text-[11px] font-mono text-white/50 truncate">
                        {slugify(notebook.title)}.ipynb
                      </span>
                      <div
                        className="ml-auto flex items-center gap-2 shrink-0"
                        title={sourceLabel(notebook)}
                      >
                        {badgeText && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white/80 border border-white/15">
                            {badgeText}
                          </span>
                        )}
                        <SourceIcon notebook={notebook} className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Code cell */}
                    <div className="py-3 font-mono text-[12px] leading-6 bg-black/30">
                      <CodeLine n={1}>
                        <span className="text-sky-300">title</span>
                        <span className="text-white/50"> = </span>
                        <span className="text-emerald-300 break-words">&quot;{notebook.title}&quot;</span>
                      </CodeLine>
                      <CodeLine n={2}>
                        <span className="text-sky-300">source</span>
                        <span className="text-white/50"> = </span>
                        <span className="text-emerald-300">&quot;{sourceLabel(notebook)}&quot;</span>
                      </CodeLine>
                      {tags.length > 0 && (
                        <CodeLine n={3}>
                          <span className="text-sky-300">tags</span>
                          <span className="text-white/50"> = [</span>
                          {tags.map((tag, i) => (
                            <span key={tag}>
                              <span className="text-emerald-300">&quot;{tag}&quot;</span>
                              {i < tags.length - 1 && <span className="text-white/50">, </span>}
                            </span>
                          ))}
                          <span className="text-white/50">]</span>
                        </CodeLine>
                      )}
                    </div>

                    {/* Output cell */}
                    <div className="flex-1 flex gap-3 px-3 py-3 border-t border-white/10">
                      <span className={`shrink-0 w-12 text-right text-[11px] font-mono ${meta.accent}`}>
                        Out[{cellNo}]:
                      </span>
                      <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                        {notebook.description}
                      </p>
                    </div>

                    {/* Footer: run button */}
                    <div className="flex items-center justify-between gap-3 px-3 py-2.5 border-t border-white/10 bg-white/[0.03]">
                      <span className="text-[10px] font-mono text-white/30">
                        Cell [{cellNo}] • Python 3
                      </span>
                      <a
                        href={notebook.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1.5 text-xs font-medium border px-3 py-1 rounded-full transition-colors cursor-pointer ${meta.runBtn}`}
                        title={`Open in ${sourceLabel(notebook)}`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Run in {sourceLabel(notebook).replace("Google ", "")}</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredNotebooks.map((notebook) => (
                <div
                  key={notebook.id}
                  className="px-3 py-2 rounded-lg bg-neutral-900/40 hover:bg-white/10 border border-transparent hover:border-white/10 flex items-center justify-between text-xs transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <SourceIcon notebook={notebook} className="w-4 h-4 shrink-0" />
                    <span className="font-medium text-white truncate">
                      {notebook.title}
                    </span>
                    <span className="text-neutral-400 text-[11px] hidden sm:inline truncate">
                      {notebook.tags?.join(" • ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={notebook.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-neutral-400 hover:text-white"
                      title={`Open in ${sourceLabel(notebook)}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}