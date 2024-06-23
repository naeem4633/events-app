import React, { createContext, useContext, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  Auth,
  UserCredential,
} from 'firebase/auth';
import axios from 'axios';
import { BACKEND_URL } from 'backendUrl';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTY1GqM5gbtRg-s0rGAhTTE9s79zEdqwo",
  authDomain: "maps-app-frontend.firebaseapp.com",
  projectId: "maps-app-frontend",
  storageBucket: "maps-app-frontend.appspot.com",
  messagingSenderId: "617818561173",
  appId: "1:617818561173:web:8e5d6c7e9fe445d022599c",
  measurementId: "G-1MHMPYQHFM"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase authentication
const firebaseAuth = getAuth(firebaseApp);
const firebaseGoogleAuthProvider = new GoogleAuthProvider();

// Define Firebase context type
type FirebaseContextType = {
  signupUserWithEmailAndPassword: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<Auth | UserCredential>;
  signinWithGoogle: () => Promise<Auth | UserCredential>;
  signinUser: (email: string, password: string) => Promise<Auth | UserCredential>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  getAuth: () => Auth;
  getCurrentUser: () => any;
  authenticateGoogleCalendarIfVendor: () => Promise<void>;
};

// Create Firebase context
const FirebaseContext = createContext<FirebaseContextType | null>(null);

// Custom hook to use Firebase context
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

// Firebase provider component
type FirebaseProviderProps = {
  children: ReactNode;
};

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {

  const signupUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await authenticateGoogleCalendarIfVendor();
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const signinWithGoogle = async (): Promise<UserCredential> => {
    try {
      const result = await signInWithPopup(firebaseAuth, firebaseGoogleAuthProvider);
      await authenticateGoogleCalendarIfVendor();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const signinUser = async (email: string, password: string): Promise<UserCredential> => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      await authenticateGoogleCalendarIfVendor();
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const handleSendPasswordResetEmail = (email: string): Promise<void> => {
    return sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {})
      .catch((error) => {
        throw error;
      });
  };

  const getAuthInstance = () => {
    return firebaseAuth;
  };

  const getCurrentUser = () => {
    return firebaseAuth.currentUser;
  };

  const authenticateGoogleCalendarIfVendor = async () => {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const userEmail = user.email;
    const userId = user.uid;
    const userName = user.displayName;

    try {
      const response = await axios.post(`${BACKEND_URL}vendor/check`, { email: userEmail, firebase_id: userId, name: userName });
      if (response.data.isVendor) {
        const authResponse = await axios.get(`${BACKEND_URL}vendors/${response.data.vendorId}/oauth2callback`);
        if (authResponse.data && authResponse.data.authUrl) {
          window.location.href = authResponse.data.authUrl;
        }
      } else {
        console.log('User is not a vendor');
      }
    } catch (error) {
      console.error('Error checking if user is a vendor:', error);
      throw error;
    }
  };

  const value: FirebaseContextType = {
    signupUserWithEmailAndPassword,
    signinWithGoogle,
    signinUser,
    sendPasswordResetEmail: handleSendPasswordResetEmail,
    getAuth: getAuthInstance,
    getCurrentUser,
    authenticateGoogleCalendarIfVendor,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
