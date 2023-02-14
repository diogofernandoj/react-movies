import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs_Ws6tkk_CxKAcVCiy5bAvdBagohedDY",
  authDomain: "themovies-727de.firebaseapp.com",
  projectId: "themovies-727de",
  storageBucket: "themovies-727de.appspot.com",
  messagingSenderId: "783173010182",
  appId: "1:783173010182:web:1ad6f89888ec95b4bdd487",
  measurementId: "G-XZ1GSBWXVG",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
