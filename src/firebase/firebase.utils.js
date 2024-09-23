import { initializeApp } from 'firebase/app'; 
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBPOp9uhmyplZfsjn-gS5os66D60YTus5g",
    authDomain: "style-market-b8427.firebaseapp.com",
    projectId: "style-market-b8427",
    storageBucket: "style-market-b8427.appspot.com",
    messagingSenderId: "523215611646",
    appId: "1:523215611646:web:9aa5dd20d86e7be608a7af",
    measurementId: "G-Y94YC7JTDD"
};

// Initialize Firebase
const firebaseApp = initializeApp(config);

// Initialize services
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

// Ensure this function is also exported
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(firestore, `users/${userAuth.uid}`);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Export the createUserWithEmailAndPassword function
export { createUserWithEmailAndPassword };
