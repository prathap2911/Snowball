import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, Timer as TimerIcon, Check } from 'lucide-react';

/**
 * Web Audio API gentle completion chime (100% offline, zero network requests)
 */
function playChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.12);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + index * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.12 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.12);
      osc.stop(ctx.currentTime + index * 0.12 + 0.45);
    });
  } catch (e) {
    console.log('Audio chime error:', e);
  }
}

/**
 * CardioTimer: Full countdown timer for the cardio cycling section
 */
export function CardioTimer({ initialMinutes = 30 }) {
  const initialSeconds = initialMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setIsFinished(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(initialSeconds);
      setIsFinished(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(initialSeconds);
    setIsFinished(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = Math.max(0, Math.min(100, ((initialSeconds - timeLeft) / initialSeconds) * 100));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center">
      {/* Progress visual */}
      <div className="relative w-44 h-44 my-2 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-100 dark:text-slate-800"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="url(#timerGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 52}
            strokeDashoffset={2 * Math.PI * 52 * (1 - progressPercent / 100)}
            className="transition-all duration-500 ease-linear"
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f43f5e" />
              <stop offset="100%" stop-color="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white font-mono">
            {formatTime}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
            {isRunning ? 'Pedaling...' : isFinished ? 'Great Job!' : 'Ready'}
          </span>
        </div>
      </div>

      {isFinished && (
        <div className="mb-3 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5 animate-bounce">
          <Check className="w-3.5 h-3.5" />
          Cardio Completed! Amazing work! 🎉
        </div>
      )}

      {/* Touch-Friendly Action Buttons (min 44px) */}
      <div className="flex items-center gap-3 w-full max-w-xs mt-2">
        <button
          type="button"
          onClick={toggleTimer}
          className={`flex-1 min-h-[48px] h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
              : 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:opacity-95 shadow-pink-500/25'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>{timeLeft === 0 ? 'Restart' : timeLeft < initialSeconds ? 'Resume' : 'Start Ride'}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={resetTimer}
          aria-label="Reset timer"
          className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center active:scale-95 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-all cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/**
 * ExerciseTimerButton: Mini countdown timer for timed exercises like Plank (45s) and Farmer's Carry (30s)
 */
export function ExerciseTimerButton({ durationSeconds = 45, label = 'Timed Exercise', onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setCompleted(true);
            playChime();
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft, onComplete]);

  const startCountdown = () => {
    setIsOpen(true);
    setTimeLeft(durationSeconds);
    setCompleted(false);
    setIsRunning(true);
  };

  const toggleRunning = () => {
    if (timeLeft === 0) {
      setTimeLeft(durationSeconds);
      setCompleted(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(durationSeconds);
    setCompleted(false);
  };

  return (
    <div>
      {!isOpen ? (
        <button
          type="button"
          onClick={startCountdown}
          className="min-h-[44px] px-3.5 py-2 rounded-xl bg-pink-50 hover:bg-pink-100/80 dark:bg-pink-950/40 dark:hover:bg-pink-900/50 text-pink-600 dark:text-pink-300 text-xs font-bold flex items-center gap-2 border border-pink-200/80 dark:border-pink-800/60 transition-all active:scale-95 cursor-pointer"
        >
          <TimerIcon className="w-4 h-4" />
          <span>Timer ({durationSeconds}s)</span>
        </button>
      ) : (
        <div className="w-full bg-slate-50 dark:bg-slate-800/90 rounded-xl p-3 border border-pink-200 dark:border-pink-900/60 flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <div className="min-w-[42px] h-[42px] rounded-lg bg-pink-500 text-white flex items-center justify-center font-mono font-bold text-base shadow-sm">
              {timeLeft}s
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-white block">
                {completed ? 'Complete! 🎉' : isRunning ? 'Hold strong!' : 'Paused'}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Target: {durationSeconds} seconds
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleRunning}
              className="min-h-[44px] min-w-[44px] w-10 h-10 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              aria-label={isRunning ? 'Pause' : 'Start'}
            >
              {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button
              type="button"
              onClick={reset}
              className="min-h-[44px] min-w-[44px] w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              aria-label="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                setIsOpen(false);
              }}
              className="min-h-[44px] px-2 text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardioTimer;
