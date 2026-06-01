// frontend/src/components/Login.jsx
export default function Login() {
  // ⚠️ YOUR ACTUAL STRAVA CLIENT ID IS SAFE HERE
  const STRAVA_CLIENT_ID = '250160'; 

const handleStravaLogin = () => {
    // ✨ Automatically detects if you are on localhost or your Vercel domain!
    const redirectUrl = window.location.origin; 
    
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}&approval_prompt=force&scope=activity:read_all`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      {/* The sleek dark-mode card */}
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden">
        
        {/* Optional: A subtle glow effect in the background of the card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-sky-500/20 blur-[50px] rounded-full pointer-events-none"></div>

        <h1 className="text-4xl sm:text-5xl font-black mb-4 relative z-10">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            Virtual Fitness Event
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg mb-10 relative z-10">
          Connect your Strava account to track your runs and climb the global leaderboard.
        </p>
        
        <button 
          onClick={handleStravaLogin}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#fc4c02] hover:bg-[#e34402] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#fc4c02]/20 hover:shadow-[#fc4c02]/40 hover:-translate-y-1 text-lg relative z-10"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
          </svg>
          Connect with Strava
        </button>
      </div>
    </div>
  );
}