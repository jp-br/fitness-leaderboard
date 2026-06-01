import React from 'react';

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  activityName, 
  isSubmitting, 
  onImageSelect, 
  selectedImage 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">Submit Run</h2>
        <p className="text-slate-300 mb-6">
          Are you sure you want to post <span className="font-bold text-orange-400">"{activityName}"</span> to the Community Feed?
        </p>

        {/* ✨ THE NEW PHOTO UPLOAD SECTION ✨ */}
        <div className="mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <label className="block text-sm font-bold text-slate-400 mb-2">Attach a Photo (Optional)</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={onImageSelect}
            className="block w-full text-sm text-slate-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-orange-500/10 file:text-orange-500
              hover:file:bg-orange-500/20 transition-all cursor-pointer"
          />
          {selectedImage && (
            <p className="text-xs text-green-400 mt-2">✅ Image selected: {selectedImage.name}</p>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <button 
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg font-bold text-slate-400 hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg font-bold bg-orange-600 hover:bg-orange-700 text-white transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? 'Posting...' : 'Yes, Post to Feed'}
          </button>
        </div>
      </div>
    </div>
  );
}