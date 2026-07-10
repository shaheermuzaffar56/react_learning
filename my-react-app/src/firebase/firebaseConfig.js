import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDW_MljvWWXetXT4uc3XvifZ-ZoHeSBEUs",
  authDomain: "react-learning-auth-45780.firebaseapp.com",
  projectId: "react-learning-auth-45780",
  storageBucket: "react-learning-auth-45780.firebasestorage.app",
  messagingSenderId: "38675598762",
  appId: "1:38675598762:web:6716a24eb498174384efd3",
  measurementId: "G-2FM6GQ0X1F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);