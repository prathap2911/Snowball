import React from 'react';
import { Sparkles, Coffee } from 'lucide-react';

/**
 * DayTabs
 * Top day selector with 6 tappable tabs (Mon-Sat) plus Sunday Rest Day.
 * Highlights the active tab and marks "Today" with an accent dot.
 */
export default function DayTabs({
  days,
  activeDayId,
  onSelectDay,
  todayWeekdayId,
  completionByDay = {}
}) {
  return (
    <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800 sticky top-0 z-30 transition-colors">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          {days.map((day) => {
            const isActive = activeDayId === day.id;
            const isToday = todayWeekdayId === day.id;
            const isDayFinished = !!completionByDay[day.id];

            return (
              <button
                key={day.id}
                type="button"
                onClick={() => onSelectDay(day.id)}
                className={`relative flex-1 min-w-[48px] min-h-[52px] py-1.5 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25 ring-2 ring-pink-400/40'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                {/* "Today" small glowing indicator dot */}
                {isToday && (
                  <span
                    className={`absolute -top-1 right-2 flex h-2 w-2 ${
                      isActive ? 'text-white' : 'text-pink-500'
                    }`}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                  </span>
                )}

                {/* Day abbreviation */}
                <span className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                  {day.weekday}
                </span>

                {/* Day number or completed check */}
                <span
                  className={`text-[10px] font-medium leading-none mt-1 ${
                    isActive ? 'text-white/90 font-semibold' : 'text-slate-400 dark:text-slate-400'
                  }`}
                >
                  {isDayFinished ? '✓ Done' : `D${day.dayNumber}`}
                </span>
              </button>
            );
          })}

          {/* Sunday Tab (Rest Day) */}
          <button
            type="button"
            onClick={() => onSelectDay('sun')}
            className={`relative min-w-[50px] min-h-[52px] py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer select-none active:scale-95 ${
              activeDayId === 'sun'
                ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 ring-2 ring-purple-400/40'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
            }`}
          >
            {todayWeekdayId === 'sun' && (
              <span className="absolute -top-1 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
            )}
            <span className={`text-xs font-bold leading-tight ${activeDayId === 'sun' ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
              Sun
            </span>
            <span
              className={`text-[10px] font-medium leading-none mt-1 flex items-center gap-0.5 ${
                activeDayId === 'sun' ? 'text-white/90' : 'text-slate-400 dark:text-slate-400'
              }`}
            >
              <Coffee className="w-2.5 h-2.5 inline" /> Rest
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
