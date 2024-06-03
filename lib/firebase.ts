import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/firestore";
import { getFirestore, collection, addDoc,doc,setDoc, updateDoc, arrayUnion,getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL,getMetadata, } from "firebase/storage";
import { UserContext } from "@/context/user.context";
import { useContext } from "react";

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
const db = getFirestore(app);
const storage = getStorage(app);
const foldersRef = ref(storage, 'gs://folderx-ab411.appspot.com/cGH0Yt6ieXf3KZchECzqjkfRkmi2/Music/IMG-20221022-WA0018.jpg');


export const signUp = async (email, password) => {
  try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      return user; // Return user if needed for further use
  } catch (error) {
      console.error("Error signing up:", error);
      throw error; // Throw error to handle it in the caller function if needed
  }
};

export const signIn = async (email, password) => {
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      return user; // Return user if needed for further use
  } catch (error) {
      console.error("Error signing in:", error);
      throw error; // Throw error to handle it in the caller function if needed
  }
};
export const addUserDoc = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...userData,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const handleUpload = async (file, folderName, onProgress) => {
  if (!file || !folderName) return null;

  const user = auth.currentUser;
  if (!user) {
      console.error("User is not authenticated");
      return null;
  }
  const userId = user.uid;

  const storageRef = ref(storage, `${userId}/Folders/${folderName}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
          (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              onProgress(progress);
              console.log('Upload is ' + progress + '% done');
          },
          (error) => {
              console.error("Error uploading file: ", error);
              reject(error);
          },
          async () => {
              try {
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                  console.log("File uploaded successfully. URL: ", downloadURL);

                  // Add file details to Firestore under user's document
                  const userDocRef = doc(db, "users", userId);
                  const folderPath = `Folders.${folderName}`;

                  await setDoc(userDocRef, {
                      [folderPath]: arrayUnion({ name: file.name, url: downloadURL, createdAt: new Date() })
                  }, { merge: true });

                  resolve(downloadURL);
              } catch (error) {
                  console.error("Error updating Firestore: ", error);
                  reject(error);
              }
          }
      );
  });
};


export const getFolders = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
      console.error("User is not authenticated");
      return null;
  }
  const userId = user.uid;
  console.log("User ID: ", userId);

  const userDocRef = doc(db, "users", userId);

  try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("User Data: ", userData);
          return userData;
         
      } else {
          console.log("No such document!");
          return {};
      }
  } catch (error) {
      console.error("Error getting document:", error);
      return {};
  }
};