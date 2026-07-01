import React from 'react';
import { Heart} from 'lucide-react';

export default function Quotes() {
  const quote = {
    text: "To live is to risk it all; otherwise you’re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you…",
    author: "Richard Daniel Sanchez"
  };

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center py-3.5 px-4 border-b border-border bg-[#111111]">
        <h3 className="m-0 text-xs font-semibold tracking-wider uppercase text-white font-heading">Daily Quotes</h3>
        <button className="bg-transparent border border-border text-white py-0.5 px-1.5 rounded cursor-pointer text-xs flex items-center justify-center transition-colors hover:border-accent hover:text-accent" title="New Quote">
          <Heart size={14} />
        </button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="italic text-sm mb-2 leading-relaxed text-white font-body">"{quote.text}"</p>
        <p className="text-xs text-text-secondary text-right font-heading">{quote.author ? `- ${quote.author}` : ''}</p>
      </div>
    </div>
  );
}
