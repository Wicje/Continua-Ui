/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Bookmark, ExternalLink, Plus, Trash2, Folder } from 'lucide-react';

export interface BookmarkEntry {
  id: string;
  title: string;
  url: string;
  category: string;
}

const DEFAULT_BOOKMARKS: BookmarkEntry[] = [
  { id: '1', title: 'Google AI Studio', url: 'https://aistudio.google.com', category: 'Development' },
  { id: '2', title: 'GitHub', url: 'https://github.com', category: 'Development' },
  { id: '3', title: 'Stack Overflow', url: 'https://stackoverflow.com', category: 'Development' },
  { id: '4', title: 'YouTube', url: 'https://youtube.com', category: 'Media' },
  { id: '5', title: 'Wikipedia', url: 'https://wikipedia.org', category: 'Reference' },
  { id: '6', title: 'Reddit', url: 'https://reddit.com', category: 'Social' },
  { id: '7', title: 'Google Maps', url: 'https://maps.google.com', category: 'Tools' },
  { id: '8', title: 'Google Translate', url: 'https://translate.google.com', category: 'Tools' },
];

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({ isOpen, onClose }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>(() => {
    const saved = localStorage.getItem('neu_bookmarks');
    return saved ? JSON.parse(saved) : DEFAULT_BOOKMARKS;
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(bookmarks.map((b) => b.category)))];

  const filteredBookmarks =
    selectedCategory === 'All'
      ? bookmarks
      : bookmarks.filter((b) => b.category === selectedCategory);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    let formatted = newUrl.trim();
    if (!/^https?:\/\//i.test(formatted)) {
      formatted = 'https://' + formatted;
    }

    const item: BookmarkEntry = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      url: formatted,
      category: 'Saved',
    };
    const updated = [item, ...bookmarks];
    setBookmarks(updated);
    localStorage.setItem('neu_bookmarks', JSON.stringify(updated));
    setNewTitle('');
    setNewUrl('');
    setShowAddForm(false);
  };

  const handleRemove = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('neu_bookmarks', JSON.stringify(updated));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg neu-popover rounded-3xl p-6 border border-white/60 dark:border-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl neu-btn flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                Bookmarks & Reading List
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quick access to your saved web destinations
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1.5 rounded-xl neu-btn text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <form onSubmit={handleAdd} className="mb-4 p-3 rounded-2xl bg-slate-200/40 dark:bg-slate-800/40 space-y-2">
            <input
              type="text"
              placeholder="Bookmark Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl neu-search text-xs outline-none text-slate-800 dark:text-slate-200"
              autoFocus
            />
            <input
              type="text"
              placeholder="https://example.com"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl neu-search text-xs outline-none text-slate-800 dark:text-slate-200"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1 rounded-lg text-xs text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-medium"
              >
                Save
              </button>
            </div>
          </form>
        )}

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'neu-btn text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bookmark List */}
        <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
          {filteredBookmarks.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-2xl neu-btn group transition-all"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 flex-1 min-w-0"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-medium text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-500 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {item.url}
                  </div>
                </div>
              </a>
              <button
                onClick={() => handleRemove(item.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 p-1.5 transition-opacity"
                title="Delete bookmark"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
