'use client';

import { SessionProvider } from '@/components/providers/session-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AuthProvider } from '@/features/auth/hooks/auth-context';
import { LanguageProvider } from '@/features/i18n/hooks/language-context';
import type React from 'react';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system">
      <SessionProvider>
        <AuthProvider>
          <LanguageProvider>
            {children}
            <Toaster richColors />
          </LanguageProvider>
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
