// frontend/src/components/DashboardLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardLayout({ user, activePage, setActivePage, onLogout, children }) {
  // ✨ State to track if the sidebar is shrunk
  const [isSidebarShrunk, setIsSidebarShrunk] = useState(false);

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-200">
      
      {/* 🧩 We pass the state and the toggle function down to the Sidebar */}
      <Sidebar 
        user={user} 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onLogout={onLogout} 
        isShrunk={isSidebarShrunk} 
        toggleShrink={() => setIsSidebarShrunk(!isSidebarShrunk)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        
        <Navbar activePage={activePage} />

        <div className="flex-1 overflow-y-auto p-10 bg-slate-950">
          <div className="max-w-6xl mx-auto">
            {children} 
          </div>
        </div>

      </main>
    </div>
  );
}