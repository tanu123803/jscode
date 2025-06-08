
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSOPwq5R6DxS3uHTN5xPJtPVbw2LmTFks",
  authDomain: "swiggyauth-12906.firebaseapp.com",
  projectId: "swiggyauth-12906",
  storageBucket: "swiggyauth-12906.firebasestorage.app",
  messagingSenderId: "1087435531948",
  appId: "1:1087435531948:web:4bf51d73b42ed59d0f6109",
  measurementId: "G-PE5G0LWZ1Y"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{auth}