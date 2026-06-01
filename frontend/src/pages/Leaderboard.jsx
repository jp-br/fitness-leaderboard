// frontend/src/components/Leaderboard.jsx
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase'; 

export default function Leaderboard() {
  // We store ALL runs here, then filter them using pure Javascript
  const [allRuns, setAllRuns] = useState([]);
  const [activeTab, setActiveTab] = useState('All'); 

  useEffect(() => {
    // Fetch EVERYTHING from Firebase once
    const unsubscribe = onSnapshot(collection(db, 'runs'), (snapshot) => {
      const runData = [];
      snapshot.forEach((doc) => {
        runData.push({ id: doc.id, ...doc.data() });
      });
      setAllRuns(runData); 
    }, (error) => {
      console.error("FIREBASE ERROR:", error.message);
    });

    return () => unsubscribe();
  }, []);

  const formatTime = (totalSeconds) => {
    if (!totalSeconds || isNaN(totalSeconds)) return "00:00";
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ✨ THE MAGIC FILTERING & SORTING ENGINE ✨
  const getProcessedRuns = () => {
    if (activeTab === 'All') {
      // 1. OVERALL LEADERBOARD: Calculate Total Volume (Distance) per user
      const userTotals = {};
      
      allRuns.forEach(run => {
        if (!userTotals[run.runnerName]) {
          userTotals[run.runnerName] = { 
            id: run.runnerName, 
            runnerName: run.runnerName, 
            totalDistance: 0, 
            totalTime: 0 
          };
        }
        userTotals[run.runnerName].totalDistance += Number(run.distanceKm);
        userTotals[run.runnerName].totalTime += Number(run.timeSeconds);
      });

      // Sort by whoever ran the MOST kilometers total
      return Object.values(userTotals)
        .sort((a, b) => b.totalDistance - a.totalDistance)
        .map(user => ({
          ...user,
          distanceKm: user.totalDistance.toFixed(2),
          timeSeconds: user.totalTime,
          pace: user.totalTime / user.totalDistance // Average pace over all their runs
        }));
    }

    // 2. RACE CATEGORIES: Find runs that fall into the GPS ranges
    const targetDistance = Number(activeTab);
    const minDist = targetDistance - 0.2; // e.g., 4.8km
    const maxDist = targetDistance + 0.9; // e.g., 5.9km

    return allRuns
      .filter(run => run.distanceKm >= minDist && run.distanceKm <= maxDist)
      .sort((a, b) => a.pace - b.pace); // Fastest pace wins!
  };

  const displayRuns = getProcessedRuns();
  const categories = ['All', '5', '10', '16', '21', '42'];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      
      {/* Header & Tabs Area */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/50">
        <h2 className="text-xl font-black text-white mb-4">🏆 Live Leaderboard</h2>
        
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full font-semibold transition-all text-sm ${
                activeTab === cat 
                  ? 'bg-[#fc4c02] text-white shadow-lg shadow-[#fc4c02]/20' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {cat === 'All' ? 'Overall (Total Dist)' : `${cat}K`}
            </button>
          ))}
        </div>
      </div>
      
      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold w-16 text-center">Rank</th>
              <th className="p-4 font-semibold">Runner</th>
              <th className="p-4 font-semibold">{activeTab === 'All' ? 'Total Distance' : 'Distance'}</th>
              <th className="p-4 font-semibold">{activeTab === 'All' ? 'Total Time' : 'Time'}</th>
              <th className="p-4 font-semibold text-sky-400">{activeTab === 'All' ? 'Avg Pace' : 'Pace (/km)'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {displayRuns.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-500 italic">
                  No runs logged in this category yet. Be the first!
                </td>
              </tr>
            ) : (
              displayRuns.map((run, index) => (
                <tr key={run.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="p-4 text-center font-bold text-xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : <span className="text-sm text-slate-500">#{index + 1}</span>}
                  </td>
                  <td className="p-4 font-bold text-white group-hover:text-[#fc4c02] transition-colors">
                    {run.runnerName}
                  </td>
                  <td className="p-4 text-slate-300 font-medium">
                    {run.distanceKm} km
                  </td>
                  <td className="p-4 text-slate-400">
                    {formatTime(run.timeSeconds)}
                  </td>
                  <td className="p-4 font-mono font-bold text-[#fc4c02]">
                    {formatTime(Math.round(run.pace))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}