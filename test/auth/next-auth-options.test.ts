import type { UserRole } from '@/features/auth/types/types';
import { getPermissionsForRole } from '@/features/auth/utils/authorization';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('nextAuthOptions callbacks', () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.AUTH_ADMIN_EMAILS;
  });

  it('serializes role and permissions into session', async () => {
    process.env.AUTH_ADMIN_EMAILS = 'admin@example.com';
    const { nextAuthOptions } =
      await import('@/features/auth/utils/next-auth-options');
    const jwt = nextAuthOptions.callbacks?.jwt;
    const session = nextAuthOptions.callbacks?.session;

    expect(jwt).toBeDefined();
    expect(session).toBeDefined();

    const token = await jwt!({
      token: { sub: '1' },
      user: { id: '1', email: 'admin@example.com' },
      account: null,
      profile: undefined,
      trigger: 'signIn',
      isNewUser: false,
    });

    const sessionResult = await session!({
      session: { user: { email: 'admin@example.com' }, expires: '2099-01-01' },
      token,
      user: {} as never,
      newSession: undefined,
      trigger: 'update',
    });

    expect((sessionResult.user as { role?: UserRole }).role).toBe('admin');
    expect(
      (sessionResult.user as { permissions?: string[] }).permissions,
    ).toEqual(getPermissionsForRole('admin'));
  });

  it('falls back to role permissions when token permissions are missing', async () => {
    const { nextAuthOptions } =
      await import('@/features/auth/utils/next-auth-options');
    const session = nextAuthOptions.callbacks?.session;

    expect(session).toBeDefined();

    const sessionResult = await session!({
      session: { user: { email: 'user@example.com' }, expires: '2099-01-01' },
      token: { sub: '2', id: '2', role: 'user' },
      user: {} as never,
      newSession: undefined,
      trigger: 'update',
    });

    expect((sessionResult.user as { role?: UserRole }).role).toBe('user');
    expect(
      (sessionResult.user as { permissions?: string[] }).permissions,
    ).toEqual(getPermissionsForRole('user'));
  });
});
