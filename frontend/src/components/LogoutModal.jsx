import React from 'react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">Log Out</h2>
        <p className="text-slate-300 mb-6">
          Are you sure you want to disconnect from VirtualRunner?
        </p>

        <div className="flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-bold text-slate-400 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg font-bold bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
}