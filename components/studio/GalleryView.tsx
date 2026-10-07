'use client';

import React, { useState } from 'react';
import { SavedPoster, PosterThemeId } from '@/lib/types';
import {
  FolderKanban,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  Plus,
  Sparkles,
  Trophy,
  Calendar,
  Layers,
} from 'lucide-react';

interface Props {
  posters: SavedPoster[];
  onLoadPoster: (poster: SavedPoster) => void;
  onDeletePoster: (id: string) => void;
  onNewPoster: () => void;
}

export const GalleryView: React.FC<Props> = ({
  posters,
  onLoadPoster,
  onDeletePoster,
  onNewPoster,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [themeFilter, setThemeFilter] = useState<'all' | PosterThemeId>('all');

  const filteredPosters = posters.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.matchData.score.tournament.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.matchData.score.teamA.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.matchData.score.teamB.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.matchData.mvp.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTheme = themeFilter === 'all' || p.activeTheme === themeFilter;
    return matchesSearch && matchesTheme;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#07090e] text-zinc-100">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-white">
            <FolderKanban className="w-6 h-6 text-cyan-400" />
            Saved Posters & Projects
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Manage, re-open, or export your saved editorial cards ({posters.length} saved)
          </p>
        </div>

        <button
          onClick={onNewPoster}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Studio Poster</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 my-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by team, player, or tournament..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:border-cyan-400 outline-none transition-colors"
          />
        </div>

        {/* Theme Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto shrink-0">
          {[
            { id: 'all', label: 'All Themes' },
            { id: 'cyberpunk', label: 'Cyberpunk' },
            { id: 'retro', label: 'Retro Mag' },
            { id: 'swiss', label: 'Swiss Clean' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setThemeFilter(tab.id as typeof themeFilter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                themeFilter === tab.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredPosters.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 text-center my-8">
          <div className="p-4 rounded-full bg-zinc-900 text-zinc-500 mb-3">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
            {searchTerm || themeFilter !== 'all' ? 'No matching posters found' : 'No saved posters yet'}
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mt-1">
            {searchTerm || themeFilter !== 'all'
              ? 'Try adjusting your search keywords or active theme filter.'
              : 'Head to the Studio workspace and click "Save State" in the top bar to save posters to your library.'}
          </p>
          {searchTerm || themeFilter !== 'all' ? (
            <button
              onClick={() => {
                setSearchTerm('');
                setThemeFilter('all');
              }}
              className="mt-4 px-3 py-1.5 bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-lg hover:bg-zinc-700 active:scale-95 transition-all"
            >
              Clear Filters
            </button>
          ) : (
            <button
              onClick={onNewPoster}
              className="mt-4 px-4 py-2 bg-cyan-400 text-black text-xs font-bold rounded-lg hover:bg-cyan-300 active:scale-95 transition-all"
            >
              Create Your First Poster
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPosters.map((poster) => (
            <div
              key={poster.id}
              className="group flex flex-col justify-between p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/50 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      poster.activeTheme === 'cyberpunk'
                        ? 'bg-cyan-950/60 border-cyan-800/50 text-cyan-400'
                        : poster.activeTheme === 'retro'
                        ? 'bg-amber-950/60 border-amber-800/50 text-amber-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {poster.activeTheme}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {poster.createdAt}
                  </span>
                </div>

                {/* Title & Match Overview */}
                <div className="mt-3">
                  <h4 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {poster.name}
                  </h4>
                  <div className="text-xs text-zinc-400 font-semibold mt-1 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{poster.matchData.score.tournament}</span>
                  </div>
                </div>

                {/* Score Preview Box */}
                <div className="mt-3 p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-zinc-300">
                      {poster.matchData.score.teamA.shortName || poster.matchData.score.teamA.name}
                    </span>
                    <span className="font-mono font-black text-cyan-400">
                      {poster.matchData.score.teamA.score}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-1">
                    <span className="font-bold text-zinc-300">
                      {poster.matchData.score.teamB.shortName || poster.matchData.score.teamB.name}
                    </span>
                    <span className="font-mono font-black text-pink-400">
                      {poster.matchData.score.teamB.score}
                    </span>
                  </div>
                </div>

                {/* MVP Pill */}
                <div className="mt-2 text-[11px] font-mono text-zinc-400 truncate">
                  MVP: <span className="text-zinc-200 font-semibold">{poster.matchData.mvp.name}</span> (
                  {poster.matchData.mvp.primaryStat})
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 mt-4 border-t border-zinc-800/80">
                <button
                  onClick={() => onLoadPoster(poster)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-xs font-bold rounded-lg transition-colors active:scale-95 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Studio</span>
                </button>
                <button
                  onClick={() => onDeletePoster(poster.id)}
                  className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors active:scale-95 cursor-pointer"
                  title="Delete from saved list"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
