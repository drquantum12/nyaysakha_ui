import { initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMjjE5sKtmM1NaWAEAZCtvrRV-eimkwPE",
  authDomain: "neurosattva-9a907.firebaseapp.com",
  projectId: "neurosattva-9a907",
  storageBucket: "neurosattva-9a907.firebasestorage.app",
  messagingSenderId: "1032830713659",
  appId: "1:1032830713659:web:b254f8c1a66bb67c8cc11e",
  measurementId: "G-7QL8JNPWD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword};


export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const getFirebaseToken = async () => {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken(); // Get JWT token
  }
  return null;
};


// import { getAnalytics } from "firebase/analytics";
// const analytics = getAnalytics(app);