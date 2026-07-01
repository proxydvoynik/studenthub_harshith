import React from 'react';
import { Plus } from 'lucide-react';

const timeToIdx = {
  "08:00": 0, "09:00": 1, "10:00": 2, "10:30": 3, "11:30": 4,
  "12:30": 5, "01:00": 6, "02:00": 7, "03:00": 8, "03:30": 9, "04:30": 10
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Timetable() {
  const timetable = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: []
  };

  const renderRow = (dayKey) => {
    const slots = Array(10).fill(null);
    const dayEntries = timetable[dayKey] || [];

    dayEntries.forEach(entry => {
      const startIdx = timeToIdx[entry.startTime];
      const endIdx = timeToIdx[entry.endTime];
      if (startIdx !== undefined && endIdx !== undefined && startIdx < endIdx) {
        slots[startIdx] = entry;
        for (let j = startIdx + 1; j < endIdx; j++) {
          slots[j] = { merged: true };
        }
      }
    });

    const cells = [];
    for (let i = 0; i < 10; i++) {
      const item = slots[i];
      if (item === null) {
        cells.push(<td key={i} className="py-3 px-4 border border-border text-text-secondary opacity-40 italic text-center transition-colors relative">Free</td>);
      } else if (item.merged) {
        continue;
      } else {
        const startIdx = timeToIdx[item.startTime];
        const endIdx = timeToIdx[item.endTime];
        const colspan = endIdx - startIdx;
        
        const isBreak = item.subject.toLowerCase().includes('break');
        cells.push(
          <td key={i} colSpan={colspan} className={`py-3 px-4 border border-border text-center transition-all relative group ${isBreak ? 'text-text-secondary bg-neutral/40 italic text-[11px]' : 'text-accent bg-accent/5 font-heading font-semibold hover:bg-accent/10'}`}>
            {item.subject}
            {!isBreak && item.location && <span className="block text-[9px] text-text-secondary font-normal uppercase mt-1">{item.location}</span>}
            <button className="absolute top-0.5 right-0.5 bg-transparent border-none text-text-secondary text-xs cursor-pointer leading-none opacity-0 group-hover:opacity-100 transition-all hover:text-accent" title="Delete entry">&times;</button>
          </td>
        );
      }
    }
    return cells;
  };

  return (
    <div className="bg-[#111111] border border-border rounded-xl flex flex-col overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex-[2]">
      <div className="flex justify-between items-center py-3.5 px-4 border-b border-border bg-[#111111]">
        <h3 className="m-0 text-xs font-semibold tracking-wider uppercase text-white font-heading">Weekly Class Timetable</h3>
        <button className="bg-transparent border border-border text-white py-0.5 px-1.5 rounded cursor-pointer text-xs flex items-center justify-center transition-colors hover:border-accent hover:text-accent">
          <Plus size={14} />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-auto w-full custom-scrollbar">
        <table className="w-full h-full border-collapse text-left font-body text-xs min-w-[800px]">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-[#111111] border border-border font-heading font-semibold text-white uppercase text-[10px] tracking-wider text-center first:text-left first:w-[80px]">Day</th>
              <th className="py-3 px-4 bg-[#111111] border border-border font-heading font-semibold text-white uppercase text-[10px] tracking-wider text-center">08.00 - 09.00</th>
              <th className="py-3 px-4 bg-[#111111] border border-border font-heading font-semibold text-white uppercase text-[10px] tracking-wider text-center">09.00 - 10.00</th>
              <th className="py-3 px-4 bg-[#111111] border border-border font-heading font-semibold text-white uppercase text-[10px] tracking-wider text-center">10.00 - 10.30</th>
              <th className="py-3 px-4 bg-[#111111] border border-border font-heading font-semibold text-white uppercase text-[10px] tracking-wider text-center">10.30 - 11.30</th>
              <th className="py-3 px-4 bg-[#111111] border border-border font-heading font-semibold text-white uppercase text-[10px] tracking-wider text-center">11.30 - 12.30</th>
              <th className="py-3 px-4 bg-[#111111] border border-border font-heading font-semibold text-white uppercase text-[10px] tracking-wider text-center">12.30 - 01.00</th>
              <th className="py-3 px-4 bg-[#111111] border border-border font-heading font-semibold text-white uppercase text-[10px] tracking-wider text-center">01.00 - 02.00</th>
              <th className="py-3 px-4 bg-[#111111] border border-border font-heading font-semibold text-white uppercase text-[10px] tracking-wider text-center">02.00 - 03.00</th>
              <th className="py-3 px-4 bg-[#111111] border border-border font-heading font-semibold text-white uppercase text-[10px] tracking-wider text-center">03.00 - 03.30</th>
              <th className="py-3 px-4 bg-[#111111] border border-border font-heading font-semibold text-white uppercase text-[10px] tracking-wider text-center">03.30 - 04.30</th>
            </tr>
          </thead>
          <tbody>
            {days.map(dayKey => (
              <tr key={dayKey}>
                <td className="py-3 px-4 border border-border font-heading font-bold text-white bg-[#181818] text-center text-xs">{dayKey}</td>
                {renderRow(dayKey)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
