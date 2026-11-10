import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  }),

  pages: {
    signIn: "/signin",
  },

  secret: process.env.AUTH_SECRET,
});