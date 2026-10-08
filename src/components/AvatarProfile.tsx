/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const AvatarProfile: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => {
  return (
    <div className={`relative rounded-full overflow-hidden bg-white flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft background circle */}
        <circle cx="50" cy="50" r="50" fill="#F8FAFC" />

        {/* Neck */}
        <path
          d="M48 55 L58 55 L58 75 L45 75 Z"
          fill="#FED7AA"
        />

        {/* Shadow under jaw */}
        <path
          d="M48 55 L56 55 L55 61 L46 58 Z"
          fill="#FDBA74"
          opacity="0.6"
        />

        {/* Head / Face Profile facing Left */}
        <path
          d="M42 36 
             C 41 33, 40 31, 39 31
             C 38 31, 37 33, 38 36
             C 38 38, 36 41, 35 43
             C 34.5 44, 35 45, 36.5 45.2
             C 35 46.5, 35 48.5, 37 49
             C 36.5 50.5, 38 52.5, 41 53
             C 45 53.8, 54 53, 56 46
             C 57 42, 56 36, 52 33
             C 48 30, 44 32, 42 36 Z"
          fill="#FED7AA"
        />

        {/* Ear */}
        <path
          d="M51 41 C 53.5 41, 54.5 44, 53.5 46 C 52.5 48, 50.5 47.5, 50 45 Z"
          fill="#FED7AA"
        />
        <path
          d="M51.5 43 C 52.2 43, 52.5 44.5, 52 45.2"
          stroke="#FDBA74"
          strokeWidth="1"
          fill="none"
        />

        {/* Hair - Stylish dark pompadour / quiff with side fade */}
        <path
          d="M37 28
             C 39 23, 46 18, 55 19
             C 63 20, 67 26, 66 33
             C 65 37, 63 42, 59 44
             C 57 41, 56 35, 52 33
             C 48 31, 45 32, 43 36
             C 41 33, 39 30, 37 28 Z"
          fill="#0F172A"
        />
        {/* Hair sideburns and temple */}
        <path
          d="M52 33 L50 40 L48 40 L49 34 Z"
          fill="#0F172A"
        />

        {/* Royal Blue Shirt / Collar - matches screenshot */}
        <path
          d="M32 100 
             C 32 85, 38 74, 46 72 
             L 52 76 
             L 58 71 
             C 68 73, 76 83, 78 100 
             Z"
          fill="#2563EB"
        />

        {/* Shirt collar fold accent */}
        <path
          d="M46 72 L53 82 L52 74 Z"
          fill="#1D4ED8"
        />
        <path
          d="M58 71 L51 82 L53 74 Z"
          fill="#3B82F6"
        />
      </svg>
    </div>
  );
};
