import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./services/firebase";

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

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<UserType>();

  async function signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    const result = await signInWithPopup(auth, provider);

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
    <div>
      <BrowserRouter>
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms/new" element={<NewRoom />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
