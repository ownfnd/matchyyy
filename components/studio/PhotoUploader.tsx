'use client';

import React, { useState, useRef } from 'react';
import { PhotoConfig } from '@/lib/types';
import { removeImageBackground, applyPlayerFilter } from '@/lib/bgRemoval';
import { Upload, Sparkles, Sliders, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface Props {
  photoConfig: PhotoConfig;
  onChange: (config: PhotoConfig) => void;
}

export const PhotoUploader: React.FC<Props> = ({ photoConfig, onChange }) => {
  const { success, error: toastError, info } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [progressPct, setProgressPct] = useState(0);
  const [originalUrl, setOriginalUrl] = useState<string | null>(photoConfig.imageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    onChange({
      ...photoConfig,
      imageUrl: url,
      hasRemovedBg: false,
    });
    info('Photo Uploaded', `${file.name} ready for editorial styling`);
  };

  const handleRemoveBackground = async () => {
    const source = originalUrl || photoConfig.imageUrl;
    if (!source) return;

    try {
      setIsProcessing(true);
      setProgressPct(10);
      setProgressMsg('Initializing WASM background removal...');

      const cutoutDataUrl = await removeImageBackground(source, {
        onProgress: (pct, stage) => {
          setProgressPct(pct);
          setProgressMsg(stage);
        },
      });

      onChange({
        ...photoConfig,
        imageUrl: cutoutDataUrl,
        hasRemovedBg: true,
      });
      success('Background Removed (Client WASM)', 'Player subject cutout successfully generated.');
    } catch (err) {
      console.error('Background removal error:', err);
      toastError('Cutout Notice', 'Kept current photo framing without background isolation.');
    } finally {
      setIsProcessing(false);
      setProgressPct(0);
      setProgressMsg('');
    }
  };

  const handleFilterChange = async (filterMode: PhotoConfig['filterMode']) => {
    if (!photoConfig.imageUrl) return;

    try {
      const filtered = await applyPlayerFilter(
        originalUrl || photoConfig.imageUrl,
        filterMode,
        photoConfig.duotonePrimaryColor || '#00F0FF',
        photoConfig.duotoneSecondaryColor || '#FF0055'
      );

      onChange({
        ...photoConfig,
        imageUrl: filtered,
        filterMode,
      });
    } catch (e) {
      console.error(e);
      onChange({
        ...photoConfig,
        filterMode,
      });
    }
  };

  const handleResetPosition = () => {
    onChange({
      ...photoConfig,
      scale: 1,
      offsetX: 0,
      offsetY: 0,
    });
  };

  return (
    <div className="space-y-4">
      {/* File Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-zinc-700 hover:border-cyan-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-zinc-900/60 hover:bg-zinc-900/90 group"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleFileUpload}
        />
        <div className="flex flex-col items-center gap-2">
          <div className="p-2.5 rounded-full bg-zinc-800 text-zinc-300 group-hover:text-cyan-400 group-hover:bg-cyan-950/60 transition-colors">
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-xs font-semibold text-zinc-200">
            {photoConfig.imageUrl ? 'Change MVP Cutout Photo' : 'Upload Player / MVP Photo'}
          </div>
          <div className="text-[11px] text-zinc-500">
            Drag & drop or browse (PNG, JPG, WEBP)
          </div>
        </div>
      </div>

      {photoConfig.imageUrl && (
        <div className="space-y-4 pt-1">
          {/* WASM Background Removal Button */}
          <button
            onClick={handleRemoveBackground}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>
              {photoConfig.hasRemovedBg
                ? 'Re-Run WASM BG Removal'
                : 'Remove Background (Client WASM)'}
            </span>
          </button>

          {/* Progress Indicator */}
          {isProcessing && (
            <div className="space-y-1.5 p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-xs">
              <div className="flex justify-between font-mono text-[11px] text-cyan-300">
                <span>{progressMsg}</span>
                <span>{progressPct}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-cyan-400 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

          {/* Fine Tuning Position Sliders */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Cutout Positioning & Scale
              </span>
              <button
                onClick={handleResetPosition}
                className="text-[10px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Scale Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>Scale: {photoConfig.scale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.05"
                value={photoConfig.scale}
                onChange={(e) =>
                  onChange({ ...photoConfig, scale: parseFloat(e.target.value) })
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Offset X */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>Horizontal Offset (X): {photoConfig.offsetX}px</span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                step="2"
                value={photoConfig.offsetX}
                onChange={(e) =>
                  onChange({ ...photoConfig, offsetX: parseInt(e.target.value, 10) })
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Offset Y */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>Vertical Offset (Y): {photoConfig.offsetY}px</span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                step="2"
                value={photoConfig.offsetY}
                onChange={(e) =>
                  onChange({ ...photoConfig, offsetY: parseInt(e.target.value, 10) })
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Color & Stylized Filters */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
              Photo Editorial Filter
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'natural', label: 'Natural' },
                { id: 'duotone', label: 'Neon Duotone' },
                { id: 'vintage-grain', label: 'Vintage Grain' },
                { id: 'bw-highpass', label: 'B&W Contrast' },
                { id: 'neon-glow', label: 'Cyber Glow' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFilterChange(f.id as PhotoConfig['filterMode'])}
                  className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all active:scale-95 cursor-pointer ${
                    photoConfig.filterMode === f.id
                      ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
