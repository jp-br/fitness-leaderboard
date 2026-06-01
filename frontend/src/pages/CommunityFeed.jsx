import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CommunityFeed({ user }) {
  const [runs, setRuns] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // This object keeps track of the text typed in the comment boxes for each run!
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    fetchRuns();
  }, []);

 const fetchRuns = async () => {
    try {
      // ✨ NEW: Uses Vercel URL if deployed, or localhost if you are coding on your PC!
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/runs`);
      
      // Sort the runs so the newest ones are always at the top
      const sortedRuns = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRuns(sortedRuns);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching feed:", error);
      setLoading(false);
    }
  };

  // 🔥 SEND THE LIKE TO THE BACKEND
  const handleKudos = async (runId) => {
    if (!user) return alert("Please log in to like a run!");
    try {
      const response = await axios.post(`http://localhost:5000/api/runs/${runId}/kudos`, {
        runnerName: user.name
      });
      
      // Instantly update the screen without refreshing the page!
      setRuns(runs.map(run => 
        run.id === runId ? { ...run, kudos: response.data.kudos } : run
      ));
    } catch (error) {
      console.error("Error toggling kudos:", error);
    }
  };

  // 💬 SEND THE COMMENT TO THE BACKEND
  const handleComment = async (runId) => {
    if (!user) return alert("Please log in to comment!");
    const text = commentInputs[runId];
    if (!text || text.trim() === '') return;

    try {
      const response = await axios.post(`http://localhost:5000/api/runs/${runId}/comments`, {
        runnerName: user.name,
        text: text
      });

      // Instantly update the comments on the screen!
      setRuns(runs.map(run => 
        run.id === runId ? { ...run, comments: response.data.comments } : run
      ));
      
      // Clear out the typing box
      setCommentInputs(prev => ({ ...prev, [runId]: '' }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) return <div className="text-center text-slate-400 mt-10 text-xl font-bold">📸 Developing photos...</div>;
  if (runs.length === 0) return <div className="text-center text-slate-400 mt-10">No runs posted yet. Be the first!</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10">
      {runs.map((run) => {
        // Safe checks just in case older runs don't have these arrays yet
        const kudosList = run.kudos || [];
        const commentsList = run.comments || [];
        const hasLiked = user ? kudosList.includes(user.name) : false;

        return (
          <div key={run.id} className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
            
           {/* Header: Name and Time */}
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              
              {/* ✨ NEW: Flex container for the Avatar and Name */}
              <div className="flex items-center gap-3">
                <img 
                  // Look for the real photo, otherwise use the generated one!
                  src={run.runnerProfilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(run.runnerName || 'Runner')}&background=ea580c&color=fff&bold=true`} 
                  alt={run.runnerName} 
                  className="w-10 h-10 rounded-full border-2 border-slate-800 shadow-sm"
                />
                
                {/* I accidentally deleted this section in my last message! */}
                <h3 className="font-bold text-lg text-slate-100">
                  {run.runnerName} <span className="text-sm font-normal text-slate-400">went for a run</span>
                </h3>
              </div>

              <span className="text-sm text-slate-400">
                {run.createdAt ? new Date(run.createdAt).toLocaleDateString() : 'Recently'}
              </span>
            </div>

            {/* Photo Section */}
           {/* Photo Section */}
              {run.imageUrl && (
              <div className="bg-slate-950 overflow-hidden">
                <img 
                  src={run.imageUrl} 
                  alt="Run Activity" 
                  // ✨ NEW: Make it clickable!
                  onClick={() => setExpandedImage(run.imageUrl)}
                  className="w-full h-auto object-cover max-h-[500px] cursor-pointer hover:opacity-90 transition-opacity"
                />
              </div>
            )}

            {/* Stats Section */}
            <div className="p-4 flex gap-6 bg-slate-800/50">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Distance</p>
                <p className="text-xl font-bold text-slate-100">{run.distanceKm} km</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Time</p>
                <p className="text-xl font-bold text-slate-100">{Math.floor(run.timeSeconds / 60)} min</p>
              </div>
            </div>

            {/* Social Actions (Kudos) */}
            <div className="p-4 border-t border-slate-800 flex items-center gap-4">
              <button 
                onClick={() => handleKudos(run.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
                  hasLiked 
                    ? 'bg-orange-600 text-white hover:bg-orange-700' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                👍 {hasLiked ? 'Liked' : 'Kudos'} 
              </button>
              <span className="text-slate-400 font-medium">
                {kudosList.length} {kudosList.length === 1 ? 'person' : 'people'} liked this
              </span>
            </div>

            {/* Comments Section */}
            <div className="p-4 bg-slate-950/50">
              
             {/* List of existing comments */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-2">
                {commentsList.map((c, index) => (
                  <div key={index} className="flex gap-3 items-start bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                    {/* ✨ NEW: Commenter Avatar */}
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.runnerName)}&background=0ea5e9&color=fff&size=32&bold=true`} 
                      alt={c.runnerName} 
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div>
                      <p className="font-bold text-sm text-slate-300">{c.runnerName}</p>
                      <p className="text-slate-200 mt-0.5 text-sm">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add a new comment input */}
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-orange-500"
                  value={commentInputs[run.id] || ''}
                  onChange={(e) => setCommentInputs(prev => ({ ...prev, [run.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && handleComment(run.id)}
                />
                <button 
                  onClick={() => handleComment(run.id)}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  Post
                </button>
              </div>

            </div>
            {/* ✨ NEW: The Full-Screen Image Lightbox */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setExpandedImage(null)} // Click anywhere to close
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-slate-400 hover:text-white text-4xl font-light transition-colors"
            onClick={() => setExpandedImage(null)}
          >
            &times;
          </button>
          
          {/* The Big Image */}
          <img 
            src={expandedImage} 
            alt="Expanded view" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
          </div>
        );
      })}
    </div>
  );
}