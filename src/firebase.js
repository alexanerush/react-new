import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBepBe0MfevSOre7Y_MfHbRD-boMLutY6I",
  authDomain: "react-new-hw6.firebaseapp.com",
  projectId: "react-new-hw6",
  storageBucket: "react-new-hw6.appspot.com", 
  messagingSenderId: "1021724534366",
  appId: "1:1021724534366:web:91d10df9247f3ae733b6cf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
