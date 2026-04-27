export type UserRole = "user" | "admin";
export type AuthAction = "article.publish";
export type AuthPermission =
  | "dashboard.view:user"
  | "dashboard.view:admin"
  | "article.read:any"
  | "article.create:any"
  | "article.update:own"
  | "article.publish:own"
  | "article.publish:any";

export interface OwnableResource {
  ownerId?: string | null;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  permissions: AuthPermission[];
}

export interface AuthContext {
  user: AuthUser | null;
  isLoading: boolean;
  login: (_email: string, _password: string) => Promise<void>;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
  isAuthenticated: boolean;
  isGoogleEnabled: boolean;
  hasPermission: (_permission: AuthPermission) => boolean;
  can: (_action: AuthAction, _resource: OwnableResource) => boolean;
}
