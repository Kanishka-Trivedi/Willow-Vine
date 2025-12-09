// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBBCGqVNBdKSt6as7iP_LesYTOH0Zlq8yE",
  authDomain: "willowandvine-b8b58.firebaseapp.com",
  projectId: "willowandvine-b8b58",
  storageBucket: "willowandvine-b8b58.firebasestorage.app",
  messagingSenderId: "180518335813",
  appId: "1:180518335813:web:51d9267ebfdbbfa46dfa2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);