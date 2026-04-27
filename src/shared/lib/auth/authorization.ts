import type {
  AuthAction,
  AuthPermission,
  OwnableResource,
  UserRole,
} from "@/shared/lib/auth/types";

const rolePermissions: Record<UserRole, AuthPermission[]> = {
  user: ["dashboard.view:user", "article.read:any", "article.create:any", "article.update:own"],
  admin: [
    "dashboard.view:user",
    "dashboard.view:admin",
    "article.read:any",
    "article.create:any",
    "article.update:own",
    "article.publish:own",
    "article.publish:any",
  ],
};

export function getPermissionsForRole(role: UserRole): AuthPermission[] {
  return [...rolePermissions[role]];
}

export function hasPermission(
  permissions: readonly AuthPermission[] | undefined,
  permission: AuthPermission
): boolean {
  if (!permissions) return false;
  return permissions.includes(permission);
}

export function canPublishArticle(
  userId: string | undefined,
  permissions: readonly AuthPermission[] | undefined,
  resource: OwnableResource
): boolean {
  if (hasPermission(permissions, "article.publish:any")) return true;
  if (!hasPermission(permissions, "article.publish:own")) return false;
  if (!userId || !resource.ownerId) return false;
  return userId === resource.ownerId;
}

export function can(
  userId: string | undefined,
  permissions: readonly AuthPermission[] | undefined,
  action: AuthAction,
  resource: OwnableResource
): boolean {
  if (action === "article.publish") {
    return canPublishArticle(userId, permissions, resource);
  }
  return false;
}
