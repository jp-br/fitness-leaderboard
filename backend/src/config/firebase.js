// backend/src/config/firebase.js
const admin = require('firebase-admin');

// ✨ We changed the name so the rogue .env file cannot override us!
const base64Credentials = process.env.VERCEL_FIREBASE_BASE64;

if (!base64Credentials) {
  console.error("CRITICAL ERROR: Missing VERCEL_FIREBASE_BASE64 variable!");
}

const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
const serviceAccount = JSON.parse(decodedCredentials);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = { db };