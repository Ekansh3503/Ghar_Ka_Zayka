import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBLZGar5YZywIoHyWPzYmt4Jd06XzauDck",
  authDomain: "gahre-ka-zayka-login.firebaseapp.com",
  projectId: "gahre-ka-zayka-login",
  storageBucket: "gahre-ka-zayka-login.appspot.com",
  messagingSenderId: "694597450702",
  appId: "1:694597450702:web:39415a2fbf45bc9942499f",
  measurementId: "G-D99DJ0LHLG",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export {
  app,
  auth,
  db,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};
