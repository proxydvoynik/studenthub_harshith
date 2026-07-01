import React from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';

export default function Tasks() {
  const tasks = [];

  return (
    <div className="bg-[#111111] border border-border rounded-xl flex flex-col overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex-1">
      <div className="flex justify-between items-center py-3.5 px-4 border-b border-border bg-[#111111]">
        <h3 className="m-0 text-xs font-semibold tracking-wider uppercase text-white font-heading">Tasks</h3>
        <button className="bg-transparent border border-border text-white py-0.5 px-1.5 rounded cursor-pointer text-xs flex items-center justify-center transition-colors hover:border-accent hover:text-accent">
          <Plus size={14} />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2.5 custom-scrollbar">
          {tasks.map(task => (
            <div key={task.id} className={`flex items-center gap-2.5 p-2.5 bg-[#111111] border border-border rounded-lg transition-all ${task.completed ? 'opacity-60' : ''}`}>
              <button className={`bg-transparent border-none cursor-pointer flex items-center justify-center text-lg p-0 transition-colors ${task.completed ? 'text-accent' : 'text-text-secondary hover:text-accent'}`}>
                 {task.completed ? <Check size={20} /> : <div className="w-5 h-5 border border-current rounded-sm"></div>}
              </button>
              <div className="flex-1 min-w-0">
                <h4 className={`font-heading font-medium text-xs m-0 truncate ${task.completed ? 'text-text-secondary line-through' : 'text-white'}`}>{task.title}</h4>
                <span className="block text-[10px] text-text-secondary mt-0.5">{task.deadline}</span>
              </div>
              <span className="font-heading text-[9px] font-semibold py-0.5 px-1.5 rounded uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 flex-shrink-0">{task.tag}</span>
              <button className="bg-transparent border-none text-text-secondary cursor-pointer flex items-center justify-center text-lg p-0 transition-colors hover:text-accent">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {tasks.length === 0 && <p className="text-text-secondary text-sm italic text-center mt-5">No tasks yet. Add one!</p>}
        </div>
      </div>
    </div>
  );
}
