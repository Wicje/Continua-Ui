/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Plus, Globe } from 'lucide-react';

export interface ShortcutItem {
  id: string;
  name: string;
  url: string;
  icon?: string;
}

interface AddShortcutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (shortcut: ShortcutItem) => void;
  existingShortcuts: ShortcutItem[];
  onRemove: (id: string) => void;
}

export const AddShortcutModal: React.FC<AddShortcutModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  existingShortcuts,
  onRemove,
}) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a name');
      return;
    }
    if (!url.trim()) {
      setError('Please provide a URL');
      return;
    }

    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    onAdd({
      id: Date.now().toString(),
      name: name.trim(),
      url: formattedUrl,
    });

    setName('');
    setUrl('');
    setError('');
  };

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
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
              Add Shortcut
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Create quick launch links on your new tab
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mb-5">
          {error && (
            <div className="text-xs text-rose-500 bg-rose-500/10 p-2 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. GitHub, Reddit, Figma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl neu-search text-xs outline-none text-slate-800 dark:text-slate-200"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              URL
            </label>
            <input
              type="text"
              placeholder="e.g. github.com or https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl neu-search text-xs outline-none text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl neu-btn text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-medium shadow-sm"
            >
              Add Link
            </button>
          </div>
        </form>

        {/* Saved shortcuts list */}
        {existingShortcuts.length > 0 && (
          <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Your Shortcuts ({existingShortcuts.length})
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1.5">
              {existingShortcuts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-200/40 dark:hover:bg-slate-800/40 text-xs"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 truncate text-slate-700 dark:text-slate-300 hover:text-blue-500 flex-1"
                  >
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium truncate">{item.name}</span>
                    <span className="text-[10px] text-slate-400 truncate">{item.url}</span>
                  </a>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-slate-400 hover:text-rose-500 px-2 py-0.5"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
