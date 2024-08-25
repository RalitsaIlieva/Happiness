import { useState, useEffect } from 'react';
import {
  getAuth,
  signOut,
  signInWithRedirect,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import {auth} from '../../Firebase';

export const useAuth = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser) setUser(newUser);
    });

    return unsubscribe;
  }, [auth]);

  return {
    user,
    signOut: () => {
      signOut(auth);
    },
  };
};

export const useEnsureAuth = () => {
  const auth = getAuth();
  // const user = auth.currentUser;

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const provider = new GoogleAuthProvider();
  //       // signInWithRedirect(auth, provider);
  //     }
  //   });
  //   return unsubscribe;
  // }, [auth]);
};
