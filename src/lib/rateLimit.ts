import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

//5 req/min per IP
export const rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"), 
    analytics: true,
})
