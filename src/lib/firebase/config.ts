// src/lib/firebase/config.ts
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdFb9HLToxHvAC2zpA0MvTag5ulLF15pw",
  authDomain: "kasupda-portal-lxlgv.firebaseapp.com",
  projectId: "kasupda-portal-lxlgv",
  storageBucket: "kasupda-portal-lxlgv.firebasestorage.app",
  messagingSenderId: "362362329354",
  appId: "1:362362329354:web:57a9181db56aaaa53842f3",
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
