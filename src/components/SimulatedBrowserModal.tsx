/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Minus,
  Maximize2,
  Lock,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Plus,
  Globe,
  Share2,
} from 'lucide-react';
import { playTactileClick } from '../utils/audioFeedback';

interface SimulatedBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUrl?: string;
  initialTitle?: string;
}

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

export const SimulatedBrowserModal: React.FC<SimulatedBrowserModalProps> = ({
  isOpen,
  onClose,
  initialUrl = 'https://www.google.com/search?q=neumorphism+ui',
  initialTitle = 'neumorphism ui - Google Search',
}) => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'tab-1',
      title: initialTitle,
      url: initialUrl,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState('tab-1');
  const [currentUrlInput, setCurrentUrlInput] = useState(initialUrl);

  if (!isOpen) return null;

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleAddNewTab = () => {
    playTactileClick();
    const newId = `tab-${Date.now()}`;
    const newTab: Tab = {
      id: newId,
      title: 'New Tab',
      url: 'https://www.google.com',
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
    setCurrentUrlInput('https://www.google.com');
  };

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playTactileClick();
    if (tabs.length === 1) {
      onClose();
      return;
    }
    const updated = tabs.filter((t) => t.id !== id);
    setTabs(updated);
    if (activeTabId === id) {
      setActiveTabId(updated[0].id);
      setCurrentUrlInput(updated[0].url);
    }
  };

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    let url = currentUrlInput.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      if (url.includes('.') && !url.includes(' ')) {
        url = `https://${url}`;
      } else {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }
    setTabs(
      tabs.map((t) =>
        t.id === activeTabId ? { ...t, url, title: url.replace(/^https?:\/\//, '') } : t
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[85vh] rounded-3xl neu-card flex flex-col overflow-hidden border border-white/60 dark:border-white/10 shadow-2xl">
        {/* Chrome Tab Bar & Window Controls */}
        <div className="bg-[#dee3ea] dark:bg-[#131720] px-4 pt-3 flex items-center gap-3 border-b border-slate-300/60 dark:border-slate-800 select-none">
          {/* macOS window dots */}
          <div className="flex items-center gap-2 mr-2">
            <button
              onClick={() => {
                playTactileClick();
                onClose();
              }}
              className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity"
              title="Close window"
            />
            <button
              onClick={() => playTactileClick()}
              className="w-3 h-3 rounded-full bg-amber-400 hover:opacity-80 transition-opacity"
              title="Minimize"
            />
            <button
              onClick={() => playTactileClick()}
              className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity"
              title="Maximize"
            />
          </div>

          {/* Tabs row */}
          <div className="flex items-center gap-1.5 overflow-x-auto flex-1">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <div
                  key={tab.id}
                  onClick={() => {
                    playTactileClick();
                    setActiveTabId(tab.id);
                    setCurrentUrlInput(tab.url);
                  }}
                  className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-t-xl text-xs font-medium max-w-[200px] cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[#eef2f7] dark:bg-[#1a1e27] text-slate-800 dark:text-slate-100 shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="truncate flex-1">{tab.title}</span>
                  <button
                    onClick={(e) => handleCloseTab(tab.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded-full hover:bg-slate-300/50 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}

            <button
              onClick={handleAddNewTab}
              className="w-7 h-7 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800/60 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              title="New Tab"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Omnibar & Navigation Buttons */}
        <div className="bg-[#eef2f7] dark:bg-[#1a1e27] px-4 py-2 flex items-center gap-3 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <button
              onClick={() => playTactileClick()}
              className="p-1.5 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => playTactileClick()}
              className="p-1.5 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              title="Forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => playTactileClick()}
              className="p-1.5 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              title="Reload"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Address Omnibar */}
          <form
            onSubmit={handleNavigate}
            className="flex-1 flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-search text-xs text-slate-700 dark:text-slate-200"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <input
              type="text"
              value={currentUrlInput}
              onChange={(e) => setCurrentUrlInput(e.target.value)}
              className="flex-1 bg-transparent outline-none font-mono text-[11px] text-slate-700 dark:text-slate-200"
            />
            <button
              type="submit"
              className="text-[10px] px-2 py-0.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Go
            </button>
          </form>

          {/* External tab launcher */}
          <a
            href={activeTab.url}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-xl neu-btn text-slate-600 dark:text-slate-300 hover:text-blue-600"
            title="Open in real browser tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Simulated Web View Canvas */}
        <div className="flex-1 bg-white dark:bg-[#11141a] overflow-y-auto p-6 flex flex-col items-center">
          {/* Simulated Google Search Results Page */}
          <div className="w-full max-w-3xl space-y-6">
            {/* Query header */}
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              About 1,840,000 results (0.34 seconds)
            </div>

            {/* Knowledge card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                Design Definition
              </span>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Neumorphism (Soft UI)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Neumorphism is a visual design trend that blends skeuomorphism and flat design. It creates a soft, tactile, extruded plastic aesthetic using dual drop shadows (one dark shadow on the bottom-right and one light specular highlight on the top-left) matching the exact surface background color.
              </p>
            </div>

            {/* Simulated Search Result 1 */}
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-mono">https://uxdesign.cc › neumorphism-in-user-interfaces</span>
              <a
                href="https://uxdesign.cc"
                target="_blank"
                rel="noreferrer"
                className="block text-base font-medium text-blue-600 hover:underline"
              >
                Neumorphism in user interfaces | UX Collective
              </a>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A deep dive into soft UI design, contrasting shadows, accessibility considerations, and interactive states for modern web applications.
              </p>
            </div>

            {/* Simulated Search Result 2 */}
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-mono">https://neumorphism.io</span>
              <a
                href="https://neumorphism.io"
                target="_blank"
                rel="noreferrer"
                className="block text-base font-medium text-blue-600 hover:underline"
              >
                Neumorphism/Soft UI CSS code generator
              </a>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Generate CSS code for neumorphic shapes, soft shadows, inset depths, colors, and curved surfaces in real time.
              </p>
            </div>

            {/* Simulated Search Result 3 */}
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-mono">https://dribbble.com › tags › neumorphism</span>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                className="block text-base font-medium text-blue-600 hover:underline"
              >
                Neumorphism Designs, Themes, Templates and Downloadable Graphic...
              </a>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Discover 500+ Neumorphism designs on Dribbble: clean dashboard cards, tactile music players, browser homepages, and minimal UI kits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
