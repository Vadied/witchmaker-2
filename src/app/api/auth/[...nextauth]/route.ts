import NextAuth, { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { User } from "@/schemas/User";

import connect from "@/lib/database";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user._id = sessionUser?._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connect();

        const useExists = await User.findOne({ email: profile?.email || "" });
        if (!useExists)
          await User.create({
            email: profile?.email || "",
            username: profile?.name?.replace(" ", "").toLowerCase() || "",
            roles: ["user"],
          });

        return true;
      } catch (error: any) {
        console.log("error", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
