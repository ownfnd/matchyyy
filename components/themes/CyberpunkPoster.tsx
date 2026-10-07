import React from 'react';
import { MatchData, PhotoConfig, ThemeCustomization } from '@/lib/types';
import { Zap, Activity, Award } from 'lucide-react';

interface Props {
  matchData: MatchData;
  photoConfig: PhotoConfig;
  themeConfig: ThemeCustomization;
  badge?: string;
}

export const CyberpunkPoster: React.FC<Props> = ({
  matchData,
  photoConfig,
  themeConfig,
  badge = 'INSTANT CLASSIC',
}) => {
  const { score, mvp } = matchData;
  const accent = themeConfig.accentColor || '#00F0FF';
  const contrast = themeConfig.contrastColor || '#FFE600';
  const hotPink = '#FF0055';

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[#0B0F19] text-white flex flex-col justify-between p-6 select-none"
      style={{
        boxShadow: 'inset 0 0 100px rgba(0, 240, 255, 0.12)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Background Cyber Tech Grid Lines */}
      {themeConfig.showGridLines && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Futuristic Scanline Effect */}
      {themeConfig.showScanlines && (
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 2px, transparent 2px, transparent 4px)',
          }}
        />
      )}

      {/* Angled Tech Glow Accents */}
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: `${accent}40` }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-[110px] pointer-events-none"
        style={{ backgroundColor: `${hotPink}35` }}
      />

      {/* TOP HEADER SECTION */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-block px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase bg-cyan-400 text-black font-mono"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              }}
            >
              LIVE MATCH REPORT
            </span>
            <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase">
              {score.tournament}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{score.date}</span>
          </div>
        </div>

        {/* Dynamic AI Badge Banner */}
        <div className="flex items-center justify-between mt-1">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs font-black tracking-wider uppercase border"
            style={{
              borderColor: hotPink,
              backgroundColor: 'rgba(255, 0, 85, 0.15)',
              color: hotPink,
              boxShadow: '0 0 15px rgba(255, 0, 85, 0.4)',
              clipPath: 'polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)',
              paddingRight: '1.25rem',
            }}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{badge}</span>
          </div>

          <div className="text-[11px] font-mono uppercase text-zinc-400 text-right">
            VENUE: <span className="text-white font-semibold">{score.venue}</span>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: PLAYER CUTOUT & VERSUS HUD */}
      <div className="relative z-10 flex-1 my-3 flex items-center justify-center overflow-hidden min-h-[220px]">
        {/* Neon Backdrop Ring */}
        <div
          className="absolute w-64 h-64 rounded-full border border-dashed opacity-40 animate-spin"
          style={{
            borderColor: accent,
            animationDuration: '30s',
          }}
        />

        {/* Player Cutout / MVP Center Image */}
        {photoConfig.imageUrl ? (
          <div
            className="relative flex items-center justify-center transition-transform duration-150"
            style={{
              transform: `scale(${photoConfig.scale}) translate(${photoConfig.offsetX}px, ${photoConfig.offsetY}px)`,
              maxHeight: '80%',
            }}
          >
            <img
              src={photoConfig.imageUrl}
              alt="MVP Player"
              className="max-h-[380px] object-contain drop-shadow-[0_15px_30px_rgba(0,240,255,0.4)]"
              style={{
                filter:
                  photoConfig.filterMode === 'neon-glow'
                    ? `drop-shadow(0 0 16px ${accent}) contrast(1.2)`
                    : undefined,
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 border border-dashed border-cyan-500/40 rounded-xl bg-cyan-950/20 text-cyan-300">
            <Award className="w-12 h-12 mb-2 text-cyan-400 opacity-80" />
            <span className="font-mono text-xs uppercase tracking-widest">
              MVP SPOTLIGHT: {mvp.name}
            </span>
            <span className="text-[10px] text-zinc-400 mt-1">Upload cutout in sidebar</span>
          </div>
        )}

        {/* Floating MVP Stat HUD Box */}
        <div
          className="absolute bottom-2 right-2 p-3 bg-[#0f172a]/90 backdrop-blur-md border border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.3)] max-w-[210px]"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
          }}
        >
          <div className="text-[10px] font-mono tracking-wider text-pink-400 uppercase font-bold">
            {mvp.role}
          </div>
          <div className="text-sm font-black tracking-tight text-white uppercase mt-0.5">
            {mvp.name}
          </div>
          <div
            className="text-lg font-black tracking-tighter mt-1"
            style={{ color: contrast }}
          >
            {mvp.primaryStat}
          </div>
          {mvp.secondaryStat && (
            <div className="text-[10px] font-mono text-cyan-300 mt-0.5 line-clamp-1">
              {mvp.secondaryStat}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM SECTION: DUEL SCOREBOARD & HIGHLIGHT BAR */}
      <div className="relative z-10 flex flex-col gap-2">
        {/* Team Scoreboard Comparison */}
        <div className="grid grid-cols-2 gap-3 bg-black/60 border border-cyan-500/40 p-3 backdrop-blur-md">
          {/* Team A */}
          <div className="border-r border-zinc-800 pr-2">
            <div className="text-[11px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
              {score.teamA.name}
            </div>
            <div className="text-3xl font-black tracking-tighter text-white mt-1 flex items-baseline gap-1">
              <span>{score.teamA.score}</span>
              <span className="text-[11px] font-mono text-zinc-400 font-normal">
                {score.teamA.overs}
              </span>
            </div>
          </div>

          {/* Team B */}
          <div className="pl-2">
            <div className="text-[11px] font-mono uppercase text-pink-400 font-bold tracking-wider">
              {score.teamB.name}
            </div>
            <div className="text-3xl font-black tracking-tighter text-white mt-1 flex items-baseline gap-1">
              <span>{score.teamB.score}</span>
              <span className="text-[11px] font-mono text-zinc-400 font-normal">
                {score.teamB.overs}
              </span>
            </div>
          </div>
        </div>

        {/* Match Result Banner */}
        <div
          className="p-2 font-mono text-center text-xs font-bold tracking-wider uppercase border border-cyan-400"
          style={{
            backgroundColor: 'rgba(0, 240, 255, 0.1)',
            color: accent,
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)',
          }}
        >
          {score.resultSummary}
        </div>
      </div>
    </div>
  );
};
