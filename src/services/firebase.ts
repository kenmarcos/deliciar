// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7QPa_d5wcSxUL0ILy7NzMI_FW5hNEfPc",
  authDomain: "deliciar-c4091.firebaseapp.com",
  projectId: "deliciar-c4091",
  storageBucket: "deliciar-c4091.appspot.com",
  messagingSenderId: "370919093584",
  appId: "1:370919093584:web:73574b176a3298d3302855",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Create an object instance of Google provider
const provider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { auth, provider, db, storage };
