import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDDgZzZHDZdSp4eBsuuiJU8Wbf5OZJpZgQ",
  authDomain: "mern-ai-eee19.firebaseapp.com",
  projectId: "mern-ai-eee19",
  storageBucket: "mern-ai-eee19.firebasestorage.app",
  messagingSenderId: "838022617785",
  appId: "1:838022617785:web:a69f3771fe471bd7659968",
  measurementId: "G-TPTXC083BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export{auth,provider};