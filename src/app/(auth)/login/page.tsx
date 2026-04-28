'use client';

import { HeadManager } from '@/components/common/head-manager';
import TextLink from '@/components/common/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { useAuth } from '@/features/auth/hooks/auth-context';
import { getTranslations } from '@/features/i18n/config/get-translations';
import { useLanguage } from '@/features/i18n/hooks/language-context';
import { useTranslations } from '@/features/i18n/hooks/use-translations';
import { Check, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const { login, user, isLoading, signInWithGoogle, isGoogleEnabled } =
    useAuth();
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (
    text: string,
    itemId: string,
  ): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const canResetPassword = true;

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    if (!email || !password) {
      setError(t('auth.login.fillAllFields'));
      setIsLoggingIn(false);
      return;
    }

    try {
      await login(email, password);
    } catch {
      setError(t('auth.login.invalidCredentials'));
      setPassword('');
      setIsLoggingIn(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        <div>{t('common.loading')}</div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <>
      <HeadManager
        title={`${t('navigation.login')} | ${t('common.appName')}`}
      />
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t('auth.login.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-4 sm:gap-6"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 sm:gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t('auth.login.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                  <InputError message={error && !password ? error : ''} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">{t('auth.login.password')}</Label>
                  <PasswordInput
                    id="password"
                    required
                    tabIndex={2}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('auth.login.passwordPlaceholder')}
                  />
                  <InputError message={error && password ? error : ''} />
                </div>

                {canResetPassword && (
                  <TextLink
                    href="/password-reset"
                    className="ml-auto text-xs text-primary sm:text-sm"
                    tabIndex={4}
                  >
                    {t('auth.login.forgotPassword')}
                  </TextLink>
                )}

                <Button type="submit" tabIndex={3} disabled={isLoggingIn}>
                  {t('auth.login.submit')}
                </Button>

                {isGoogleEnabled && (
                  <>
                    <div className="relative my-2">
                      <span className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </span>
                      <span className="relative flex justify-center text-xs text-muted-foreground uppercase">
                        {t('auth.login.orContinueWith')}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => signInWithGoogle()}
                      disabled={isLoggingIn}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      {t('auth.login.signInWithGoogle')}
                    </Button>
                  </>
                )}
              </div>
            </form>

            <div className="mt-4 max-w-md space-y-2 rounded-lg bg-muted p-4">
              <p className="text-sm font-medium">Test Credentials:</p>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex items-center justify-around">
                    <p className="font-semibold">Admin:</p>
                    <div className="flex items-center">
                      <span className="text-muted-foreground">Email:</span>
                      <code className="ml-1 rounded border bg-background px-2 py-0.5">
                        admin@test.com
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard('admin@test.com', 'admin-email')
                        }
                        className="ml-2 rounded p-1 transition-colors hover:bg-accent"
                        title="Copy to clipboard"
                      >
                        {copiedItem === 'admin-email' ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                    <div className="mt-1 flex items-center">
                      <span className="text-muted-foreground">Pass:</span>
                      <code className="ml-1 rounded border bg-background px-2 py-0.5">
                        12345
                      </code>
                      <button
                        onClick={() => copyToClipboard('12345', 'admin-pass')}
                        className="ml-2 rounded p-1 transition-colors hover:bg-accent"
                        title="Copy to clipboard"
                      >
                        {copiedItem === 'admin-pass' ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-around">
                    <p className="font-semibold">User:</p>
                    <div className="flex items-center">
                      <span className="text-muted-foreground">Email:</span>
                      <code className="ml-1 rounded border bg-background px-2 py-0.5">
                        user@test.com
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard('user@test.com', 'user-email')
                        }
                        className="ml-2 rounded p-1 transition-colors hover:bg-accent"
                        title="Copy to clipboard"
                      >
                        {copiedItem === 'user-email' ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                    <div className="mt-1 flex items-center">
                      <span className="text-muted-foreground">Pass:</span>
                      <code className="ml-1 rounded border bg-background px-2 py-0.5">
                        12345
                      </code>
                      <button
                        onClick={() => copyToClipboard('12345', 'user-pass')}
                        className="ml-2 rounded p-1 transition-colors hover:bg-accent"
                        title="Copy to clipboard"
                      >
                        {copiedItem === 'user-pass' ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
