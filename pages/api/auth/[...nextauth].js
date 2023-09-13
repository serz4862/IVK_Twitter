import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google" // I have used the google authentication or I could have used the github provider too.
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb"

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [ // google authentication from the next-auth.
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({token,session}) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);