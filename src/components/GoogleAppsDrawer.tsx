/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface GoogleAppsDrawerProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface AppTile {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const APPS: AppTile[] = [
  // Row 1
  {
    name: 'Gmail',
    url: 'https://mail.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    name: 'News',
    url: 'https://news.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" fill="#1A73E8" />
        <rect x="6" y="8" width="12" height="2" rx="1" fill="white" />
        <rect x="6" y="12" width="7" height="2" rx="1" fill="white" />
        <rect x="6" y="16" width="5" height="2" rx="1" fill="white" />
        <circle cx="16" cy="14" r="2" fill="#EA4335" />
      </svg>
    ),
  },
  {
    name: 'Cloud',
    url: 'https://cloud.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
          fill="#4285F4"
        />
        <path
          d="M19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.6.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"
          fill="#FBBC05"
        />
      </svg>
    ),
  },

  // Row 2
  {
    name: 'Maps',
    url: 'https://maps.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          fill="#EA4335"
        />
        <circle cx="12" cy="9" r="2.5" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Ads',
    url: 'https://ads.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 17.5L11.5 4.5C12.3 3.1 14.1 2.6 15.5 3.4C16.9 4.2 17.4 6 16.6 7.4L9.1 20.4C8.3 21.8 6.5 22.3 5.1 21.5C3.7 20.7 3.2 18.9 4 17.5Z"
          fill="#FBBC04"
        />
        <circle cx="17" cy="18.5" r="3.5" fill="#4285F4" />
        <path
          d="M6 19L11.5 9.5"
          stroke="#34A853"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'Podcasts',
    url: 'https://podcasts.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="#FBBC05" />
        <rect x="5" y="10" width="2" height="4" rx="1" fill="#EA4335" />
        <rect x="8.5" y="7" width="2" height="10" rx="1" fill="#4285F4" />
        <rect x="13.5" y="7" width="2" height="10" rx="1" fill="#34A853" />
        <rect x="17" y="10" width="2" height="4" rx="1" fill="#EA4335" />
      </svg>
    ),
  },

  // Row 3
  {
    name: 'Account',
    url: 'https://myaccount.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L4 5V11C4 16.55 7.41 21.74 12 23C16.59 21.74 20 16.55 20 11V5L12 2Z"
          fill="#1A73E8"
        />
        <circle cx="12" cy="10" r="3" fill="white" />
        <path
          d="M7.5 17C8.5 15.5 10.1 14.5 12 14.5C13.9 14.5 15.5 15.5 16.5 17"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'Assistant',
    url: 'https://assistant.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="7.5" r="2.5" fill="#4285F4" />
        <circle cx="15.5" cy="12" r="1.8" fill="#EA4335" />
        <circle cx="17.5" cy="16.5" r="1.2" fill="#34A853" />
        <circle cx="8" cy="15" r="3.2" fill="#FBBC05" />
      </svg>
    ),
  },
  {
    name: 'Play Store',
    url: 'https://play.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M4 3.5L14 12L4 20.5V3.5Z" fill="#4285F4" />
        <path d="M14 12L17.5 8.5L4 3.5L14 12Z" fill="#34A853" />
        <path d="M14 12L4 20.5L17.5 15.5L14 12Z" fill="#EA4335" />
        <path d="M14 12L17.5 8.5L21 10.5C21.8 11 21.8 12.2 21 12.7L17.5 15.5L14 12Z" fill="#FBBC05" />
      </svg>
    ),
  },

  // Row 4
  {
    name: 'Photos',
    url: 'https://photos.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" fill="#EA4335" />
        <circle cx="17" cy="12" r="4" fill="#4285F4" />
        <circle cx="12" cy="17" r="4" fill="#34A853" />
        <circle cx="7" cy="12" r="4" fill="#FBBC05" />
      </svg>
    ),
  },
  {
    name: 'Admob',
    url: 'https://admob.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="#EA4335" strokeWidth="3" />
        <circle cx="12" cy="12" r="4" fill="#FBBC05" />
      </svg>
    ),
  },
  {
    name: 'Classroom',
    url: 'https://classroom.google.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="15" rx="3" fill="#137333" />
        <rect x="4" y="5" width="16" height="13" rx="2" stroke="#F9AB00" strokeWidth="1.5" />
        <circle cx="12" cy="10" r="2" fill="white" />
        <path d="M8 15C8 13.5 9.8 12.5 12 12.5C14.2 12.5 16 13.5 16 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const GoogleAppsDrawer: React.FC<GoogleAppsDrawerProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="w-[260px] md:w-[275px] neu-popover rounded-[28px] p-4.5 relative border border-white/70 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
      {/* Scroll track visual on the right border */}
      <div className="absolute right-2 top-6 bottom-6 w-1 rounded-full bg-slate-300/40 dark:bg-slate-700/40 flex items-start">
        <div className="w-full h-14 rounded-full bg-slate-400/50 dark:bg-slate-500/50" />
      </div>

      <div className="grid grid-cols-3 gap-y-3 gap-x-2 pr-2">
        {APPS.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center group p-1.5 rounded-2xl hover:bg-slate-200/40 dark:hover:bg-slate-800/40 transition-all cursor-pointer"
          >
            {/* Soft elevated white rounded square tile */}
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#252b37] flex items-center justify-center shadow-[0_4px_10px_rgba(160,175,200,0.35),-2px_-2px_6px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.4),-1px_-1px_4px_rgba(255,255,255,0.05)] group-hover:scale-105 group-hover:shadow-[0_6px_14px_rgba(160,175,200,0.45)] transition-all">
              {app.icon}
            </div>
            <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 mt-1.5 text-center truncate max-w-[70px]">
              {app.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
