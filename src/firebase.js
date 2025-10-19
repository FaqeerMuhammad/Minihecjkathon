import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";


const firebaseConfig = {
  apiKey: "AIzaSyCQBA0IYKzhETXxmyRTgEzcFta0gF_yNAY",
  authDomain: "picthcraft.firebaseapp.com",
  projectId: "picthcraft",
  storageBucket: "picthcraft.firebasestorage.app",
  messagingSenderId: "25227521287",
  appId: "1:25227521287:web:fb688dafbabbfbea1169a2",
  measurementId: "G-VKC9VFH4E6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

// Create a callable function reference
export const callGemini = httpsCallable(functions, 'generateContent');

export { app, db, auth };
