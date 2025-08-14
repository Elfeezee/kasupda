
// src/lib/firebase/config.ts
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDUf7xm5YVE2acm4N2AEy7AWoV4N8qEjuk",
  authDomain: "kasupda-backend.firebaseapp.com",
  projectId: "kasupda-backend",
  storageBucket: "kasupda-backend.firebasestorage.app",
  messagingSenderId: "185975290310",
  appId: "1:185975290310:web:92cf858c4d7c53263e1ac7",
  measurementId: "G-ZL76CBMYP1"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
