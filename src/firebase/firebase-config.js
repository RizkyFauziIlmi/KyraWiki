import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB9UK4TwIPzMeJbj5TnOPfsT9Vs4LvcTvE",
    authDomain: "kyrawiki-913b4.firebaseapp.com",
    projectId: "kyrawiki-913b4",
    storageBucket: "kyrawiki-913b4.appspot.com",
    messagingSenderId: "502741470132",
    appId: "1:502741470132:web:d354af65254b795e1500e1",
    measurementId: "G-G6QH44HJNY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app) 
export const provider = new GoogleAuthProvider();
