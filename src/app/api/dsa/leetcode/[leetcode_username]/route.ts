import type { LeetCodeCalendarInterface, LeetCodeContestInterface, LeetCodeErrorInterface, LeetCodeProfileInterface } from '@/interfaces/dsa/leetcode/leetcodeInterface';
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

export async function GET(req: NextRequest, { params }: { params: Promise<{ leetcode_username: string }> }) {
    const { leetcode_username } = await params;

    if(!leetcode_username){
        return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 });
    }

    try {
        const headers = {
            'Content-Type': 'application/json',
            Referer: `https://leetcode.com/${leetcode_username}/`,
        }
        const [profileRes, contestRes, initialCalendarRes] = await Promise.allSettled([
            axios.post('https://leetcode.com/graphql', { query: profileQuery, variables: { leetcode_username } }, { headers }),
            axios.post('https://leetcode.com/graphql', { query: contestQuery, variables: { leetcode_username } }, { headers }),
            axios.post('https://leetcode.com/graphql', { query: calendarQuery, variables: { username: leetcode_username, year: new Date().getFullYear() } }, { headers })
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
                return new Response(JSON.stringify({ error: "Leetcode user not found" }), { status: 404 });
            }
        }
        else {
            errors.profile = profileRes.reason?.message || 'Failed to fetch profile';
        }

        if(contestRes.status === 'fulfilled'){
            const contest = contestRes.value.data.data?.userContestRanking;
            if(contest){
                contestResponse = {
                    totalContestAttended: contest.attendedContestsCount,
                    rating: contest.rating,
                    globalRanking: contest.globalRanking,
                    totalParticipants: contest.totalParticipants,
                    topPercentage: contest.topPercentage
                }
            }
        }
        else {
            errors.contest = contestRes.reason?.message || 'Failed to fetch contest';
        }

        if(initialCalendarRes.status === 'fulfilled'){
            let initialCalendarResponse = initialCalendarRes.value.data.data?.matchedUser?.userCalendar;
            const activeYears: number[] = (initialCalendarResponse.activeYears || []).sort((a: any, b: any) => b - a);
            const selectedYear = activeYears.slice(0, 5);
            //Map for past 5 active years
            const calendarPromises = selectedYear.map((year: number) => 
                axios.post('https://leetcode.com/graphql', { query: calendarQuery, variables: { username: leetcode_username, year } }, { headers })
            )
            const calendarResults = await Promise.allSettled(calendarPromises);
            calendarResults.forEach((res, index) => {
                const year = selectedYear[index];
                if(res.status === 'fulfilled'){
                    const calendar = res.value.data.data?.matchedUser?.userCalendar;
                    if(calendar){
                        submissionCalendarResponse[year] = {
                            submissionCalendar: calendar.submissionCalendar || {},
                            streak: calendar.streak || 0,
                            totalActiveDays: calendar.totalActiveDays || 0,
                            activeYears: calendar.activeYears || []
                        };
                    } 
                } 
                else {
                    submissionCalendarResponse[year] = null;
                    if(!errors.calendar) errors.calendar = res.reason?.message || `Failed to fetch calendar for ${year}`;
                }
            });
        }
        else {
            errors.calendar = initialCalendarRes.reason?.message || 'Failed to fetch calendar';
        }
        return new Response(JSON.stringify({ profileResponse, contestResponse, submissionCalendarResponse, errors }), { status: 200 })
    } 
    catch(err: any){
        return new Response(JSON.stringify({ error: "Failed to fetch Leetcode data" }), { status: 500 })
    }
}