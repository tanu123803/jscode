// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAR7GecKblrho6S1QUQ9bAGaBVwtlRgrTI",
  authDomain: "swiggyauth-ea030.firebaseapp.com",
  projectId: "swiggyauth-ea030",
  storageBucket: "swiggyauth-ea030.firebasestorage.app",
  messagingSenderId: "390094501271",
  appId: "1:390094501271:web:58f26410b6b0bf5e5b00d2",
  measurementId: "G-ZH0GXSYB5W"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{auth}