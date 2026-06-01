// frontend/src/components/Navbar.jsx
import React from 'react';

export default function Navbar({ activePage }) {
  return (
    <header className="h-20 flex items-center justify-between px-10 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <h2 className="text-2xl font-bold text-white capitalize">
        {activePage === 'leaderboard' ? 'Global Rankings' : 'Submit Activity'}
      </h2>
      <div className="flex items-center gap-4">
        <button className="bg-sky-500 hover:bg-sky-400 text-white px-5 py-2 rounded-lg font-bold shadow-lg shadow-sky-500/20 transition-all">
          Sync Data
        </button>
      </div>
    </header>
  );
}