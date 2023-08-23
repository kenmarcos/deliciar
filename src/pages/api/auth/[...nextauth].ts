import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session({ session, user, token }) {
      return {
        ...session,
        id: token.sub,
      };
    },
  },
});
