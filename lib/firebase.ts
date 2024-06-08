import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/firestore";
import { getFirestore, collection, addDoc,doc,setDoc, updateDoc, arrayUnion,getDoc, getDocs, query, orderBy, limit, where, deleteDoc, serverTimestamp, deleteField } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";


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

  const user = JSON.parse(localStorage.getItem("user"));
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

          // Reference to the specific folder document in Firestore
          const folderDocRef = doc(db, "users", userId, "Folders", folderName);
          
          // Check if the document exists
          const docSnap = await getDoc(folderDocRef);
          if (!docSnap.exists()) {
            // If the document does not exist, create it with the initial file information
            await setDoc(folderDocRef, {
              Files: [{ name: file.name, path: `Folders/${folderName}/${file.name}`, folder: folderName, url: downloadURL, createdAt: new Date() }]
            });
          } else {
            // If the document exists, update it by adding the new file information
            await setDoc(folderDocRef, {
              Files: arrayUnion({ name: file.name, path: `Folders/${folderName}/${file.name}`, folder: folderName, url: downloadURL, createdAt: new Date() })
            }, { merge: true });
          }

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
  const foldersCollectionRef = collection(userDocRef, "Folders");

  try {
      const foldersSnapshot = await getDocs(foldersCollectionRef);
      if (foldersSnapshot.empty) {
          console.log("No folders found!");
          return {};
      }

      const foldersData = {};
      foldersSnapshot.forEach(doc => {
          foldersData[doc.id] = doc.data().Files || [];
      });

      console.log("Folders Data: ", foldersData);
      return foldersData;
  } catch (error) {
      console.error("Error getting folders:", error);
      return {};
  }
};

export const addRecentFile = async (fileInfo) => {
  try {
    // Get the currently authenticated user
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      throw new Error("No user is currently authenticated.");
    }

    // Reference to the user's recentFiles collection
    const userDocRef = doc(db, "users", user.uid);
    const recentFilesCollectionRef = collection(userDocRef, "recentFiles");

    // Query to check if the file already exists in the collection
    const fileQuery = query(recentFilesCollectionRef, where("url", "==", fileInfo.url));
    const querySnapshot = await getDocs(fileQuery);

    if (querySnapshot.empty) {
      // If the file does not exist, add a new document
      await addDoc(recentFilesCollectionRef, {
        ...fileInfo,
        openedAt: new Date() // Add the current date and time as the openedAt timestamp
      });
    } else {
      // If the file exists, update the openedAt timestamp
      const fileDocRef = querySnapshot.docs[0].ref;
      await updateDoc(fileDocRef, {
        openedAt: new Date() // Update the openedAt timestamp
      });
    }

    console.log("File info added or updated successfully in staredFiles collection.");
  } catch (error) {
    console.error("Error adding or updating file info: ", error);
  }
};

// Function to get recent files from Firestore
export const getRecentFiles = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      throw new Error("No user is currently authenticated.");
    }

    const userDocRef = doc(db, "users", user.uid);
    const recentFilesCollectionRef = collection(userDocRef, "recentFiles");

    // Query to get recent files ordered by the 'openedAt' field, limiting to the last 10
    const recentFilesQuery = query(recentFilesCollectionRef, orderBy("openedAt", "desc"), limit(10));

    const querySnapshot = await getDocs(recentFilesQuery);

    const recentFiles = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return recentFiles;
  } catch (error) {
    console.error("Error getting recent files: ", error);
    return [];
  }
};

export const deleteFile = async (folderName, fileName) => {
  try {
    // Get the currently authenticated user
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      throw new Error("No user is currently authenticated.");
    }

    const userId = user.uid;
    const userDocRef = doc(db, "users", userId);
    const foldersCollectionRef = collection(userDocRef, "Folders");
    const folderDocRef = doc(foldersCollectionRef, folderName);

    // Retrieve the folder document
    const folderDoc = await getDoc(folderDocRef);

    if (!folderDoc.exists()) {
      console.error("Folder does not exist");
      return null;
    }

    const folderData = folderDoc.data();
    const filesArray = folderData.Files || [];
    const fileToDelete = filesArray.find(file => file.name === fileName);

    if (!fileToDelete) {
      console.error("File not found in specified folder");
      return null;
    }

    // Update the folder document to remove the file
    const updatedFilesArray = filesArray.filter(file => file.name !== fileName);
    await updateDoc(folderDocRef, { Files: updatedFilesArray });

    // Reference to the user's deletedFiles collection
    const deletedFilesCollectionRef = collection(userDocRef, "deletedFiles");

    // Query to check if the file already exists in the deletedFiles collection
    const fileQuery = query(deletedFilesCollectionRef, where("url", "==", fileToDelete.url));
    const querySnapshot = await getDocs(fileQuery);

    if (querySnapshot.empty) {
      // If the file does not exist, add a new document
      await addDoc(deletedFilesCollectionRef, {
        ...fileToDelete,
        deletedAt: new Date() // Add the current date and time as the deletedAt timestamp
      });
    } else {
      // If the file exists, update the deletedAt timestamp
      const fileDocRef = querySnapshot.docs[0].ref;
      await updateDoc(fileDocRef, { deletedAt: new Date() });
    }

    console.log(`File ${fileName} marked as deleted and moved to deletedFiles collection.`);
    return true;
  } catch (error) {
    console.error("Error deleting file: ", error);
    return null;
  }
};

export const getDeletedFiles = async () => {
  try {
    // Get the currently authenticated user
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      throw new Error("No user is currently authenticated.");
    }

    const userId = user.uid;
    const userDocRef = doc(db, "users", userId);
    const deletedFilesCollectionRef = collection(userDocRef, "deletedFiles");

    // Query to get all documents in the deletedFiles collection
    const deletedFilesQuery = query(deletedFilesCollectionRef);
    const querySnapshot = await getDocs(deletedFilesQuery);

    const deletedFiles = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("Deleted files retrieved successfully.");
    return deletedFiles;
  } catch (error) {
    console.error("Error retrieving deleted files: ", error);
    return [];
  }
};

export const restoreFile = async (fileId) => {
  try {
    // Get the currently authenticated user
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      throw new Error("No user is currently authenticated.");
    }

    const userId = user.uid;
    const userDocRef = doc(db, "users", userId);
    const deletedFilesCollectionRef = collection(userDocRef, "deletedFiles");
    const deletedFileDocRef = doc(deletedFilesCollectionRef, fileId);

    // Get the deleted file's data
    const deletedFileDoc = await getDoc(deletedFileDocRef);
    if (!deletedFileDoc.exists()) {
      throw new Error("File not found in deletedFiles collection");
    }

    const fileData = deletedFileDoc.data();
    const folderName = fileData.folder;
    const foldersCollectionRef = collection(userDocRef, "Folders");
    const folderDocRef = doc(foldersCollectionRef, folderName);

    // Restore the file to the appropriate folder
    await setDoc(folderDocRef, {
      Files: arrayUnion(fileData)
    }, { merge: true });

    // Remove the file from the deletedFiles collection
    await deleteDoc(deletedFileDocRef);

    console.log(`File ${fileData.name} restored successfully.`);
  } catch (error) {
    console.error("Error restoring file: ", error);
  }
};

export const starFile = async (fileInfo) => {
  try {
    // Get the currently authenticated user
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      throw new Error("No user is currently authenticated.");
    }

    // Reference to the user's recentFiles collection
    const userDocRef = doc(db, "users", user.uid);
    const staredFilesCollection = collection(userDocRef, "staredFiles");

    // Query to check if the file already exists in the collection
    const fileQuery = query(staredFilesCollection, where("url", "==", fileInfo.url));
    const querySnapshot = await getDocs(fileQuery);

    if (querySnapshot.empty) {
      // If the file does not exist, add a new document
      await addDoc(staredFilesCollection, {
        ...fileInfo,
        openedAt: new Date() // Add the current date and time as the openedAt timestamp
      });
    } else {
      // If the file exists, update the openedAt timestamp
      const fileDocRef = querySnapshot.docs[0].ref;
      await updateDoc(fileDocRef, {
        openedAt: new Date() // Update the openedAt timestamp
      });
    }

    console.log("File info added or updated successfully in recentFiles collection.");
  } catch (error) {
    console.error("Error adding or updating file info: ", error);
  }
};

export const getStaredFiles = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      throw new Error("No user is currently authenticated.");
    }

    const userDocRef = doc(db, "users", user.uid);
    const staredFilesCollectionRef = collection(userDocRef, "staredFiles");

    // Query to get recent files ordered by the 'openedAt' field, limiting to the last 10
    const staredFilesQuery = query(staredFilesCollectionRef, orderBy("openedAt", "desc"), limit(10));

    const querySnapshot = await getDocs(staredFilesQuery);

    const recentFiles = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return recentFiles;
  } catch (error) {
    console.error("Error getting recent files: ", error);
    return [];
  }
};

export const unStar = async (fileName) => {
  try {
    // Get the currently authenticated user
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      throw new Error("No user is currently authenticated.");
    }

    const db = getFirestore();
    const userId = user.uid;
    const userDocRef = doc(db, "users", userId);
    const staredFilesCollectionRef = collection(userDocRef, "staredFiles");

    // Query the collection to find the document with the matching fileName
    const q = query(staredFilesCollectionRef, where("name", "==", fileName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`File with name ${fileName} does not exist in staredFiles.`);
      return null;
    }

    // Delete the found document
    const deletePromises = querySnapshot.docs.map(docSnapshot => deleteDoc(docSnapshot.ref));
    await Promise.all(deletePromises);

    console.log(`File with name ${fileName} deleted from the staredFiles collection.`);
    return true;
  } catch (error) {
    console.error("Error deleting file from staredFiles: ", error);
    return null;
  }
};