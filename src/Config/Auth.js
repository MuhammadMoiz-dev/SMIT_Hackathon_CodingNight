import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBfCt34a620Dit4CAZHr7zOa9rP8BXj5fk",
    authDomain: "hackathon-421ff.firebaseapp.com",
    projectId: "hackathon-421ff",
    storageBucket: "hackathon-421ff.firebasestorage.app",
    messagingSenderId: "314646829335",
    appId: "1:314646829335:web:328459181d885d6de87f52",
    measurementId: "G-NDV17WT8E5"
};


const app = initializeApp(firebaseConfig);


export { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut }