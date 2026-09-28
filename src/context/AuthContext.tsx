import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { UserProfile } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  savedResourceIds: string[];
  toggleSaveResource: (id: string) => void;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  loginAsDemoAdmin: () => void;
  isDemoAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoAdmin, setIsDemoAdmin] = useState(false);
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mzs_saved_resources');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleSaveResource = (id: string) => {
    setSavedResourceIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('mzs_saved_resources', JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            setUserProfile(snap.data() as UserProfile);
          } else {
            // Check if admin email
            const role = user.email === 'mzsdigitalmastery@gmail.com' ? 'admin' : 'user';
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || user.email?.split('@')[0] || 'User',
              role,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              savedResourceIds: [],
            };
            await setDoc(userDocRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = async (email: string, pass: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (cred.user) {
      await updateProfile(cred.user, { displayName: name });
      const role = email === 'mzsdigitalmastery@gmail.com' ? 'admin' : 'user';
      const newProfile: UserProfile = {
        uid: cred.user.uid,
        email,
        displayName: name,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        savedResourceIds: [],
      };
      await setDoc(doc(db, 'users', cred.user.uid), newProfile);
      setUserProfile(newProfile);
    }
  };

  const signOut = async () => {
    setIsDemoAdmin(false);
    await fbSignOut(auth);
  };

  const loginAsDemoAdmin = () => {
    setIsDemoAdmin(true);
  };

  const isAdmin =
    isDemoAdmin ||
    currentUser?.email === 'mzsdigitalmastery@gmail.com' ||
    userProfile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isAdmin,
        savedResourceIds,
        toggleSaveResource,
        signIn,
        signUp,
        signOut,
        loginAsDemoAdmin,
        isDemoAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
