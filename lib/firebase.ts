import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6gWPqBbb6Djqc7b8JE8nzSyaBM5MGn_c",
  authDomain: "folderx-ab411.firebaseapp.com",
  projectId: "folderx-ab411",
  storageBucket: "folderx-ab411.appspot.com",
  messagingSenderId: "72679501703",
  appId: "1:72679501703:web:8054fa22cf4b12da206d22",
  measurementId: "G-0E3DC95C6F"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const signUp = async (email,password) => createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    localStorage.setItem("user", user);
  })

export const signIn = async (email, password) => signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  const user = userCredential.user;
  localStorage.setItem("user", user);
})