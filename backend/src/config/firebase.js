// backend/src/config/firebase.js
const admin = require('firebase-admin');

// ✨ Grab the giant JSON string from Vercel and turn it back into an object
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

// Vercel sometimes runs this file twice, this prevents it from crashing on the second run
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = { db };