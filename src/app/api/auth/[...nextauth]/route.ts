import connectToDB from "@/lib/connect";
import User from "@/lib/models/User";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

// Configure NextAuth providers
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    TwitterProvider({   
        clientId: process.env.TWITTER_CLIENT_ID!,
        clientSecret: process.env.TWITTER_CLIENT_SECRET!,
        version: "2.0"
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.SECRET_KEY,
  callbacks: {
        async signIn({ user, account }){
            await connectToDB()
            const existingUser = await User.findOne({ email: user.email })
            if(existingUser){
                console.log('User already exists')
            }
            else {
                await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    authProvider: account?.provider,
                    authProviderId: account?.providerAccountId,
                    isOnboarded: false
                })
            }
            return true
        },
        async jwt({ token }) {
            await connectToDB()
            const dbUser = await User.findOne({ email: token.email })
            if(dbUser){
                token.isOnboarded = dbUser.isOnboarded
                token.username = dbUser.username
            }
            return token
        },
        async session({ session, token }){
            session.user.isOnboarded = token.isOnboarded
            session.user.username = token.username
            return session
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST}