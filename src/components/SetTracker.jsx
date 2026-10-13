import React from 'react';
import { Check } from 'lucide-react';

/**
 * SetTracker
 * Renders tappable circles (min 44px) for each set.
 * Completed sets turn vibrant green with a checkmark and scale animation.
 */
export default function SetTracker({ totalSets, completedSets = [], onToggleSet, exerciseId }) {
  const setsArray = Array.from({ length: totalSets }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>Set Progress</span>
        <span>
          {completedSets.length} / {totalSets} completed
        </span>
      </div>

      <div className="flex items-center gap-3">
        {setsArray.map((setNum) => {
          const isDone = completedSets.includes(setNum);

          return (
            <button
              key={`${exerciseId}-set-${setNum}`}
              type="button"
              onClick={() => onToggleSet(exerciseId, setNum)}
              aria-label={`Mark set ${setNum} as ${isDone ? 'incomplete' : 'complete'}`}
              className={`min-w-[46px] min-h-[46px] w-12 h-12 rounded-full flex flex-col items-center justify-center font-bold transition-all duration-200 active:scale-95 shadow-sm select-none cursor-pointer ${
                isDone
                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/40 ring-offset-2 ring-offset-white dark:ring-offset-slate-900'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-500/50'
              }`}
            >
              {isDone ? (
                <div className="flex flex-col items-center justify-center">
                  <Check className="w-5 h-5 stroke-[3] animate-in zoom-in-50 duration-200" />
                  <span className="text-[10px] leading-tight font-medium opacity-90">Done</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-sm font-semibold">{setNum}</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 leading-none">Set</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
