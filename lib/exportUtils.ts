import { toPng, toSvg } from 'html-to-image';
import jsPDF from 'jspdf';
import { AspectRatioType, ExportResolution } from './types';

/**
 * Returns dimensions based on aspect ratio and resolution scale
 */
export function getExportDimensions(aspectRatio: AspectRatioType, resolution: ExportResolution) {
  let baseWidth = 1080;
  let baseHeight = 1080;

  switch (aspectRatio) {
    case '1:1':
      baseWidth = 1080;
      baseHeight = 1080;
      break;
    case '9:16':
      baseWidth = 1080;
      baseHeight = 1920;
      break;
    case '4:5':
      baseWidth = 1080;
      baseHeight = 1350;
      break;
    case 'A4':
      baseWidth = 1240;
      baseHeight = 1754; // A4 standard ~150-300 dpi base
      break;
  }

  const multiplier = resolution === '4x' ? 4 : resolution === '2x' ? 2 : 1;
  return {
    width: baseWidth * multiplier,
    height: baseHeight * multiplier,
    pixelRatio: multiplier,
  };
}

/**
 * Exports DOM element to high resolution PNG and downloads it
 */
export async function exportPosterAsPNG(
  element: HTMLElement,
  filename = 'match-poster.png',
  resolution: ExportResolution = '2x'
): Promise<string> {
  const pixelRatio = resolution === '4x' ? 4 : resolution === '2x' ? 2 : 1;
  
  const dataUrl = await toPng(element, {
    pixelRatio,
    cacheBust: true,
    quality: 0.98,
    filter: (node: HTMLElement) => {
      // Exclude interactive studio controls from being captured
      return !node.classList?.contains('export-exclude');
    },
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
  return dataUrl;
}

/**
 * Exports DOM element to vector SVG file and triggers download
 */
export async function exportPosterAsSVG(
  element: HTMLElement,
  filename = 'match-poster.svg'
): Promise<string> {
  const dataUrl = await toSvg(element, {
    cacheBust: true,
    filter: (node: HTMLElement) => !node.classList?.contains('export-exclude'),
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
  return dataUrl;
}

/**
 * Exports poster as a high-resolution printable PDF
 */
export async function exportPosterAsPDF(
  element: HTMLElement,
  aspectRatio: AspectRatioType,
  filename = 'match-poster.pdf'
): Promise<void> {
  const isLandscape = false;
  const pdfOrientation = isLandscape ? 'landscape' : 'portrait';
  
  // Render poster at high resolution first
  const dataUrl = await toPng(element, {
    pixelRatio: 2.5,
    cacheBust: true,
    quality: 1.0,
    filter: (node: HTMLElement) => !node.classList?.contains('export-exclude'),
  });

  const pdf = new jsPDF({
    orientation: pdfOrientation,
    unit: 'mm',
    format: aspectRatio === 'A4' ? 'a4' : [210, aspectRatio === '9:16' ? 373 : aspectRatio === '4:5' ? 262 : 210],
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(dataUrl, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
  pdf.save(filename);
}

/**
 * Copies the generated poster image directly to user clipboard
 */
export async function copyPosterToClipboard(element: HTMLElement): Promise<boolean> {
  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      filter: (node: HTMLElement) => !node.classList?.contains('export-exclude'),
    });

    const res = await fetch(dataUrl);
    const blob = await res.blob();

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed to copy poster image to clipboard:', err);
    return false;
  }
}
