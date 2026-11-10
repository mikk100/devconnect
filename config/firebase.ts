import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "f8efc94aaa643e06e7c71fd38e81c14837f45a71",
  authDomain: "devconnect-2-c14c2.firebaseapp.com",
  projectId: "devconnect-2-c14c2",
  storageBucket: "devconnect-2-c14c2.firebasestorage.app",
  messagingSenderId: "554878952998",
  appId: "1:554878952998:web:26f258ac1a07cb363a68e7"
};

const app = initializeApp(firebaseConfig);

// Export Firestore database instance to use across your app
export const db = getFirestore(app);