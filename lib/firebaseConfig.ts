import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEMz6AcxT_o8lBUzBJ_oVpp4OeboqMQoo",
  authDomain: "designfe-ee10d.firebaseapp.com",
  databaseURL: "https://designfe-ee10d-default-rtdb.firebaseio.com",
  projectId: "designfe-ee10d",
  storageBucket: "designfe-ee10d.appspot.com",
  messagingSenderId: "1045711832499",
  appId: "1:1045711832499:web:b78a36acb990fd030e77c6",
  measurementId: "G-G0L53FQ3PV"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth };
