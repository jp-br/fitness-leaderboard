const admin = require('firebase-admin');

// Grab the scrambled Base64 string from Vercel
const base64Credentials = process.env.FIREBASE_CREDENTIALS;

// Unscramble it back into raw text
const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');

// Turn it into a JSON object for Firebase
const serviceAccount = JSON.parse(decodedCredentials);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = { db };