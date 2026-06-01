// frontend/src/components/RunCard.jsx
import React from 'react';

export default function RunCard({ activity, onSelect, formatTime }) {
  return (
    <button 
      onClick={() => onSelect(activity)}
      className="text-left bg-slate-950 border border-slate-800 p-5 rounded-xl hover:border-[#fc4c02] hover:shadow-[0_0_15px_rgba(252,76,2,0.2)] transition-all group relative overflow-hidden"
    >
      {/* Subtle hover background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fc4c02]/0 to-[#fc4c02]/0 group-hover:from-[#fc4c02]/5 group-hover:to-transparent transition-all pointer-events-none"></div>
      
      <h4 className="text-white font-bold text-lg mb-3 truncate group-hover:text-[#fc4c02] transition-colors">
        {activity.name}
      </h4>
      
      <div className="flex justify-between items-center text-sm">
        <div className="bg-slate-800 text-slate-300 px-3 py-1 rounded-md font-medium">
          👟 {(activity.distance / 1000).toFixed(2)} km
        </div>
        <div className="text-slate-400 font-mono">
          ⏱️ {formatTime(activity.moving_time)}
        </div>
      </div>
    </button>
  );
}