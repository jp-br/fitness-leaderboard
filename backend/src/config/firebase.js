// backend/src/config/firebase.js
const admin = require('firebase-admin');

// ✨ Check if Firebase is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // ✨ This line perfectly formats your Vercel private key
      privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
    })
  });
}

const db = admin.firestore();

// Exporting { db } exactly as you had it before!
module.exports = { db };