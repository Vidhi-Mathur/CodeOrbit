import type { LeetCodeCalendarInterface, LeetCodeContestInterface, LeetCodeDataInterface, LeetCodeErrorInterface, LeetCodeProfileInterface } from '@/interfaces/dsa/leetcode/leetcodeInterface';
import axios from 'axios'
import { unstable_cache } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const profileQuery = `
    query getUserProfile($leetcode_username: String!){
        matchedUser(username: $leetcode_username){
            username
            profile {
                realName
                aboutMe
                starRating
                ranking
                reputation
                skillTags
            }
            submitStats {
                acSubmissionNum {
                    difficulty
                    count
                    submissions
                }
            }
            badges {
                id
                displayName
                icon
            }
            languageProblemCount{
                languageName
                problemsSolved
            }
        }
    }
`

const contestQuery = `
    query userContestRankingInfo($leetcode_username: String!) {
        userContestRanking(username: $leetcode_username) {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
        }
    }
`;

const calendarQuery = `
    query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
            userCalendar(year: $year) {
                activeYears
                streak
                totalActiveDays
                submissionCalendar
            }
        }
    }
`
const verifyQuery = `
    query verifyUser($leetcode_username: String!) {
        matchedUser(username: $leetcode_username) {
            username
        }
    }
`;


const fetchLeetcodeData = async(leetcode_username: string): Promise<LeetCodeDataInterface> => {
    const year = new Date().getFullYear();
    const headers = {
        'Content-Type': 'application/json',
        Referer: `https://leetcode.com/${leetcode_username}/`,
    }
    
 
    const [profileRes, contestRes, calendarRes] = await Promise.allSettled([
        axios.post('https://leetcode.com/graphql', { query: profileQuery, variables: { leetcode_username } }, { headers }),
        axios.post('https://leetcode.com/graphql', { query: contestQuery, variables: { leetcode_username } }, { headers }),
        axios.post('https://leetcode.com/graphql', { query: calendarQuery, variables: { username: leetcode_username, year } }, { headers })
    ]);
    let profileResponse: LeetCodeProfileInterface | null = null
    let contestResponse: LeetCodeContestInterface | null = null
    let submissionCalendarResponse: Record<number, LeetCodeCalendarInterface | null> = {}
    let errors: LeetCodeErrorInterface = {
        profile: undefined,
        contest: undefined,
        calendar: undefined
    }
    if(profileRes.status === 'fulfilled'){
        const matchedUser = profileRes.value.data.data?.matchedUser;
        if(matchedUser){
            profileResponse = {
            username: matchedUser.username,
            realName: matchedUser.profile.realName,
            aboutMe: matchedUser.profile.aboutMe,
            ranking: matchedUser.profile.ranking,
            reputation: matchedUser.profile.reputation,
            skillTags: matchedUser.profile.skillTags,
            badges: matchedUser.badges.map((badge: any) => ({
                id: badge.id,
                name: badge.displayName,
                icon: badge.icon,
            })),
            submissionStats: matchedUser.submitStats?.acSubmissionNum || [],
            languageStats: matchedUser.languageProblemCount || [],
            };
        }
        else {
            errors.profile = "Leetcode user not found";
        }
    }
    else {
        errors.profile = profileRes.reason?.message || 'Failed to fetch profile';
    }
    if(contestRes.status === 'fulfilled'){
        const contest = contestRes.value.data.data?.userContestRanking;
        contestResponse = {
            totalContestAttended: contest?.attendedContestsCount ?? null,
            rating: contest?.rating ?? null,
            globalRanking: contest?.globalRanking ?? null,
            totalParticipants: contest?.totalParticipants ?? null,
            topPercentage: contest?.topPercentage ?? null
        }
    }
    else {
        errors.contest = contestRes.reason?.message || 'Failed to fetch contest';
    }

    if(calendarRes.status === 'fulfilled'){
        const calendar = calendarRes.value.data.data?.matchedUser?.userCalendar;
        if(calendar){
            submissionCalendarResponse[year] = {
                submissionCalendar: calendar.submissionCalendar || "{}",
                streak: calendar.streak || 0,
                totalActiveDays: calendar.totalActiveDays || 0,
                activeYears: calendar.activeYears || []
            };
        } 
    }
    else {
        errors.calendar = calendarRes.reason?.message || 'Failed to fetch calendar';
    }
    return { profileResponse, contestResponse, submissionCalendarResponse, errors }
}

const verifyLeetcode = async(leetcode_username: string) => {
    const headers = {
        'Content-Type': 'application/json',
        Referer: `https://leetcode.com/${leetcode_username}/`,
    };
    const verificationResponse = await axios.post('https://leetcode.com/graphql', { 
        query: verifyQuery, 
        variables: { 
            leetcode_username 
        }
    }, { headers })
    return !!verificationResponse.data.data?.matchedUser;
}

const getCachedLeetcodeData = (leetcode_username: string) => unstable_cache(() => 
    fetchLeetcodeData(leetcode_username), [`leetcode-${leetcode_username}`], {
        revalidate: 3600,
        tags: [`leetcode-${leetcode_username}`]
    }
)

export async function GET(req: NextRequest, { params }: { params: Promise<{ leetcode_username: string }> }) {
    const { leetcode_username } = await params;

    if(!leetcode_username){
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }
    
    try {
        const verifyMode = req.nextUrl.searchParams.get("verify") === "true"
        if(verifyMode){
            const isValid = await verifyLeetcode(leetcode_username)
            if(!isValid){
                return NextResponse.json({ valid: false, message: "Leetcode user not found" }, { status: 404 })
            }
            return NextResponse.json({ valid: true }, { status: 200 });
        }
        const { profileResponse, contestResponse, submissionCalendarResponse, errors } = await getCachedLeetcodeData(leetcode_username)()
        return NextResponse.json({ profileResponse, contestResponse, submissionCalendarResponse, errors }, { status: 200 })
    } 
    catch(err: any){
        return NextResponse.json({ error: "Failed to fetch Leetcode data" }, { status: 500 })
    }
} 