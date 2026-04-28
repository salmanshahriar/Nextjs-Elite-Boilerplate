'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import type React from 'react';

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
