// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8b69poTsinhxSlyfPItyMnXALBvb72ek",
  authDomain: "baskit-admin.firebaseapp.com",
  projectId: "baskit-admin",
  storageBucket: "baskit-admin.appspot.com",
  messagingSenderId: "670168844378",
  appId: "1:670168844378:web:decffd0311a5ab602df063"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);