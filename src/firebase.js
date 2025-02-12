// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth,GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'; // If you're using Firestore
// Import other Firebase services as needed

const firebaseConfig = {
  apiKey: "AIzaSyBP5ZbuXze7JX0kse476PX6UjAPY1onB5U",
  authDomain: "hospital-finder-2890d.firebaseapp.com",
  projectId: "hospital-finder-2890d",
  storageBucket: "hospital-finder-2890d.firebasestorage.app",
  messagingSenderId: "158432793485",
  appId: "1:158432793485:web:92b0386d13f6f5697be3c4",
  measurementId: "G-1QPNXRET0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();


export const db = getFirestore(app); // For Firestore

export default app;

