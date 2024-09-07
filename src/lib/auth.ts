import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials || !credentials.username || !credentials.password) {
            throw new Error("Please provide both username and password.");
          }

          const username = credentials.username as string;
          let user: any = await db.users.findUnique({
            where: {
              user_name: username,
            },
          });

          if (!user) {
            throw new Error("User not found.");
          }

          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.password as string
          );

          if (!isMatch) {
            throw new Error("Incorrect password.");
          }
          return user;
        } catch (err: any) {
          throw new Error(
            err.message || "Something went wrong during authentication."
          );
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.u_id.toString();
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          u_id: token._id as string,
          first_name: token.first_name as string,
          last_name: token.last_name as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
};
