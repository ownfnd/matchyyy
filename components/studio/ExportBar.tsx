'use client';

import React, { useState } from 'react';
import {
  exportPosterAsPNG,
  exportPosterAsSVG,
  exportPosterAsPDF,
  copyPosterToClipboard,
} from '@/lib/exportUtils';
import { AspectRatioType, ExportResolution } from '@/lib/types';
import { Download, FileImage, FileText, Copy, Check, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '@/components/ui/Toast';

interface Props {
  posterRef: React.RefObject<HTMLDivElement | null>;
  aspectRatio: AspectRatioType;
  resolution: ExportResolution;
}

export const ExportBar: React.FC<Props> = ({
  posterRef,
  aspectRatio,
  resolution,
}) => {
  const { success, error: toastError, info } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportingType, setExportingType] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // safe fallback
    }
  };

  const handleExportPNG = async () => {
    if (!posterRef.current) return;
    try {
      setIsExporting(true);
      setExportingType('png');
      setStatusMsg('Rasterizing DOM at ' + resolution + ' resolution...');
      await exportPosterAsPNG(posterRef.current, `match-poster-${Date.now()}.png`, resolution);
      triggerConfetti();
      setStatusMsg('PNG Export Complete!');
      success('PNG Exported Successfully', `Generated ultra-crisp ${resolution} raster poster`);
      setTimeout(() => setStatusMsg(''), 2500);
    } catch (err) {
      console.error(err);
      toastError('PNG Export Failed', 'Could not render canvas raster in this browser context.');
    } finally {
      setIsExporting(false);
      setExportingType(null);
    }
  };

  const handleExportSVG = async () => {
    if (!posterRef.current) return;
    try {
      setIsExporting(true);
      setExportingType('svg');
      setStatusMsg('Generating Vector SVG...');
      await exportPosterAsSVG(posterRef.current, `match-poster-${Date.now()}.svg`);
      triggerConfetti();
      setStatusMsg('SVG Export Complete!');
      success('SVG Exported Successfully', 'Vector asset saved to downloads');
      setTimeout(() => setStatusMsg(''), 2500);
    } catch (err) {
      console.error(err);
      toastError('SVG Export Failed', 'Could not generate vector output.');
    } finally {
      setIsExporting(false);
      setExportingType(null);
    }
  };

  const handleExportPDF = async () => {
    if (!posterRef.current) return;
    try {
      setIsExporting(true);
      setExportingType('pdf');
      setStatusMsg('Generating Printable PDF...');
      await exportPosterAsPDF(posterRef.current, aspectRatio, `match-poster-${Date.now()}.pdf`);
      triggerConfetti();
      setStatusMsg('PDF Export Complete!');
      success('Printable PDF Exported', `Generated print-ready ${aspectRatio} vector PDF.`);
      setTimeout(() => setStatusMsg(''), 2500);
    } catch (err) {
      console.error(err);
      toastError('PDF Export Failed', 'Could not generate printable document.');
    } finally {
      setIsExporting(false);
      setExportingType(null);
    }
  };

  const handleCopyClipboard = async () => {
    if (!posterRef.current) return;
    try {
      setIsExporting(true);
      setExportingType('copy');
      setStatusMsg('Copying image to clipboard...');
      const ok = await copyPosterToClipboard(posterRef.current);
      if (ok) {
        setCopied(true);
        setStatusMsg('Copied to Clipboard!');
        success('Copied to Clipboard', 'You can now paste the poster into chats, Figma, or docs.');
        setTimeout(() => setCopied(false), 2000);
        setTimeout(() => setStatusMsg(''), 2500);
      } else {
        toastError('Clipboard Copy Denied', 'Browser permissions prevented direct clipboard write.');
      }
    } catch (err) {
      console.error(err);
      toastError('Clipboard Copy Error', 'An error occurred during copy.');
    } finally {
      setIsExporting(false);
      setExportingType(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 rounded-lg">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>{aspectRatio}</span>
          <span className="text-zinc-500">•</span>
          <span>{resolution}</span>
        </span>

        {statusMsg && (
          <span className="text-xs font-mono text-zinc-300 animate-pulse hidden sm:inline-block">
            {statusMsg}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Copy to Clipboard */}
        <button
          onClick={handleCopyClipboard}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 active:scale-95 text-zinc-200 text-xs font-medium rounded-lg transition-all disabled:opacity-50 cursor-pointer"
          title="Copy image directly to clipboard"
        >
          {exportingType === 'copy' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
          ) : copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>

        {/* Export SVG */}
        <button
          onClick={handleExportSVG}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 active:scale-95 text-zinc-200 text-xs font-medium rounded-lg transition-all disabled:opacity-50 cursor-pointer"
        >
          {exportingType === 'svg' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
          ) : (
            <FileImage className="w-3.5 h-3.5 text-amber-400" />
          )}
          <span>SVG</span>
        </button>

        {/* Export PDF */}
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 active:scale-95 text-zinc-200 text-xs font-medium rounded-lg transition-all disabled:opacity-50 cursor-pointer"
        >
          {exportingType === 'pdf' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-pink-400" />
          ) : (
            <FileText className="w-3.5 h-3.5 text-pink-400" />
          )}
          <span>Printable PDF</span>
        </button>

        {/* Export High-Res PNG Button */}
        <button
          onClick={handleExportPNG}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 text-black text-xs font-bold uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50 cursor-pointer"
        >
          {exportingType === 'png' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          <span>{exportingType === 'png' ? 'Rendering...' : 'Export PNG'}</span>
        </button>
      </div>
    </div>
  );
};
