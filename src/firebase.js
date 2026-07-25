import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbCocm2arkpuRk2PEVKxbUz2pUMBIAYRA",
  authDomain: "yarn-over-e0279.firebaseapp.com",
  projectId: "yarn-over-e0279",
  storageBucket: "yarn-over-e0279.firebasestorage.app",
  messagingSenderId: "956463705533",
  appId: "1:956463705533:web:481ee40c6f1df6b17db6d4",
  measurementId: "G-GH1WHFN010"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);