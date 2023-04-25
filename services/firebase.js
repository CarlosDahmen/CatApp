import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeMtztReue3SAqs-ohujmcXwIruj0Xgog",
  authDomain: "authproject-f59d6.firebaseapp.com",
  projectId: "authproject-f59d6",
  storageBucket: "authproject-f59d6.appspot.com",
  messagingSenderId: "750339401646",
  appId: "1:750339401646:web:ef1aa441fbfc7d05518a3f",
};

// Initialize Firebase
export const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  // connect(auth, "http://localhost:3000");
};
