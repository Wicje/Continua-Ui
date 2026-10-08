/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Calculator, Globe, Clock, ArrowRight } from 'lucide-react';

interface SearchSuggestionsProps {
  query: string;
  onSelect: (item: string) => void;
  recentSearches: string[];
  onRemoveRecent?: (item: string) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  onSelect,
  recentSearches,
  onRemoveRecent,
}) => {
  const trimmed = query.trim();

  // Simple safe math evaluation for things like "15 * 8", "100 / 4", "25 + 75"
  let mathResult: string | null = null;
  if (/^[\d\s+\-*/().%^]+$/.test(trimmed) && /[\d]/.test(trimmed) && /[+\-*/%]/.test(trimmed)) {
    try {
      // Evaluate only basic math safely
      // Replace safe tokens
      const sanitized = trimmed.replace(/[^0-9+\-*/().]/g, '');
      // eslint-disable-next-line no-new-func
      const calc = Function(`'use strict'; return (${sanitized})`)();
      if (typeof calc === 'number' && !isNaN(calc) && isFinite(calc)) {
        mathResult = `${trimmed} = ${calc}`;
      }
    } catch {
      mathResult = null;
    }
  }

  const isUrlLike =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(trimmed);

  const defaultTrending = [
    'weather forecast',
    'google maps',
    'world news today',
    'translate english to spanish',
    'calculator online',
  ];

  const matchedTrending = defaultTrending.filter((item) =>
    item.toLowerCase().includes(trimmed.toLowerCase())
  );

  return (
    <div className="absolute top-[64px] left-0 right-0 neu-popover rounded-3xl p-3 z-40 border border-white/60 dark:border-white/5 animate-in fade-in duration-100">
      {/* Math Calculator quick result if detected */}
      {mathResult && (
        <div
          onClick={() => onSelect(trimmed)}
          className="flex items-center gap-3 p-2.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 cursor-pointer mb-2 hover:bg-blue-100/60 transition-colors"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase font-bold tracking-wider text-blue-500">Calculator</div>
            <div className="text-sm font-semibold">{mathResult}</div>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-400" />
        </div>
      )}

      {/* Direct URL jump */}
      {isUrlLike && (
        <div
          onClick={() => onSelect(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)}
          className="flex items-center gap-3 p-2.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 cursor-pointer mb-2 hover:bg-emerald-100/60 transition-colors"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-500">Go to Website</div>
            <div className="text-sm font-semibold truncate">{trimmed}</div>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Recent searches */}
      {recentSearches.length > 0 && trimmed === '' && (
        <div className="mb-2">
          <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
            Recent Searches
          </div>
          {recentSearches.slice(0, 4).map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 cursor-pointer group text-xs"
            >
              <div
                className="flex items-center gap-2.5 flex-1"
                onClick={() => onSelect(item)}
              >
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{item}</span>
              </div>
              {onRemoveRecent && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveRecent(item);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 text-[10px] px-1"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Query Suggestions */}
      {trimmed !== '' && (
        <div className="space-y-0.5">
          <div
            onClick={() => onSelect(trimmed)}
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-100 cursor-pointer text-xs font-medium"
          >
            <Search className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>Search for &quot;<span className="text-blue-600 dark:text-blue-400">{trimmed}</span>&quot;</span>
          </div>

          {matchedTrending.map((suggestion) => (
            <div
              key={suggestion}
              onClick={() => onSelect(suggestion)}
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 cursor-pointer text-xs"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}

      {trimmed === '' && recentSearches.length === 0 && (
        <div className="py-2 text-center text-xs text-slate-400">
          Type a search term, calculation, or URL...
        </div>
      )}
    </div>
  );
};
