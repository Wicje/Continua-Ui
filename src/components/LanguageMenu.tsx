/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { Check, Search } from 'lucide-react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

interface LanguageMenuProps {
  currentLanguage: string;
  onSelectLanguage: (lang: Language) => void;
  onClose: () => void;
}

export const LanguageMenu: React.FC<LanguageMenuProps> = ({
  currentLanguage,
  onSelectLanguage,
  onClose,
}) => {
  const [filter, setFilter] = React.useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const filteredLanguages = LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(filter.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      ref={menuRef}
      className="absolute top-12 left-0 w-64 neu-popover rounded-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 border border-white/60 dark:border-white/5"
    >
      <div className="flex items-center gap-2 px-2.5 py-1.5 mb-1.5 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search language..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-transparent text-xs outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          autoFocus
        />
      </div>

      <div className="max-h-56 overflow-y-auto space-y-0.5">
        {filteredLanguages.map((lang) => {
          const isSelected = lang.name === currentLanguage || lang.code === currentLanguage;
          return (
            <button
              key={lang.code}
              onClick={() => {
                onSelectLanguage(lang);
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors text-left ${
                isSelected
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex flex-col">
                <span>{lang.name}</span>
                <span className="text-[10px] text-slate-400">{lang.nativeName}</span>
              </div>
              {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
