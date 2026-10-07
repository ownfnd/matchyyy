'use client';

import React from 'react';
import {
  Flame,
  Sparkles,
  Trophy,
  Menu,
  X,
  Save,
  RotateCcw,
  HelpCircle,
  LayoutTemplate,
  FolderKanban,
  BarChart3,
} from 'lucide-react';
import { PosterThemeId, ActiveView } from '@/lib/types';

interface Props {
  tournament: string;
  activeTheme: PosterThemeId;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  savedCount: number;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  onSavePoster: () => void;
  onResetPoster: () => void;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<Props> = ({
  tournament,
  activeTheme,
  activeView,
  setActiveView,
  savedCount,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  onSavePoster,
  onResetPoster,
  onOpenHelp,
}) => {
  return (
    <header className="h-14 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between shrink-0 z-30">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile Sidebar Trigger (only when in studio view) */}
        {activeView === 'studio' && (
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors active:scale-95"
            aria-label="Toggle Controls Menu"
          >
            {isMobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        )}

        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-pink-500 text-black font-black text-sm shadow-[0_0_15px_rgba(0,240,255,0.4)] shrink-0">
          <Flame className="w-4 h-4 fill-black" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-white flex items-center gap-1.5 sm:gap-2">
            Match Poster Studio
            <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              v2.0 PRO
            </span>
          </span>
          <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono hidden md:inline-block">
            Zero-Server • 100% Client-Side Render • ModernBERT
          </span>
        </div>
      </div>

      {/* Center Nav View Tabs */}
      <nav className="flex items-center gap-1 p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl">
        <button
          onClick={() => setActiveView('studio')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer ${
            activeView === 'studio'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Studio</span>
        </button>

        <button
          onClick={() => setActiveView('gallery')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer ${
            activeView === 'gallery'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
          }`}
        >
          <FolderKanban className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Gallery</span>
          {savedCount > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-cyan-500 text-black font-mono font-black">
              {savedCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveView('analytics')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer ${
            activeView === 'analytics'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Analytics</span>
        </button>
      </nav>

      {/* Right Controls and Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {activeView === 'studio' && (
          <>
            <button
              onClick={onSavePoster}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-medium transition-all active:scale-95 cursor-pointer"
              title="Save current poster to Gallery"
            >
              <Save className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Save</span>
            </button>

            <button
              onClick={onResetPoster}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-medium transition-all active:scale-95 cursor-pointer"
              title="Reset back to default template"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Reset</span>
            </button>
          </>
        )}

        <button
          onClick={onOpenHelp}
          className="p-1.5 sm:px-2.5 sm:py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-lg text-xs transition-colors active:scale-95 cursor-pointer"
          title="Studio Guide & Shortcuts"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

