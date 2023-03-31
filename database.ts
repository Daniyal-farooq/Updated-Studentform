
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBiaIS3Ty9opUFqItiixIYqpWq8DzDrAEQ",
  authDomain: "studentlist-29fa0.firebaseapp.com",
  projectId: "studentlist-29fa0",
  storageBucket: "studentlist-29fa0.appspot.com",
  messagingSenderId: "385112934520",
  appId: "1:385112934520:web:6c27f003e8c912a7d1858d"
};




const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}