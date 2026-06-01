// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('VirtualRunner API Server is running smoothly!');
});
// Middleware
app.use(cors({
  origin: [
    'https://virtualrunner.vercel.app', // Your live frontend
    'http://localhost:5173'             // So it still works on your PC
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json()); 

// --- STRAVA OAUTH HANDSHAKE ROUTE ---
app.post('/api/strava/verify', async (req, res) => {
  const { code } = req.body; 

  try {
    const stravaResponse = await axios.post('https://www.strava.com/oauth/token', {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code'
    });

    const athleteData = stravaResponse.data.athlete;
    
    // ✨ GRAB THE HIGHER RESOLUTION MEDIUM PROFILE PHOTO OR FALLBACK
    const profilePicUrl = athleteData.profile_medium || athleteData.profile || null;

    res.json({ 
      success: true, 
      runnerName: `${athleteData.firstname} ${athleteData.lastname}`,
      profilePic: profilePicUrl, // ✨ SEND THE BETTER URL TO REACT
      accessToken: stravaResponse.data.access_token 
    });

  } catch (error) {
    console.error("Strava Handshake Failed:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to verify with Strava' });
  }
});

// Import and Use Run Routes
const runRoutes = require('./src/routes/runRoutes');
app.use('/api/runs', runRoutes);

// Start the Server (Notice how clean this is now!)
app.listen(PORT, () => {
  console.log(`Server is running and listening for runs on port ${PORT}`);
});
module.exports = app;