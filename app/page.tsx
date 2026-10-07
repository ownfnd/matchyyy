'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SidebarControls } from '@/components/studio/SidebarControls';
import { PosterPreview } from '@/components/studio/PosterPreview';
import { ExportBar } from '@/components/studio/ExportBar';
import { Navbar } from '@/components/studio/Navbar';
import { HelpModal } from '@/components/ui/HelpModal';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { SAMPLE_MATCHES } from '@/lib/sampleData';
import { GalleryView } from '@/components/studio/GalleryView';
import { AnalyticsView } from '@/components/studio/AnalyticsView';
import {
  MatchData,
  PhotoConfig,
  ThemeCustomization,
  PosterThemeId,
  AspectRatioType,
  ExportResolution,
  ActiveView,
  SavedPoster,
} from '@/lib/types';

const STORAGE_KEY = 'match_poster_studio_state_v1';
const GALLERY_STORAGE_KEY = 'match_poster_studio_gallery_v1';

function StudioContent() {
  const { success, info } = useToast();

  // Navigation View State ('studio' | 'gallery' | 'analytics')
  const [activeView, setActiveView] = useState<ActiveView>('studio');

  // Primary state initialized
  const [matchData, setMatchData] = useState<MatchData>(SAMPLE_MATCHES.closeThriller);

  const [photoConfig, setPhotoConfig] = useState<PhotoConfig>({
    imageUrl: null,
    hasRemovedBg: false,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    filterMode: 'duotone',
    duotonePrimaryColor: '#00F0FF',
    duotoneSecondaryColor: '#FF0055',
  });

  const [activeTheme, setActiveTheme] = useState<PosterThemeId>('cyberpunk');
  const [activeBadge, setActiveBadge] = useState<string>('INSTANT CLASSIC');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('1:1');
  const [resolution, setResolution] = useState<ExportResolution>('2x');

  const [themeConfig, setThemeConfig] = useState<ThemeCustomization>({
    themeId: 'cyberpunk',
    accentColor: '#00F0FF',
    contrastColor: '#FFE600',
    showScanlines: true,
    showHalftoneGrain: true,
    showGridLines: true,
    fontStyle: 'heavy-display',
    aspectRatio: '1:1',
  });

  // Saved Posters Library State
  const [savedPosters, setSavedPosters] = useState<SavedPoster[]>([]);

  // Responsive Drawer & Help Modal state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const posterRef = useRef<HTMLDivElement | null>(null);

  // Restore state and gallery from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.matchData) setMatchData(parsed.matchData);
        if (parsed.photoConfig) setPhotoConfig(parsed.photoConfig);
        if (parsed.activeTheme) setActiveTheme(parsed.activeTheme);
        if (parsed.activeBadge) setActiveBadge(parsed.activeBadge);
        if (parsed.aspectRatio) setAspectRatio(parsed.aspectRatio);
        if (parsed.resolution) setResolution(parsed.resolution);
        if (parsed.themeConfig) setThemeConfig(parsed.themeConfig);
      }

      const savedGallery = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (savedGallery) {
        setSavedPosters(JSON.parse(savedGallery));
      } else {
        // Initialize with default sample posters in gallery
        const initialGallery: SavedPoster[] = [
          {
            id: 'sample-1',
            name: 'Auckland Aces - Super Smash Thriller',
            createdAt: 'Today, 2:30 PM',
            matchData: SAMPLE_MATCHES.closeThriller,
            photoConfig: {
              imageUrl: null,
              hasRemovedBg: false,
              scale: 1,
              offsetX: 0,
              offsetY: 0,
              filterMode: 'duotone',
              duotonePrimaryColor: '#00F0FF',
              duotoneSecondaryColor: '#FF0055',
            },
            themeConfig: {
              themeId: 'cyberpunk',
              accentColor: '#00F0FF',
              contrastColor: '#FFE600',
              showScanlines: true,
              showHalftoneGrain: true,
              showGridLines: true,
              fontStyle: 'heavy-display',
              aspectRatio: '1:1',
            },
            activeTheme: 'cyberpunk',
            activeBadge: 'INSTANT CLASSIC',
            aspectRatio: '1:1',
            resolution: '2x',
          },
          {
            id: 'sample-2',
            name: 'Yorkshire Vikings Record Blast',
            createdAt: 'Yesterday',
            matchData: SAMPLE_MATCHES.blowoutVictory,
            photoConfig: {
              imageUrl: null,
              hasRemovedBg: false,
              scale: 1,
              offsetX: 0,
              offsetY: 0,
              filterMode: 'vintage-grain',
              duotonePrimaryColor: '#8B0000',
              duotoneSecondaryColor: '#111827',
            },
            themeConfig: {
              themeId: 'retro',
              accentColor: '#8B0000',
              contrastColor: '#FFE600',
              showScanlines: false,
              showHalftoneGrain: true,
              showGridLines: false,
              fontStyle: 'classic-serif',
              aspectRatio: '1:1',
            },
            activeTheme: 'retro',
            activeBadge: 'RECORD BREAKER',
            aspectRatio: '1:1',
            resolution: '2x',
          },
        ];
        setSavedPosters(initialGallery);
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(initialGallery));
      }
    } catch (e) {
      console.warn('Could not load studio session state from localStorage', e);
    }
  }, []);

  // Save current project state & add to Saved Library
  const handleSavePoster = () => {
    try {
      const stateToSave = {
        matchData,
        photoConfig,
        activeTheme,
        activeBadge,
        aspectRatio,
        resolution,
        themeConfig,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));

      // Also append / update in Saved Gallery
      const newSavedItem: SavedPoster = {
        id: 'poster-' + Date.now(),
        name: `${matchData.score.teamA.shortName || matchData.score.teamA.name} vs ${matchData.score.teamB.shortName || matchData.score.teamB.name} (${activeBadge})`,
        createdAt: 'Just now',
        matchData,
        photoConfig,
        themeConfig,
        activeTheme,
        activeBadge,
        aspectRatio,
        resolution,
      };

      const updatedGallery = [newSavedItem, ...savedPosters.filter((p) => p.name !== newSavedItem.name)];
      setSavedPosters(updatedGallery);
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedGallery));

      success('Saved to Library', 'Poster archived to Gallery and local state persisted.');
    } catch (e) {
      console.error(e);
    }
  };

  // Load a saved poster into the studio
  const handleLoadSavedPoster = (poster: SavedPoster) => {
    setMatchData(poster.matchData);
    setPhotoConfig(poster.photoConfig);
    setActiveTheme(poster.activeTheme);
    setActiveBadge(poster.activeBadge);
    setAspectRatio(poster.aspectRatio);
    setResolution(poster.resolution);
    setThemeConfig(poster.themeConfig);
    setActiveView('studio');
    success('Loaded From Library', `Switched workspace to '${poster.name}'`);
  };

  // Delete poster from saved library
  const handleDeleteSavedPoster = (id: string) => {
    const updated = savedPosters.filter((p) => p.id !== id);
    setSavedPosters(updated);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    info('Removed', 'Poster deleted from saved collection.');
  };

  // Reset back to initial demo
  const handleResetPoster = () => {
    setMatchData(SAMPLE_MATCHES.closeThriller);
    setActiveTheme('cyberpunk');
    setActiveBadge('INSTANT CLASSIC');
    setAspectRatio('1:1');
    setResolution('2x');
    setPhotoConfig({
      imageUrl: null,
      hasRemovedBg: false,
      scale: 1,
      offsetX: 0,
      offsetY: 0,
      filterMode: 'duotone',
      duotonePrimaryColor: '#00F0FF',
      duotoneSecondaryColor: '#FF0055',
    });
    setThemeConfig({
      themeId: 'cyberpunk',
      accentColor: '#00F0FF',
      contrastColor: '#FFE600',
      showScanlines: true,
      showHalftoneGrain: true,
      showGridLines: true,
      fontStyle: 'heavy-display',
      aspectRatio: '1:1',
    });
    localStorage.removeItem(STORAGE_KEY);
    info('Studio Reset', 'Default template restored.');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#07090e] text-zinc-100 font-sans">
      {/* Interactive Responsive Top Navbar with View Switcher */}
      <Navbar
        tournament={matchData.score.tournament}
        activeTheme={activeTheme}
        activeView={activeView}
        setActiveView={setActiveView}
        savedCount={savedPosters.length}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        onSavePoster={handleSavePoster}
        onResetPoster={handleResetPoster}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Workspace Router */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* VIEW 1: STUDIO (Canvas + Controls) */}
        {activeView === 'studio' && (
          <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
            {/* Desktop Sidebar (35% width, always visible on lg+) */}
            <div className="hidden lg:block h-full shrink-0">
              <SidebarControls
                matchData={matchData}
                setMatchData={setMatchData}
                photoConfig={photoConfig}
                setPhotoConfig={setPhotoConfig}
                themeConfig={themeConfig}
                setThemeConfig={setThemeConfig}
                activeTheme={activeTheme}
                setActiveTheme={setActiveTheme}
                activeBadge={activeBadge}
                setActiveBadge={setActiveBadge}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                resolution={resolution}
                setResolution={setResolution}
              />
            </div>

            {/* Mobile Slide-Out Drawer (<1024px) */}
            {isMobileSidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-40 flex">
                {/* Backdrop */}
                <div
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                />
                {/* Drawer Content */}
                <div className="relative w-[85%] max-w-sm h-full z-50 shadow-2xl animate-in slide-in-from-left duration-200">
                  <SidebarControls
                    matchData={matchData}
                    setMatchData={setMatchData}
                    photoConfig={photoConfig}
                    setPhotoConfig={setPhotoConfig}
                    themeConfig={themeConfig}
                    setThemeConfig={setThemeConfig}
                    activeTheme={activeTheme}
                    setActiveTheme={setActiveTheme}
                    activeBadge={activeBadge}
                    setActiveBadge={setActiveBadge}
                    aspectRatio={aspectRatio}
                    setAspectRatio={setAspectRatio}
                    resolution={resolution}
                    setResolution={setResolution}
                    onCloseMobile={() => setIsMobileSidebarOpen(false)}
                  />
                </div>
              </div>
            )}

            {/* Right Workspace Live Canvas & Export Studio */}
            <div className="flex-1 flex flex-col h-full overflow-hidden p-3 sm:p-4 gap-3 bg-[#0a0c13]">
              {/* Live 60fps Canvas Render Area */}
              <PosterPreview
                matchData={matchData}
                photoConfig={photoConfig}
                themeConfig={{
                  ...themeConfig,
                  aspectRatio,
                }}
                activeTheme={activeTheme}
                activeBadge={activeBadge}
                posterRef={posterRef}
              />

              {/* Action Export Bar */}
              <ExportBar
                posterRef={posterRef}
                aspectRatio={aspectRatio}
                resolution={resolution}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: SAVED GALLERY LIBRARY */}
        {activeView === 'gallery' && (
          <GalleryView
            posters={savedPosters}
            onLoadPoster={handleLoadSavedPoster}
            onDeletePoster={handleDeleteSavedPoster}
            onNewPoster={() => {
              handleResetPoster();
              setActiveView('studio');
            }}
          />
        )}

        {/* VIEW 3: MATCH ANALYTICS & INTELLIGENCE */}
        {activeView === 'analytics' && (
          <AnalyticsView
            matchData={matchData}
            onReturnToStudio={() => setActiveView('studio')}
          />
        )}
      </main>

      {/* Interactive Help / Feature Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

export default function MatchPosterStudio() {
  return (
    <ToastProvider>
      <StudioContent />
    </ToastProvider>
  );
}


