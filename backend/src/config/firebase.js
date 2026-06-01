// backend/src/config/firebase.js
const admin = require('firebase-admin');

// Go up two folders (../../) to find the key in the root backend folder
const serviceAccount = require('../../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };