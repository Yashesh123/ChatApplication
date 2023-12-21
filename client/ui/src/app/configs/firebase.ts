// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVpLXIIp4DZ5iImdxPiaVKqgCuaKFzrf8",
  authDomain: "hichat-9e69e.firebaseapp.com",
  projectId: "hichat-9e69e",
  storageBucket: "hichat-9e69e.appspot.com",
  messagingSenderId: "300111139968",
  appId: "1:300111139968:web:fb36901370d40b51fe8265",
  measurementId: "G-TT4QJJG5FQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);