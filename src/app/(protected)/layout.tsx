"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/lib/auth/auth-context";
import { Sidebar } from "@/shared/layout/sidebar";

const ProtectedLayout = ({
  children,
  user,
  admin,
}: {
  children: React.ReactNode;
  user: React.ReactNode;
  admin: React.ReactNode;
}) => {
  const { user: currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace("/auth/login");
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  const canViewAdminDashboard = currentUser?.permissions.includes("dashboard.view:admin") ?? false;
  const canViewUserDashboard = currentUser?.permissions.includes("dashboard.view:user") ?? false;
  const content = canViewAdminDashboard ? admin : canViewUserDashboard ? user : children;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{content}</div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
