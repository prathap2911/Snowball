import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';
import ExerciseAnimation from './ExerciseAnimation';
import SetTracker from './SetTracker';
import { ExerciseTimerButton } from './Timer';

/**
 * WorkoutCard
 * Displays an individual exercise with name, large sets x reps,
 * animated stick figure demo, form tips, and interactive set tracker circles.
 */
export default function WorkoutCard({
  exercise,
  completedSets = [],
  onToggleSet
}) {
  const isAllSetsComplete = completedSets.length >= exercise.sets;

  // Handler for timer completion on timed exercises (auto-completes the next pending set)
  const handleTimerComplete = () => {
    for (let i = 1; i <= exercise.sets; i++) {
      if (!completedSets.includes(i)) {
        onToggleSet(exercise.id, i);
        break;
      }
    }
  };

  return (
    <div
      className={`rounded-3xl p-5 transition-all duration-300 border ${
        isAllSetsComplete
          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 shadow-sm'
          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-sm'
      }`}
    >
      {/* Header: Name and Sets x Reps badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-snug">
              {exercise.name}
            </h3>
            {isAllSetsComplete && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Done
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Target: {exercise.sets} sets
          </p>
        </div>

        {/* Large Sets x Reps Display */}
        <div className="flex flex-col items-end">
          <div className="px-3 py-1.5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-purple-500/10 dark:from-rose-500/20 dark:to-purple-500/20 border border-pink-200 dark:border-pink-800/50">
            <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent font-heading">
              {exercise.sets} × {exercise.reps}
            </span>
          </div>
        </div>
      </div>

      {/* Looping Animated Demonstration (Stick-Figure SVG or Media) */}
      <div className="my-3">
        <ExerciseAnimation
          type={exercise.animationType}
          media={exercise.media}
          name={exercise.name}
        />
      </div>

      {/* Form Tips Section */}
      {exercise.formTips && exercise.formTips.length > 0 && (
        <div className="my-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-1.5 text-xs font-bold text-pink-600 dark:text-pink-400 mb-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Form Tips</span>
          </div>
          <ul className="space-y-1">
            {exercise.formTips.map((tip, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-1.5"
              >
                <span className="text-pink-400 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Timed exercises countdown trigger (e.g. Plank 45s, Farmer's carry 30s) */}
      {exercise.isTimed && (
        <div className="my-3">
          <ExerciseTimerButton
            durationSeconds={exercise.durationSeconds}
            label={exercise.name}
            onComplete={handleTimerComplete}
          />
        </div>
      )}

      {/* Set Tracker Circles */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <SetTracker
          totalSets={exercise.sets}
          completedSets={completedSets}
          onToggleSet={onToggleSet}
          exerciseId={exercise.id}
        />
      </div>
    </div>
  );
}
