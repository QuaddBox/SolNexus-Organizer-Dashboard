// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from  "firebase/storage"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1zIIta-F5j9WhKFtgQtFn2XvIdp6HupA",
  authDomain: "solnexus-df8f9.firebaseapp.com",
  projectId: "solnexus-df8f9",
  storageBucket: "solnexus-df8f9.appspot.com",
  messagingSenderId: "153019798475",
  appId: "1:153019798475:web:3beea4610b9ff7b0e71c4e",
  measurementId: "G-BC4H9JHP7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app)
export const storage = getStorage(app)
