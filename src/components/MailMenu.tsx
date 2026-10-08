/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { Mail, Check, ArrowUpRight } from 'lucide-react';

interface MailMenuProps {
  onClose: () => void;
}

interface MockEmail {
  id: string;
  sender: string;
  subject: string;
  time: string;
  unread: boolean;
}

const INITIAL_EMAILS: MockEmail[] = [
  {
    id: '1',
    sender: 'Google Security',
    subject: 'New sign-in on Linux device verified',
    time: '12m ago',
    unread: true,
  },
  {
    id: '2',
    sender: 'GitHub Notifications',
    subject: 'Release v3.4 published: modern browser theme',
    time: '2h ago',
    unread: true,
  },
  {
    id: '3',
    sender: 'Google AI Studio',
    subject: 'Your project preview is live and operational',
    time: '1d ago',
    unread: false,
  },
];

export const MailMenu: React.FC<MailMenuProps> = ({ onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [emails, setEmails] = React.useState<MockEmail[]>(INITIAL_EMAILS);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const markAllRead = () => {
    setEmails(emails.map((e) => ({ ...e, unread: false })));
  };

  const unreadCount = emails.filter((e) => e.unread).length;

  return (
    <div
      ref={menuRef}
      className="absolute top-12 right-12 w-80 neu-popover rounded-3xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 border border-white/60 dark:border-white/5"
    >
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">Gmail</span>
          {unreadCount > 0 && (
            <span className="text-[10px] bg-red-500 text-white font-medium px-1.5 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-[11px] text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 flex items-center gap-1"
          >
            <Check className="w-3 h-3" />
            Mark read
          </button>
        )}
      </div>

      <div className="space-y-1.5 max-h-60 overflow-y-auto">
        {emails.map((item) => (
          <div
            key={item.id}
            className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
              item.unread
                ? 'bg-blue-50/70 dark:bg-blue-950/20 border-l-2 border-blue-500'
                : 'hover:bg-slate-200/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className={`truncate ${item.unread ? 'font-semibold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                {item.sender}
              </span>
              <span className="text-[10px] text-slate-400 shrink-0 ml-2">{item.time}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {item.subject}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
        >
          Open Gmail
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://mail.google.com/mail/u/0/#inbox?compose=new"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1 rounded-full neu-btn text-xs font-medium text-slate-700 dark:text-slate-300"
        >
          Compose
        </a>
      </div>
    </div>
  );
};
