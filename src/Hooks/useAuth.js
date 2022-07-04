import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../../firebase";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";

const AuthContext = createContext({
  //initial state of the context is empty
});

const config = {
  WebClientId:
    "361515488764-3v4f2gvhhgquipft96l50a6l2i27qcc8.apps.googleusercontent.com",
  androidClientId:
    "361515488764-o32tnt3g579vbb156ic50scmkvhane4l.apps.googleusercontent.com",
  iosClientId:
    "361515488764-1cd5njpvkh0akm0tqt6s97q3k31l0bcj.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

GoogleSignin.configure(config);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();

      await GoogleSignin.signIn().then((userInfo) => {
        const credential = GoogleAuthProvider.credential(
          userInfo.idToken,
          userInfo.accessToken
        );
        signInWithCredential(auth, credential);
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    //this is a listener that cleans up after rerender
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });

  //this woks as a cache, only rerenders when user or loading is changed
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      logout,
      signInWithGoogle,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
