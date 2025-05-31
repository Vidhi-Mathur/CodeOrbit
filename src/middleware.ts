import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/onboarding"];
const onboardingRoute = "/onboarding";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.SECRET_KEY });
    const username = await token?.username
    const url = req.nextUrl.clone();

    //Not logged in and accessing protected route
    if(protectedRoutes.some(route => url.pathname.startsWith(route)) && !token) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    //Logged in but not onboarded
    if(token && token.isOnboarded === false && url.pathname !== onboardingRoute){
        url.pathname = onboardingRoute;
        return NextResponse.redirect(url);
    }

    //onboarded and trying to access /onboarding, redirect away
    if(token && token.isOnboarded === true && url.pathname === onboardingRoute){
        url.pathname = `/profile/${username}`;
        console.log("Redirecting to profile page"); 
        return NextResponse.redirect(url);
    }
    
    //Redirect onboarded users landing on the root page to /profile/:username
    if(token && token.isOnboarded === true && url.pathname === "/") {
        url.pathname = `/profile/${username}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/onboarding", "/profile/:path*"]
};
