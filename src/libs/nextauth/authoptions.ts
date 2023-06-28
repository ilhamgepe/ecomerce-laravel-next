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
  secret: process.env.NEXTAUTH_SECRET,
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
      // @ts-ignore
      async authorize(credentials, req) {
        const { data, status } = await axios.post("/auth/login", {
          email: credentials?.email,
          password: credentials?.password,
        });
        const user = {
          token: data.token,
          refresh_token: data.refresh_token,
          name: data.user.name,
          email: data.user.email,
          email_verified_at: data.user.email_verified_at,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at,
        };

        return user;
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
        token.user = { ...account, ...user };
      }
      if (account?.provider === "google") {
        // console.log(chalk.bgGreen("google account"), { account });

        token.user = { ...account, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
};
