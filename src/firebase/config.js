// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, RecaptchaVerifier } from "firebase/auth";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBVyJmeZNx8tHcl-ZNU3eMloDeKeoT1Bv4",
  authDomain: "auth-app-bb7e4.firebaseapp.com",
  databaseURL: "https://auth-app-bb7e4.firebaseio.com",
  projectId: "auth-app-bb7e4",
  storageBucket: "auth-app-bb7e4.appspot.com",
  messagingSenderId: "1083130925983",
  appId: "1:1083130925983:web:0351716f265bec0ef2e3aa",
  measurementId: "G-8WNL6YHGV8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app);
export const storage = getStorage(app);

window.recaptchaVerifier = new RecaptchaVerifier('captcha', {
  'size': 'invisible',
  'callback': (_) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
  }
}, auth);


export default app;