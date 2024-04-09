// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e7160.firebaseapp.com",
  projectId: "mern-estate-e7160",
  storageBucket: "mern-estate-e7160.appspot.com",
  messagingSenderId: "307274032113",
  appId: "1:307274032113:web:c9e9acdeea228d3899da50",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
