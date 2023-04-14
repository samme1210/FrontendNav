// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLb6HwyTXhWBg65fIopIX9WmcnYDgRV0g",
  authDomain: "fir-practice-93119.firebaseapp.com",
  projectId: "fir-practice-93119",
  storageBucket: "fir-practice-93119.appspot.com",
  messagingSenderId: "397338401071",
  appId: "1:397338401071:web:2e89bc19bb2b70bbfde9da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();