// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore }from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0cEB3HNvSdfMP025za6Xj3StYf6iiuFc",
  authDomain: "kasupdaportalpro.firebaseapp.com",
  projectId: "kasupdaportalpro",
  storageBucket: "kasupdaportalpro.appspot.com",
  messagingSenderId: "465998096959",
  appId: "1:465998096959:web:113fe37c42d308236a668a",
  measurementId: "G-CYC7YQWCN0"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics if supported
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };
