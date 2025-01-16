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
export const authContext = createContext(null);
const [axiosSecure] = useAxios();
const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();

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
      axiosSecure
        .post("/jwt", {
          username: currentUser?.displayName,
          email: currentUser?.email,
        })
        .then((res) => localStorage.setItem("token", res?.data));
    });
    return () => unsubscribe();
  }, []);
  const logout = () => {
    signOut(auth);
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
    setLoader
  };

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
