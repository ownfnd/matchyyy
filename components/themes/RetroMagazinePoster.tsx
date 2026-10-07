import React from 'react';
import { MatchData, PhotoConfig, ThemeCustomization } from '@/lib/types';
import { Star, Trophy, ShieldCheck } from 'lucide-react';

interface Props {
  matchData: MatchData;
  photoConfig: PhotoConfig;
  themeConfig: ThemeCustomization;
  badge?: string;
}

export const RetroMagazinePoster: React.FC<Props> = ({
  matchData,
  photoConfig,
  themeConfig,
  badge = 'RECORD BREAKER',
}) => {
  const { score, mvp } = matchData;
  const deepCrimson = themeConfig.accentColor || '#8B0000';
  const vintageNavy = '#111827';
  const paperBg = '#F4EBE1';

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col justify-between p-7 select-none border-12 border-[#1c1917]"
      style={{
        backgroundColor: paperBg,
        color: vintageNavy,
        boxShadow: 'inset 0 0 60px rgba(78, 59, 44, 0.25)',
        fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
      }}
    >
      {/* Halftone & Vintage Grain Texture Overlay */}
      {themeConfig.showHalftoneGrain && (
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(${vintageNavy} 1px, transparent 1px)`,
            backgroundSize: '4px 4px',
          }}
        />
      )}

      {/* Distressed Editorial Outer Border Double Rule */}
      <div className="absolute inset-2 border-2 border-[#1c1917]/80 pointer-events-none" />
      <div className="absolute inset-3 border border-[#1c1917]/40 pointer-events-none" />

      {/* TOP HEADER: Classic Gazette Masthead */}
      <div className="relative z-10 flex flex-col items-center border-b-4 border-double border-[#1c1917] pb-3">
        {/* Issue & Date Line */}
        <div className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest font-sans font-bold border-b border-[#1c1917]/30 pb-1 mb-2">
          <span>VOL. XXIV • SPECIAL EDITION</span>
          <span className="font-serif italic font-normal">{score.venue}</span>
          <span>{score.date}</span>
        </div>

        {/* Big Impact Magazine Masthead */}
        <h1
          className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-center leading-none"
          style={{
            fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
            letterSpacing: '0.05em',
            color: deepCrimson,
          }}
        >
          THE CRICKET CHRONICLE
        </h1>

        <div className="flex items-center gap-2 mt-1.5 font-sans text-xs uppercase tracking-wider font-extrabold text-[#1c1917]">
          <span>{score.tournament}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1 text-amber-800">
            <Trophy className="w-3.5 h-3.5 fill-current" />
            {score.matchStage || 'CHAMPIONSHIP'}
          </span>
        </div>
      </div>

      {/* VINTAGE BADGE BANNER */}
      <div className="relative z-10 my-2 flex justify-center">
        <div
          className="px-6 py-1 border-2 border-[#1c1917] bg-[#1c1917] text-[#f4ebe1] font-sans font-black text-xs uppercase tracking-widest shadow-md flex items-center gap-2"
          style={{
            transform: 'rotate(-1deg)',
          }}
        >
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{badge}</span>
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
        </div>
      </div>

      {/* CENTER: VINTAGE PLAYER SHOWCASE & HEADLINE */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-2">
        {photoConfig.imageUrl ? (
          <div
            className="relative flex items-center justify-center transition-transform duration-150"
            style={{
              transform: `scale(${photoConfig.scale}) translate(${photoConfig.offsetX}px, ${photoConfig.offsetY}px)`,
              maxHeight: '75%',
            }}
          >
            {/* Halftone / Grain Border Frame */}
            <div className="p-2 bg-white/70 shadow-2xl border-2 border-[#1c1917]/70 rotate-1">
              <img
                src={photoConfig.imageUrl}
                alt={mvp.name}
                className="max-h-[320px] object-contain filter contrast-125 brightness-95"
                style={{
                  filter:
                    photoConfig.filterMode === 'vintage-grain'
                      ? 'sepia(0.35) contrast(1.2) brightness(0.95)'
                      : photoConfig.filterMode === 'bw-highpass'
                      ? 'grayscale(1) contrast(1.5)'
                      : undefined,
                }}
              />
              <div className="text-center font-sans font-black text-xs uppercase tracking-wider mt-1 text-[#1c1917]">
                {mvp.name} — {mvp.role}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 border-2 border-dashed border-[#1c1917]/60 bg-white/40 rounded-lg text-center">
            <ShieldCheck className="w-12 h-12 mx-auto mb-2 text-[#8B0000]" />
            <div className="font-serif text-lg font-bold italic">{mvp.name}</div>
            <div className="font-sans text-xs uppercase tracking-widest text-[#1c1917]/70">
              {mvp.role}
            </div>
          </div>
        )}

        {/* Vintage Highlight Pill */}
        <div className="mt-3 bg-[#1c1917] text-[#f4ebe1] px-4 py-1.5 rounded-none font-sans font-black text-sm tracking-wide shadow">
          {mvp.primaryStat} {mvp.secondaryStat ? `• ${mvp.secondaryStat}` : ''}
        </div>
      </div>

      {/* BOTTOM SECTION: NEWSPAPER STAT BOXES & RESULT */}
      <div className="relative z-10 flex flex-col gap-2 pt-2 border-t-2 border-[#1c1917]">
        {/* Newspaper 2-Column Duel Box */}
        <div className="grid grid-cols-2 gap-3 bg-white/80 border-2 border-[#1c1917] p-3 shadow-sm">
          <div className="border-r border-[#1c1917]/40 pr-2">
            <span className="font-sans text-[10px] font-black tracking-widest uppercase text-[#8B0000] block">
              {score.teamA.name}
            </span>
            <div className="font-serif text-3xl font-black text-[#1c1917] leading-tight flex items-baseline gap-1 mt-0.5">
              <span>{score.teamA.score}</span>
              <span className="font-sans text-[11px] font-bold text-[#1c1917]/60">
                ({score.teamA.overs})
              </span>
            </div>
          </div>

          <div className="pl-2">
            <span className="font-sans text-[10px] font-black tracking-widest uppercase text-[#1c1917]/70 block">
              {score.teamB.name}
            </span>
            <div className="font-serif text-3xl font-black text-[#1c1917] leading-tight flex items-baseline gap-1 mt-0.5">
              <span>{score.teamB.score}</span>
              <span className="font-sans text-[11px] font-bold text-[#1c1917]/60">
                ({score.teamB.overs})
              </span>
            </div>
          </div>
        </div>

        {/* Editorial Final Proclamation */}
        <div
          className="text-center font-serif italic font-bold text-sm py-1.5 px-3 border border-[#1c1917] bg-[#fdfbf7]"
          style={{ color: deepCrimson }}
        >
          &ldquo;{score.resultSummary}&rdquo;
        </div>
      </div>
    </div>
  );
};
