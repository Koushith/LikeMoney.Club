// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB0ehICjTRAuFwXIMJlY0YrGTBTtvUDN2M',
  authDomain: 'likemoney-52999.firebaseapp.com',
  projectId: 'likemoney-52999',
  storageBucket: 'likemoney-52999.firebasestorage.app',
  messagingSenderId: '765405611051',
  appId: '1:765405611051:web:a269d4119eb2a2fa42166e',
  measurementId: 'G-54N20LWDJR',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence);
