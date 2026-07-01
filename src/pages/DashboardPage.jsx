import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks.jsx';
import Habits from '../components/Habits.jsx';
import Timetable from '../components/Timetable.jsx';
import Links from '../components/Links.jsx';
import Quotes from '../components/Quotes.jsx';

export default function DashboardPage() {
  return (
    <div className="text-text-muted font-body min-h-screen flex flex-col overflow-x-hidden bg-black">
      {/* Main Dashboard Outer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_340px] gap-4 p-4 flex-1 w-full max-w-none mx-auto h-full lg:overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="flex flex-col gap-4">
          <Tasks />
        </div>

        {/* Center Column */}
        <div className="flex flex-col gap-4">
          {/* Wallpaper Banner Header */}
          <div className="relative w-full h-[120px] lg:h-[150px] rounded-xl overflow-hidden flex-shrink-0 border border-border shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover" poster="/assets/dashboard-wallpaper.png">
              <source src="/assets/desktop-wallpaper.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 z-10">
              <h1 className="font-heading font-medium text-2xl md:text-3xl text-white m-0 tracking-wide uppercase">Dashboard</h1>
              <div className="w-12 h-1 bg-accent mt-2 shadow-[0_0_8px_#FF1E2D]"></div>
            </div>
          </div>
          
          <Timetable />
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          <Habits />
          <Quotes />
          <Links />
        </div>
      </div>
    </div>
  );
}
