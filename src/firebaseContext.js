import { createContext } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
console.log(process.env);

export const fire = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSANGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
}).auth();

export const geo = firebase.firestore.GeoPoint;
export const db = firebase.firestore();
export const fireContext = createContext();