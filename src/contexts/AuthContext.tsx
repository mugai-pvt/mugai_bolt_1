import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  updateProfile,
  AuthError
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { sendLoginData, sendSignupData } from '../utils/webhookService';

interface User {
  id: string;
  email: string;
  name: string;
  provider: 'email' | 'google';
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const convertFirebaseUser = (firebaseUser: FirebaseUser): User => {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
    photoURL: firebaseUser.photoURL || undefined
  };
};

const getFirebaseErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/popup-blocked':
      return 'Popup was blocked. Please allow popups and try again.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    default:
      return error.message || 'An error occurred during authentication.';
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(convertFirebaseUser(firebaseUser));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Check for redirect result on app load
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(convertFirebaseUser(result.user));
        }
      })
      .catch((error) => {
        console.error('Redirect result error:', error);
      });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(convertFirebaseUser(userCredential.user));
      
      // Send login data to webhook (non-blocking)
      sendLoginData(
        userCredential.user.email || email,
        'email',
        userCredential.user.displayName || undefined
      ).catch(error => console.error('Failed to send login data to webhook:', error));
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return { 
        success: false, 
        error: getFirebaseErrorMessage(error as AuthError)
      };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Try popup first, fallback to redirect on mobile
      let result;
      
      try {
        result = await signInWithPopup(auth, googleProvider);
      } catch (popupError) {
        const error = popupError as AuthError;
        
        // If popup fails on mobile, try redirect
        if (error.code === 'auth/popup-blocked' || 
            error.code === 'auth/cancelled-popup-request' ||
            /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
          
          await signInWithRedirect(auth, googleProvider);
          setIsLoading(false);
          return { success: true };
        }
        
        throw error;
      }
      
      setUser(convertFirebaseUser(result.user));
      
      // Send login data to webhook (non-blocking)
      sendLoginData(
        result.user.email || '',
        'google',
        result.user.displayName || undefined
      ).catch(error => console.error('Failed to send login data to webhook:', error));
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Google login error:', error);
      setIsLoading(false);
      return { 
        success: false, 
        error: getFirebaseErrorMessage(error as AuthError)
      };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Refresh the user object to get the updated display name
      const updatedUser = { ...userCredential.user, displayName: name };
      setUser(convertFirebaseUser(updatedUser as FirebaseUser));
      
      // Send signup data to webhook (non-blocking)
      sendSignupData(name, email, 'email').catch(error => 
        console.error('Failed to send signup data to webhook:', error)
      );
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      return { 
        success: false, 
        error: getFirebaseErrorMessage(error as AuthError)
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    signup,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};