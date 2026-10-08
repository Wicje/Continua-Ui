/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const IndianFlag: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => {
  return (
    <div className={`relative overflow-hidden rounded-xs inline-flex flex-col shadow-xs border border-black/10 ${className}`}>
      {/* Saffron band */}
      <div className="h-1/3 w-full bg-[#FF9933]" />
      {/* White band with Ashoka Chakra */}
      <div className="h-1/3 w-full bg-white relative flex items-center justify-center">
        <svg viewBox="0 0 20 20" className="h-full w-auto text-[#000080]">
          <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="10" cy="10" r="2" fill="currentColor" />
          {/* 24 spokes representation */}
          <line x1="10" y1="3" x2="10" y2="17" stroke="currentColor" strokeWidth="0.8" />
          <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="0.8" />
          <line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" strokeWidth="0.8" />
          <line x1="15" y1="5" x2="5" y2="15" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>
      {/* Green band */}
      <div className="h-1/3 w-full bg-[#138808]" />
    </div>
  );
};
