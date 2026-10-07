'use client';

import React from 'react';
import { X, Sparkles, Cpu, Layers, Image as ImageIcon, Download } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-zinc-200 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base font-black uppercase tracking-wider text-white">
              Studio Quick Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Features breakdown */}
        <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
          <div className="flex gap-3 items-start p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">
                Laya AI Decision Engine
              </strong>
              Click &quot;Auto-Stylize with Laya AI&quot; to classify your match data into Close Thriller, Blowout Victory, or Defensive Masterclass. It picks the ideal theme, fonts, and headline badges dynamically.
            </div>
          </div>

          <div className="flex gap-3 items-start p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <ImageIcon className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">
                WASM Background Removal
              </strong>
              Upload any player portrait. Tap &quot;Remove Background&quot; to isolate the athlete right inside your browser without uploading to external servers. Use the sliders to scale and position.
            </div>
          </div>

          <div className="flex gap-3 items-start p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <Layers className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">
                3 Distinct Editorial Themes
              </strong>
              Switch between Cyberpunk High Contrast, Retro Sports Magazine, and Swiss Minimalist. Toggle scanlines, halftone grains, and technical gridlines on the fly.
            </div>
          </div>

          <div className="flex gap-3 items-start p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <Download className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">
                Multi-Format Export & Clipboard
              </strong>
              Export 1x/2x/4x high-resolution PNGs, vector SVGs, printable A4 PDFs, or copy straight to your clipboard with 1-click confetti feedback.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
          >
            Got it, Let&apos;s Design
          </button>
        </div>
      </div>
    </div>
  );
};
