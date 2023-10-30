import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAlW4slNnLHPNeRv1SUBCWjid7ogPvUMA",
  authDomain: "cogoapp-d9cc5.firebaseapp.com",
  projectId: "cogoapp-d9cc5",
  storageBucket: "cogoapp-d9cc5.appspot.com",
  messagingSenderId: "1094189457222",
  appId: "1:1094189457222:web:293ff384aa53f415974f47"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  db,
};