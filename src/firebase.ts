import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-uaeR9mwwvNDyBfmho3HC4b0jDd1hDJ8",
  authDomain: "zakari-game-store.firebaseapp.com",
  projectId: "zakari-game-store",
  storageBucket: "zakari-game-store.firebasestorage.app",
  messagingSenderId: "361026229974",
  appId: "1:361026229974:web:602410bcee255d56a05b77",
  measurementId: "G-G3WHLPWSBF"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
// ✅ Set OTP SMS language to user's device/browser language
auth.useDeviceLanguage();
export { auth };