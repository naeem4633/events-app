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
  const signupUserWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Automatically sign in the user after sign-up
        return signInWithEmailAndPassword(firebaseAuth, email, password)
          .then((signInUserCredential) => {
            console.log('User signed in:', signInUserCredential);
            return signInUserCredential;
          })
          .catch((signInError) => {
            console.error('Error signing in after sign-up:', signInError);
            throw signInError;
          });
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        throw error;
      });
  };

  const signinWithGoogle = (): Promise<UserCredential> => {
    return signInWithPopup(firebaseAuth, firebaseGoogleAuthProvider)
      .then((result) => {
        console.log(result);
        return result; // Return the full UserCredential object
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
        throw error;
      });
  };

  const signinUser = (email: string, password: string): Promise<UserCredential> => {
    console.log("sign in function called");
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        console.log("sign in successful");
        return userCredential;
      })
      .catch((error) => {
        console.error('Error signing in with email and password:', error);
        throw error;
      });
  };

  const handleSendPasswordResetEmail = (email: string): Promise<void> => {
    return sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        console.log('Password reset email sent');
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error);
        throw error;
      });
  };

  const getAuthInstance = () => {
    return firebaseAuth;
  };

  const getCurrentUser = () => {
    return firebaseAuth.currentUser;
  };

  const value: FirebaseContextType = {
    signupUserWithEmailAndPassword,
    signinWithGoogle,
    signinUser,
    sendPasswordResetEmail: handleSendPasswordResetEmail,
    getAuth: getAuthInstance,
    getCurrentUser,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
