import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig  = {
    apiKey: "AIzaSyCPkICyHfLJImSZCXyQIp6YEUoES4iZxxs",
    authDomain: "style-market-bfd73.firebaseapp.com",
    projectId: "style-market-bfd73",
    storageBucket: "style-market-bfd73.appspot.com",
    messagingSenderId: "702737953274",
    appId: "1:702737953274:web:98661350c8f8b65120b443",
    measurementId: "G-EN8STVDDFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig );

// Initialize Auth and Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;
