// src/lib/firebase/config.ts
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9jYSTYDUzm7mbBZRK1J3UAIN94rgsYoQ",
  authDomain: "kasupdaportal.firebaseapp.com",
  projectId: "kasupdaportal",
  storageBucket: "kasupdaportal.firebasestorage.app",
  messagingSenderId: "1094508927078",
  appId: "1:1094508927078:web:cc11d0332dac8550fcb5a7"
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
