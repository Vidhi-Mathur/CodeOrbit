import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./lib/models/User";
import connectToDB from "./lib/connect";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "Enter your name" },
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" },
            },
            async authorize(credentials) {
                await connectToDB();
                if(!credentials){
                    throw new Error("Missing credentials");
                }
                const { name, email, password } = credentials;
                const existingUser = await User.findOne({ email });
                if(existingUser){
                    if(existingUser.authProvider !== "credentials"){
                        throw new Error(`Please login using ${existingUser.authProvider}`);
                    }
                    const dbPassword = await bcrypt.compare(password, existingUser.password);
                    if(!dbPassword){
                        throw new Error("Invalid credentials");
                    }
                    return existingUser;
                }
                if(!name || !email || !password){
                    throw new Error("Please provide name, email and password");
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    authProvider: "credentials",
                    isOnboarded: false,
                })
                return newUser;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
            version: "2.0",
        })
    ],
    pages: {
        signIn: "/login",
        error: "/error",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.SECRET_KEY,
    callbacks: {
        async signIn({ user, account }) {
        await connectToDB();
        const existingUser = await User.findOne({ email: user.email });
        if(!existingUser){
            await User.create({
                name: user.name,
                email: user.email,
                image: user.image,
                authProvider: account?.provider,
                authProviderId: account?.providerAccountId,
                isOnboarded: false,
            });
        }
        return true;
        },
        async jwt({ token }){
            await connectToDB();
            const dbUser = await User.findOne({ email: token.email });
            if(dbUser) {
                token.isOnboarded = dbUser.isOnboarded;
                token.username = dbUser.username;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.isOnboarded = token.isOnboarded;
            session.user.username = token.username;
            return session;
        },
    },
};  