// frontend/src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- We need to bring in Firestore!

const firebaseConfig = {
  apiKey: "AIzaSyDiAzb8q8TjMTx5NyZmGDp8Q10yoBOkOMA",
  authDomain: "fitness-leaderboard-56e48.firebaseapp.com",
  projectId: "fitness-leaderboard-56e48",
  storageBucket: "fitness-leaderboard-56e48.firebasestorage.app",
  messagingSenderId: "383035969816",
  appId: "1:383035969816:web:b534f565160697476ece6d",
  measurementId: "G-2N2GWTN1TV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and EXPORT the database connection!
export const db = getFirestore(app);``