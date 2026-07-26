import { initializeApp } from "firebase/app";
import {getFirestore,} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkaxwyw2vR_R_cK0oIF0dq6MX1ZScOFas",
  authDomain: "strooprush-ee873.firebaseapp.com",
  projectId: "strooprush-ee873",
  storageBucket: "strooprush-ee873.firebasestorage.app",
  messagingSenderId: "571596166207",
  appId: "1:571596166207:web:dd2f538ea6a8452bf8548a",
  measurementId: "G-4T7Q4QGQ66",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);