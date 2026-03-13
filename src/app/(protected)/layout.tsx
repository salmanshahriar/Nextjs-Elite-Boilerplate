"use client";

import type React from "react";
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

  const content = currentUser?.role === "admin" ? admin : user;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{content || children}</div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
