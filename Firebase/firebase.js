import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyBy2-3wv9N70bMUIwH4FDOogYHq3njA0aw",
  authDomain: "travel-home-e4692.firebaseapp.com",
  databaseURL: "gs://travel-home-e4692.appspot.com",
  projectId: "travel-home-e4692",
  storageBucket: "travel-home-e4692.appspot.com",
  messagingSenderId: "996037536618",
  appId: "1:996037536618:web:b34dcfb8c83e1182119313",
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;
