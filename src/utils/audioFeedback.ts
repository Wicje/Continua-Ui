/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API synthesized tactile sound generator (zero external assets)
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export const initAudio = () => {
  if (typeof window !== 'undefined' && !audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('neu_sound_enabled');
    soundEnabled = stored !== null ? stored === 'true' : true;
  }
};

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('neu_sound_enabled', enabled ? 'true' : 'false');
  }
};

export const getSoundEnabled = () => soundEnabled;

const ensureContext = () => {
  if (!audioCtx && typeof window !== 'undefined') {
    initAudio();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

// Subtle tactile button click (organic pop)
export const playTactileClick = () => {
  if (!soundEnabled) return;
  try {
    ensureContext();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    const now = audioCtx.currentTime;

    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // audio context blocked or unavailable
  }
};

// Soft sliding drawer whoosh / pop
export const playDrawerSound = () => {
  if (!soundEnabled) return;
  try {
    ensureContext();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    const now = audioCtx.currentTime;

    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(560, now + 0.07);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // ignore
  }
};

// Pleasant success chime
export const playChime = () => {
  if (!soundEnabled) return;
  try {
    ensureContext();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5

    freqs.forEach((freq, idx) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.025, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.28);
    });
  } catch {
    // ignore
  }
};
