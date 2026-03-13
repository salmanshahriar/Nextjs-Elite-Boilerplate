import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { UserRole } from "@/shared/lib/auth/types";

const adminEmails = (process.env.AUTH_ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function getRole(email: string | null | undefined): UserRole {
  if (!email) return "user";
  return adminEmails.includes(email.toLowerCase()) ? "admin" : "user";
}

const hasGoogleCreds =
  Boolean(process.env.GOOGLE_CLIENT_ID) && Boolean(process.env.GOOGLE_CLIENT_SECRET);

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    ...(hasGoogleCreds
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
              },
            },
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        token.role = getRole(user.email);
        token.email = user.email;
        token.id = user.id ?? token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = (token.id ?? token.sub) as string;
        (session.user as { role?: UserRole }).role = (token.role as UserRole) ?? "user";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    id?: string;
  }
}
