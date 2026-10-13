import React, { useState, useEffect } from 'react';
import { Droplet, Heart, Sparkles, Moon, Sun, StretchHorizontal, Check } from 'lucide-react';
import { REST_DAY_DATA } from '../data/workouts';

/**
 * RestDay
 * Sunday recovery screen with gentle stretching exercises, hydration tracker, and wellness reminders.
 */
export default function RestDay() {
  // Save water glasses tapped in localStorage for Sunday
  const [glassesDrunk, setGlassesDrunk] = useState(() => {
    try {
      const saved = localStorage.getItem('workout_sunday_water');
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [completedStretches, setCompletedStretches] = useState(() => {
    try {
      const saved = localStorage.getItem('workout_sunday_stretches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('workout_sunday_water', JSON.stringify(glassesDrunk));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [glassesDrunk]);

  useEffect(() => {
    try {
      localStorage.setItem('workout_sunday_stretches', JSON.stringify(completedStretches));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [completedStretches]);

  const toggleStretch = (title) => {
    if (completedStretches.includes(title)) {
      setCompletedStretches(completedStretches.filter((t) => t !== title));
    } else {
      setCompletedStretches([...completedStretches, title]);
    }
  };

  const addGlass = () => {
    if (glassesDrunk < 8) {
      setGlassesDrunk(glassesDrunk + 1);
    }
  };

  const removeGlass = () => {
    if (glassesDrunk > 0) {
      setGlassesDrunk(glassesDrunk - 1);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-indigo-500/10 dark:from-purple-900/30 dark:via-pink-900/20 dark:to-indigo-900/30 border border-purple-200/80 dark:border-purple-800/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-bold mb-3">
          <Heart className="w-3.5 h-3.5 fill-current text-pink-500" />
          Sunday Recovery
        </div>

        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-2 font-heading">
          {REST_DAY_DATA.title}
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {REST_DAY_DATA.message}
        </p>

        <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-purple-100 dark:border-purple-800/40 backdrop-blur-sm">
          <p className="text-xs italic text-purple-900 dark:text-purple-200 text-center font-medium">
            {REST_DAY_DATA.quote}
          </p>
        </div>
      </div>

      {/* Water & Hydration Reminder */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-300 flex items-center justify-center">
              <Droplet className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Hydration Tracker
              </h3>
              <p className="text-xs text-slate-400">Target: {REST_DAY_DATA.waterGoalLitres}</p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-sky-600 dark:text-sky-400">
            {glassesDrunk} / 8 Glasses
          </span>
        </div>

        {/* 8 Tappable Water Glasses */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 my-3">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((glassNum) => {
            const isFull = glassNum <= glassesDrunk;
            return (
              <button
                key={glassNum}
                type="button"
                onClick={() => {
                  if (glassNum === glassesDrunk) {
                    setGlassesDrunk(glassNum - 1);
                  } else {
                    setGlassesDrunk(glassNum);
                  }
                }}
                className={`min-h-[46px] h-12 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer ${
                  isFull
                    ? 'bg-gradient-to-t from-sky-500 to-cyan-400 text-white shadow-sm shadow-sky-500/25 ring-2 ring-sky-300/40'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sky-300'
                }`}
                aria-label={`Glass ${glassNum}`}
              >
                <Droplet className={`w-4 h-4 ${isFull ? 'fill-white' : ''}`} />
                <span className="text-[10px] font-bold mt-0.5">#{glassNum}</span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
          Tap a glass to mark your water intake. Hydrated muscles recover faster! 💧
        </p>
      </div>

      {/* Light Stretching Reminders */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Gentle Stretching Routine
            </h3>
            <p className="text-xs text-slate-400">Light flexibility to relieve weekly tension</p>
          </div>
        </div>

        <div className="space-y-3">
          {REST_DAY_DATA.stretchingList.map((stretch, index) => {
            const isDone = completedStretches.includes(stretch.title);

            return (
              <div
                key={index}
                onClick={() => toggleStretch(stretch.title)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                  isDone
                    ? 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/40'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-100 dark:border-slate-700/60 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={`min-w-[28px] min-h-[28px] w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isDone
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'border-2 border-slate-300 dark:border-slate-600 text-transparent'
                      }`}
                      aria-label="Toggle stretch complete"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                    <span className={`text-sm font-bold ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                      {stretch.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40 px-2 py-0.5 rounded-full">
                    {stretch.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 pl-9 leading-relaxed">
                  {stretch.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wellness Tips Grid */}
      <div className="grid grid-cols-2 gap-3">
        {REST_DAY_DATA.wellnessTips.map((tip, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col"
          >
            <div className="text-2xl mb-1.5">{tip.icon}</div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-1">
              {tip.title}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              {tip.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
