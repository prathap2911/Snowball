import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Dumbbell, 
  Bike, 
  RotateCcw, 
  Sparkles, 
  Heart, 
  Calendar, 
  Flame, 
  Clock, 
  PartyPopper,
  CheckCircle2
} from 'lucide-react';

import { WORKOUT_DAYS } from './data/workouts';
import DayTabs from './components/DayTabs';
import WorkoutCard from './components/WorkoutCard';
import { CardioTimer } from './components/Timer';
import ProgressBar from './components/ProgressBar';
import RestDay from './components/RestDay';

const DAY_MAP = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat'
};

export default function App() {
  // Determine today's day of week
  const todayWeekdayId = useMemo(() => {
    const currentDay = new Date().getDay();
    return DAY_MAP[currentDay] || 'mon';
  }, []);

  // Active selected day (defaults to today)
  const [activeDayId, setActiveDayId] = useState(() => todayWeekdayId);

  // Completed sets tracker state: { [dayId]: { [exerciseId]: [1, 2] } }
  const [completedSetsByDay, setCompletedSetsByDay] = useState(() => {
    try {
      const saved = localStorage.getItem('workout_completed_sets_v1');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
      return {};
    }
  });

  // Track if celebration confetti has already fired for this session at 100%
  const celebratedRef = useRef(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('workout_completed_sets_v1', JSON.stringify(completedSetsByDay));
    } catch (e) {
      console.warn('Could not write to localStorage:', e);
    }
  }, [completedSetsByDay]);

  // Current day data
  const currentDayData = useMemo(() => {
    return WORKOUT_DAYS.find((d) => d.id === activeDayId);
  }, [activeDayId]);

  // Sets for the currently active day
  const currentDaySets = completedSetsByDay[activeDayId] || {};

  // Calculate total dumbbell sets and completed count for the current day
  const { totalSetsCount, completedSetsCount, isDayCompleted } = useMemo(() => {
    if (!currentDayData) {
      return { totalSetsCount: 0, completedSetsCount: 0, isDayCompleted: false };
    }

    let total = 0;
    let completed = 0;

    currentDayData.exercises.forEach((ex) => {
      total += ex.sets;
      const exCompleted = currentDaySets[ex.id] || [];
      completed += exCompleted.length;
    });

    const isDone = total > 0 && completed >= total;
    return {
      totalSetsCount: total,
      completedSetsCount: completed,
      isDayCompleted: isDone
    };
  }, [currentDayData, currentDaySets]);

  // Fire celebratory confetti when day hits 100%
  useEffect(() => {
    if (isDayCompleted && !celebratedRef.current) {
      celebratedRef.current = true;
      setShowCelebrationBanner(true);
      
      // Beautiful multi-shot confetti burst
      try {
        const count = 200;
        const defaults = {
          origin: { y: 0.7 },
          colors: ['#f43f5e', '#ec4899', '#8b5cf6', '#38bdf8', '#fbbf24']
        };

        const fire = (particleRatio, opts) => {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          });
        };

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      } catch (err) {
        console.log('Confetti trigger note:', err);
      }
    } else if (!isDayCompleted) {
      celebratedRef.current = false;
      setShowCelebrationBanner(false);
    }
  }, [isDayCompleted]);

  // Toggle individual set completed status
  const handleToggleSet = (exerciseId, setNumber) => {
    setCompletedSetsByDay((prev) => {
      const dayData = prev[activeDayId] || {};
      const currentExSets = dayData[exerciseId] || [];

      let updatedExSets;
      if (currentExSets.includes(setNumber)) {
        updatedExSets = currentExSets.filter((s) => s !== setNumber);
      } else {
        updatedExSets = [...currentExSets, setNumber];
      }

      return {
        ...prev,
        [activeDayId]: {
          ...dayData,
          [exerciseId]: updatedExSets
        }
      };
    });
  };

  // Reset active day's completed sets
  const handleResetDay = () => {
    setCompletedSetsByDay((prev) => {
      const updated = { ...prev };
      delete updated[activeDayId];
      return updated;
    });
    setShowResetConfirm(false);
    celebratedRef.current = false;
    setShowCelebrationBanner(false);
  };

  // Completion dictionary per day for the DayTabs badge
  const completionByDay = useMemo(() => {
    const dict = {};
    WORKOUT_DAYS.forEach((day) => {
      const dSets = completedSetsByDay[day.id] || {};
      let total = 0;
      let completed = 0;
      day.exercises.forEach((ex) => {
        total += ex.sets;
        const exCompleted = dSets[ex.id] || [];
        completed += exCompleted.length;
      });
      if (total > 0 && completed >= total) {
        dict[day.id] = true;
      }
    });
    return dict;
  }, [completedSetsByDay]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0c0f17] text-slate-900 dark:text-slate-100 flex flex-col items-center">
      {/* Mobile container - max-w-md provides perfect phone feel while scaling cleanly on tablet/desktop */}
      <main className="w-full max-w-md min-h-screen flex flex-col relative pb-20 shadow-xl dark:shadow-2xl bg-white dark:bg-[#0f1422] transition-colors">
        
        {/* Top App Header */}
        <header className="px-5 pt-6 pb-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-pink-500/25">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-tight font-heading bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                My 6-Day Workout Plan
              </h1>
              <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <span>Personal Training Companion</span>
                <span>•</span>
                <span className="text-pink-500 flex items-center gap-0.5">
                  Made with <Heart className="w-2.5 h-2.5 fill-current inline" />
                </span>
              </p>
            </div>
          </div>
        </header>

        {/* Sticky Day Selector Tabs (Mon - Sat + Sun) */}
        <DayTabs
          days={WORKOUT_DAYS}
          activeDayId={activeDayId}
          onSelectDay={(id) => {
            setActiveDayId(id);
            celebratedRef.current = false;
            setShowResetConfirm(false);
          }}
          todayWeekdayId={todayWeekdayId}
          completionByDay={completionByDay}
        />

        {/* Content Area */}
        <div className="px-4 py-4 space-y-5 flex-1">
          {activeDayId === 'sun' ? (
            /* Sunday Rest Day Screen */
            <RestDay />
          ) : currentDayData ? (
            /* Regular Workout Screen */
            <div className="space-y-5 animate-in fade-in duration-300">
              
              {/* Day Header Card */}
              <div className="rounded-3xl p-5 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-purple-500/10 dark:from-rose-500/20 dark:via-pink-500/15 dark:to-purple-500/20 border border-pink-200/80 dark:border-pink-800/50 shadow-sm relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-500 text-white shadow-xs">
                        Day {currentDayData.dayNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {currentDayData.fullWeekday}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-heading">
                      {currentDayData.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                      {currentDayData.tagline}
                    </p>
                  </div>

                  {/* Reset Day Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(!showResetConfirm)}
                      title="Reset completed ticks for this day"
                      aria-label="Reset Day"
                      className="min-h-[44px] min-w-[44px] p-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all active:scale-95 shadow-xs cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Reset Confirmation Tooltip / Popover */}
                    {showResetConfirm && (
                      <div className="absolute right-0 top-12 z-40 w-52 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-150">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-2">
                          Reset ticks for today?
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleResetDay}
                            className="flex-1 py-1.5 px-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            Yes, Reset
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowResetConfirm(false)}
                            className="py-1.5 px-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Total Time Pill: 15 min dumbbells + 30 min cycling */}
                <div className="mt-4 pt-3 border-t border-pink-200/60 dark:border-pink-800/40 flex items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-pink-500" />
                    <span>Total: 45 min</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <span>(15 min dumbbells + 30 min cycling)</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar (% of completed sets) */}
              <ProgressBar
                completedCount={completedSetsCount}
                totalCount={totalSetsCount}
              />

              {/* 100% Celebration Banner */}
              {isDayCompleted && (
                <div className="rounded-3xl p-5 bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/15 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-300 dark:border-emerald-700/60 shadow-sm flex items-center gap-3.5 animate-in slide-in-from-top-4 duration-300">
                  <div className="min-w-[48px] h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
                    <PartyPopper className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-emerald-900 dark:text-emerald-300">
                      You are a superstar! 🌟
                    </h4>
                    <p className="text-xs text-emerald-800/90 dark:text-emerald-400 leading-snug mt-0.5">
                      All dumbbell sets completed for Day {currentDayData.dayNumber}! Don't forget your 30-min cycling ride below.
                    </p>
                  </div>
                </div>
              )}

              {/* SECTION: Dumbbells (15 min) */}
              <section className="space-y-3.5">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                      <Dumbbell className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 font-heading">
                      Dumbbells (15 min)
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {currentDayData.exercises.length} exercises
                  </span>
                </div>

                {/* Exercise Cards */}
                <div className="space-y-4">
                  {currentDayData.exercises.map((exercise) => (
                    <WorkoutCard
                      key={exercise.id}
                      exercise={exercise}
                      completedSets={currentDaySets[exercise.id] || []}
                      onToggleSet={handleToggleSet}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION: Cardio (30 min) */}
              <section className="space-y-3.5 pt-2">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Bike className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 font-heading">
                      Cardio (30 min)
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40 px-2.5 py-0.5 rounded-full">
                    Cycling
                  </span>
                </div>

                {/* Cycling Note Card */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Cycling Routine
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                      {currentDayData.cardio.note}
                    </p>
                  </div>
                </div>

                {/* Cardio Countdown Timer */}
                <CardioTimer initialMinutes={currentDayData.cardio.durationMinutes} />
              </section>

            </div>
          ) : null}
        </div>

        {/* Bottom Safety Bar / Footer */}
        <footer className="mt-auto px-5 py-3 border-t border-slate-100 dark:border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            Saved automatically offline • Stay hydrated & breathe ✨
          </p>
        </footer>

      </main>
    </div>
  );
}
