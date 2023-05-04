import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { firebaseAuth } from "@api/Firebase";

export type AuthType = [boolean, User | null];

export const AuthContext = createContext<AuthType>([true, null]);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(firebaseAuthConnect, async (user) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) setUser(null);
      else {
        setUser(user);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={[loading, user]}>{children}</AuthContext.Provider>;
};
