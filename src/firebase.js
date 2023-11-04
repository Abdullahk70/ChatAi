// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCg5FJ9IqckpLVKBbBkZLzNZ-kq5iDElQ",
  authDomain: "chatbot-ai-app.firebaseapp.com",
  projectId: "chatbot-ai-app",
  storageBucket: "chatbot-ai-app.appspot.com",
  messagingSenderId: "556747585975",
  appId: "1:556747585975:web:e6b6d6deb5e60b93d71032",
  measurementId: "G-YF62J081ZR",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, db, onAuthStateChanged, createUserWithEmailAndPassword };
