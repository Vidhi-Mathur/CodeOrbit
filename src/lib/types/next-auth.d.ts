import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            isOnboarded: boolean;
            username?: string;
        } & DefaultSession["user"];
    }
    interface User extends DefaultUser {
        isOnboarded: boolean;
        username?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        isOnboarded: boolean;
        username?: string;
    }
}
