// backend/src/services/runService.js
const { db } = require('../config/firebase'); 

const fetchAllRuns = async () => {
  const snapshot = await db.collection('runs').get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

const createRun = async (runData) => {
  // ✨ ADDED runnerProfilePic TO THIS LIST SO WE ACTUALLY UNPACK IT!
  const { runnerName, runnerProfilePic, distanceKm, timeSeconds, stravaActivityId, imageUrl } = runData;

  if (stravaActivityId) {
    const stringId = String(stravaActivityId);
    const numberId = Number(stravaActivityId);

    const duplicateCheck = await db.collection('runs')
      .where('stravaActivityId', 'in', [stringId, numberId])
      .get();
    
    if (!duplicateCheck.empty) {
      throw new Error('DUPLICATE_RUN'); 
    }
  }

  const pace = timeSeconds / distanceKm;
  const newRun = {
    runnerName,
    runnerProfilePic: runnerProfilePic || null, // Now it knows what this is!
    distanceKm: Number(distanceKm),
    timeSeconds: Number(timeSeconds),
    pace: pace,
    stravaActivityId: stravaActivityId ? String(stravaActivityId) : null,
    imageUrl: imageUrl || null, 
    kudos: [], 
    comments: [], 
    createdAt: new Date().toISOString()
  };

  const docRef = await db.collection('runs').add(newRun);
  return { id: docRef.id, ...newRun };
};

// ==========================================
// ✨ NEW: THE SOCIAL FEATURES
// ==========================================

const toggleKudos = async (runId, runnerName) => {
  const runRef = db.collection('runs').doc(runId);
  const doc = await runRef.get();

  if (!doc.exists) {
    throw new Error('RUN_NOT_FOUND');
  }

  const runData = doc.data();
  let kudos = runData.kudos || [];

  // If the user's name is already in the array, remove them (Unlike).
  // Otherwise, add them to the array (Like).
  if (kudos.includes(runnerName)) {
    kudos = kudos.filter(name => name !== runnerName);
  } else {
    kudos.push(runnerName);
  }

  // Update the database with the new array
  await runRef.update({ kudos });
  return kudos; 
};

const addComment = async (runId, runnerName, text) => {
  const runRef = db.collection('runs').doc(runId);
  const doc = await runRef.get();

  if (!doc.exists) {
    throw new Error('RUN_NOT_FOUND');
  }

  const runData = doc.data();
  const comments = runData.comments || [];

  // Create the new comment object
  const newComment = {
    runnerName,
    text,
    createdAt: new Date().toISOString()
  };

  comments.push(newComment);

  // Update the database
  await runRef.update({ comments });
  return comments;
};

// ✨ Don't forget to export the new functions!
module.exports = {
  fetchAllRuns,
  createRun,
  toggleKudos,
  addComment
};