import type { LeetCodeContestInterface, LeetCodeDataInterface, LeetCodeErrorInterface, LeetCodeProfileInterface } from '@/interfaces/dsa/leetcode/leetcodeInterface';
import { getCachedLeetcodeCalendar } from '@/lib/services/dsa/leetcode/calendar';
import axios from 'axios'
import { unstable_cache } from 'next/cache';

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
    
 
    const [profileRes, contestRes] = await Promise.allSettled([
        axios.post('https://leetcode.com/graphql', { query: profileQuery, variables: { leetcode_username } }, { headers }),
        axios.post('https://leetcode.com/graphql', { query: contestQuery, variables: { leetcode_username } }, { headers }),
    ]);
    let profileResponse: LeetCodeProfileInterface | null = null
    let contestResponse: LeetCodeContestInterface | null = null

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

    const { submissionCalendarResponse, error: calendarError } = await getCachedLeetcodeCalendar(leetcode_username, year)();
    
    errors.calendar = calendarError

    return { profileResponse, contestResponse, submissionCalendarResponse, errors }
}

export const verifyLeetcode = async(leetcode_username: string) => {
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

export const getCachedLeetcodeData = (leetcode_username: string) => unstable_cache(() => 
    fetchLeetcodeData(leetcode_username), [`leetcode-${leetcode_username}`], {
        revalidate: 3600,
        tags: [`leetcode-${leetcode_username}`]
    }
)