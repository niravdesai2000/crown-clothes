import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmrnZqQKqMyc6In4F700cZGPSherBl9t4",
  authDomain: "crwn-clothing-db-c162b.firebaseapp.com",
  projectId: "crwn-clothing-db-c162b",
  storageBucket: "crwn-clothing-db-c162b.appspot.com",
  messagingSenderId: "230482284866",
  appId: "1:230482284866:web:d42de0197c0672b39cb8db",
  measurementId: "G-GFEKEYL1W3",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const googleSignInWithPopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "user", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocRef;
};
