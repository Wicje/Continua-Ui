/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Mail,
  Grid3X3,
  Plus,
  Image as ImageIcon,
  Bookmark,
  Smile,
  LocateFixed,
  Info,
  Settings,
  X,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
  Layers,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { GoogleLogo, GoogleMicIcon } from './components/GoogleLogos';
import { GoogleWordmark } from './components/GoogleWordmark';
import { GoogleAmbientSpheres } from './components/GoogleAmbientSpheres';
import { GoogleAppsDrawer } from './components/GoogleAppsDrawer';
import { IndianFlag } from './components/IndianFlag';
import { ActiveSearchBox } from './components/ActiveSearchBox';
import { AvatarProfile } from './components/AvatarProfile';
import { LanguageMenu, Language } from './components/LanguageMenu';
import { GoogleAppsMenu } from './components/GoogleAppsMenu';
import { MailMenu } from './components/MailMenu';
import { UserAccountMenu } from './components/UserAccountMenu';
import { SearchSuggestions } from './components/SearchSuggestions';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { AddShortcutModal, ShortcutItem } from './components/AddShortcutModal';
import { ThemeCustomizerModal, ThemePreset, ViewMode } from './components/ThemeCustomizerModal';
import { BookmarksModal } from './components/BookmarksModal';
import { ArcadeDinoModal } from './components/ArcadeDinoModal';
import { LocationModal } from './components/LocationModal';
import { InfoModal } from './components/InfoModal';
import { SettingsModal } from './components/SettingsModal';
import { LiveGlanceWidget } from './components/LiveGlanceWidget';
import { SimulatedBrowserModal } from './components/SimulatedBrowserModal';
import { NeumorphicTabStrip, BrowserTab } from './components/NeumorphicTabStrip';
import {
  initAudio,
  playTactileClick,
  playDrawerSound,
  playChime,
  getSoundEnabled,
  setSoundEnabled,
} from './utils/audioFeedback';

type UIStateMode = 'state1_minimal' | 'state2_active';

const INITIAL_TABS: BrowserTab[] = [
  {
    id: 'tab-1',
    title: 'Google - New Tab',
    url: 'https://www.google.com',
    faviconType: 'google',
  },
  {
    id: 'tab-2',
    title: 'Gemini Studio',
    url: 'https://gemini.google.com',
    faviconType: 'gemini',
    isPinned: true,
  },
  {
    id: 'tab-3',
    title: 'Neumorphism UI Kit',
    url: 'https://github.com/topics/neumorphism',
    faviconType: 'github',
  },
  {
    id: 'tab-4',
    title: 'Lofi Ambient Beats',
    url: 'https://youtube.com',
    faviconType: 'youtube',
    isPlayingAudio: true,
  },
];

export default function App() {
  // State 1 (Minimal) vs State 2 (Active Search & Apps)
  const [activeUiState, setActiveUiState] = useState<UIStateMode>('state2_active');

  // Mouse Parallax & Dynamic Light Physics
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Audio Feedback Toggle
  const [soundOn, setSoundOn] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('neu_sound_enabled');
      return stored !== null ? stored === 'true' : true;
    }
    return true;
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState('neumorphism ui');
  const [isSearchFocused, setIsSearchFocused] = useState(true);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('neu_recent_searches');
    return saved
      ? JSON.parse(saved)
      : ['Google Gemini', 'Weather forecast', 'World news today'];
  });

  // UI Menus & Popovers
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const [showMailMenu, setShowMailMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // State 2 right drawer
  const [isAppsDrawerOpen, setIsAppsDrawerOpen] = useState(true);

  // Modals
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showAddShortcutModal, setShowAddShortcutModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [showDinoModal, setShowDinoModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSimulatedBrowser, setShowSimulatedBrowser] = useState(false);

  // Preferences & customization
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [currentLocation, setCurrentLocation] = useState('India');
  const [themePreset, setThemePreset] = useState<ThemePreset>('classic');
  const [viewMode, setViewMode] = useState<ViewMode>('window');
  const [isDark, setIsDark] = useState(false);
  const [searchEngine, setSearchEngine] = useState('google');
  const [showShortcuts, setShowShortcuts] = useState(true);
  const [showAmbientSpheres, setShowAmbientSpheres] = useState(true);
  const [showTabStrip, setShowTabStrip] = useState(true);

  // Browser Tabs State
  const [browserTabs, setBrowserTabs] = useState<BrowserTab[]>(INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');

  // User shortcuts
  const [customShortcuts, setCustomShortcuts] = useState<ShortcutItem[]>(() => {
    const saved = localStorage.getItem('neu_custom_shortcuts');
    return saved ? JSON.parse(saved) : [];
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initAudio();
  }, []);

  const handleSelectTab = (id: string) => {
    setActiveTabId(id);
    const tab = browserTabs.find((t) => t.id === id);
    if (tab) {
      if (tab.id === 'tab-1') {
        setSearchQuery('neumorphism ui');
      } else if (tab.id === 'tab-3') {
        setSearchQuery('github neumorphism ui components');
      }
    }
  };

  const handleCloseTab = (id: string) => {
    if (browserTabs.length <= 1) return;
    const remaining = browserTabs.filter((t) => t.id !== id);
    setBrowserTabs(remaining);
    if (activeTabId === id) {
      setActiveTabId(remaining[0].id);
    }
  };

  const handleAddTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: BrowserTab = {
      id: newId,
      title: 'New Tab',
      url: 'https://www.google.com',
      faviconType: 'google',
    };
    setBrowserTabs([...browserTabs, newTab]);
    setActiveTabId(newId);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playChime();
  };

  // Cursor Parallax Tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const normX = (clientX / innerWidth - 0.5) * 2;
    const normY = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x: normX, y: normY });
  };

  // When switching state mode, update location & drawer accordingly
  const setUiMode = (mode: UIStateMode) => {
    playTactileClick();
    setActiveUiState(mode);
    if (mode === 'state2_active') {
      setCurrentLocation('India');
      setIsAppsDrawerOpen(true);
      setIsSearchFocused(true);
      setShowAmbientSpheres(true);
      if (!searchQuery) setSearchQuery('neumorphism ui');
    } else {
      setCurrentLocation('Bangladesh');
      setIsAppsDrawerOpen(false);
      setIsSearchFocused(false);
      setShowAmbientSpheres(false);
      setSearchQuery('');
    }
  };

  // Keyboard shortcut listener (/ to focus search, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement !== searchInputRef.current &&
        !showVoiceModal &&
        !showDinoModal &&
        !showAddShortcutModal &&
        !showSimulatedBrowser
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setShowLanguageMenu(false);
        setShowAppsMenu(false);
        setShowMailMenu(false);
        setShowUserMenu(false);
        setIsSearchFocused(false);
        setShowVoiceModal(false);
        setShowAddShortcutModal(false);
        setShowThemeModal(false);
        setShowBookmarksModal(false);
        setShowDinoModal(false);
        setShowLocationModal(false);
        setShowInfoModal(false);
        setShowSettingsModal(false);
        setShowSimulatedBrowser(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showVoiceModal, showDinoModal, showAddShortcutModal, showSimulatedBrowser]);

  // Handle Search Execution
  const executeSearch = (queryToSearch: string) => {
    playTactileClick();
    const query = queryToSearch.trim();
    if (!query) return;

    // Check if it's a direct URL
    const isUrl = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/i.test(query);

    // Save to recents
    const updatedRecents = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 8);
    setRecentSearches(updatedRecents);
    localStorage.setItem('neu_recent_searches', JSON.stringify(updatedRecents));
    setIsSearchFocused(false);

    // Prompt option: Open inside in-app simulated browser preview!
    setShowSimulatedBrowser(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  const handleVoiceTranscript = (text: string) => {
    playChime();
    setSearchQuery(text);
    executeSearch(text);
  };

  const handleAddShortcut = (shortcut: ShortcutItem) => {
    playChime();
    const updated = [...customShortcuts, shortcut];
    setCustomShortcuts(updated);
    localStorage.setItem('neu_custom_shortcuts', JSON.stringify(updated));
    setShowAddShortcutModal(false);
  };

  const handleRemoveShortcut = (id: string) => {
    playTactileClick();
    const updated = customShortcuts.filter((s) => s.id !== id);
    setCustomShortcuts(updated);
    localStorage.setItem('neu_custom_shortcuts', JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    playTactileClick();
    setRecentSearches([]);
    localStorage.removeItem('neu_recent_searches');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-300 font-sans relative overflow-x-hidden ${
        isDark ? 'dark bg-[#12151b] text-slate-100' : 'bg-[#e9ecf2] text-slate-800'
      } ${viewMode === 'fullscreen' ? 'p-0' : 'p-3 md:p-6 lg:p-10'}`}
      style={{
        backgroundImage:
          isDark
            ? 'radial-gradient(circle at 50% 50%, #171b22 0%, #0f1217 100%)'
            : themePreset === 'warm'
            ? 'radial-gradient(circle at 50% 50%, #f6f3ee 0%, #ebe5dc 100%)'
            : themePreset === 'snow'
            ? 'radial-gradient(circle at 50% 50%, #ffffff 0%, #edf1f6 100%)'
            : 'radial-gradient(circle at 50% 50%, #eff2f7 0%, #e3e8f0 100%)',
      }}
    >
      {/* Google Ambient Spheres with Dynamic Cursor Parallax */}
      <GoogleAmbientSpheres visible={showAmbientSpheres && !isDark} mousePos={mousePos} />

      {/* Elite Control Bar: State Switcher, Audio, View, Theme */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-2.5 py-1 rounded-full neu-btn bg-[#eef2f7]/90 dark:bg-[#1e222b]/90 backdrop-blur-md shadow-md border border-white/60 dark:border-white/5 text-xs animate-in fade-in duration-300">
        <button
          onClick={() => setUiMode('state1_minimal')}
          className={`px-3 py-1 rounded-full transition-all font-medium flex items-center gap-1.5 ${
            activeUiState === 'state1_minimal'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
          title="State 1: Minimal New Tab (Screenshot 1)"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Minimal Tab</span>
        </button>

        <button
          onClick={() => setUiMode('state2_active')}
          className={`px-3 py-1 rounded-full transition-all font-medium flex items-center gap-1.5 ${
            activeUiState === 'state2_active'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
          title="State 2: Active Search & Apps (Screenshot 2)"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Active Search & Apps</span>
        </button>

        <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-slate-700 mx-1" />

        {/* Tab Strip Toggle */}
        <button
          onClick={() => {
            playTactileClick();
            setShowTabStrip(!showTabStrip);
          }}
          className={`px-2.5 py-1 rounded-full transition-all font-medium flex items-center gap-1 ${
            showTabStrip
              ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          title="Toggle Neumorphic Tab Strip"
        >
          <span className="text-[11px]">Tab Strip</span>
        </button>

        {/* Audio Mute/Unmute */}
        <button
          onClick={toggleSound}
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
            soundOn ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
          }`}
          title={soundOn ? 'Mute Audio Feedback' : 'Enable Tactile Audio Feedback'}
        >
          {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Dark/Light mode */}
        <button
          onClick={() => {
            playTactileClick();
            setIsDark(!isDark);
          }}
          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200/50"
          title={isDark ? 'Switch to Light' : 'Switch to Dark'}
        >
          {isDark ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3" />}
        </button>

        {/* Window/Fullscreen mode */}
        <button
          onClick={() => {
            playTactileClick();
            setViewMode(viewMode === 'window' ? 'fullscreen' : 'window');
          }}
          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200/50"
          title={viewMode === 'window' ? 'Fullscreen View' : 'Card Window View'}
        >
          {viewMode === 'window' ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
        </button>
      </div>

      {/* Main Browser Canvas Card */}
      <div
        className={`w-full relative flex flex-col justify-between transition-all duration-300 neu-card z-10 overflow-hidden ${
          viewMode === 'fullscreen'
            ? 'min-h-screen rounded-none'
            : 'max-w-[1040px] min-h-[620px] md:min-h-[600px] rounded-[32px]'
        }`}
        style={{
          backgroundColor:
            isDark
              ? '#1a1e27'
              : themePreset === 'warm'
              ? '#f6f3ee'
              : themePreset === 'snow'
              ? '#f8fafc'
              : '#eef2f7',
        }}
      >
        {/* Neumorphic Tab Strip */}
        {showTabStrip && (
          <NeumorphicTabStrip
            tabs={browserTabs}
            activeTabId={activeTabId}
            onSelectTab={handleSelectTab}
            onCloseTab={handleCloseTab}
            onAddTab={handleAddTab}
            isDark={isDark}
          />
        )}

        <div
          className={`w-full flex-1 flex flex-col justify-between ${
            showTabStrip ? 'p-5 md:px-9 md:py-6' : 'p-6 md:px-10 md:py-8'
          }`}
        >
          {/* ================= TOP BAR ================= */}
          <header className="w-full flex items-center justify-between relative z-20">
          {/* Top-Left: Language Selector + Live Weather & Clock Glance */}
          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <button
                onClick={() => {
                  playTactileClick();
                  setShowLanguageMenu(!showLanguageMenu);
                  setShowAppsMenu(false);
                  setShowMailMenu(false);
                  setShowUserMenu(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 neu-btn cursor-pointer ${
                  showLanguageMenu ? 'neu-btn-active' : ''
                }`}
                aria-label="Select Language"
              >
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 stroke-[2.2]" />
                <span className="tracking-tight">{currentLanguage}</span>
              </button>

              {showLanguageMenu && (
                <LanguageMenu
                  currentLanguage={currentLanguage}
                  onSelectLanguage={(lang: Language) => {
                    playTactileClick();
                    setCurrentLanguage(lang.name);
                  }}
                  onClose={() => setShowLanguageMenu(false)}
                />
              )}
            </div>

            {/* Live Clock & Weather Widget Glance */}
            <div className="hidden sm:block">
              <LiveGlanceWidget
                location={currentLocation}
                onLocationClick={() => {
                  playTactileClick();
                  setShowLocationModal(true);
                }}
              />
            </div>
          </div>

          {/* Top-Right: Mail, Wallpaper/Gallery, Google Apps Grid, User Avatar */}
          <div className="flex items-center gap-2.5 md:gap-3.5 relative">
            {/* Mail Button */}
            <div className="relative">
              <button
                onClick={() => {
                  playTactileClick();
                  setShowMailMenu(!showMailMenu);
                  setShowAppsMenu(false);
                  setShowLanguageMenu(false);
                  setShowUserMenu(false);
                }}
                className={`w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer ${
                  showMailMenu ? 'neu-btn-active' : ''
                }`}
                aria-label="Gmail Notifications"
              >
                <Mail className="w-4 h-4 stroke-[1.8]" />
              </button>

              {showMailMenu && <MailMenu onClose={() => setShowMailMenu(false)} />}
            </div>

            {/* Gallery / Wallpaper Button */}
            <button
              onClick={() => {
                playTactileClick();
                setShowThemeModal(true);
              }}
              className="w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
              title="Customize Themes & Wallpaper"
            >
              <ImageIcon className="w-4 h-4 stroke-[1.8]" />
            </button>

            {/* Google Apps 9-Dots Grid Button */}
            <div className="relative">
              <button
                onClick={() => {
                  playDrawerSound();
                  if (activeUiState === 'state2_active') {
                    setIsAppsDrawerOpen(!isAppsDrawerOpen);
                  } else {
                    setShowAppsMenu(!showAppsMenu);
                  }
                  setShowMailMenu(false);
                  setShowLanguageMenu(false);
                  setShowUserMenu(false);
                }}
                className={`w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer ${
                  showAppsMenu || (activeUiState === 'state2_active' && isAppsDrawerOpen)
                    ? 'neu-btn-active text-blue-600 dark:text-blue-400'
                    : ''
                }`}
                aria-label="Google Apps Launcher"
              >
                <Grid3X3 className="w-4 h-4 stroke-[1.8]" />
              </button>

              {showAppsMenu && activeUiState !== 'state2_active' && (
                <GoogleAppsMenu onClose={() => setShowAppsMenu(false)} />
              )}
            </div>

            {/* User Avatar Circle */}
            <div className="relative pl-0.5">
              <button
                onClick={() => {
                  playTactileClick();
                  setShowUserMenu(!showUserMenu);
                  setShowAppsMenu(false);
                  setShowMailMenu(false);
                  setShowLanguageMenu(false);
                }}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full neu-avatar-rim p-0.5 flex items-center justify-center cursor-pointer transition-transform"
                style={{
                  backgroundColor: isDark ? '#1a1e27' : '#eef2f7',
                }}
                aria-label="Google Account"
              >
                <AvatarProfile className="w-full h-full" />
              </button>

              {showUserMenu && <UserAccountMenu onClose={() => setShowUserMenu(false)} />}
            </div>
          </div>
        </header>

        {/* ================= CENTER AREA WITH SMOOTH TRANSITIONS ================= */}
        {activeUiState === 'state2_active' ? (
          /* STATE 2: Full Google Wordmark, Expanded Predictions Card, and Right Apps Drawer */
          <main
            key="state2_active"
            className="w-full flex-1 flex flex-col md:flex-row items-center justify-center md:justify-between my-auto py-4 relative gap-6 animate-in fade-in duration-200"
          >
            {/* Center Column: Google Logo + Expanded Search Box */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[500px] mx-auto">
              <div
                className="mb-6 transform hover:scale-[1.02] transition-transform cursor-pointer"
                onClick={() => playTactileClick()}
              >
                <GoogleWordmark className="h-16 md:h-20" />
              </div>

              <ActiveSearchBox
                query={searchQuery}
                onChangeQuery={setSearchQuery}
                onExecuteSearch={executeSearch}
                onVoiceClick={() => {
                  playTactileClick();
                  setShowVoiceModal(true);
                }}
                onClear={() => {
                  playTactileClick();
                  setSearchQuery('');
                }}
                inputRef={searchInputRef}
              />
            </div>

            {/* Right Column: Open Google Apps Drawer */}
            <div className="shrink-0 flex items-center justify-center animate-in fade-in slide-in-from-right-4 duration-300">
              <GoogleAppsDrawer isOpen={isAppsDrawerOpen} />
            </div>
          </main>
        ) : (
          /* STATE 1: Minimalist Search Pill + 4 Shortcut Circles (from Image 1) */
          <main
            key="state1_minimal"
            className="w-full flex flex-col items-center justify-center my-auto py-8 animate-in fade-in duration-200"
          >
            {/* Google Search Bar Container */}
            <div
              ref={searchContainerRef}
              className="w-full max-w-[490px] relative px-2 sm:px-0"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="w-full h-14 rounded-full neu-search flex items-center px-4 md:px-5 gap-3.5 relative z-30"
                style={{
                  backgroundColor: isDark ? '#212631' : '#eef2f7',
                }}
              >
                {/* Google G Logo */}
                <div
                  onClick={() => {
                    playTactileClick();
                    if (searchQuery) executeSearch(searchQuery);
                  }}
                  className="shrink-0 cursor-pointer hover:opacity-85 transition-opacity"
                  title="Google"
                >
                  <GoogleLogo className="w-6 h-6" />
                </div>

                {/* Text Input */}
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search Google or type a URL"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 placeholder:font-normal font-medium tracking-tight"
                  autoComplete="off"
                  spellCheck="false"
                />

                {/* Clear button if text entered */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick();
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Google Microphone Icon */}
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    setShowVoiceModal(true);
                  }}
                  className="shrink-0 p-1.5 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  title="Search by voice"
                  aria-label="Search by voice"
                >
                  <GoogleMicIcon className="w-5 h-5 group-hover:scale-105 transition-transform" />
                </button>
              </form>

              {/* Smart Search Suggestions & Calculator Popover */}
              {isSearchFocused && (
                <SearchSuggestions
                  query={searchQuery}
                  onSelect={(val) => {
                    playTactileClick();
                    setSearchQuery(val);
                    executeSearch(val);
                  }}
                  recentSearches={recentSearches}
                  onRemoveRecent={(item) => {
                    playTactileClick();
                    const updated = recentSearches.filter((r) => r !== item);
                    setRecentSearches(updated);
                    localStorage.setItem('neu_recent_searches', JSON.stringify(updated));
                  }}
                />
              )}
            </div>

            {/* Quick Action Circles below Search Bar */}
            {showShortcuts && (
              <div className="flex items-center justify-center gap-6 mt-7">
                {/* 1. Plus Icon: Add Shortcut */}
                <button
                  onClick={() => {
                    playTactileClick();
                    setShowAddShortcutModal(true);
                  }}
                  className="w-10 h-10 rounded-full neu-btn flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer group"
                  title="Add shortcut / link"
                  aria-label="Add shortcut"
                >
                  <Plus className="w-4 h-4 stroke-[1.9] group-hover:scale-110 transition-transform" />
                </button>

                {/* 2. Image Icon: Wallpaper & Theme Customizer */}
                <button
                  onClick={() => {
                    playTactileClick();
                    setShowThemeModal(true);
                  }}
                  className="w-10 h-10 rounded-full neu-btn flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer group"
                  title="Customize canvas & theme"
                  aria-label="Customize canvas and theme"
                >
                  <ImageIcon className="w-4 h-4 stroke-[1.8] group-hover:scale-110 transition-transform" />
                </button>

                {/* 3. Bookmark Ribbon Icon: Saved Bookmarks */}
                <button
                  onClick={() => {
                    playTactileClick();
                    setShowBookmarksModal(true);
                  }}
                  className="w-10 h-10 rounded-full neu-btn flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer group"
                  title="Bookmarks & Saved pages"
                  aria-label="Bookmarks"
                >
                  <Bookmark className="w-4 h-4 stroke-[1.8] group-hover:scale-110 transition-transform" />
                </button>

                {/* 4. Smiley Face Icon: Chrome Arcade / Dino Runner Mini-game */}
                <button
                  onClick={() => {
                    playTactileClick();
                    setShowDinoModal(true);
                  }}
                  className="w-10 h-10 rounded-full neu-btn flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer group"
                  title="Chrome Arcade & Goodies"
                  aria-label="Chrome Arcade"
                >
                  <Smile className="w-4 h-4 stroke-[1.8] group-hover:scale-110 transition-transform" />
                </button>
              </div>
            )}
          </main>
        )}

        {/* ================= BOTTOM BAR / FOOTER ================= */}
        {activeUiState === 'state2_active' ? (
          /* STATE 2 FOOTER: Flag + Classic Google Navigation Links */
          <footer className="w-full flex flex-col gap-2 pt-3 border-t border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            {/* Top row with flag */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playTactileClick();
                  setShowLocationModal(true);
                }}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                title="Change Region / Country"
              >
                <IndianFlag className="w-5 h-3.5" />
                <span className="text-slate-600 dark:text-slate-300 font-medium">India</span>
              </button>
            </div>

            {/* Links row */}
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <div className="flex items-center gap-4 md:gap-6">
                <a
                  href="https://ads.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Advertising
                </a>
                <a
                  href="https://www.google.com/services/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Business
                </a>
                <a
                  href="https://about.google/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="https://www.google.com/search/howsearchworks/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  How Search works
                </a>
              </div>

              <div className="flex items-center gap-4 md:gap-6">
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Terms
                </a>
                <button
                  onClick={() => {
                    playTactileClick();
                    setShowSettingsModal(true);
                  }}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Settings
                </button>
              </div>
            </div>
          </footer>
        ) : (
          /* STATE 1 FOOTER: Location Crosshair + Bangladesh + Info & Settings Icons */
          <footer className="w-full flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-normal relative z-10 pt-4">
            <button
              onClick={() => {
                playTactileClick();
                setShowLocationModal(true);
              }}
              className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-slate-200 transition-colors group cursor-pointer py-1 px-1.5 rounded-xl hover:bg-slate-200/30 dark:hover:bg-slate-800/30"
              title="Change Location"
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                <LocateFixed className="w-3.5 h-3.5 stroke-[2] group-hover:text-blue-500 transition-colors" />
              </div>
              <span className="tracking-tight text-xs text-slate-600 dark:text-slate-300 font-normal">
                {currentLocation}
              </span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  playTactileClick();
                  setShowInfoModal(true);
                }}
                className="p-1 rounded-full hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="About this browser UI"
                aria-label="About"
              >
                <Info className="w-4 h-4 stroke-[1.9]" />
              </button>

              <button
                onClick={() => {
                  playTactileClick();
                  setShowSettingsModal(true);
                }}
                className="p-1 rounded-full hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="Browser settings"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4 stroke-[1.9]" />
              </button>
            </div>
          </footer>
        )}
        </div>
      </div>

      {/* ================= ALL MODALS & INTERACTIVE OVERLAYS ================= */}
      <VoiceSearchModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onTranscript={handleVoiceTranscript}
      />

      <AddShortcutModal
        isOpen={showAddShortcutModal}
        onClose={() => setShowAddShortcutModal(false)}
        onAdd={handleAddShortcut}
        existingShortcuts={customShortcuts}
        onRemove={handleRemoveShortcut}
      />

      <ThemeCustomizerModal
        isOpen={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        themePreset={themePreset}
        onSelectTheme={(preset) => {
          playTactileClick();
          setThemePreset(preset);
        }}
        viewMode={viewMode}
        onToggleViewMode={(mode) => {
          playTactileClick();
          setViewMode(mode);
        }}
        isDark={isDark}
        onToggleDark={() => {
          playTactileClick();
          setIsDark(!isDark);
        }}
      />

      <BookmarksModal
        isOpen={showBookmarksModal}
        onClose={() => setShowBookmarksModal(false)}
      />

      <ArcadeDinoModal
        isOpen={showDinoModal}
        onClose={() => setShowDinoModal(false)}
      />

      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        currentLocation={currentLocation}
        onSelectLocation={(loc) => {
          playTactileClick();
          setCurrentLocation(loc);
        }}
      />

      <InfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        searchEngine={searchEngine}
        onSelectSearchEngine={(e) => {
          playTactileClick();
          setSearchEngine(e);
        }}
        isDark={isDark}
        onToggleDark={() => {
          playTactileClick();
          setIsDark(!isDark);
        }}
        showShortcuts={showShortcuts}
        onToggleShowShortcuts={() => {
          playTactileClick();
          setShowShortcuts(!showShortcuts);
        }}
        onClearHistory={handleClearHistory}
      />

      {/* Simulated In-App Tabbed Browser Modal */}
      <SimulatedBrowserModal
        isOpen={showSimulatedBrowser}
        onClose={() => setShowSimulatedBrowser(false)}
        initialUrl={`https://www.google.com/search?q=${encodeURIComponent(searchQuery || 'neumorphism ui')}`}
        initialTitle={`${searchQuery || 'neumorphism ui'} - Google Search`}
      />
    </div>
  );
}

