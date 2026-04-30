import { env } from '@/libs/env';
import { betterAuth } from 'better-auth';

if (
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PHASE !== 'phase-production-build' &&
  env.BETTER_AUTH_SECRET.startsWith('PLEASE_SET_')
) {
  console.warn(
    [
      '[auth] Missing BETTER_AUTH_SECRET.',
      'Set a 32+ char secret in your environment variables to secure sessions.',
    ].join(' '),
  );
}

const allowlistedHosts = (() => {
  const hosts = new Set<string>(['localhost:*', '*.vercel.app']);

  for (const value of [env.BETTER_AUTH_URL, env.NEXT_PUBLIC_APP_URL]) {
    if (!value) continue;
    if (URL.canParse(value)) hosts.add(new URL(value).host);
  }

  return Array.from(hosts);
})();

const socialProviders =
  env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
      }
    : undefined;

export const auth = betterAuth({
  baseURL: {
    allowedHosts: allowlistedHosts,
    protocol: 'auto',
    fallback: env.BETTER_AUTH_URL,
  },
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders,
});
