import { Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

interface SessionParams {
  session: Session;
  user: User | AdapterUser;
  token: JWT;
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],

  callbacks: {
    session({ session, user, token }: SessionParams) {
      return {
        ...session,
        id: token.sub as string,
      };
    },
  },
});

// export default NextAuth(authOptions);
