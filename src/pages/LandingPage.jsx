import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-black text-text-muted font-body m-0 min-h-screen">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row justify-around items-center p-5 gap-3 md:gap-0 border border-border bg-black sticky top-0 z-50">
        <Link to="/" className="flex items-center w-auto md:w-[200px] text-white text-lg md:text-2xl font-bold no-underline font-heading">
          <img src="/assets/main-icon.png" alt="StudentHub Logo" className="w-9 h-9 md:w-[50px] md:h-[50px] mr-1.5 md:mr-2.5" />
          <h4>StudentHub</h4>
        </Link>
        <div className="flex gap-5 md:gap-10 pt-3 md:pt-0 border-t md:border-t-0 border-border w-full md:w-auto justify-center">
          <a href="#" className="text-white no-underline text-sm md:text-lg transition-colors hover:text-accent font-body">Home</a>
          <a href="#features" className="text-white no-underline text-sm md:text-lg transition-colors hover:text-accent font-body">Features</a>
          <a href="#how-it-works" className="text-white no-underline text-sm md:text-lg transition-colors hover:text-accent font-body">How it Works</a>
        </div>
        <div className="explore-button">
          <Link to="/dashboard" className="inline-block no-underline text-sm md:text-lg px-4 py-2 md:px-[30px] md:py-[12px] border-2 border-white text-white transition-all hover:bg-accent hover:border-accent font-body">
            Explore
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-around items-center py-12 px-5 md:py-20 md:px-5 bg-black min-h-screen gap-10">
        <div className="max-w-[550px] text-white text-center md:text-left">
          <h1 className="mb-5 text-[2.2rem] md:text-[3rem] font-semibold leading-[1.1] font-heading">Your student life, organized in one dashboard.</h1>
          <p className="mb-8 text-base md:text-lg leading-relaxed text-text-muted font-body">StudentHub helps students manage tasks, save resource quick links, follow a weekly timetable, and build study habits, all in one place.</p>
          <a href="#features" className="inline-block no-underline text-sm md:text-lg px-5 py-2.5 md:px-[30px] md:py-[12px] border-2 border-white text-white transition-all hover:bg-accent hover:border-accent mr-3 font-body">See Features</a>
          <a href="#how-it-works" className="inline-block no-underline text-sm md:text-lg px-5 py-2.5 md:px-[30px] md:py-[12px] border-2 border-white text-white transition-all hover:bg-accent hover:border-accent font-body">How it Works</a>
        </div>
        <div className="flex-shrink-0">
          <img src="/assets/hero-section-image.png" alt="StudentHub Dashboard" className="w-[280px] md:w-[400px] h-auto" />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#111111] text-white text-center py-12 md:py-[100px] px-5" id="features">
        <div className="max-w-[800px] mx-auto mb-[60px]">
          <h1 className="text-[2.2rem] md:text-[3rem] mb-5 font-heading">Simple features that make a big difference</h1>
          <p className="text-text-muted leading-[1.7] font-body">StudentHub is built to stay simple, so you can focus on your studies.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] justify-center max-w-[500px] md:max-w-[960px] mx-auto">
          <div className="p-[30px] border border-border bg-card rounded-xl text-left">
            <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="currentColor" d="m10.95 18l5.65-5.65l-1.45-1.45l-4.225 4.225l-2.1-2.1L7.4 14.45zM6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13h5l-5-5z" />
            </svg>
            <h2 className="mt-5 mb-3 text-xl font-semibold font-heading">Task Management</h2>
            <p className="text-text-muted leading-[1.6] font-body">Keep track of assignments, exams, and deadlines in one place. Organize your tasks so nothing gets missed.</p>
          </div>
          <div className="p-[30px] border border-border bg-card rounded-xl text-left">
            <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            <h2 className="mt-5 mb-3 text-xl font-semibold font-heading">Quick Links</h2>
            <p className="text-text-muted leading-[1.6] font-body">Save custom names and URLs as bookmark cards to navigate to your resources instantly in new tabs.</p>
          </div>
          <div className="p-[30px] border border-border bg-card rounded-xl text-left">
            <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="currentColor" d="M3 8V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v3zm2 13q-.825 0-1.412-.587T3 19v-9h4.5v11zm11.5 0V10H21v9q0 .825-.587 1.413T19 21zm-7 0V10h5v11z" />
            </svg>
            <h2 className="mt-5 mb-3 text-xl font-semibold font-heading">Timetable Management</h2>
            <p className="text-text-muted leading-[1.6] font-body">Plan your week with a clear visual schedule. See busy times and open study slots at a glance.</p>
          </div>
          <div className="p-[30px] border border-border bg-card rounded-xl text-left">
            <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="currentColor" d="M17.55 12L14 8.45l1.425-1.4l2.125 2.125l4.25-4.25l1.4 1.425zM6.175 10.825Q5 9.65 5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12t-2.825-1.175M1 20v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z" />
            </svg>
            <h2 className="mt-5 mb-3 text-xl font-semibold font-heading">Study Habits</h2>
            <p className="text-text-muted leading-[1.6] font-body">Set goals, track progress, and stay consistent with small daily routines that support long-term success.</p>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-black text-white py-12 md:py-[100px] px-5" id="how-it-works">
        <div className="text-center max-w-[800px] mx-auto mb-[60px]">
          <h1 className="text-[2.2rem] md:text-[3rem] mb-5 font-heading">Built to help students plan better, not overwhelm them.</h1>
          <p className="text-text-muted leading-[1.7] font-body">StudentHub brings the most common student needs into one simple workflow: plan work, capture information, view the week, and stay consistent.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-around items-center gap-7 md:gap-[50px] max-w-[960px] mx-auto">
          <div className="max-w-[500px]">
            <dl className="m-0 p-0">
              <dt className="font-heading text-[1.4rem] font-semibold text-accent mb-1.5">Plan the day</dt>
              <dd className="m-0 mb-5 leading-relaxed text-text-muted font-body">Use the task area to write down assignments, goals, or revision targets.</dd>
              <dt className="font-heading text-[1.4rem] font-semibold text-accent mb-1.5">Access links instantly</dt>
              <dd className="m-0 mb-5 leading-relaxed text-text-muted font-body">Save custom resource bookmarks to navigate to your key portals in a single click.</dd>
              <dt className="font-heading text-[1.4rem] font-semibold text-accent mb-1.5">See the week clearly</dt>
              <dd className="m-0 mb-5 leading-relaxed text-text-muted font-body">Check the timetable to understand busy slots and available study windows.</dd>
              <dt className="font-heading text-[1.4rem] font-semibold text-accent mb-1.5">Stay consistent</dt>
              <dd className="m-0 mb-5 leading-relaxed text-text-muted font-body">Use the habit tracker to reinforce small routines that build long-term progress.</dd>
            </dl>
          </div>
          <div className="flex-shrink-0">
            <img src="/assets/how-it-helps-section-image.png" alt="How StudentHub Works" className="w-[280px] md:w-[400px] h-auto" />
          </div>
        </div>
      </div>

      {/* Final Section */}
      <div className="bg-[#111111] text-white text-center py-16 md:py-[120px] px-5">
        <h1 className="text-[2.2rem] md:text-[3rem] mb-5 font-heading">Ready to get organized?</h1>
        <p className="max-w-[750px] mx-auto mb-10 leading-[1.7] text-text-muted font-body">Join StudentHub today and start organizing your studies with less stress. Manage tasks, save quick links, and stay on top of your schedule.</p>
        <Link to="/dashboard" className="inline-block font-bold px-7 py-3 md:px-9 md:py-3.5 border-2 border-accent bg-accent text-white no-underline transition-all hover:text-accent hover:bg-white hover:border-white font-heading">Get Started</Link>
      </div>

      {/* Footer */}
      <div className="bg-black text-text-secondary text-center py-10 px-5 border-t border-border">
        <p className="mb-2.5 font-body">&copy; 2026 StudentHub. All rights reserved.</p>
        <h4 className="text-white text-base font-heading">Made by Harshith</h4>
      </div>
    </div>
  );
}
