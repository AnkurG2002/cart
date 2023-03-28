// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ3nh8tJKkIea-opFYqQTxyagCixpzO3o",
  authDomain: "cart-542bd.firebaseapp.com",
  projectId: "cart-542bd",
  storageBucket: "cart-542bd.appspot.com",
  messagingSenderId: "477867968097",
  appId: "1:477867968097:web:9494c26025110f6f38cc20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
