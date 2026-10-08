/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface GoogleAppsMenuProps {
  onClose: () => void;
}

interface GoogleAppItem {
  name: string;
  url: string;
  iconBg: string;
  iconSvg: React.ReactNode;
}

const APPS: GoogleAppItem[] = [
  {
    name: 'Search',
    url: 'https://www.google.com',
    iconBg: 'bg-white',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: 'Maps',
    url: 'https://maps.google.com',
    iconBg: 'bg-emerald-500/10',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
        <circle cx="12" cy="9" r="2.5" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com',
    iconBg: 'bg-red-500/10',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Gmail',
    url: 'https://mail.google.com',
    iconBg: 'bg-blue-500/10',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: 'Drive',
    url: 'https://drive.google.com',
    iconBg: 'bg-amber-500/10',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5z" fill="#FFC107"/>
        <path d="M16.29 3.5H7.71l6.55 11.5h8.59z" fill="#4CAF50"/>
        <path d="M11.14 15l-3.43 6h15.14l3.43-6z" fill="#2196F3"/>
      </svg>
    ),
  },
  {
    name: 'Calendar',
    url: 'https://calendar.google.com',
    iconBg: 'bg-blue-500/10',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3" fill="#4285F4"/>
        <path d="M3 9h18" stroke="white" strokeWidth="2"/>
        <text x="12" y="17" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">31</text>
      </svg>
    ),
  },
  {
    name: 'Photos',
    url: 'https://photos.google.com',
    iconBg: 'bg-pink-500/10',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" fill="#EA4335"/>
        <circle cx="17" cy="12" r="4" fill="#4285F4"/>
        <circle cx="12" cy="17" r="4" fill="#34A853"/>
        <circle cx="7" cy="12" r="4" fill="#FBBC05"/>
      </svg>
    ),
  },
  {
    name: 'Meet',
    url: 'https://meet.google.com',
    iconBg: 'bg-teal-500/10',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="13" height="12" rx="2" fill="#00AC47"/>
        <polygon points="15,10 21,6 21,18 15,14" fill="#00AC47"/>
      </svg>
    ),
  },
  {
    name: 'Translate',
    url: 'https://translate.google.com',
    iconBg: 'bg-blue-500/10',
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2h-2v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.11 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" fill="#4285F4"/>
      </svg>
    ),
  },
];

export const GoogleAppsMenu: React.FC<GoogleAppsMenuProps> = ({ onClose }) => {
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

  return (
    <div
      ref={menuRef}
      className="absolute top-12 right-0 w-72 neu-popover rounded-3xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 border border-white/60 dark:border-white/5"
    >
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Google Apps</span>
        <span className="text-[10px] text-slate-400">Quick launch</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {APPS.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-2xl neu-btn flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
              {app.iconSvg}
            </div>
            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {app.name}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex justify-center">
        <a
          href="https://about.google/products/"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
        >
          More from Google
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
