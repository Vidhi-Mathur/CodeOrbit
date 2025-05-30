import SubmissionCalendar from "@/components/dsa/leetcode/SubmissionCalendar";
import { LeetcodeDetailProps } from "@/interfaces/dsa/leetcode/leetcodeInterface";

export const LeetcodeDetail = ({ contest, submissionCalendar }: LeetcodeDetailProps) => {
    return <SubmissionCalendar {...submissionCalendar} />

}