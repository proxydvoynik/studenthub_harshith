import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function Habits() {
  const habits = [];

  return (
    <div className="bg-[#111111] border border-border rounded-xl flex flex-col overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center py-3.5 px-4 border-b border-border bg-[#111111]">
        <h3 className="m-0 text-xs font-semibold tracking-wider uppercase text-white font-heading">Habits</h3>
        <button className="bg-transparent border border-border text-white py-0.5 px-1.5 rounded cursor-pointer text-xs flex items-center justify-center transition-colors hover:border-accent hover:text-accent">
          <Plus size={14} />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col">
          <div className="grid grid-cols-[1fr_repeat(7,20px)_20px] gap-2 mb-3 px-1 border-b border-border/50 pb-2">
            <span className="text-left text-[9px] text-text-secondary uppercase tracking-wider font-heading">Habit</span>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <span key={i} className="text-center text-[9px] text-text-secondary uppercase font-heading">{day}</span>
            ))}
            <span></span>
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            {habits.map(habit => (
              <div key={habit.id} className="grid grid-cols-[1fr_repeat(7,20px)_20px] gap-2 items-center mb-2 last:mb-0">
                <span className="text-left text-[11px] text-text-muted truncate font-heading">{habit.title}</span>
                {habit.history.map((isChecked, dayIndex) => (
                  <input
                    key={dayIndex}
                    type="checkbox"
                    readOnly
                    checked={isChecked}
                    className="appearance-none w-2.5 h-2.5 rounded-full border border-border bg-transparent outline-none cursor-pointer checked:bg-accent checked:border-accent transition-all"
                  />
                ))}
                <button className="bg-transparent border-none text-text-secondary cursor-pointer flex items-center justify-center text-sm p-0 transition-colors hover:text-accent">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {habits.length === 0 && <p className="text-text-secondary text-sm italic text-center mt-5">No habits yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
