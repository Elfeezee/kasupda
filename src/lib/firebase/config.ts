
// src/lib/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth }s from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "kasupda-portal-425814.firebaseapp.com",
  projectId: "kasupda-portal-42581
  storageBucket: "kasupda-portal-425814.appspot.com",
  messagingSenderId: "297839652531",
  appId: "1:297839652531:web:e7839383e6b5cb57f72159"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
