/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, X } from 'lucide-react';
import { GoogleMicIcon } from './GoogleLogos';

interface ActiveSearchBoxProps {
  query: string;
  onChangeQuery: (q: string) => void;
  onExecuteSearch: (q: string) => void;
  onVoiceClick: () => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const PREDICTIONS = [
  'neumorphism ui',
  'neumorphism ui kit',
  'neumorphism ui kit xd',
  'neumorphism ui xd',
  'neumorphism ui elements',
  'neumorphism ui flutter',
  'neumorphism ui css',
  'neumorphism ui trend 2020',
];

export const ActiveSearchBox: React.FC<ActiveSearchBoxProps> = ({
  query,
  onChangeQuery,
  onExecuteSearch,
  onVoiceClick,
  onClear,
  inputRef,
}) => {
  const currentText = query || 'neumorphism ui';

  const filteredPredictions = PREDICTIONS.map((p) => {
    if (query && !p.toLowerCase().includes(query.toLowerCase())) {
      return `${query} ${p.split(' ').slice(1).join(' ')}`.trim();
    }
    return p;
  });

  return (
    <div className="w-full max-w-[440px] md:max-w-[460px] neu-popover rounded-[26px] p-3.5 pb-2.5 border border-white/70 dark:border-white/10 shadow-[0_20px_45px_rgba(150,165,190,0.35)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-150">
      {/* Top Search Row */}
      <div className="flex items-center gap-3 px-2 py-1 pb-2 border-b border-slate-200/50 dark:border-slate-800">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onExecuteSearch(query || 'neumorphism ui');
            }
          }}
          placeholder="Search Google or type a URL"
          className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-normal"
        />
        {query && (
          <button
            onClick={onClear}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-700 mx-0.5" />
        <button
          onClick={onVoiceClick}
          className="p-1 hover:scale-105 transition-transform"
          title="Search by voice"
        >
          <GoogleMicIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Predictions list */}
      <div className="py-1.5 space-y-0.5">
        {filteredPredictions.slice(0, 8).map((pred) => (
          <div
            key={pred}
            onClick={() => {
              onChangeQuery(pred);
              onExecuteSearch(pred);
            }}
            className="flex items-center gap-3 px-2.5 py-1.5 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-200 cursor-pointer transition-colors group"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 shrink-0" />
            <span className="font-normal truncate">
              <span className="font-semibold text-slate-900 dark:text-white">
                {pred.slice(0, (query || 'neumorphism ui').length)}
              </span>
              {pred.slice((query || 'neumorphism ui').length)}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons Row */}
      <div className="pt-2 flex flex-col items-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <button
            onClick={() => onExecuteSearch(query || 'neumorphism ui')}
            className="px-4 py-1.5 rounded-xl neu-btn text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Google Search
          </button>
          <button
            onClick={() => onExecuteSearch(`${query || 'neumorphism ui'} feeling lucky`)}
            className="px-4 py-1.5 rounded-xl neu-btn text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            I&apos;m Feeling Lucky
          </button>
        </div>

        <div className="w-full flex justify-end pr-1">
          <a
            href="https://www.google.com/preferences"
            target="_blank"
            rel="noreferrer"
            className="text-[9px] text-slate-400 hover:underline italic"
          >
            Report inappropriate predictions
          </a>
        </div>
      </div>
    </div>
  );
};
