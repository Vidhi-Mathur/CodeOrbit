import { CodeForcesContestInterface, CodeForcesErrorInterface, CodeForcesProfileInterface, ProblemBreakdownInterface } from "@/interfaces/dsa/codeforces/codeforcesInterface";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ codeforces_username: string }> }) {
    const { codeforces_username } = await params

    if(!codeforces_username){
        return Response.json({ error: "Codeforces username is required" }, { status: 400 });
    }

    try {
        const headers = {
            "User-Agent": "Mozilla/5.0",
        }
        const [profileRes, contestRes, problemBreakdownRes] = await Promise.allSettled([
            axios.get(`https://codeforces.com/api/user.info?handles=${codeforces_username}`, { headers }),
            axios.get(`https://codeforces.com/api/user.rating?handle=${codeforces_username}`, { headers }),
            axios.get(`https://codeforces.com/api/user.status?handle=${codeforces_username}`, { headers })
        ])
        let profileResponse: CodeForcesProfileInterface | null = null
        let contestResponse: CodeForcesContestInterface | null = null
        let problemBreakdownResponse: ProblemBreakdownInterface[] | null = null
        let errors: CodeForcesErrorInterface = {
            profile: undefined,
            contest: undefined,
            problemBreakdown: undefined
        }
        
        let profileData: any = null;
        if(profileRes.status === 'fulfilled'){
            profileData = profileRes.value.data.result[0];
            if(profileData){
                profileResponse = {
                    username: profileData.handle,
                    currRank: profileData.rank,
                    maxRank: profileData.maxRank
                }
            }
            else {
                errors.profile = "Codeforces user not found";
            }
        }
        else {
            errors.profile = profileRes.reason?.message || 'Failed to fetch profile';
        }

        if(contestRes.status === 'fulfilled'){
            const contestData = contestRes.value.data.result;
            if(contestData){
                contestResponse = {
                    currRating: profileData.rating,
                    maxRating: profileData.maxRating,
                    contestHistory: contestData.map((contest: any) => ({
                        contestId: contest.contestId,
                        contestName: contest.contestName,
                        contestRank: contest.rank,
                        contestRating: contest.newRating,
                        contestTime: contest.ratingUpdateTimeSeconds
                    })),
                    totalContestAttended: contestData.length
                }
            }
            else {
                errors.contest = "Codeforces contest not found";
            }
        }
        else {
            errors.contest = contestRes.reason?.message || 'Failed to fetch contest';
        }


        if(problemBreakdownRes.status === "fulfilled"){
            const problemBreakdownData = problemBreakdownRes.value.data.result
            if(problemBreakdownData){
                //To get only accepted solutions
                const accepted = problemBreakdownData.filter((soln: any) => soln.verdict === "OK")
                let uniqueProblemsMap = new Map<string, any>()
                //Deduplication, so used map
                for(const soln of accepted){
                    if(!soln.problem?.contestId || !soln.problem?.index) continue;
                    const key = `${soln.problem.contestId}-${soln.problem.index}`
                    if(!uniqueProblemsMap.has(key)) uniqueProblemsMap.set(key, soln.problem)
                }
                const ratingFreqMap = new Map<number, number>()
                let solved = 0;
                for(const problem of uniqueProblemsMap.values()){
                    //Only rated
                    if(typeof problem.rating !== "number") continue;
                    solved++;
                    ratingFreqMap.set(problem.rating, (ratingFreqMap.get(problem.rating) || 0) + 1)
                }
                let problemBreakdown = Array.from(ratingFreqMap.entries()).map(([rating, count]) => ({
                    rating,
                    count
                })).sort((a, b) => a.rating - b.rating)
                let threshold = [1400, 1600, 1800, 2000]
                problemBreakdownResponse = threshold.map(t => {
                    let count = problemBreakdown.filter(p => p.rating >= t).reduce((sum, t) => sum + t.count, 0)
                    return {
                        rating: t, 
                        count, 
                        percentage: solved > 0 ? Math.round((count / solved) * 100) : 0
                    }
                })
            }
            else {
                errors.problemBreakdown = "Codeforces problem breakdown not found";
            }
        }
        else {
            errors.problemBreakdown = problemBreakdownRes.reason?.message || 'Failed to fetch problem breakdown';
        }
        return Response.json({ profileResponse, contestResponse, problemBreakdownResponse, errors }, { status: 200 })
    }
    catch(err: any){
        return Response.json({ error: "Failed to fetch Leetcode profile data" }, { status: 500 })
    }
}