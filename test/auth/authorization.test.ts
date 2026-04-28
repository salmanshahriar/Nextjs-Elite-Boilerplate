import {
  can,
  canPublishArticle,
  getPermissionsForRole,
  hasPermission,
} from '@/features/auth/utils/authorization';
import { describe, expect, it } from 'vitest';

describe('authorization', () => {
  it('resolves permissions for admin role', () => {
    const permissions = getPermissionsForRole('admin');

    expect(permissions).toContain('dashboard.view:admin');
    expect(permissions).toContain('article.publish:any');
  });

  it('denies publish:any for non-admin role', () => {
    const permissions = getPermissionsForRole('user');

    expect(hasPermission(permissions, 'article.publish:any')).toBe(false);
  });

  it('allows publish:own only for owned resources', () => {
    const ownPermissions = ['article.publish:own'] as const;

    expect(
      canPublishArticle('user-1', ownPermissions, { ownerId: 'user-1' }),
    ).toBe(true);
    expect(
      canPublishArticle('user-1', ownPermissions, { ownerId: 'user-2' }),
    ).toBe(false);
  });

  it('supports can helper for article.publish action', () => {
    const ownPermissions = ['article.publish:own'] as const;
    const anyPermissions = ['article.publish:any'] as const;

    expect(
      can('user-1', ownPermissions, 'article.publish', { ownerId: 'user-1' }),
    ).toBe(true);
    expect(
      can('user-1', ownPermissions, 'article.publish', { ownerId: 'user-2' }),
    ).toBe(false);
    expect(
      can('user-1', anyPermissions, 'article.publish', { ownerId: 'user-2' }),
    ).toBe(true);
  });
});
