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

    if(token){
        //Logged in but not onboarded yet
        if(!token.isOnboarded){
            //Allow access to unprotected routes and onboarding
            if(!protectedRoutes.includes(url.pathname)){
                //If coming from /signup with redirect=true, go to /onboarding
                if(url.pathname === "/" && url.searchParams.get("redirect") === "true"){
                    url.pathname = onboardingRoute;
                    url.searchParams.delete("redirect");
                    return NextResponse.redirect(url);
                }
                return NextResponse.next();
            }
        }
        else {
            //Onboarded user trying to access /onboarding, redirect to /profile/:username
            if(url.pathname === onboardingRoute){
                url.pathname = `/profile/${username}`;
                return NextResponse.redirect(url);
            }
            //Onboarded user accessing / with redirect=true, go to /profile/:username
            if(url.pathname === "/" && url.searchParams.get("redirect") === "true"){
                url.pathname = `/profile/${username}`;
                url.searchParams.delete("redirect");
                return NextResponse.redirect(url);
            }
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
