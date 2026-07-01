import React from 'react';
import { Plus } from 'lucide-react';

export default function Links() {
  const links = [];

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex-[1.2]">
      <div className="flex justify-between items-center py-3.5 px-4 border-b border-border bg-[#111111]">
        <h3 className="m-0 text-xs font-semibold tracking-wider uppercase text-white font-heading">Quick Links</h3>
        <button className="bg-transparent border border-border text-white py-0.5 px-1.5 rounded cursor-pointer text-xs flex items-center justify-center transition-colors hover:border-accent hover:text-accent">
          <Plus size={14} />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2.5 py-1">
          {links.map(link => (
            <div key={link.id} className="relative flex group">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center text-center py-2.5 px-3.5 bg-accent/5 border border-border rounded-lg text-white font-heading text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,30,45,0.2)] active:translate-y-0">
                {link.name}
              </a>
              <button className="absolute -top-1.5 -right-1.5 bg-[#181818] border border-border text-text-secondary w-5 h-5 rounded-full cursor-pointer flex items-center justify-center text-xs opacity-0 transition-all group-hover:opacity-100 hover:bg-accent hover:border-accent hover:text-white z-10" title="Delete Link">
                &times;
              </button>
            </div>
          ))}
          {links.length === 0 && <p className="text-text-secondary text-sm italic col-span-full">No quick links added.</p>}
        </div>
      </div>
    </div>
  );
}
