import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDn9YVubv6MKE3ID91UdFB72vHW95golqg",
    authDomain: "project-school-b866b.firebaseapp.com",
    projectId: "project-school-b866b",
    storageBucket: "project-school-b866b.appspot.com",
    messagingSenderId: "9923249553",
    appId: "1:9923249553:web:18c86e3fa41f0a2e5dc630",
    measurementId: "G-YV1HJZ9FJ9"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
