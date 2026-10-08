/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Sparkles, Monitor, Maximize2, Moon, Sun } from 'lucide-react';

export type ThemePreset = 'classic' | 'snow' | 'warm' | 'dark';
export type ViewMode = 'window' | 'fullscreen';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  themePreset: ThemePreset;
  onSelectTheme: (preset: ThemePreset) => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
  themePreset,
  onSelectTheme,
  viewMode,
  onToggleViewMode,
  isDark,
  onToggleDark,
}) => {
  if (!isOpen) return null;

  const presets: { id: ThemePreset; name: string; bg: string; border: string }[] = [
    {
      id: 'classic',
      name: 'Original Light',
      bg: 'bg-[#eef2f7]',
      border: 'border-slate-300',
    },
    {
      id: 'snow',
      name: 'Pure Snow',
      bg: 'bg-[#f8fafc]',
      border: 'border-slate-200',
    },
    {
      id: 'warm',
      name: 'Warm Ceramic',
      bg: 'bg-[#f4efe9]',
      border: 'border-amber-200',
    },
    {
      id: 'dark',
      name: 'Deep Neumorphic',
      bg: 'bg-[#1a1e27]',
      border: 'border-slate-700',
    },
  ];

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
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
              Customize Canvas & Theme
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tune surface aesthetics, color tones, and window format
            </p>
          </div>
        </div>

        {/* Surface Palette Presets */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Surface Aesthetic
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {presets.map((preset) => {
              const isSelected = themePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelectTheme(preset.id);
                    if (preset.id === 'dark' && !isDark) {
                      onToggleDark();
                    } else if (preset.id !== 'dark' && isDark) {
                      onToggleDark();
                    }
                  }}
                  className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                      : 'border-transparent neu-btn'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full ${preset.bg} border ${preset.border} shadow-inner shrink-0`}
                  />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Display Mode
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onToggleViewMode('window')}
              className={`flex items-center gap-2.5 p-3 rounded-2xl text-xs font-medium transition-all ${
                viewMode === 'window'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'neu-btn text-slate-700 dark:text-slate-300'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Card Window (Screenshot)</span>
            </button>
            <button
              onClick={() => onToggleViewMode('fullscreen')}
              className={`flex items-center gap-2.5 p-3 rounded-2xl text-xs font-medium transition-all ${
                viewMode === 'fullscreen'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'neu-btn text-slate-700 dark:text-slate-300'
              }`}
            >
              <Maximize2 className="w-4 h-4" />
              <span>Fullscreen Canvas</span>
            </button>
          </div>
        </div>

        {/* Dark Mode Quick Switch */}
        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            {isDark ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>Dark Neumorphic Mode</span>
          </div>
          <button
            onClick={onToggleDark}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 neu-btn ${
              isDark ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                isDark ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
