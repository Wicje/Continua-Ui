/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { AvatarProfile } from './AvatarProfile';
import { UserPlus, LogOut, Shield, HardDrive, ExternalLink } from 'lucide-react';

interface UserAccountMenuProps {
  onClose: () => void;
}

export const UserAccountMenu: React.FC<UserAccountMenuProps> = ({ onClose }) => {
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
      className="absolute top-14 right-0 w-80 neu-popover rounded-3xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150 border border-white/60 dark:border-white/5"
    >
      <div className="flex flex-col items-center text-center pb-4 border-b border-slate-200/60 dark:border-slate-800">
        <div className="w-16 h-16 rounded-full neu-avatar-rim p-1 mb-3 flex items-center justify-center bg-[#eef2f7] dark:bg-[#1a1e27]">
          <AvatarProfile className="w-full h-full" />
        </div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
          Victor Chuks
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          victorchuks1104@gmail.com
        </p>

        <a
          href="https://myaccount.google.com"
          target="_blank"
          rel="noreferrer"
          className="mt-3 px-4 py-1.5 rounded-full neu-btn text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1.5"
        >
          <Shield className="w-3.5 h-3.5 text-blue-500" />
          Manage your Google Account
        </a>
      </div>

      {/* Storage info */}
      <div className="py-3 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs mb-1.5 text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1.5 font-medium">
            <HardDrive className="w-3.5 h-3.5 text-slate-400" />
            Storage
          </span>
          <span className="text-[11px] text-slate-500">11.4 GB / 15 GB</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700/60 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full rounded-full transition-all"
            style={{ width: '76%' }}
          />
        </div>
      </div>

      <div className="pt-3 space-y-1">
        <button
          onClick={() => alert('Add another account feature simulated')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/40 transition-colors"
        >
          <UserPlus className="w-4 h-4 text-slate-400" />
          <span>Add another account</span>
        </button>
        <button
          onClick={() => alert('Signed out of session')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>

      <div className="mt-3 pt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-3">
        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:underline">
          Privacy Policy
        </a>
        <span>•</span>
        <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </div>
  );
};
