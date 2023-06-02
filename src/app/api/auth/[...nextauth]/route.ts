import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {Adapter} from "next-auth/adapters";

import {prisma} from "@/server/db";
import {comparePassword} from "@/server/utils";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const foundUser = await prisma.user.findFirst({
          where: {
            username: credentials?.username || "",
          },
        });

        if (!foundUser) return null;

        const isPasswordValid = await comparePassword(
          credentials?.password || "",
          foundUser.password,
        );

        if (!isPasswordValid) return null;

        return {
          id: foundUser.id,
          username: foundUser.username,
        };
      },
    }),
  ],
});

export {handler as GET, handler as POST};
