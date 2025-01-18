import { auth } from "@/firebase/firebase.init";
import useAxios from "@/hooks/useAxios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
export const authContext = createContext(null);
const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  
  const [axiosSecure] = useAxios();
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (username, photo) => {
    updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: photo,
    });
  };

  const google = () => {
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
      if (currentUser) {
        axiosSecure
          .post("/jwt", {
            username: currentUser?.displayName,
            email: currentUser?.email,
          })
          .then((res) => localStorage.setItem("token", res?.data));
      }
    });
    return () => unsubscribe();
  }, [axiosSecure]);
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("token");
  };

  const authInfo = {
    signup,
    google,
    user,
    setUser,
    updateUser,
    login,
    logout,
    loader,
    setLoader,
  };

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
