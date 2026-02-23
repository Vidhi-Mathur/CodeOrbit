import { z } from "zod"

export const OnboardingSchema = z.object({
    basicDetails: z.object({
        username: z.string().trim().regex(/^[a-z0-9_]{3,50}$/, "Username should be between 3 to 50 characters, only lowercase letters, numbers and _ allowed")
    }),
    education: z.object({
        degree: z.string().trim().min(1, "Degree must be at least 1 character").max(100, "Degree must be maximum 100 characters"),
        branch: z.string().trim().max(100, "Branch name must be maximum 100 characters").optional().or(z.literal("")),
        college: z.string().min(1, "College name must be at least 1 character").max(100, "College name must be maximum 100 characters"),
        gradYear: z.number().int().min(1950, "Graduation year more than 1949 accepted").max(new Date().getFullYear() + 10,  `Graduation year less than ${new Date().getFullYear() + 11} accepted`),
        location: z.string().trim().min(1, "Location must be at least 1 character").max(100, "Location must be maximum 100 characters"),
        currentProfile: z.enum(["Student", "Fresher", "Working Professional", "Freelancer", "Other"])
    }),
    codingProfiles: z.object({
        leetcode: z.string().trim().min(1, "Leetcode username must be at least 1 character"),
        codeforces: z.string().trim().min(1, "Codeforces username  must be at least 1 character")
    }),
    development: z.object({
        github: z.string().trim().min(1, "Github username must be at least 1 character")
    }),
    social: z.object({
        linkedin: z.string().trim().min(1, "Linkedin username must be at least 1 character"),
        website: z.string().trim().url().optional().or(z.literal("")),
        twitter: z.string().trim().optional().or(z.literal(""))
    })
})