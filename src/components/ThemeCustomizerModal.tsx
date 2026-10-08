/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import {
  X,
  Sparkles,
  Monitor,
  Maximize2,
  Moon,
  Sun,
  Image as ImageIcon,
  Upload,
  Link,
  Trash2,
  Sliders,
  Eye,
  Check,
  Plus,
  Compass,
} from 'lucide-react';
import { playTactileClick, playChime } from '../utils/audioFeedback';

import mistyDawn from '../assets/images/wallpaper_misty_dawn_1791456481716.jpg';
import minimalRibbons from '../assets/images/wallpaper_minimal_ribbons_1791456492745.jpg';
import darkGeometry from '../assets/images/wallpaper_dark_geometry_1791456508709.jpg';
import sunsetDune from '../assets/images/wallpaper_sunset_dune_1791456620140.jpg';
import cyberNeon from '../assets/images/wallpaper_cyber_neon_1791456637831.jpg';

export type ThemePreset = 'classic' | 'snow' | 'warm' | 'dark';
export type ViewMode = 'window' | 'fullscreen';

export interface WallpaperPreset {
  id: string;
  name: string;
  src: string | null;
  thumbnail: string;
  type: 'image' | 'gradient' | 'none';
}

export const WALLPAPER_PRESETS: WallpaperPreset[] = [
  {
    id: 'none',
    name: 'Default Canvas',
    src: null,
    thumbnail: 'bg-[#e9ecf2] dark:bg-[#12151b]',
    type: 'none',
  },
  {
    id: 'sunset_dune',
    name: 'Sunset Dunes',
    src: sunsetDune,
    thumbnail: sunsetDune,
    type: 'image',
  },
  {
    id: 'cyber_neon',
    name: 'Cyberpunk Neon',
    src: cyberNeon,
    thumbnail: cyberNeon,
    type: 'image',
  },
  {
    id: 'misty_dawn',
    name: 'Misty Mountain',
    src: mistyDawn,
    thumbnail: mistyDawn,
    type: 'image',
  },
  {
    id: 'abstract_flow',
    name: 'Minimal Ribbons',
    src: minimalRibbons,
    thumbnail: minimalRibbons,
    type: 'image',
  },
  {
    id: 'dark_geometry',
    name: 'Obsidian Cube',
    src: darkGeometry,
    thumbnail: darkGeometry,
    type: 'image',
  },
  {
    id: 'nordic_aurora',
    name: 'Nordic Aurora',
    src: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #70a1ff 100%)',
    thumbnail: 'bg-gradient-to-tr from-blue-900 via-indigo-700 to-sky-400',
    type: 'gradient',
  },
  {
    id: 'sunset_glow',
    name: 'Sunset Glow',
    src: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    thumbnail: 'bg-gradient-to-tr from-amber-300 via-orange-400 to-rose-400',
    type: 'gradient',
  },
  {
    id: 'deep_space',
    name: 'Cosmic Nebula',
    src: 'linear-gradient(135deg, #09090e 0%, #1a102f 40%, #2d124d 70%, #000000 100%)',
    thumbnail: 'bg-gradient-to-tr from-black via-purple-950 to-indigo-900',
    type: 'gradient',
  },
];

// Curated high-res Unsplash wallpapers for 1-click instant inspiration
export const CURATED_ONLINE_WALLPAPERS = [
  {
    id: 'minimal_architecture',
    title: 'Minimalist Bauhaus',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80',
    preview: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=60',
  },
  {
    id: 'serene_fuji',
    title: 'Mount Fuji Dusk',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80',
    preview: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&q=60',
  },
  {
    id: 'cozy_lofi',
    title: 'Tokyo Night Rain',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=80',
    preview: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=60',
  },
  {
    id: 'desert_minimal',
    title: 'Soft Dunes Solitude',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80',
    preview: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300&q=60',
  },
];

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  themePreset: ThemePreset;
  onSelectTheme: (preset: ThemePreset) => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  isDark: boolean;
  onToggleDark: () => void;
  activeWallpaper?: string | null;
  onSelectWallpaper?: (src: string | null) => void;
  wallpaperBlur?: number;
  onChangeWallpaperBlur?: (blur: number) => void;
  wallpaperDim?: number;
  onChangeWallpaperDim?: (dim: number) => void;
  frostedCard?: boolean;
  onToggleFrostedCard?: () => void;
  customWallpapers?: string[];
  onAddCustomWallpaper?: (src: string) => void;
  onRemoveCustomWallpaper?: (src: string) => void;
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
  activeWallpaper = null,
  onSelectWallpaper = () => {},
  wallpaperBlur = 0,
  onChangeWallpaperBlur = () => {},
  wallpaperDim = 0.85,
  onChangeWallpaperDim = () => {},
  frostedCard = false,
  onToggleFrostedCard = () => {},
  customWallpapers = [],
  onAddCustomWallpaper = () => {},
  onRemoveCustomWallpaper = () => {},
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState<'wallpapers' | 'appearance'>('wallpapers');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Helper to downscale and compress image for smooth localStorage storage
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP)');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) {
        setIsProcessing(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width / height > MAX_WIDTH / MAX_HEIGHT) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          playChime();
          onAddCustomWallpaper(compressedDataUrl);
          onSelectWallpaper(compressedDataUrl);
        } else {
          onAddCustomWallpaper(rawDataUrl);
          onSelectWallpaper(rawDataUrl);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        setIsProcessing(false);
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Handle local image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      playChime();
      const trimmed = urlInput.trim();
      onAddCustomWallpaper(trimmed);
      onSelectWallpaper(trimmed);
      setUrlInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl neu-popover rounded-3xl p-6 border border-white/60 dark:border-white/10 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl neu-btn flex items-center justify-center text-blue-600 dark:text-blue-400">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span>Wallpaper & Aesthetics</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                Customizable
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Add custom images, choose presets, and tune blur, opacity & frosted glass
            </p>
          </div>
        </div>

        {/* Tab switch: Wallpapers vs Themes */}
        <div className="flex p-1 rounded-2xl bg-slate-200/50 dark:bg-slate-800/50 mb-5">
          <button
            onClick={() => {
              playTactileClick();
              setActiveTab('wallpapers');
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'wallpapers'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Wallpaper Studio
          </button>
          <button
            onClick={() => {
              playTactileClick();
              setActiveTab('appearance');
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'appearance'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Surface & Window
          </button>
        </div>

        {activeTab === 'wallpapers' ? (
          <div className="space-y-5">
            {/* Curated Presets Grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Preset Wallpapers</span>
                </label>
                {activeWallpaper && (
                  <button
                    onClick={() => {
                      playTactileClick();
                      onSelectWallpaper(null);
                    }}
                    className="text-[11px] text-rose-500 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Reset to Default Canvas
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {WALLPAPER_PRESETS.map((item) => {
                  const isSelected = activeWallpaper === item.src;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        playTactileClick();
                        onSelectWallpaper(item.src);
                      }}
                      className={`group relative flex flex-col items-center p-1.5 rounded-2xl border transition-all text-left ${
                        isSelected
                          ? 'border-blue-500 ring-2 ring-blue-500/40 shadow-sm'
                          : 'border-transparent neu-btn hover:scale-[1.02]'
                      }`}
                    >
                      <div className="w-full h-16 rounded-xl overflow-hidden mb-1.5 relative border border-black/5 dark:border-white/5">
                        {item.type === 'image' && item.src && (
                          <img
                            src={item.src}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {item.type === 'gradient' && (
                          <div
                            className="w-full h-full"
                            style={{ background: item.src || undefined }}
                          />
                        )}
                        {item.type === 'none' && (
                          <div className={`w-full h-full ${item.thumbnail} flex items-center justify-center text-slate-400 text-[10px]`}>
                            Pristine Radial
                          </div>
                        )}
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 truncate w-full text-center">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upload Custom Image & Drag-Drop */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`p-4 rounded-2xl transition-all border ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/30'
                  : 'bg-slate-200/40 dark:bg-slate-800/40 border-slate-300/40 dark:border-slate-700/40'
              } space-y-3`}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-blue-500" />
                  <span>Add Your Own Wallpaper</span>
                </div>
                <span className="text-[10px] text-slate-400">JPG, PNG, WebP</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  disabled={isProcessing}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 px-4 py-2.5 rounded-xl neu-btn text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Optimizing...' : 'Upload Image File or Drop Here'}</span>
                </button>
              </div>

              {/* Paste URL */}
              <form onSubmit={handleUrlSubmit} className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl neu-search text-xs">
                  <Link className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="url"
                    placeholder="Paste image URL (Unsplash, Pinterest, Web)..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!urlInput.trim()}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 disabled:opacity-40 transition-opacity shadow-xs"
                >
                  Add & Set
                </button>
              </form>
            </div>

            {/* Custom User Saved Wallpapers */}
            {customWallpapers.length > 0 && (
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  My Added Wallpapers ({customWallpapers.length})
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {customWallpapers.map((src, idx) => {
                    const isSelected = activeWallpaper === src;
                    return (
                      <div
                        key={idx}
                        className={`group relative rounded-xl overflow-hidden border transition-all ${
                          isSelected
                            ? 'border-blue-500 ring-2 ring-blue-500/40'
                            : 'border-slate-300/40 dark:border-slate-700/40 hover:scale-105'
                        }`}
                      >
                        <button
                          onClick={() => {
                            playTactileClick();
                            onSelectWallpaper(src);
                          }}
                          className="w-full h-14 block"
                        >
                          <img
                            src={src}
                            alt={`Custom ${idx + 1}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playTactileClick();
                            onRemoveCustomWallpaper(src);
                          }}
                          title="Remove custom wallpaper"
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Online Curated Inspirations */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                <Compass className="w-3.5 h-3.5 text-blue-500" />
                <span>Instant Online Inspiration</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CURATED_ONLINE_WALLPAPERS.map((cur) => {
                  const isSelected = activeWallpaper === cur.url;
                  return (
                    <button
                      key={cur.id}
                      onClick={() => {
                        playTactileClick();
                        onSelectWallpaper(cur.url);
                        onAddCustomWallpaper(cur.url);
                      }}
                      className={`group relative rounded-xl overflow-hidden border p-1 text-left transition-all ${
                        isSelected
                          ? 'border-blue-500 ring-2 ring-blue-500/40 shadow-xs'
                          : 'border-transparent neu-btn hover:scale-105'
                      }`}
                    >
                      <div className="w-full h-12 rounded-lg overflow-hidden mb-1">
                        <img
                          src={cur.preview}
                          alt={cur.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[10px] font-medium text-slate-700 dark:text-slate-200 block truncate">
                        {cur.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Adjustments (Blur & Dim & Frosted) */}
            {activeWallpaper && (
              <div className="p-3.5 rounded-2xl neu-card space-y-3 border border-white/60 dark:border-white/5">
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-500" />
                  <span>Wallpaper Fine-Tuning</span>
                </div>

                {/* Blur Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-1">
                    <span>Background Blur</span>
                    <span className="font-mono text-[11px]">{wallpaperBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="28"
                    value={wallpaperBlur}
                    onChange={(e) => onChangeWallpaperBlur(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Dimming Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-1">
                    <span>Wallpaper Dimming / Opacity</span>
                    <span className="font-mono text-[11px]">{Math.round(wallpaperDim * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={wallpaperDim}
                    onChange={(e) => onChangeWallpaperDim(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Frosted Glass Mode Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-medium">
                      <Eye className="w-3.5 h-3.5 text-blue-500" />
                      <span>Frosted Glass Card Acrylic</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Translucent acrylic card reveals your wallpaper underneath
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      playTactileClick();
                      onToggleFrostedCard();
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      frostedCard ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        frostedCard ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Appearance Tab (Surface Palette & Window Modes) */
          <div className="space-y-5">
            {/* Surface Palette Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Card Surface Shade
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {presets.map((preset) => {
                  const isSelected = themePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        playTactileClick();
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
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Display Mode
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    playTactileClick();
                    onToggleViewMode('window');
                  }}
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
                  onClick={() => {
                    playTactileClick();
                    onToggleViewMode('fullscreen');
                  }}
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
                onClick={() => {
                  playTactileClick();
                  onToggleDark();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 neu-btn ${
                  isDark ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
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
        )}
      </div>
    </div>
  );
};
