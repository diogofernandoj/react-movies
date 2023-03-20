import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4BII97JopqVIYmtESijzNmYH7F7vjO6w",
  authDomain: "themovies-242f5.firebaseapp.com",
  projectId: "themovies-242f5",
  storageBucket: "themovies-242f5.appspot.com",
  messagingSenderId: "45064801386",
  appId: "1:45064801386:web:568944bdf6275cc3828e13",
  measurementId: "G-0V0EEZ9TDT",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
