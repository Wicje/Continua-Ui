/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { X, Play, RotateCcw, Trophy, Smile } from 'lucide-react';

interface ArcadeDinoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArcadeDinoModal: React.FC<ArcadeDinoModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('dino_high_score') || '0', 10);
  });

  const gameStateRef = useRef({
    dinoY: 120,
    dinoVelocityY: 0,
    isJumping: false,
    obstacles: [] as { x: number; width: number; height: number }[],
    gameSpeed: 5,
    frameCount: 0,
    score: 0,
  });

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setGameOver(false);
      return;
    }
  }, [isOpen]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    gameStateRef.current = {
      dinoY: 120,
      dinoVelocityY: 0,
      isJumping: false,
      obstacles: [{ x: 500, width: 16, height: 32 }],
      gameSpeed: 5,
      frameCount: 0,
      score: 0,
    };
  };

  const jump = () => {
    const s = gameStateRef.current;
    if (!s.isJumping && isPlaying && !gameOver) {
      s.dinoVelocityY = -11;
      s.isJumping = true;
    } else if (!isPlaying || gameOver) {
      startGame();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    if (!isOpen || !isPlaying || gameOver) return;

    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      const s = gameStateRef.current;
      s.frameCount++;

      // Physics
      s.dinoY += s.dinoVelocityY;
      s.dinoVelocityY += 0.65; // gravity

      if (s.dinoY >= 120) {
        s.dinoY = 120;
        s.dinoVelocityY = 0;
        s.isJumping = false;
      }

      // Obstacle management
      if (s.frameCount % 90 === 0) {
        const height = Math.random() > 0.4 ? 30 : 20;
        s.obstacles.push({
          x: canvas.width + 20,
          width: 16,
          height,
        });
      }

      // Move obstacles
      for (let i = s.obstacles.length - 1; i >= 0; i--) {
        s.obstacles[i].x -= s.gameSpeed;

        // Collision Check (Dino is at x=50, width=24, height=28)
        const dinoBox = { x: 50, y: s.dinoY - 26, w: 22, h: 26 };
        const obs = s.obstacles[i];
        const obsBox = { x: obs.x, y: 120 - obs.height, w: obs.width, h: obs.height };

        if (
          dinoBox.x < obsBox.x + obsBox.w &&
          dinoBox.x + dinoBox.w > obsBox.x &&
          dinoBox.y < obsBox.y + obsBox.h &&
          dinoBox.y + dinoBox.h > obsBox.y
        ) {
          // Hit!
          setGameOver(true);
          setIsPlaying(false);
          if (s.score > highScore) {
            setHighScore(s.score);
            localStorage.setItem('dino_high_score', s.score.toString());
          }
          return;
        }

        // Remove offscreen obstacles
        if (s.obstacles[i].x < -30) {
          s.obstacles.splice(i, 1);
          s.score += 10;
          setScore(s.score);
          if (s.score % 100 === 0 && s.gameSpeed < 10) {
            s.gameSpeed += 0.5;
          }
        }
      }

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Ground
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 120);
      ctx.lineTo(canvas.width, 120);
      ctx.stroke();

      // Ground bumps/dots
      ctx.fillStyle = '#cbd5e1';
      for (let x = (s.frameCount * 3) % 40; x < canvas.width; x += 40) {
        ctx.fillRect(canvas.width - x, 123, 6, 2);
      }

      // Draw Dino (Pixel style)
      ctx.fillStyle = '#334155';
      const dx = 50;
      const dy = s.dinoY - 26;

      // Dino body
      ctx.fillRect(dx + 4, dy + 6, 14, 16);
      // Dino head
      ctx.fillRect(dx + 12, dy, 12, 10);
      // Eye
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(dx + 18, dy + 2, 2, 2);
      ctx.fillStyle = '#334155';
      // Legs
      if (!s.isJumping) {
        const legToggle = Math.floor(s.frameCount / 5) % 2 === 0;
        ctx.fillRect(dx + 6, dy + 22, 3, legToggle ? 5 : 3);
        ctx.fillRect(dx + 13, dy + 22, 3, legToggle ? 3 : 5);
      } else {
        ctx.fillRect(dx + 6, dy + 22, 3, 3);
        ctx.fillRect(dx + 13, dy + 22, 3, 3);
      }

      // Draw Obstacles (Cacti)
      ctx.fillStyle = '#059669';
      for (const obs of s.obstacles) {
        const oy = 120 - obs.height;
        // Main cactus trunk
        ctx.fillRect(obs.x + 5, oy, 6, obs.height);
        // Arms
        if (obs.height > 24) {
          ctx.fillRect(obs.x, oy + 8, 5, 3);
          ctx.fillRect(obs.x, oy + 4, 3, 6);
          ctx.fillRect(obs.x + 11, oy + 12, 5, 3);
          ctx.fillRect(obs.x + 13, oy + 8, 3, 6);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameOver, highScore, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg neu-popover rounded-3xl p-6 border border-white/60 dark:border-white/10 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full neu-btn flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Smile className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            Chrome Arcade: Dino Run
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Press Space or tap screen to jump over the obstacles!
        </p>

        {/* Scoreboard */}
        <div className="flex items-center justify-center gap-8 mb-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
            <span>SCORE:</span>
            <span className="text-blue-600 dark:text-blue-400">{score.toString().padStart(4, '0')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>HI:</span>
            <span>{highScore.toString().padStart(4, '0')}</span>
          </div>
        </div>

        {/* Canvas Arena */}
        <div
          onClick={jump}
          className="relative w-full h-[140px] rounded-2xl bg-white/70 dark:bg-slate-900/60 overflow-hidden cursor-pointer select-none border border-slate-200/60 dark:border-slate-800 shadow-inner flex items-center justify-center"
        >
          <canvas
            ref={canvasRef}
            width={460}
            height={140}
            className="w-full h-full"
          />

          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-[1px]">
              <button
                onClick={startGame}
                className="px-5 py-2 rounded-2xl bg-blue-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all scale-105"
              >
                <Play className="w-4 h-4 fill-white" />
                Start Game (Space)
              </button>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[1px]">
              <div className="text-sm font-bold text-slate-900 dark:text-white mb-2">GAME OVER</div>
              <button
                onClick={startGame}
                className="px-4 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Play Again
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 text-[11px] text-slate-400">
          Tip: Tap canvas on mobile or use Spacebar on desktop to leap!
        </div>
      </div>
    </div>
  );
};
