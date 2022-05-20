import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type UserType = {
  id: string;
  name: string;
  avatar: string;
  email: string | null;
};

type AuthContextType = {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, email, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          email: email,
        });
      }
    });

    // desligar o listening
    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    const result = await auth.signInWithPopup(provider);

    if (!result.user) {
      throw new Error("Failed Google authentication.");
    }

    const { displayName, photoURL, email, uid } = result.user;

    if (!displayName || !photoURL) {
      throw new Error("Missing information from Google Account.");
    }

    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL,
      email: email,
    });
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
