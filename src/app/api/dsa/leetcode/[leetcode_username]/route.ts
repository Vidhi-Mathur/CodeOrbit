import type { LeetcodeCalendarInterface, LeetcodeContestInterface, LeetCodeProfileInterface } from '@/interfaces/dsa/leetcode/leetcodeInterface';
import axios from 'axios'
import { NextRequest } from 'next/server';

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

export async function GET(req: NextRequest, { params }: { params: { leetcode_username: string } }) {
    const { leetcode_username } = params;

    if(!leetcode_username){
        return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 });
    }

    try {
        const headers = {
            'Content-Type': 'application/json',
            Referer: `https://leetcode.com/${leetcode_username}/`,
        }
        const [profileRes, contestRes, initialCalendarRes] = await Promise.all([
            axios.post('https://leetcode.com/graphql', { query: profileQuery, variables: { leetcode_username } }, { headers }),
            axios.post('https://leetcode.com/graphql', { query: contestQuery, variables: { leetcode_username } }, { headers }),
            axios.post('https://leetcode.com/graphql', { query: calendarQuery, variables: { username: leetcode_username, year: new Date().getFullYear() } }, { headers })
        ]);

        const matchedUser = profileRes.data.data?.matchedUser;

        if(!matchedUser){
            return new Response(JSON.stringify({ error: 'Leetcode User not found' }), { status: 404 });
        }

        const profileResponse: LeetCodeProfileInterface = {
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

        const contest = contestRes.data.data?.userContestRanking;

        const contestResponse: LeetcodeContestInterface = {
            totalContestAttended: contest.attendedContestsCount,
            rating: contest.rating,
            globalRanking: contest.globalRanking,
            totalParticipants: contest.totalParticipants,
            topPercentage: contest.topPercentage
        }

        let initialCalendarResponse = initialCalendarRes.data.data?.matchedUser?.userCalendar;

        const activeYears: number[] = (initialCalendarResponse.activeYears || []).sort((a: any, b: any) => b - a);
        const selectedYear = activeYears.slice(0, 5);

        //Map for past 5 active years
        const calendarPromises = selectedYear.map((year: number) => 
            axios.post('https://leetcode.com/graphql', { query: calendarQuery, variables: { username: leetcode_username, year } }, { headers })
        )

        const calendarResults = await Promise.all(calendarPromises)

        const calendarMap: Record<number, LeetcodeCalendarInterface> = {}

        calendarResults.forEach((res, index) => {
            const year = selectedYear[index];
            const calendar = res.data.data?.matchedUser?.userCalendar;
            calendarMap[year] = {
                submissionCalendar: calendar.submissionCalendar || {},
                streak: calendar.streak || 0,
                totalActiveDays: calendar.totalActiveDays || 0,
                activeYears: calendar.activeYears || []
            }
        })
        
        return new Response(JSON.stringify({ profileResponse, contestResponse, submissionCalendarResponse: calendarMap }), { status: 200 })
    } 
    catch (err: any){
        console.error("Leetcode GraphQL Error:", JSON.stringify(err.response?.data || err.message, null, 2))
        return new Response(JSON.stringify({ error: "Failed to fetch Leetcode data" }), { status: 500 })
    }
}