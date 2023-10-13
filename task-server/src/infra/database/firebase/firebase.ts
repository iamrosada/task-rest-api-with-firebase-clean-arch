
import { initializeApp } from 'firebase/app';
import { initializeFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGhKqvo4S4UYWSFK6VWVeRHSt6pyIVQk4",
  authDomain: "ivipcoin-project-a6e58.firebaseapp.com",
  projectId: "ivipcoin-project-a6e58",
  storageBucket: "ivipcoin-project-a6e58.appspot.com",
  messagingSenderId: "171220625587",
  appId: "1:171220625587:web:b380f280eb9d9eb97828c6"
};

// Initialize Firebase
//  const app = firebase.initializeApp(firebaseConfig);
//  const db = getFirestore()
const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, { ignoreUndefinedProperties: true })
export { app, db };

