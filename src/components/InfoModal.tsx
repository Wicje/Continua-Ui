/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Info, Sparkles, Command, CheckCircle2 } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
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

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl neu-btn flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
              Neumorphic Browser UI
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pixel-perfect minimalist browser experience
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-5">
          <p>
            An ultra-refined, pixel-accurate implementation of modern soft neumorphic UI aesthetics, featuring dual ambient shadows, tactile feedback, and comprehensive browser utilities.
          </p>

          <div className="p-3 rounded-2xl bg-slate-200/40 dark:bg-slate-800/40 space-y-2">
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Features & Hotkeys</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 shadow-xs border border-slate-200 dark:border-slate-600 font-mono">/</kbd> Focus Search Bar</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 shadow-xs border border-slate-200 dark:border-slate-600 font-mono">Esc</kbd> Close Active Overlays</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 shadow-xs border border-slate-200 dark:border-slate-600 font-mono">Space</kbd> Dino Jump (Arcade)</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 shadow-xs border border-slate-200 dark:border-slate-600 font-mono">Enter</kbd> Execute Google Query</div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Real Google search with auto-suggest and math calculator</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Interactive voice recognition with live audio waves</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Google Apps launcher, Gmail notification previews, profile drawer</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
          <span>Engineered with React + Tailwind</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
