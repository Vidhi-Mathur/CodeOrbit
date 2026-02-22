import { z } from "zod"

export const CredentialsSchema = z.object({
    name: z.string().trim().min(1, "Name must be at least 1 character").max(30, "Name must be maximum 30 characters").optional(),
    email: z.string().trim().email("Enter valid Email"),
    password: z.string().min(6, "Password must be minimum 6 characters").max(30, "Password must be maximum 30 characters")
})