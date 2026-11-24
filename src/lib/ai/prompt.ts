import { ProfileComponentProps } from "@/interfaces/profileInterfaces";

export const buildProfileReviewPrompt = (profile: ProfileComponentProps["user"]) => {
  return `You are an experienced senior software engineer and technical interviewer. Analyze this software developer profile carefully. Evaluate:
    1. Technical depth
    2. Project quality
    3. Industry readiness
    4. Missing skills
    5. Key strengths
    6. Practical improvement roadmap
IMPORTANT RULES:
    - Return ONLY valid JSON
    - Do NOT include markdown
    - Do NOT wrap response in backticks
    - Do NOT explain anything outside JSON
JSON FORMAT:
{
    "summary": string,
    "strengths": string[],
    "skillGaps": string[],
    "readinessScore": number,
    "nextSteps": string[],
    "roadmap": {
      "week1": string[],
      "week2": string[],
      "week3": string[],
      "week4": string[]
    }
}
RULES:
    - readinessScore must be between 0 and 10
    - strengths max 5 items
    - skillGaps max 5 items
    - nextSteps max 5 items
    - each roadmap week max 4 tasks
    - concise but specific feedback
    - avoid generic advice
    - focus on practical software engineering growth
Developer Profile: ${JSON.stringify(profile)}
`;
};