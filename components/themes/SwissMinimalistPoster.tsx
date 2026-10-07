import React from 'react';
import { MatchData, PhotoConfig, ThemeCustomization } from '@/lib/types';
import { ShieldCheck, BarChart3 } from 'lucide-react';

interface Props {
  matchData: MatchData;
  photoConfig: PhotoConfig;
  themeConfig: ThemeCustomization;
  badge?: string;
}

export const SwissMinimalistPoster: React.FC<Props> = ({
  matchData,
  photoConfig,
  themeConfig,
  badge = 'DEFENSIVE MASTERCLASS',
}) => {
  const { score, mvp } = matchData;
  const offWhite = '#FAF9F6';
  const deepBlack = '#0A0A0A';

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col justify-between p-8 select-none"
      style={{
        backgroundColor: offWhite,
        color: deepBlack,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Precision 1px Swiss Technical Grid System */}
      {themeConfig.showGridLines && (
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${deepBlack} 1px, transparent 1px),
              linear-gradient(to bottom, ${deepBlack} 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />
      )}

      {/* TOP HEADER: Clean Asymmetrical Swiss Typographic Grid */}
      <div className="relative z-10 flex flex-col gap-3 border-b-2 border-black pb-4">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black inline-block" />
            <span className="font-bold">OFFICIAL MATCH RECORD</span>
          </div>
          <span>DOC / {score.date}</span>
        </div>

        <div className="flex justify-between items-baseline">
          <div className="text-xl sm:text-2xl font-black uppercase tracking-tight max-w-[70%]">
            {score.tournament}
          </div>
          <div className="text-right text-xs font-mono text-zinc-600">
            {score.venue}
          </div>
        </div>

        {/* Minimalist Badge */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 bg-black text-white text-[11px] font-mono font-bold tracking-wider uppercase">
            {badge}
          </span>
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
            {score.matchStage || 'REGULAR SEASON'}
          </span>
        </div>
      </div>

      {/* MIDDLE SECTION: Crisp Cutout & Large Numbers */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-between gap-4">
        {/* Left Side: Oversized Headline Stats */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
            PLAYER OF THE MATCH
          </div>
          <div className="text-3xl sm:text-4xl font-black tracking-tight uppercase leading-none">
            {mvp.name}
          </div>
          <div className="text-sm font-medium text-zinc-600 mt-1 uppercase tracking-wide">
            {mvp.role}
          </div>

          <div className="mt-4 pt-3 border-t border-black/20 flex flex-col gap-1">
            <div className="text-2xl font-black tracking-tighter">
              {mvp.primaryStat}
            </div>
            {mvp.secondaryStat && (
              <div className="text-xs font-mono text-zinc-700">
                {mvp.secondaryStat}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Player Cutout with Crisp High-Pass / Monochrome Lighting */}
        <div className="w-[45%] flex items-center justify-center relative min-h-[220px]">
          {photoConfig.imageUrl ? (
            <div
              className="relative flex items-center justify-center transition-transform duration-150"
              style={{
                transform: `scale(${photoConfig.scale}) translate(${photoConfig.offsetX}px, ${photoConfig.offsetY}px)`,
                maxHeight: '85%',
              }}
            >
              <img
                src={photoConfig.imageUrl}
                alt={mvp.name}
                className="max-h-[340px] object-contain drop-shadow-xl"
                style={{
                  filter:
                    photoConfig.filterMode === 'bw-highpass'
                      ? 'grayscale(100%) contrast(1.4) brightness(0.95)'
                      : photoConfig.filterMode === 'duotone'
                      ? 'grayscale(100%) contrast(1.2)'
                      : undefined,
                }}
              />
            </div>
          ) : (
            <div className="w-full h-52 border border-black/30 bg-black/5 flex flex-col items-center justify-center p-4 text-center">
              <BarChart3 className="w-8 h-8 text-black/60 mb-2" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-black/70">
                PORTRAIT / CUTOUT
              </span>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM SECTION: Stark Clean Tabular Scorecard */}
      <div className="relative z-10 flex flex-col gap-3 pt-3 border-t-2 border-black">
        {/* Tabular Score Row */}
        <div className="grid grid-cols-2 divide-x divide-black border border-black bg-white">
          <div className="p-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              {score.teamA.name}
            </div>
            <div className="text-3xl font-black tracking-tight mt-0.5 flex items-baseline justify-between">
              <span>{score.teamA.score}</span>
              <span className="text-xs font-mono font-normal text-zinc-600">
                {score.teamA.overs}
              </span>
            </div>
          </div>

          <div className="p-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              {score.teamB.name}
            </div>
            <div className="text-3xl font-black tracking-tight mt-0.5 flex items-baseline justify-between">
              <span>{score.teamB.score}</span>
              <span className="text-xs font-mono font-normal text-zinc-600">
                {score.teamB.overs}
              </span>
            </div>
          </div>
        </div>

        {/* Final Result Strip */}
        <div className="flex items-center justify-between text-xs font-mono px-3 py-2 bg-black text-white">
          <span className="font-bold tracking-wide uppercase">
            {score.resultSummary}
          </span>
          <span className="text-[10px] tracking-widest text-zinc-400">
            OFFICIAL CLASSIFICATION
          </span>
        </div>
      </div>
    </div>
  );
};
