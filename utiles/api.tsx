import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbvhvDie2eQmePhFIElCnRTmydFlZ824g",
  authDomain: "platform-44eae.firebaseapp.com",
  projectId: "platform-44eae",
  storageBucket: "platform-44eae.appspot.com",
  messagingSenderId: "94516052892",
  appId: "1:94516052892:web:e1d6005f6a60440323fe59",
  measurementId: "G-J8C8BZ2YMY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, collection, storage, auth };
