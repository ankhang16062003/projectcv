import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUMlW-Fb9fjsaJ9aXycm_Kfa_d9MdbNXs",
  authDomain: "blogscv-6fcdd.firebaseapp.com",
  projectId: "blogscv-6fcdd",
  storageBucket: "blogscv-6fcdd.appspot.com",
  messagingSenderId: "631734442387",
  appId: "1:631734442387:web:1aa83753a6d0655ef07066",
  measurementId: "G-TYCNJQC7EQ"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
