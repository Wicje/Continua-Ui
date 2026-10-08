/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Plus,
  Volume2,
  VolumeX,
  Pin,
  ChevronDown,
  Search,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { playTactileClick, playChime } from '../utils/audioFeedback';

export interface BrowserTab {
  id: string;
  title: string;
  url: string;
  faviconType: 'google' | 'gemini' | 'github' | 'youtube' | 'custom';
  isPinned?: boolean;
  isPlayingAudio?: boolean;
}

interface NeumorphicTabStripProps {
  tabs: BrowserTab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onAddTab: () => void;
  onTogglePin?: (id: string) => void;
  isDark?: boolean;
}

export const NeumorphicTabStrip: React.FC<NeumorphicTabStripProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onAddTab,
  onTogglePin,
  isDark = false,
}) => {
  const [hoveredTabId, setHoveredTabId] = useState<string | null>(null);

  const renderFavicon = (type: BrowserTab['faviconType']) => {
    switch (type) {
      case 'google':
        return (
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
        );
      case 'gemini':
        return (
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-400 flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </div>
        );
      case 'github':
        return (
          <svg className="w-3.5 h-3.5 shrink-0 fill-current text-slate-800 dark:text-white" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-3.5 h-3.5 shrink-0 fill-red-600" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return (
          <div className="w-3.5 h-3.5 rounded-full bg-blue-500/20 text-blue-600 flex items-center justify-center text-[9px] font-bold shrink-0">
            W
          </div>
        );
    }
  };

  return (
    <div className="w-full select-none pt-2.5 px-3 md:px-5 flex items-center gap-2 border-b border-black/5 dark:border-white/5 relative z-20">
      {/* macOS Traffic Lights */}
      <div className="flex items-center gap-1.5 mr-2 shrink-0">
        <button
          onClick={() => playTactileClick()}
          className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 transition-opacity shadow-xs"
          title="Close window"
        />
        <button
          onClick={() => playTactileClick()}
          className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 transition-opacity shadow-xs"
          title="Minimize window"
        />
        <button
          onClick={() => playTactileClick()}
          className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-80 transition-opacity shadow-xs"
          title="Expand window"
        />
      </div>

      {/* Tabs Container */}
      <div className="flex items-end gap-1.5 overflow-x-auto scrollbar-none flex-1 py-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isHovered = hoveredTabId === tab.id;

          return (
            <div
              key={tab.id}
              onClick={() => {
                playTactileClick();
                onSelectTab(tab.id);
              }}
              onMouseEnter={() => setHoveredTabId(tab.id)}
              onMouseLeave={() => setHoveredTabId(null)}
              className={`group relative flex items-center gap-2 transition-all duration-150 cursor-pointer ${
                tab.isPinned ? 'px-2.5 py-1.5 rounded-xl' : 'px-3.5 py-2 rounded-t-2xl max-w-[210px] min-w-[130px]'
              } ${
                isActive
                  ? 'bg-[#eef2f7] dark:bg-[#1a1e27] text-slate-950 dark:text-white font-bold shadow-[0_-2px_8px_rgba(160,175,200,0.25),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_-2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)]'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 font-semibold'
              }`}
            >
              {/* Active Tab Extruded Side Fillets (Signature Chrome Neumorphic Shape) */}
              {isActive && !tab.isPinned && (
                <>
                  <div className="absolute -left-2 bottom-0 w-2 h-2 pointer-events-none overflow-hidden">
                    <div className="w-4 h-4 rounded-full shadow-[2px_2px_0_0_#eef2f7] dark:shadow-[2px_2px_0_0_#1a1e27] absolute right-0 bottom-0" />
                  </div>
                  <div className="absolute -right-2 bottom-0 w-2 h-2 pointer-events-none overflow-hidden">
                    <div className="w-4 h-4 rounded-full shadow-[-2px_2px_0_0_#eef2f7] dark:shadow-[-2px_2px_0_0_#1a1e27] absolute left-0 bottom-0" />
                  </div>
                </>
              )}

              {/* Favicon */}
              {renderFavicon(tab.faviconType)}

              {/* Title & Domain (hidden if pinned) */}
              {!tab.isPinned && (
                <span className="text-xs truncate flex-1 tracking-tight">
                  {tab.title}
                </span>
              )}

              {/* Audio Playing Indicator */}
              {tab.isPlayingAudio && (
                <div className="p-0.5 text-blue-500 animate-pulse" title="Playing audio">
                  <Volume2 className="w-3 h-3" />
                </div>
              )}

              {/* Close Button or Pin Indicator */}
              {!tab.isPinned && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playTactileClick();
                    onCloseTab(tab.id);
                  }}
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                    isActive || isHovered
                      ? 'opacity-85 hover:opacity-100 hover:bg-slate-300/80 dark:hover:bg-slate-700/60 text-slate-600 hover:text-slate-950 dark:hover:text-white'
                      : 'opacity-0'
                  }`}
                  title="Close tab"
                >
                  <X className="w-2.5 h-2.5 stroke-[2.5]" />
                </button>
              )}
            </div>
          );
        })}

        {/* New Tab Button (+) */}
        <button
          onClick={() => {
            playChime();
            onAddTab();
          }}
          className="w-7 h-7 rounded-xl neu-btn flex items-center justify-center text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-all ml-1 shrink-0 group font-bold"
          title="Open new tab"
          aria-label="New tab"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.2] group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Right Tab Tools */}
      <div className="flex items-center gap-1.5 shrink-0 pl-2">
        <button
          onClick={() => playTactileClick()}
          className="w-7 h-7 rounded-xl neu-btn flex items-center justify-center text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-all font-semibold"
          title="Search tabs"
        >
          <Search className="w-3 h-3 stroke-[2.2]" />
        </button>
        <button
          onClick={() => playTactileClick()}
          className="w-7 h-7 rounded-xl neu-btn flex items-center justify-center text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-all font-semibold"
          title="Tab overview"
        >
          <ChevronDown className="w-3 h-3 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
};
