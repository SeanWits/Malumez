 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
 import {getStorage} from "firebase/storage";
 //import { getAnalytics } from "firebase/analytics";
 import { getFirestore, doc, getDoc  } from "firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 
 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDgfvNN44LDe_BBKGEpvP-YtRJWviHmkIc",
   authDomain: "sd-project-4dc5f.firebaseapp.com",
   projectId: "sd-project-4dc5f",
   storageBucket: "sd-project-4dc5f.appspot.com",
   messagingSenderId: "1096436439105",
   appId: "1:1096436439105:web:f70bec559a58841c170ec0",
   measurementId: "G-SBMCM2KH63"
 };
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 //const analytics = getAnalytics(app);
 const auth = getAuth(app)
 const db = getFirestore(app);
 const imgDB = getStorage(app);
 export {auth, db, doc, getDoc, imgDB}; 