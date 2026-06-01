// frontend/src/components/Sidebar.jsx
import React, { useState } from 'react';
import LogoutModal from './LogoutModal'; // ✨ IMPORT THE NEW MODAL

export default function Sidebar({ user, activePage, setActivePage, onLogout, isShrunk, toggleShrink }) {
  // ✨ State to control the Logout Modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    // ✨ Toggle width between 72 (wide) and 20 (shrunk) with a smooth transition
    <aside className={`${isShrunk ? 'w-20' : 'w-72'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 relative`}>
      
      {/* Header & Toggle Button */}
      <div className={`p-4 border-b border-slate-800 flex items-center ${isShrunk ? 'justify-center' : 'justify-between'} h-[73px]`}>
        {!isShrunk && (
          <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 truncate">
            VirtualRunner
          </h1>
        )}
        <button 
          onClick={toggleShrink}
          className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          title={isShrunk ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          ☰
        </button>
      </div>

      {/* Profile Section */}
      <div className={`flex flex-col items-center border-b border-slate-800 transition-all ${isShrunk ? 'p-4' : 'p-6'}`}>
        <img 
          src={user?.profilePic || "https://via.placeholder.com/150"} 
          alt="Profile" 
          className={`${isShrunk ? 'w-10 h-10 border-2' : 'w-20 h-20 border-4 mb-4'} rounded-full border-sky-500 shadow-lg shadow-sky-500/20 transition-all`}
        />
        {!isShrunk && (
          <div className="flex flex-col items-center overflow-hidden">
            <h2 className="text-lg font-bold text-white truncate w-full text-center">{user?.name || "Athlete"}</h2>
            <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full mt-2 whitespace-nowrap">
              Strava Connected
            </span>
          </div>
        )}
      </div>

      {/* Main Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-hidden">
        
        {/* 1. Leaderboard Button */}
        <button 
          onClick={() => setActivePage('leaderboard')}
          title="Live Leaderboard"
          className={`w-full flex items-center ${isShrunk ? 'justify-center' : 'justify-start gap-3 px-4'} py-3 rounded-xl font-semibold transition-all ${
            activePage === 'leaderboard' ? 'bg-[#fc4c02] text-white shadow-md shadow-[#fc4c02]/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <span className="text-xl">🏆</span>
          {!isShrunk && <span className="truncate">Live Leaderboard</span>}
        </button>

        {/* 2. Community Feed Button */}
        <button 
          onClick={() => setActivePage('feed')}
          title="Community Feed"
          className={`w-full flex items-center ${isShrunk ? 'justify-center' : 'justify-start gap-3 px-4'} py-3 rounded-xl font-semibold transition-all ${
            activePage === 'feed' ? 'bg-[#fc4c02] text-white shadow-md shadow-[#fc4c02]/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <span className="text-xl">📸</span>
          {!isShrunk && <span className="truncate">Community Feed</span>}
        </button>
        
        {/* 3. Log a Run Button */}
        <button 
          onClick={() => setActivePage('submit')}
          title="Log a Run"
          className={`w-full flex items-center ${isShrunk ? 'justify-center' : 'justify-start gap-3 px-4'} py-3 rounded-xl font-semibold transition-all ${
            activePage === 'submit' ? 'bg-[#fc4c02] text-white shadow-md shadow-[#fc4c02]/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <span className="text-xl">🏃‍♂️</span>
          {!isShrunk && <span className="truncate">Log a Run</span>}
        </button>

      </nav>

      {/* Log Out Section */}
      <div className="p-4 border-t border-slate-800 overflow-hidden">
        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          title="Log Out"
          className={`w-full flex items-center justify-center py-3 text-sm font-bold text-red-400 hover:bg-red-400/10 rounded-xl transition-colors ${isShrunk ? 'px-0 text-xl' : ''}`}
        >
          {isShrunk ? '🚪' : 'Log Out'}
        </button>
      </div>

      {/* ✨ RENDER THE MODAL HERE */}
      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          onLogout(); 
        }}
      />
    </aside>
  );
}