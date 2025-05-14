
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmIJQd_m4uFz3zPlJ5g0R0HcnLVduAxNY",
  authDomain: "stranger-letter.firebaseapp.com",
  projectId: "stranger-letter",
  storageBucket: "stranger-letter.firebasestorage.app",
  messagingSenderId: "1082301563420",
  appId: "1:1082301563420:web:61f0acd4b82b50f53b95d9",
  measurementId: "G-ZFDQJXY4FT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const googleProvider = new GoogleAuthProvider();
 const db = getFirestore(app);
export{auth,googleProvider,db};