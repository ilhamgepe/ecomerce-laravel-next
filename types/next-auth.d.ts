import NextAuth, { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      provider: string;
      type: string;
      providerAccountId?: string;
      access_token: string;
      refresh_token: string;
      expires_at?: number;
      scope?: string;
      token_type?: string;
      id_token?: string;
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }
}
