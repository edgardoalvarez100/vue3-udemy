import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSEd90ywB8JMxJICQFCfSw3Q02d5nYkHo",
  authDomain: "vue3-udemy-bluuweb.firebaseapp.com",
  projectId: "vue3-udemy-bluuweb",
  storageBucket: "vue3-udemy-bluuweb.appspot.com",
  messagingSenderId: "131727662736",
  appId: "1:131727662736:web:1dd36cf730927520000215",
};
initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };
