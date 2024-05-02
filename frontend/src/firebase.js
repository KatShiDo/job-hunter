// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "job-hunter-4751c.firebaseapp.com",
  projectId: "job-hunter-4751c",
  storageBucket: "job-hunter-4751c.appspot.com",
  messagingSenderId: "571431900182",
  appId: "1:571431900182:web:e66b69298ad16985461137"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);