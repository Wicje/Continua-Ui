/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface GoogleAmbientSpheresProps {
  visible?: boolean;
  mousePos?: { x: number; y: number };
}

export const GoogleAmbientSpheres: React.FC<GoogleAmbientSpheresProps> = ({
  visible = true,
  mousePos = { x: 0, y: 0 },
}) => {
  if (!visible) return null;

  const { x, y } = mousePos;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 transition-transform duration-700 ease-out">
      {/* Top Left Cluster */}
      {/* Big Green Sphere (Far layer) */}
      <div
        className="absolute -top-10 -left-10 md:top-4 md:left-6 w-24 h-24 md:w-32 md:h-32 rounded-full transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #44C767 0%, #34A853 70%, #1E7E34 100%)',
          boxShadow: '0 20px 40px rgba(52, 168, 83, 0.25)',
          transform: `translate3d(${x * 15}px, ${y * 15}px, 0)`,
        }}
      />
      {/* Blue Sphere (Near layer) */}
      <div
        className="absolute top-8 left-20 md:top-14 md:left-28 w-12 h-12 md:w-16 md:h-16 rounded-full transition-transform duration-200 ease-out"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #669DF6 0%, #4285F4 70%, #1A73E8 100%)',
          boxShadow: '0 12px 25px rgba(66, 133, 244, 0.25)',
          transform: `translate3d(${x * 30}px, ${y * 30}px, 0)`,
        }}
      />
      {/* Yellow Sphere (Mid layer) */}
      <div
        className="absolute top-24 left-10 md:top-32 md:left-20 w-16 h-16 md:w-20 md:h-20 rounded-full transition-transform duration-250 ease-out"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #FDD663 0%, #FBBC05 70%, #EA8600 100%)',
          boxShadow: '0 16px 30px rgba(251, 188, 5, 0.25)',
          transform: `translate3d(${x * 20}px, ${y * 20}px, 0)`,
        }}
      />

      {/* Top Right Cluster */}
      {/* Small Red Dot */}
      <div
        className="absolute top-20 right-48 md:top-28 md:right-72 w-5 h-5 md:w-6 md:h-6 rounded-full transition-transform duration-150 ease-out"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #F28B82 0%, #EA4335 70%, #C5221F 100%)',
          boxShadow: '0 6px 15px rgba(234, 67, 53, 0.25)',
          transform: `translate3d(${x * -25}px, ${y * -25}px, 0)`,
        }}
      />
      {/* Small Green Dot */}
      <div
        className="absolute top-16 right-36 md:top-24 md:right-60 w-7 h-7 md:w-8 md:h-8 rounded-full transition-transform duration-200 ease-out"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #81C995 0%, #34A853 70%, #1E7E34 100%)',
          boxShadow: '0 8px 18px rgba(52, 168, 83, 0.25)',
          transform: `translate3d(${x * -18}px, ${y * -18}px, 0)`,
        }}
      />

      {/* Bottom Left Cluster */}
      {/* Medium Yellow Sphere */}
      <div
        className="absolute bottom-20 left-44 md:bottom-28 md:left-64 w-16 h-16 md:w-20 md:h-20 rounded-full transition-transform duration-250 ease-out"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #FDD663 0%, #FBBC05 70%, #EA8600 100%)',
          boxShadow: '0 18px 35px rgba(251, 188, 5, 0.22)',
          transform: `translate3d(${x * 22}px, ${y * -22}px, 0)`,
        }}
      />

      {/* Bottom Right Cluster */}
      {/* Large Blue Sphere */}
      <div
        className="absolute -bottom-10 right-24 md:bottom-2 md:right-40 w-28 h-28 md:w-36 md:h-36 rounded-full transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #669DF6 0%, #4285F4 70%, #1A73E8 100%)',
          boxShadow: '0 25px 50px rgba(66, 133, 244, 0.28)',
          transform: `translate3d(${x * -16}px, ${y * -16}px, 0)`,
        }}
      />
      {/* Red Sphere */}
      <div
        className="absolute bottom-28 right-16 md:bottom-36 md:right-28 w-14 h-14 md:w-16 md:h-16 rounded-full transition-transform duration-200 ease-out"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #F28B82 0%, #EA4335 70%, #C5221F 100%)',
          boxShadow: '0 14px 28px rgba(234, 67, 53, 0.25)',
          transform: `translate3d(${x * -32}px, ${y * -32}px, 0)`,
        }}
      />
      {/* Small Green Dot */}
      <div
        className="absolute bottom-4 right-14 md:bottom-8 md:right-24 w-6 h-6 md:w-7 md:h-7 rounded-full transition-transform duration-150 ease-out"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #81C995 0%, #34A853 70%, #1E7E34 100%)',
          boxShadow: '0 6px 15px rgba(52, 168, 83, 0.25)',
          transform: `translate3d(${x * -12}px, ${y * -12}px, 0)`,
        }}
      />
    </div>
  );
};
