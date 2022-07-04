// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXJBdsftoKEm0U3NPjj6cl5Oc1v1YYUMM",
  authDomain: "booster-app-1.firebaseapp.com",
  projectId: "booster-app-1",
  storageBucket: "booster-app-1.appspot.com",
  messagingSenderId: "361515488764",
  appId: "1:361515488764:web:1cc17b9ed83a29261a8e79",
  measurementId: "G-ZV7138EXSQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//add these at the end to authenticate
const auth = getAuth();
const db = getFirestore();

export { auth, db };
