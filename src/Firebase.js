import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyC_1glnBDGl6RGsnGx05s_-4h85j9ajamw",
  authDomain: "rangbaazi-eec6b.firebaseapp.com",
  projectId: "rangbaazi-eec6b",
  storageBucket: "rangbaazi-eec6b.appspot.com",
  messagingSenderId: "714469376774",
  appId: "1:714469376774:web:5099952cfed2654b7d1487"
};
const app = initializeApp(firebaseConfig);
const imgdb=getStorage(app);
export {imgdb,app}