/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Settings, Moon, Sun, Trash2, Shield, Search } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchEngine: string;
  onSelectSearchEngine: (engine: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
  showShortcuts: boolean;
  onToggleShowShortcuts: () => void;
  onClearHistory: () => void;
}

const ENGINES = [
  { id: 'google', name: 'Google (Default)', url: 'https://www.google.com/search?q=' },
  { id: 'duckduckgo', name: 'DuckDuckGo (Privacy)', url: 'https://duckduckgo.com/?q=' },
  { id: 'bing', name: 'Microsoft Bing', url: 'https://www.bing.com/search?q=' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  searchEngine,
  onSelectSearchEngine,
  isDark,
  onToggleDark,
  showShortcuts,
  onToggleShowShortcuts,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md neu-popover rounded-3xl p-6 border border-white/60 dark:border-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl neu-btn flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
              Browser Settings
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize behavior, defaults, and appearance
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Default Search Engine */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-blue-500" />
              <span>Search Engine</span>
            </label>
            <div className="space-y-1.5">
              {ENGINES.map((engine) => (
                <button
                  key={engine.id}
                  onClick={() => onSelectSearchEngine(engine.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all ${
                    searchEngine === engine.id
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/30'
                      : 'neu-btn text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{engine.name}</span>
                  {searchEngine === engine.id && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between p-3 rounded-2xl neu-btn">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              {isDark ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>Dark Theme</span>
            </div>
            <button
              onClick={onToggleDark}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                isDark ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Quick Action Shortcuts Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl neu-btn">
            <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
              <span>Show Quick Shortcut Icons</span>
            </div>
            <button
              onClick={onToggleShowShortcuts}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                showShortcuts ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  showShortcuts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Clear history */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClearHistory();
                alert('Search history cleared!');
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Recent Searches & Cache</span>
            </button>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
