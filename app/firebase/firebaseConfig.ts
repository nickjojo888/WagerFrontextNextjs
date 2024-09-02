import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyEAO_OnrUKrSG8EE6cuBWiqhaYUdFmH0",
  authDomain: "wager-cf92a.firebaseapp.com",
  projectId: "wager-cf92a",
  storageBucket: "wager-cf92a.appspot.com",
  messagingSenderId: "768086849946",
  appId: "1:768086849946:web:23ab42acdd26d38ebde223",
  measurementId: "G-5KDVRV4NYR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
