// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import SubmitRun from './pages/SubmitRun';
import Leaderboard from './pages/Leaderboard';
import CommunityFeed from './pages/CommunityFeed';
import DashboardLayout from './components/DashboardLayout'; // ✨ IMPORTED THE DASHBOARD
import './index.css'; 

function App() {
  const [user, setUser] = useState(null); 
  const [status, setStatus] = useState('');
  
  // ✨ STATE TO REMEMBER WHICH PAGE WE ARE ON (Defaults to leaderboard)
  const [activePage, setActivePage] = useState('leaderboard'); 

  // The Gatekeeper: Listens for Strava sending the user back with a code
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      window.history.replaceState({}, document.title, "/"); // Hide code from URL
      setStatus('🔄 Authenticating with Strava...');
      
      axios.post('http://localhost:5000/api/strava/verify', { code })
        .then(response => {
          if (response.data.success) {
            setUser({
              name: response.data.runnerName,
              profilePic: response.data.profilePic,
              accessToken: response.data.accessToken 
            });
            setStatus('');
          }
        })
        .catch(error => {
          setStatus('❌ Login failed. Please try again.');
          console.error(error);
        });
    }
  }, []);

  // SCENARIO 1: If the user is NOT logged in, ONLY show the Login page
  if (!user) {
    return (
      <div className="app-container">
        {status && <p style={{ color: '#38bdf8', textAlign: 'center', fontWeight: 'bold' }}>{status}</p>}
        <Login />
      </div>
    );
  }

  // SCENARIO 2: If they ARE logged in, wrap everything in the sleek Dashboard Layout!
  return (
    <DashboardLayout 
      user={user} 
      activePage={activePage} 
      setActivePage={setActivePage}
      onLogout={() => setUser(null)} 
    >
      {activePage === 'leaderboard' && <Leaderboard />}
      {activePage === 'submit' && <SubmitRun loggedInName={user.name} profilePic={user.profilePic} accessToken={user.accessToken} />}      {activePage === 'feed' && <CommunityFeed user={user} />} {/* ✨ THIS WAS THE MISSING PIECE! */}
    </DashboardLayout>
  );
}

export default App;