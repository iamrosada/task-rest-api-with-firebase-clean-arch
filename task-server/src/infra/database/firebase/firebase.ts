
import { initializeApp } from "firebase/app";
import { getFirestore }  from 'firebase-admin/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCf1W2-53tmdkVoDqURn-BSWbU2JTSxRDU",
  authDomain: "ivipcoin-project.firebaseapp.com",
  projectId: "ivipcoin-project",
  storageBucket: "ivipcoin-project.appspot.com",
  messagingSenderId: "91545958901",
  appId: "1:91545958901:web:11f3008797bbff9dfb08bc",
  measurementId: "G-YDS7RZLNJ0"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
