import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/User";
import connectToDB from "./connect";
import { CredentialsSchema } from "./validations/credentials";

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
                const parsed = CredentialsSchema.safeParse(credentials)
                if(!parsed.success){
                    throw new Error(parsed.error.issues[0].message)
                }
                const existingUser = await User.findOne({ email }).select("+password +authProvider");
                if(existingUser){
                    if(existingUser && existingUser.authProvider !== "credentials"){
                        throw new Error(`Please login using ${existingUser.authProvider}`);
                    }
                    const dbPassword = await bcrypt.compare(password, existingUser.password);
                    if(!dbPassword){
                        throw new Error("Invalid credentials");
                    }
                    delete existingUser.password
                    return {
                        id: existingUser._id.toString(), 
                        name: existingUser.name, 
                        email: existingUser.email, 
                        image: existingUser.image, 
                        isOnboarded: existingUser.isOnboarded, 
                        authProvider: existingUser.authProvider
                    }
                }
                else {
                    if(!name){
                        throw new Error(`Name is required`);
                    }
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const newUser = await User.create({
                        name,
                        email,
                        password: hashedPassword,
                        authProvider: "credentials",
                        isOnboarded: false,
                    })
                    return {
                        id: newUser._id.toString(), 
                        name: newUser.name, 
                        email: newUser.email, 
                        image: newUser.image, 
                        isOnboarded: newUser.isOnboarded, 
                        authProvider: newUser.authProvider
                    }  
                }
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
            clientId: process.env.TWITTER_API_KEY!,
            clientSecret: process.env.TWITTER_API_SECRET!
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
            const existingUser = await User.findOne({ email: token.email });
            if(existingUser){
                token.isOnboarded = existingUser.isOnboarded;
                token.username = existingUser.username;
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