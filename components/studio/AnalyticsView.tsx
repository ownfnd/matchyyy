'use client';

import React from 'react';
import { MatchData } from '@/lib/types';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Flame,
  Award,
  Zap,
  Target,
  ShieldAlert,
} from 'lucide-react';

interface Props {
  matchData: MatchData;
  onReturnToStudio: () => void;
}

export const AnalyticsView: React.FC<Props> = ({ matchData, onReturnToStudio }) => {
  const { score, mvp } = matchData;

  const parseScore = (s: string) => {
    const parts = s.split('/');
    return {
      runs: parseInt(parts[0]?.replace(/\D/g, '') || '0', 10),
      wickets: parseInt(parts[1]?.replace(/\D/g, '') || '10', 10),
    };
  };

  const a = parseScore(score.teamA.score);
  const b = parseScore(score.teamB.score);
  const runRateA = (a.runs / 20).toFixed(2);
  const runRateB = (b.runs / 20).toFixed(2);
  const runDiff = Math.abs(a.runs - b.runs);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#07090e] text-zinc-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-white">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            Match Intelligence & Analytics
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time telemetry and algorithmic breakdown for {score.tournament}
          </p>
        </div>

        <button
          onClick={onReturnToStudio}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          <span>Back to Poster Studio</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>TOTAL MATCH RUNS</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {a.runs + b.runs}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">
            Across 40 scheduled innings overs
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>RUN DELTA MARGIN</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400 mt-2 font-mono">
            {runDiff} runs
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">
            {runDiff <= 6 ? 'Extreme nail-biter finish' : 'Decisive separation'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>TEAM A RUN RATE</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {runRateA} <span className="text-xs text-zinc-500">rpo</span>
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">
            {score.teamA.name} ({score.teamA.overs})
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>TEAM B RUN RATE</span>
            <Activity className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {runRateB} <span className="text-xs text-zinc-500">rpo</span>
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">
            {score.teamB.name} ({score.teamB.overs})
          </div>
        </div>
      </div>

      {/* Duel Comparison Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-2">
        {/* Run Tally Bar Comparison */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            Head-to-Head Scoring Trajectory
          </h3>

          {/* Team A Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="font-bold text-cyan-400">{score.teamA.name}</span>
              <span className="font-black text-white">{score.teamA.score} ({score.teamA.overs})</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (a.runs / Math.max(a.runs, b.runs, 1)) * 100)}%` }}
              />
            </div>
          </div>

          {/* Team B Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="font-bold text-pink-400">{score.teamB.name}</span>
              <span className="font-black text-white">{score.teamB.score} ({score.teamB.overs})</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (b.runs / Math.max(a.runs, b.runs, 1)) * 100)}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-400 mt-4">
            <span className="text-white font-bold block mb-1">Official Result Call:</span>
            {score.resultSummary}
          </div>
        </div>

        {/* MVP Impact Radar Card */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            MVP Impact Breakdown
          </h3>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
            <div className="p-2.5 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/40 font-black text-base">
              MVP
            </div>
            <div>
              <div className="text-sm font-black text-white uppercase">{mvp.name}</div>
              <div className="text-xs text-zinc-400 font-mono">{mvp.role}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Primary Metric</div>
              <div className="text-lg font-black text-amber-400 mt-1">{mvp.primaryStat}</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Secondary Metric</div>
              <div className="text-xs font-mono text-zinc-300 mt-1 line-clamp-2">
                {mvp.secondaryStat || 'Key Match Dynamic'}
              </div>
            </div>
          </div>

          {matchData.keyHighlights && matchData.keyHighlights.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-zinc-800">
              <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold block">
                Match Key Moments:
              </span>
              <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                {matchData.keyHighlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
