export type PosterThemeId = 'cyberpunk' | 'retro' | 'swiss';

export type AspectRatioType = '1:1' | '9:16' | '4:5' | 'A4';

export type ExportResolution = '1x' | '2x' | '4x';

export interface PlayerStats {
  name: string;
  role: string;
  primaryStat: string;
  secondaryStat?: string;
  badge?: string;
}

export interface MatchScore {
  teamA: {
    name: string;
    shortName: string;
    score: string;
    overs: string;
    flagOrLogo?: string;
  };
  teamB: {
    name: string;
    shortName: string;
    score: string;
    overs: string;
    flagOrLogo?: string;
  };
  resultSummary: string;
  tournament: string;
  venue: string;
  date: string;
  matchStage?: string;
}

export interface PhotoConfig {
  imageUrl: string | null;
  hasRemovedBg: boolean;
  scale: number;
  offsetX: number;
  offsetY: number;
  filterMode: 'duotone' | 'vintage-grain' | 'bw-highpass' | 'natural' | 'neon-glow';
  duotonePrimaryColor?: string;
  duotoneSecondaryColor?: string;
}

export interface MatchData {
  score: MatchScore;
  mvp: PlayerStats;
  keyHighlights: string[];
  customBadge?: string;
}

export interface AIAnalysisResult {
  theme: PosterThemeId;
  intensityCategory: 'Close Thriller' | 'Blowout Victory' | 'Low-Scoring Defensive Battle' | 'Standard League Clash';
  confidenceScore: number;
  recommendedBadge: string;
  headline: string;
  keyStats: string[];
  explanation: string;
  suggestedAccentColor?: string;
}

export interface ThemeCustomization {
  themeId: PosterThemeId;
  accentColor: string;
  contrastColor: string;
  showScanlines: boolean;
  showHalftoneGrain: boolean;
  showGridLines: boolean;
  fontStyle: 'heavy-display' | 'classic-serif' | 'clean-swiss';
  aspectRatio: AspectRatioType;
}

export type ActiveView = 'studio' | 'gallery' | 'analytics' | 'history';

export interface SavedPoster {
  id: string;
  name: string;
  createdAt: string;
  matchData: MatchData;
  photoConfig: PhotoConfig;
  themeConfig: ThemeCustomization;
  activeTheme: PosterThemeId;
  activeBadge: string;
  aspectRatio: AspectRatioType;
  resolution: ExportResolution;
}

