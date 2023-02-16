import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_SECRET_KEY,
  authDomain: "busy-bulletin.firebaseapp.com",
  projectId: "busy-bulletin",
  storageBucket: "busy-bulletin.appspot.com",
  messagingSenderId: "17359537877",
  appId: "1:17359537877:web:c91029b780632828c9845c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// Timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };
