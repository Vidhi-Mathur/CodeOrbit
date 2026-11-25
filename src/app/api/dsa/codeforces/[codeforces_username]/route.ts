import { getCachedCodeForcesData, verifyCodeForces } from "@/lib/services/dsa/codeforces";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ codeforces_username: string }>}) {
    const { codeforces_username } = await params

    if(!codeforces_username){
        return NextResponse.json({ error: "Codeforces username is required" }, { status: 400 });
    }

    try {
        const verifyMode = req.nextUrl.searchParams.get("verify") === "true"
        if(verifyMode){
            const isValid = await verifyCodeForces(codeforces_username)
            if(!isValid){
                return NextResponse.json({ valid: false, message: "Codeforces user not found" }, { status: 404 })
            }
            return NextResponse.json({ valid: true }, { status: 200 });
        }
        const { profileResponse, contestResponse, problemBreakdownResponse, errors } = await getCachedCodeForcesData(codeforces_username)()
        return NextResponse.json({ profileResponse, contestResponse, problemBreakdownResponse, errors }, { status: 200 })
    }
    catch(err: any){
        return NextResponse.json({ error: "Failed to fetch Codeforces profile data" }, { status: 500 })
    }
}