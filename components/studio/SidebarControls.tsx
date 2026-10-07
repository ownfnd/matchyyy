'use client';

import React, { useState } from 'react';
import {
  MatchData,
  PhotoConfig,
  ThemeCustomization,
  PosterThemeId,
  AspectRatioType,
  ExportResolution,
  AIAnalysisResult,
} from '@/lib/types';
import { PhotoUploader } from './PhotoUploader';
import { analyzeMatchWithLaya } from '@/lib/layaEngine';
import { SAMPLE_MATCHES } from '@/lib/sampleData';
import { useToast } from '@/components/ui/Toast';
import {
  Sparkles,
  Trophy,
  Sliders,
  Palette,
  Layers,
  ChevronDown,
  Cpu,
  CheckCircle2,
  Share2,
  X,
} from 'lucide-react';

interface Props {
  matchData: MatchData;
  setMatchData: React.Dispatch<React.SetStateAction<MatchData>>;
  photoConfig: PhotoConfig;
  setPhotoConfig: React.Dispatch<React.SetStateAction<PhotoConfig>>;
  themeConfig: ThemeCustomization;
  setThemeConfig: React.Dispatch<React.SetStateAction<ThemeCustomization>>;
  activeTheme: PosterThemeId;
  setActiveTheme: (theme: PosterThemeId) => void;
  activeBadge: string;
  setActiveBadge: (badge: string) => void;
  aspectRatio: AspectRatioType;
  setAspectRatio: (ar: AspectRatioType) => void;
  resolution: ExportResolution;
  setResolution: (res: ExportResolution) => void;
  onCloseMobile?: () => void;
}

export const SidebarControls: React.FC<Props> = ({
  matchData,
  setMatchData,
  photoConfig,
  setPhotoConfig,
  themeConfig,
  setThemeConfig,
  activeTheme,
  setActiveTheme,
  activeBadge,
  setActiveBadge,
  aspectRatio,
  setAspectRatio,
  resolution,
  setResolution,
  onCloseMobile,
}) => {
  const { success, info } = useToast();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    matchData: true,
    aiAutomation: true,
    photoStudio: true,
    themeOverrides: false,
    exportOptions: false,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<AIAnalysisResult | null>(null);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRunLayaAI = async () => {
    try {
      setIsAnalyzing(true);
      const result = await analyzeMatchWithLaya(matchData);
      setAiReport(result);
      setActiveTheme(result.theme);
      setActiveBadge(result.recommendedBadge);
      if (result.suggestedAccentColor) {
        setThemeConfig((prev) => ({
          ...prev,
          accentColor: result.suggestedAccentColor || prev.accentColor,
        }));
      }
      success(
        `Laya AI: ${result.intensityCategory}`,
        `Theme switched to ${result.theme.toUpperCase()} with badge '${result.recommendedBadge}'`
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = (key: string) => {
    const sample = SAMPLE_MATCHES[key];
    if (sample) {
      setMatchData(sample);
      if (sample.customBadge) {
        setActiveBadge(sample.customBadge);
      }
      info('Preset Loaded', `${sample.score.teamA.shortName} vs ${sample.score.teamB.shortName}`);
    }
  };

  return (
    <div className="w-full lg:w-[380px] xl:w-[410px] flex flex-col h-full bg-zinc-950/95 lg:bg-zinc-950/90 border-r border-zinc-800/80 p-4 overflow-y-auto space-y-4">
      {/* Studio Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div>
          <h1 className="text-base font-black tracking-tight text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
            MATCH POSTER STUDIO
          </h1>
          <p className="text-[11px] text-zinc-400 font-mono">
            Client-Side 60fps Live Graphic Engine
          </p>
        </div>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ACCORDION 1: Match Data Input */}
      <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
        <button
          onClick={() => toggleSection('matchData')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-850/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
            <Trophy className="w-4 h-4 text-cyan-400" />
            <span>1. Match Data & Scores</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
              openSections.matchData ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.matchData && (
          <div className="p-3.5 pt-0 space-y-3 text-xs">
            {/* Quick Demo Match Loaders */}
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-zinc-800/60">
              <span className="text-[10px] uppercase font-mono text-zinc-500">
                Preset:
              </span>
              <button
                onClick={() => handleLoadSample('closeThriller')}
                className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-300 text-[10px] rounded font-medium cursor-pointer transition-all"
              >
                Thriller (Auckland)
              </button>
              <button
                onClick={() => handleLoadSample('blowoutVictory')}
                className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-300 text-[10px] rounded font-medium cursor-pointer transition-all"
              >
                Blowout (Yorkshire)
              </button>
              <button
                onClick={() => handleLoadSample('lowScoringBattle')}
                className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-300 text-[10px] rounded font-medium cursor-pointer transition-all"
              >
                Low-Scoring (CSK)
              </button>
            </div>

            {/* Tournament & Venue */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">
                  Tournament
                </label>
                <input
                  type="text"
                  value={matchData.score.tournament}
                  onChange={(e) =>
                    setMatchData({
                      ...matchData,
                      score: { ...matchData.score, tournament: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-zinc-200 text-xs focus:border-cyan-400 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Venue</label>
                <input
                  type="text"
                  value={matchData.score.venue}
                  onChange={(e) =>
                    setMatchData({
                      ...matchData,
                      score: { ...matchData.score, venue: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-zinc-200 text-xs focus:border-cyan-400 outline-none"
                />
              </div>
            </div>

            {/* Team A Details */}
            <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                Team A (Winner/Host)
              </span>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Team Name"
                  value={matchData.score.teamA.name}
                  onChange={(e) =>
                    setMatchData({
                      ...matchData,
                      score: {
                        ...matchData.score,
                        teamA: { ...matchData.score.teamA, name: e.target.value },
                      },
                    })
                  }
                  className="col-span-2 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-zinc-200 text-xs"
                />
                <input
                  type="text"
                  placeholder="Score"
                  value={matchData.score.teamA.score}
                  onChange={(e) =>
                    setMatchData({
                      ...matchData,
                      score: {
                        ...matchData.score,
                        teamA: { ...matchData.score.teamA, score: e.target.value },
                      },
                    })
                  }
                  className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-zinc-200 text-xs font-mono"
                />
              </div>
            </div>

            {/* Team B Details */}
            <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-pink-400 uppercase font-bold">
                Team B (Opponent)
              </span>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Team Name"
                  value={matchData.score.teamB.name}
                  onChange={(e) =>
                    setMatchData({
                      ...matchData,
                      score: {
                        ...matchData.score,
                        teamB: { ...matchData.score.teamB, name: e.target.value },
                      },
                    })
                  }
                  className="col-span-2 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-zinc-200 text-xs"
                />
                <input
                  type="text"
                  placeholder="Score"
                  value={matchData.score.teamB.score}
                  onChange={(e) =>
                    setMatchData({
                      ...matchData,
                      score: {
                        ...matchData.score,
                        teamB: { ...matchData.score.teamB, score: e.target.value },
                      },
                    })
                  }
                  className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-zinc-200 text-xs font-mono"
                />
              </div>
            </div>

            {/* Result Summary */}
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">
                Result Summary Text
              </label>
              <input
                type="text"
                value={matchData.score.resultSummary}
                onChange={(e) =>
                  setMatchData({
                    ...matchData,
                    score: { ...matchData.score, resultSummary: e.target.value },
                  })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-zinc-200 text-xs focus:border-cyan-400 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 2: Laya AI Automation */}
      <div className="border border-cyan-800/50 rounded-xl overflow-hidden bg-cyan-950/20">
        <button
          onClick={() => toggleSection('aiAutomation')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-cyan-950/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>2. Laya AI Decision Engine (~421M ModernBERT)</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-cyan-400 transition-transform duration-200 ${
              openSections.aiAutomation ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.aiAutomation && (
          <div className="p-3.5 pt-0 space-y-3 text-xs">
            <button
              onClick={handleRunLayaAI}
              disabled={isAnalyzing}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)] disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>{isAnalyzing ? 'Analyzing Scorecard...' : 'Auto-Stylize with Laya AI'}</span>
            </button>

            {aiReport && (
              <div className="p-3 rounded-lg bg-zinc-900/90 border border-cyan-500/40 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">Classification:</span>
                  <span className="text-cyan-400 font-bold">
                    {aiReport.intensityCategory}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">Confidence:</span>
                  <span className="text-emerald-400 font-bold">
                    {(aiReport.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">Chosen Badge:</span>
                  <span className="text-pink-400 font-bold">
                    {aiReport.recommendedBadge}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 italic pt-1 border-t border-zinc-800">
                  {aiReport.explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ACCORDION 3: MVP Photo Studio */}
      <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
        <button
          onClick={() => toggleSection('photoStudio')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-850/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>3. Player & MVP Photo Studio</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
              openSections.photoStudio ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.photoStudio && (
          <div className="p-3.5 pt-0 space-y-3">
            {/* MVP Name and Role input */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">
                  MVP Name
                </label>
                <input
                  type="text"
                  value={matchData.mvp.name}
                  onChange={(e) =>
                    setMatchData({
                      ...matchData,
                      mvp: { ...matchData.mvp, name: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">
                  Role Title
                </label>
                <input
                  type="text"
                  value={matchData.mvp.role}
                  onChange={(e) =>
                    setMatchData({
                      ...matchData,
                      mvp: { ...matchData.mvp, role: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200"
                />
              </div>
            </div>

            {/* Primary & Secondary Stat */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">
                  Key Stat (Runs / Wkts)
                </label>
                <input
                  type="text"
                  value={matchData.mvp.primaryStat}
                  onChange={(e) =>
                    setMatchData({
                      ...matchData,
                      mvp: { ...matchData.mvp, primaryStat: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200 font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">
                  Secondary Stat
                </label>
                <input
                  type="text"
                  value={matchData.mvp.secondaryStat || ''}
                  onChange={(e) =>
                    setMatchData({
                      ...matchData,
                      mvp: { ...matchData.mvp, secondaryStat: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-200 font-mono"
                />
              </div>
            </div>

            {/* Photo Uploader Component */}
            <PhotoUploader photoConfig={photoConfig} onChange={setPhotoConfig} />
          </div>
        )}
      </div>

      {/* ACCORDION 4: Theme & Styling Overrides */}
      <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
        <button
          onClick={() => toggleSection('themeOverrides')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-850/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>4. Visual Themes & Styling</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
              openSections.themeOverrides ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.themeOverrides && (
          <div className="p-3.5 pt-0 space-y-3 text-xs">
            <label className="text-[11px] text-zinc-400 block">Select Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'cyberpunk', name: 'Cyberpunk' },
                { id: 'retro', name: 'Retro Mag' },
                { id: 'swiss', name: 'Swiss Clean' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTheme(t.id as PosterThemeId)}
                  className={`py-2 px-1 text-center font-bold text-xs rounded-lg border transition-all active:scale-95 cursor-pointer ${
                    activeTheme === t.id
                      ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            {/* Custom Badge override */}
            <div className="pt-2">
              <label className="text-[11px] text-zinc-400 block mb-1">
                Match Headline Badge
              </label>
              <input
                type="text"
                value={activeBadge}
                onChange={(e) => setActiveBadge(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-zinc-200 font-mono text-xs uppercase"
              />
            </div>

            {/* Accent Color Picker */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-zinc-400">Accent Color</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={themeConfig.accentColor}
                  onChange={(e) =>
                    setThemeConfig({ ...themeConfig, accentColor: e.target.value })
                  }
                  className="w-7 h-7 rounded border border-zinc-700 cursor-pointer bg-transparent"
                />
                <span className="font-mono text-[11px] text-zinc-400">
                  {themeConfig.accentColor}
                </span>
              </div>
            </div>

            {/* Texture Toggles */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] text-zinc-300">Technical Grid Lines</span>
                <input
                  type="checkbox"
                  checked={themeConfig.showGridLines}
                  onChange={(e) =>
                    setThemeConfig({
                      ...themeConfig,
                      showGridLines: e.target.checked,
                    })
                  }
                  className="accent-cyan-400"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] text-zinc-300">Scanlines / Halftone</span>
                <input
                  type="checkbox"
                  checked={themeConfig.showScanlines || themeConfig.showHalftoneGrain}
                  onChange={(e) =>
                    setThemeConfig({
                      ...themeConfig,
                      showScanlines: e.target.checked,
                      showHalftoneGrain: e.target.checked,
                    })
                  }
                  className="accent-cyan-400"
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 5: Aspect Ratio & Export Formats */}
      <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/40">
        <button
          onClick={() => toggleSection('exportOptions')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-850/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>5. Dimensions & Resolution</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
              openSections.exportOptions ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.exportOptions && (
          <div className="p-3.5 pt-0 space-y-3 text-xs">
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">
                Aspect Ratio Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '1:1', label: '1:1 Square (Feed)' },
                  { id: '9:16', label: '9:16 Story / Reel' },
                  { id: '4:5', label: '4:5 Portrait (IG)' },
                  { id: 'A4', label: 'Printable A4' },
                ].map((ar) => (
                  <button
                    key={ar.id}
                    onClick={() => {
                      setAspectRatio(ar.id as AspectRatioType);
                      setThemeConfig({
                        ...themeConfig,
                        aspectRatio: ar.id as AspectRatioType,
                      });
                    }}
                    className={`py-1.5 px-2 text-center rounded border font-mono text-[11px] transition-all active:scale-95 cursor-pointer ${
                      aspectRatio === ar.id
                        ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 font-bold'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {ar.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">
                Export Resolution Quality
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '1x', label: '1x Standard' },
                  { id: '2x', label: '2x High Res' },
                  { id: '4x', label: '4x Ultra 4K' },
                ].map((res) => (
                  <button
                    key={res.id}
                    onClick={() => setResolution(res.id as ExportResolution)}
                    className={`py-1.5 px-2 text-center rounded border font-mono text-[11px] transition-all active:scale-95 cursor-pointer ${
                      resolution === res.id
                        ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 font-bold'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {res.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
