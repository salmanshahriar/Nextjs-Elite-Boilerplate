"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import type { AuthUser, AuthContext as AuthContextType } from "@/shared/lib/auth/types";
import LoadingScreen from "@/shared/components/common/loading-screen";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ADMIN = { email: "admin@test.com", password: "12345" };
const DEMO_USER = { email: "user@test.com", password: "12345" };

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("user");
  if (stored) {
    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  }
  return null;
}

function sessionToAuthUser(
  id: string | undefined,
  email: string | null | undefined,
  role: "admin" | "user" | undefined
): AuthUser {
  return {
    id: id ?? `user-${Date.now()}`,
    email: email ?? "",
    role: role ?? "user",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [demoUser, setDemoUser] = useState<AuthUser | null>(getStoredUser);
  const router = useRouter();

  const userFromSession =
    status === "authenticated" && session?.user
      ? sessionToAuthUser(
          (session.user as { id?: string }).id ?? session.user.email ?? undefined,
          session.user.email ?? undefined,
          (session.user as { role?: "admin" | "user" }).role
        )
      : null;

  const user = userFromSession ?? demoUser;
  const isLoading = status === "loading";

  const login = useCallback(async (email: string, password: string) => {
    let role: "admin" | "user" | null = null;
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      role = "admin";
    } else if (email === DEMO_USER.email && password === DEMO_USER.password) {
      role = "user";
    } else {
      throw new Error("Invalid credentials");
    }
    const mockUser: AuthUser = {
      id: "user-" + Date.now(),
      email,
      role,
    };
    setDemoUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setDemoUser(null);
    localStorage.removeItem("user");
    if (status === "authenticated") {
      signOut({ redirect: false }).then(() => router.push("/auth/login"));
    } else {
      router.push("/auth/login");
    }
  }, [status, router]);

  const signInWithGoogle = useCallback(async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  }, []);

  const isGoogleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: false,
        login,
        logout,
        signInWithGoogle,
        isAuthenticated: !!user,
        isGoogleEnabled,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
