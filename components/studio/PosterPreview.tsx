'use client';

import React, { useState } from 'react';
import { MatchData, PhotoConfig, ThemeCustomization, PosterThemeId } from '@/lib/types';
import { CyberpunkPoster } from '@/components/themes/CyberpunkPoster';
import { RetroMagazinePoster } from '@/components/themes/RetroMagazinePoster';
import { SwissMinimalistPoster } from '@/components/themes/SwissMinimalistPoster';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface Props {
  matchData: MatchData;
  photoConfig: PhotoConfig;
  themeConfig: ThemeCustomization;
  activeTheme: PosterThemeId;
  activeBadge: string;
  posterRef: React.RefObject<HTMLDivElement | null>;
}

export const PosterPreview: React.FC<Props> = ({
  matchData,
  photoConfig,
  themeConfig,
  activeTheme,
  activeBadge,
  posterRef,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Determine aspect ratio class & max dimensions
  const getAspectRatioClasses = () => {
    switch (themeConfig.aspectRatio) {
      case '1:1':
        return 'aspect-square max-w-[560px]';
      case '9:16':
        return 'aspect-[9/16] max-w-[390px]';
      case '4:5':
        return 'aspect-[4/5] max-w-[480px]';
      case 'A4':
        return 'aspect-[1/1.414] max-w-[460px]';
      default:
        return 'aspect-square max-w-[540px]';
    }
  };

  const renderActivePoster = () => {
    switch (activeTheme) {
      case 'cyberpunk':
        return (
          <CyberpunkPoster
            matchData={matchData}
            photoConfig={photoConfig}
            themeConfig={themeConfig}
            badge={activeBadge}
          />
        );
      case 'retro':
        return (
          <RetroMagazinePoster
            matchData={matchData}
            photoConfig={photoConfig}
            themeConfig={themeConfig}
            badge={activeBadge}
          />
        );
      case 'swiss':
        return (
          <SwissMinimalistPoster
            matchData={matchData}
            photoConfig={photoConfig}
            themeConfig={themeConfig}
            badge={activeBadge}
          />
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950/80 rounded-2xl border border-zinc-800/80 p-4 relative">
      {/* Top Floating View Controls */}
      <div className="flex items-center justify-between pb-3 export-exclude">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-zinc-400">
            LIVE CANVAS RENDER (60 FPS)
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1 text-zinc-300">
          <button
            onClick={() => setZoomLevel((prev) => Math.max(0.6, prev - 0.1))}
            className="p-1 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1.5 min-w-[42px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((prev) => Math.min(1.8, prev + 0.1))}
            className="p-1 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer ml-1 text-zinc-400 hover:text-zinc-200"
            title="Reset Zoom (100%)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-4 relative bg-[#090b10] rounded-xl border border-zinc-900 shadow-inner">
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#38bdf8 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Scaled Poster Container */}
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.12s ease-out',
          }}
          className="w-full flex justify-center items-center py-4"
        >
          <div
            ref={posterRef}
            id="match-poster-canvas"
            className={`w-full ${getAspectRatioClasses()} shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-none relative transition-all duration-200 overflow-hidden`}
          >
            {renderActivePoster()}
          </div>
        </div>
      </div>
    </div>
  );
};
