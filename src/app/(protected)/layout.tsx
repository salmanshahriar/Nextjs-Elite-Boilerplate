'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { useAuth } from '@/features/auth/hooks/auth-context';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect } from 'react';

const ProtectedLayout = ({
  children,
  user,
  admin,
}: {
  children: React.ReactNode;
  user: React.ReactNode;
  admin: React.ReactNode;
}) => {
  const { user: currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.replace('/auth/login');
    }
  }, [currentUser, isLoading, router]);

  if (isLoading || !currentUser) return null;

  const canViewAdminDashboard =
    currentUser?.permissions.includes('dashboard.view:admin') ?? false;
  const canViewUserDashboard =
    currentUser?.permissions.includes('dashboard.view:user') ?? false;
  const content = canViewAdminDashboard
    ? admin
    : canViewUserDashboard
      ? user
      : children;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {content}
        </div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
