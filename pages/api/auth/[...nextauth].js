import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    redirect: async (url, baseUrl) => {
      if (url === "/") {
        return Promise.resolve("/profile");
      } else {
        return Promise.resolve("/");
      }
    },
    session: async (session, user) => {
      return Promise.resolve({
        id: user.id,
        name: user.name,
        image: user.image,
        createdAt: user.createdAt,
        accessToken: session.accessToken,
      });
    },
  },
  secret: process.env.SECRET,
  adapter: Adapters.Prisma.Adapter({ prisma }),
};

export default (req, res) => NextAuth(req, res, options);
