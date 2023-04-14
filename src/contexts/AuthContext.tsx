import { createContext, useEffect, useState } from "react";
import {
  apiCNC,
  recoverUserInformations,
  signInRequest,
} from "../services/cnc";
import { parseCookies, setCookie } from "nookies";
import Router from "next/router";

type SignInData = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "cnc-auth-token": token } = parseCookies();

    if (token) {
      recoverUserInformations().then((respose) => setUser(respose.user));
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { token, expiresIn, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, "cnc-auth-token", token, {
      maxAge: expiresIn - 100,
    });

    apiCNC.defaults.headers["Authorization"] = "Bearer " + token;

    setUser(user);
    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
