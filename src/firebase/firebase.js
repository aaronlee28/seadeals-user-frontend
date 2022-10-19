// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7bAB1GNG0FKlqV2Ud5XPu7aB2kh4pGCc",
  authDomain: "bucket-seadeals.firebaseapp.com",
  projectId: "bucket-seadeals",
  storageBucket: "bucket-seadeals.appspot.com",
  messagingSenderId: "336103547465",
  appId: "1:336103547465:web:31cbd26d343555bf379598"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
