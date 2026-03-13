export type UserRole = "user" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthContext {
  user: AuthUser | null;
  isLoading: boolean;
  login: (_email: string, _password: string) => Promise<void>;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
  isAuthenticated: boolean;
  isGoogleEnabled: boolean;
}
