import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnCampaigns = nextUrl.pathname.startsWith("/dashboard");
      if (isOnCampaigns) {
        if (isLoggedIn) return true;
        
        // Redirect unauthenticated users to login page
        return false; 
      }

      if (isLoggedIn) return Response.redirect(new URL("/campaigns", nextUrl));

      return true;
    },
  },
} satisfies NextAuthConfig;
