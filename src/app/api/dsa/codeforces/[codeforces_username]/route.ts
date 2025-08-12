import { CodeForcesProfileInterface } from "@/interfaces/dsa/codeforces/codeforcesInterface";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ codeforces_username: string }> }) {
    const { codeforces_username } = await params
    try {
        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${codeforces_username}`);
        const data = response.data;
        let profileResponse: CodeForcesProfileInterface = {
            username: data.result[0].handle,
            currRank: data.result[0].rank,
            maxRank: data.result[0].maxRank
        }
        return new Response(JSON.stringify({ profileResponse, errors: {} }), { status: 200 })
    }
    catch(err: any){
        return new Response(JSON.stringify({ error: "Failed to fetch Codeforces data" }), { status: 500 })
    }
}