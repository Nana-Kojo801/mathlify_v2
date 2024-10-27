import { User } from "@/types/types";
import { loginSchema, signupSchema } from "@/validators/validators";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@convex/_generated/api";
import { useConvex, useConvexAuth, useQuery } from "convex/react";
import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

type AuthContextType = {
  user: User | null | undefined;
  signUpUser: (values: z.infer<typeof signupSchema>) => Promise<void>;
  signInUser: (values: z.infer<typeof loginSchema>) => Promise<void>;
  userLoading: boolean;
  authenticated: boolean
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  user: null,
  signUpUser: async () => {},
  signInUser: async () => {},
  userLoading: true,
  authenticated: false
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useQuery(api.user.getCurrentUser)
  const [userLoading, setUserLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const { isLoading } = useConvexAuth();
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const location = useLocation();
  const convex = useConvex();

  useEffect(() => {
    const init = async () => {
      if (isLoading || user === undefined) return;
      console.log(user);
      setAuthenticated(!!user);
      setUserLoading(false);
    };
    init();
  }, [convex, isLoading, user]);

  useEffect(() => {
    if (!userLoading && authenticated && location.pathname.includes("auth")) {
      navigate("/app");
    } else if (!userLoading && !authenticated && location.pathname.includes("app")) {
      navigate("/auth/login");
    }
  }, [location.pathname, userLoading, authenticated, navigate]);

  const signUpUser = async (values: z.infer<typeof signupSchema>) => {
    await signIn("password", { ...values, flow: "signUp" });
  };

  const signInUser = async (values: z.infer<typeof loginSchema>) => {
    await signIn("password", { ...values, flow: "signIn" });
  };

  return (
    <AuthContext.Provider value={{ user, signUpUser, signInUser, userLoading, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
