// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs91AhT54jujMoYgK6TJgHqefE4-fzSj8",
  authDomain: "mugai-42a93.firebaseapp.com",
  projectId: "mugai-42a93",
  storageBucket: "mugai-42a93.firebasestorage.app",
  messagingSenderId: "761812984367",
  appId: "1:761812984367:web:65f62635e62c8657d21cda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider with additional configuration
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;