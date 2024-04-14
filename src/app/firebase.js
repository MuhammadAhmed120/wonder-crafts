import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, addDoc, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};

// Initialize Firebase asynchronously
// const initializeFirebase = async () => {
//   if (!firebase.apps.length) {
//     await firebase.initializeApp(firebaseConfig);
//   }
// };

// // Export Firestore and Storage instances asynchronously
// const initializeFirestoreAndStorage = async () => {
//   await initializeFirebase();
//   const firestore = firebase.firestore();
//   const storage = firebase.storage();
//   return { firestore, storage };
// };

// export default initializeFirestoreAndStorage;

const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore and Storage instances
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firestore, storage, ref, uploadBytes, getDownloadURL, collection, doc, addDoc, query, orderBy };

export default firebaseApp;