/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { X, MicOff, RefreshCw } from 'lucide-react';
import { GoogleMicIcon } from './GoogleLogos';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscript: (text: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onTranscript,
}) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTranscript('');
      setIsListening(false);
      setErrorMsg(null);
      return;
    }

    // Check for Web Speech API
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg('Voice recognition is not supported in this browser environment. You can test voice by typing below.');
      return;
    }

    let recognition: any;
    try {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const resultText = event.results[current][0].transcript;
        setTranscript(resultText);
        if (event.results[current].isFinal) {
          setTimeout(() => {
            onTranscript(resultText);
            onClose();
          }, 600);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMsg('Microphone access was denied. Please allow microphone permissions.');
        } else {
          setErrorMsg(`Voice input: ${event.error}. You can speak or enter manually.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setErrorMsg('Unable to start audio listener.');
    }

    return () => {
      if (recognition) {
        try {
          recognition.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [isOpen, onTranscript, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md neu-popover rounded-3xl p-8 text-center flex flex-col items-center border border-white/60 dark:border-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
          {isListening ? 'Listening...' : 'Voice Search'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Say what you want to search on Google
        </p>

        {/* Animated Microphone Orb */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Waves */}
          {isListening && (
            <>
              <div className="absolute w-28 h-28 rounded-full bg-blue-500/20 animate-ping" />
              <div className="absolute w-36 h-36 rounded-full bg-red-500/10 animate-pulse" />
            </>
          )}

          <div className="w-20 h-20 rounded-full neu-card flex items-center justify-center p-4 relative z-10">
            <GoogleMicIcon className="w-10 h-10" />
          </div>
        </div>

        {/* Audio Visualizer Bars */}
        <div className="flex items-center gap-1.5 h-8 mb-6">
          {[40, 75, 100, 60, 85, 45, 90, 70, 50].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                isListening ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
              style={{
                height: isListening ? `${Math.max(12, (h * Math.sin(Date.now() / 200 + i)) % 32 + 10)}px` : '8px',
              }}
            />
          ))}
        </div>

        {/* Transcript or status */}
        <div className="min-h-12 w-full flex items-center justify-center px-4">
          {transcript ? (
            <p className="text-base font-medium text-slate-800 dark:text-slate-100 italic">
              &quot;{transcript}&quot;
            </p>
          ) : errorMsg ? (
            <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-2 rounded-xl">
              {errorMsg}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Speak now into your microphone...</p>
          )}
        </div>

        {/* Simulation / manual fallback */}
        {errorMsg && (
          <div className="mt-4 w-full flex gap-2">
            <input
              type="text"
              placeholder="Or simulate speech by typing here..."
              className="flex-1 px-3 py-2 rounded-xl neu-btn text-xs outline-none text-slate-700 dark:text-slate-200"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  onTranscript(e.currentTarget.value);
                  onClose();
                }
              }}
            />
            <button
              onClick={() => {
                const sample = 'weather in Dhaka';
                onTranscript(sample);
                onClose();
              }}
              className="px-3 py-2 rounded-xl neu-btn text-xs font-medium text-blue-600 dark:text-blue-400"
            >
              Try Sample
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
