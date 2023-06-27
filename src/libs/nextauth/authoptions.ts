import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { axios } from "../axios/axios";
import chalk from "chalk";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
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
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { data, status } = await axios.post("/auth/login", {
          email: credentials?.email,
          password: credentials?.password,
        });

        return data;
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token, user, profile, session, trigger }) {
      // console.log(chalk.bgRed("CALLBACK JWT"), {
      //   account,
      //   token,
      //   user,
      //   profile,
      //   session,
      //   trigger,
      // });

      if (user) {
        token.user = { ...user };
      }
      if (account?.provider === "google") {
        // console.log(chalk.bgGreen("google account"), { account });

        token.user = { ...account, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, ...(session.user = token) };
    },
  },
};
