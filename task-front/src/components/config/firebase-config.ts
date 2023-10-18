/* eslint-disable import/no-extraneous-dependencies */

import { initializeApp } from "firebase/app";
import 'firebase/analytics';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGhKqvo4S4UYWSFK6VWVeRHSt6pyIVQk4",
  authDomain: "ivipcoin-project-a6e58.firebaseapp.com",
  projectId: "ivipcoin-project-a6e58",
  storageBucket: "ivipcoin-project-a6e58.appspot.com",
  messagingSenderId: "171220625587",
  appId: "1:171220625587:web:b380f280eb9d9eb97828c6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
