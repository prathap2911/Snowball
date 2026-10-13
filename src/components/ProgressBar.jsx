import React from 'react';
import { Sparkles, Trophy } from 'lucide-react';

/**
 * ProgressBar
 * Displays completed sets percentage for the active workout day.
 */
export default function ProgressBar({ completedCount, totalCount }) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getMotivationalNote = () => {
    if (percentage === 0) return 'Ready to sweat? Let’s do this! 💪';
    if (percentage < 35) return 'Great start! Find your rhythm ✨';
    if (percentage < 70) return 'Over halfway through! Looking strong 🔥';
    if (percentage < 100) return 'Almost done! Push through the last sets! ⚡';
    return 'Workout Complete! You did amazing! 👑';
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {percentage === 100 ? (
            <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
          ) : (
            <Sparkles className="w-4 h-4 text-pink-500" />
          )}
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {getMotivationalNote()}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-extrabold text-pink-500 font-mono">
            {percentage}%
          </span>
          <span className="text-[10px] text-slate-400">
            ({completedCount}/{totalCount} sets)
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 transition-all duration-500 ease-out shadow-sm shadow-pink-500/20"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
