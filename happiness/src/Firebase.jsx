import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLkZSYAbVngqowIU5Bc2QyaKBn4DhxFSE",
  authDomain: "childish-happiness.firebaseapp.com",
  projectId: "childish-happiness",
  storageBucket: "childish-happiness.appspot.com",
  messagingSenderId: "640741981943",
  appId: "1:640741981943:web:e3faf3304904cbdf549df2",
  measurementId: "G-RBGCZL3620"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

