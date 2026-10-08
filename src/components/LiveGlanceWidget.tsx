/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, Cloud, Clock, MapPin, Sparkles } from 'lucide-react';

interface LiveGlanceWidgetProps {
  location: string;
  onLocationClick: () => void;
}

interface WeatherInfo {
  temp: string;
  condition: string;
  icon: 'sun' | 'cloud' | 'rain';
  humidity: string;
  wind: string;
}

const LOCATION_WEATHER: Record<string, WeatherInfo> = {
  India: { temp: '28°C', condition: 'Sunny & Pleasant', icon: 'sun', humidity: '52%', wind: '9 km/h' },
  Bangladesh: { temp: '29°C', condition: 'Partly Cloudy', icon: 'cloud', humidity: '64%', wind: '11 km/h' },
  'United States': { temp: '21°C', condition: 'Clear Sky', icon: 'sun', humidity: '45%', wind: '14 km/h' },
  'United Kingdom': { temp: '16°C', condition: 'Gentle Rain', icon: 'rain', humidity: '78%', wind: '18 km/h' },
  Canada: { temp: '14°C', condition: 'Breezy', icon: 'cloud', humidity: '55%', wind: '16 km/h' },
  Germany: { temp: '18°C', condition: 'Partly Sunny', icon: 'sun', humidity: '60%', wind: '12 km/h' },
  Japan: { temp: '22°C', condition: 'Mild Autumn', icon: 'sun', humidity: '50%', wind: '8 km/h' },
  Nigeria: { temp: '31°C', condition: 'Warm & Humid', icon: 'sun', humidity: '70%', wind: '7 km/h' },
};

export const LiveGlanceWidget: React.FC<LiveGlanceWidgetProps> = ({
  location,
  onLocationClick,
}) => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const weather =
    LOCATION_WEATHER[location] || {
      temp: '26°C',
      condition: 'Sunny',
      icon: 'sun',
      humidity: '58%',
      wind: '10 km/h',
    };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="neu-btn rounded-2xl px-3.5 py-1.5 flex items-center gap-3 transition-all cursor-pointer border border-white/60 dark:border-white/5"
      onClick={onLocationClick}
      title="Click to change location or view weather details"
    >
      {/* Clock glance */}
      <div className="flex items-center gap-1.5 text-xs text-slate-900 dark:text-slate-100 font-semibold">
        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 stroke-[2.2]" />
        <span className="font-mono tracking-tight font-bold">{time}</span>
        <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">· {date}</span>
      </div>

      <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-slate-700" />

      {/* Weather glance */}
      <div className="flex items-center gap-1.5 text-xs text-slate-900 dark:text-slate-100">
        {weather.icon === 'sun' && <Sun className="w-3.5 h-3.5 text-amber-500 animate-spin-slow stroke-[2.2]" />}
        {weather.icon === 'cloud' && <Cloud className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 stroke-[2.2]" />}
        {weather.icon === 'rain' && <CloudRain className="w-3.5 h-3.5 text-blue-500 stroke-[2.2]" />}
        <span className="font-bold text-xs">{weather.temp}</span>
        <span className="text-[10px] text-slate-700 dark:text-slate-300 font-medium hidden sm:inline">
          {location}
        </span>
      </div>
    </div>
  );
};
