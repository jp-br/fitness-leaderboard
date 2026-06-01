// frontend/src/pages/SubmitRun.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import RunCard from '../components/RunCard';
import ConfirmationModal from '../components/ConfirmationModal'; 


export default function SubmitRun({ loggedInName, profilePic, accessToken }) {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  // ✨ Modal State Variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { per_page: 50 }
    })
    .then(response => {
      const onlyRuns = response.data.filter(act => act.type === 'Run');
      setActivities(onlyRuns);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching Strava runs:", error);
      setStatus('❌ Failed to load activities from Strava.');
      setLoading(false);
    });
  }, [accessToken]);

  const handleSelectRun = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
    setStatus(''); // Clear any old messages
  };

  // ✨ THE UPGRADED DOUBLE-PIPELINE SUBMISSION
  const confirmSubmission = async () => {
    setIsSubmitting(true);
    let finalImageUrl = null;

    try {
      // ==========================================
      // PIPELINE 1: TRY TO GRAB THE STRAVA PHOTO
      // ==========================================
      if (selectedActivity.total_photo_count > 0) {
        setStatus('🔍 Fetching your photo directly from Strava...');
        try {
          // Specifically ask Strava for the 600px version of the photo
          const photoRes = await axios.get(`https://www.strava.com/api/v3/activities/${selectedActivity.id}/photos?size=600`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          
          if (photoRes.data && photoRes.data.length > 0) {
            // Strava sends back a nested object of sizes. We grab the first available URL!
            const photoUrls = photoRes.data[0].urls;
            finalImageUrl = photoUrls['600'] || Object.values(photoUrls)[0]; 
          }
        } catch (error) {
          console.warn("Strava didn't want to hand over the photo:", error);
        }
      }

      // ==========================================
      // PIPELINE 2: FALLBACK TO CLOUDINARY UPLOAD
      // ==========================================
      if (!finalImageUrl && selectedImage) {
        setStatus('📸 Uploading your photo to Cloudinary...');
        try {
          // Pack the image into a virtual form
          const formData = new FormData();
          formData.append('file', selectedImage);
          formData.append('upload_preset', 'b0of4h6y'); 

          const cloudinaryRes = await axios.post(
            `https://api.cloudinary.com/v1_1/dey0ubrg3/image/upload`,
            formData
          );

          // Grab the secure URL that Cloudinary hands back!  
          finalImageUrl = cloudinaryRes.data.secure_url;
          
        } catch (error) {
          console.error("Cloudinary Error:", error);
          setStatus('❌ Failed to upload image, but continuing with submission...');
        }
      }

      // ==========================================
      // SAVE EVERYTHING TO YOUR DATABASE
      // ==========================================
      const distanceKm = Number((selectedActivity.distance / 1000).toFixed(2));
      const timeSeconds = selectedActivity.moving_time; 

      setStatus('🏃‍♂️ Saving run to database...');
      await axios.post('https://fitness-leaderboard-dun.vercel.app/api/runs', {
        runnerName: loggedInName,
        runnerProfilePic: profilePic,
        distanceKm: distanceKm, 
        timeSeconds: timeSeconds,
        stravaActivityId: String(selectedActivity.id),
        imageUrl: finalImageUrl // ✨ Send whichever photo we found!
      });
      
      setStatus(`✅ Success! "${selectedActivity.name}" is now on the Leaderboard.`);
      setIsModalOpen(false); 
      setSelectedImage(null); // Clear the image state
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setStatus(`⚠️ Blocked: ${error.response.data.error}`);
      } else {
        setStatus('❌ Failed to submit run to database.');
      }
      setIsModalOpen(false); 
    } finally {
      setIsSubmitting(false); 
      setSelectedActivity(null); 
    }
  };

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 relative">
      <h3 className="text-xl font-black text-white mb-2">Select an Activity</h3>
      <p className="text-slate-400 text-sm mb-6">Click on one of your recent Strava runs to submit it to the global leaderboard.</p>

      {/* Status Message Area */}
      {status && (
        <div className={`p-4 rounded-xl mb-6 text-center font-bold border transition-all ${status.includes('❌') || status.includes('⚠️') ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]'}`}>
          {status}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center p-10 text-sky-500 font-bold animate-pulse">
          Fetching your latest runs from Strava...
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center p-10 text-slate-500 italic bg-slate-950 rounded-xl border border-slate-800">
          No recent runs found on your Strava account. Go log some miles!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map(activity => (
            <RunCard 
              key={activity.id} 
              activity={activity} 
              onSelect={handleSelectRun} 
              formatTime={formatTime} 
            />
          ))}
        </div>
      )}

     {/* ✨ The Custom Modal */}
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedImage(null); // Clear image if they cancel
        }}
        onConfirm={confirmSubmission}
        activityName={selectedActivity?.name}
        isSubmitting={isSubmitting}
        onImageSelect={(e) => setSelectedImage(e.target.files[0])} 
        selectedImage={selectedImage} 
      />

    </div>
  );
}