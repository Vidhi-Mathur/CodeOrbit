import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//Signup before accessing
const protectedRoutes = ["/onboarding"];
const onboardingRoute = "/onboarding";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.SECRET_KEY });
    const username = await token?.username
    const url = req.nextUrl.clone();

    //Not logged in and accessing protected route, redirect to login
    if(protectedRoutes.some(route => url.pathname.startsWith(route)) && !token){
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    //Logged in but not onboarded yet
    if(token && !token.isOnboarded && url.pathname !== onboardingRoute && url.pathname !== "/"){
        url.pathname = onboardingRoute;
        return NextResponse.redirect(url);
    }

    //Onboarded but still trying to accessing /onboarding, redirect to /profile/:username 
    if(token && token.isOnboarded && url.pathname === onboardingRoute){
        url.pathname = `/profile/${username}`;
        return NextResponse.redirect(url);
    }

    //Onboarded and trying to access home page with redirect query, redirect to /profile/:username
    if(token && token.isOnboarded && url.pathname === "/" && url.searchParams.get("redirect") === "true"){
        url.pathname = `/profile/${username}`;
        url.searchParams.delete("redirect");
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/onboarding"],
};
