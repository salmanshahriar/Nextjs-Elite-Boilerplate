"use client";

import { usePathname } from "next/navigation";
import Header from "@/shared/layout/header";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const pathname = usePathname();

  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname?.startsWith(route));

  const showHeader = !isProtectedRoute;

  return (
    <>
      {showHeader && <Header />}
      <div className="min-h-screen transition-all duration-300 ease-in-out">{children}</div>
    </>
  );
};

export default ClientLayout;
