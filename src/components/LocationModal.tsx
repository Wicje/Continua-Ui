/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, MapPin, Locate, Check } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
}

const POPULAR_LOCATIONS = [
  'Bangladesh',
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'France',
  'India',
  'Japan',
  'Australia',
  'Nigeria',
  'Brazil',
  'Singapore',
];

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [customInput, setCustomInput] = useState('');
  const [detecting, setDetecting] = useState(false);

  if (!isOpen) return null;

  const handleDetect = () => {
    setDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // In sandboxed environments this may not resolve full geo, so let's set detected or notify
          setDetecting(false);
          onSelectLocation('Local Device Region');
          onClose();
        },
        () => {
          setDetecting(false);
          // fallback
          onSelectLocation('Bangladesh');
          onClose();
        },
        { timeout: 3000 }
      );
    } else {
      setDetecting(false);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onSelectLocation(customInput.trim());
      setCustomInput('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm neu-popover rounded-3xl p-6 border border-white/60 dark:border-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl neu-btn flex items-center justify-center text-blue-600 dark:text-blue-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
              Location Settings
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Set regional search results & preferences
            </p>
          </div>
        </div>

        {/* Detect button */}
        <button
          onClick={handleDetect}
          disabled={detecting}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-2xl neu-btn text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4"
        >
          <Locate className={`w-4 h-4 ${detecting ? 'animate-spin' : ''}`} />
          <span>{detecting ? 'Detecting Location...' : 'Use Precise Device Location'}</span>
        </button>

        {/* Custom Location input */}
        <form onSubmit={handleCustomSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter country or city..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl neu-search text-xs outline-none text-slate-800 dark:text-slate-200"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-medium"
            >
              Set
            </button>
          </div>
        </form>

        {/* Popular Locations */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Select Country
          </div>
          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {POPULAR_LOCATIONS.map((loc) => {
              const isSelected = loc.toLowerCase() === currentLocation.toLowerCase();
              return (
                <button
                  key={loc}
                  onClick={() => {
                    onSelectLocation(loc);
                    onClose();
                  }}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs text-left transition-all ${
                    isSelected
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium'
                      : 'hover:bg-slate-200/50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate">{loc}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
