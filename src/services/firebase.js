import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDoNCscYWRue57MSCbyIFKWwCoSXF7zbtQ",
    authDomain: "etask-9e2d4.firebaseapp.com",
    projectId: "etask-9e2d4",
    storageBucket: "etask-9e2d4.appspot.com",
    messagingSenderId: "130906473845",
    appId: "1:130906473845:web:7563e65692a2ea139bff3c",
    measurementId: "G-BQ4RJ3PV5Y"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider};