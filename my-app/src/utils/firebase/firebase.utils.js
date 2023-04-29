import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut
} from "firebase/auth";
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch} from "firebase/firestore";

// 1. Create firebase web-app
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

//2. create auth and provider
export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

// 3. create a function and pass (auth,provider) as parameter and call function on sign-in page
export const googleSignInWithPopup = () => signInWithPopup(auth, provider);
export const googleRedirectSignInWithPopup = () =>
    signInWithRedirect(auth, provider);

// 5. create db
export const db = getFirestore();

// 6. as a receive userAuth argument and check userExists or not , create database on fireStore
export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation
) => {
    if (!userAuth) return;
    const userDocRef = doc(db, "user", userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);
    if (!userSnapShot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return userSnapShot;
};

// 7. create new function for user createUserWithEmailAndPassword
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

// 9. create new function for user signWithUserWithEmailAndPassword
export const signAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback) => {
    return onAuthStateChanged(auth, callback);
}

// convert json to firebase data base
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach(objects => {
        const docRef = doc(collectionRef, objects.title.toLowerCase());
        batch.set(docRef, objects);
    })
    await batch.commit();
}

// get categories from firebase data base
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapShot) => {
        const {title, items} = docSnapShot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;
}

export const getCurrentUser = () => {
    return new Promise((resolve,reject)=>{
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}