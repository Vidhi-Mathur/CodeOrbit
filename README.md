# CodeOrbit

**CodeOrbit** is a performance-optimized developer analytics platform that aggregates and visualizes coding activity from multiple platforms (GitHub, LeetCode, Codeforces as of now) into a unified, cache-aware public profile.
It is designed with layered caching, real-time verification, resilient API handling, and lazy-loaded data orchestration to ensure performance, reliability, and scalability.


## Features

- **Onboarding Workflow**  
  - Step-based onboarding pipeline capturing personal, educational, social, development, and coding profiles.
  - Backend-enforced validation using Zod.
  - Field-level error mapping with automatic step navigation.
  - Edit mode with secure profile rehydration.
  - Lightweight `?verify=true` platform verification endpoints for GitHub, LeetCode and Codeforces.
  - Debounced real-time username validation to prevent invalid integrations.

- **Dynamic User Profiles & Multi-Platform Developer Analytics**  
  - Auto-generated public profiles combining bio, education, social links, and coding activity.
    - GitHub: Profile data, pinned + recent repos (deduplicated), multi-year contribution calendar.
    - LeetCode: Profile stats, contest ranking, submission distribution, language breakdown.
    - Codeforces: Rating progression, contest history, difficulty-tier segmentation.
  - Visual heatmap representing yearly developer activity.
  - Custom GraphQL queries with structured transformation into normalized REST-style APIs.
  
- **Performance Optimizations through caching and lazy loading**
  - Client-side caching with TanStack React Query and Server-side caching with Next.js unstable_cache.
  - Controlled query invalidation and background revalidation.
  - Manual refresh endpoint for platform data, rate limited via Upstash to prevent abuse and excessive external API calls.
  - Year-based lazy loading: current year fetched first, historical years loaded on demand, reducing API fan-out and initial payload size.
  - Indexed frequently queried fields for optimized profile lookup performance

- **Resilient & Defensive API Design**
  - Partial failure handling using safe async orchestration.
  - Graceful fallback to cached data.
  - Standardized error contracts with proper HTTP status codes.
  - Defensive handling of third-party API inconsistencies.

- **Authentication & Access Control**
  - Secure sign-in using NextAuth (OAuth + credentials).
  - Session-based route protection.
  - Owner-only profile editing and refresh controls.

- **Responsive Design**  
  - Mobile-first layouts.
  - Stable loading states without UI flicker.
  - Controlled rendering during verification and async data fetch.


## Routes Overview

### Pages

| Route                  | Auth Required        | Description                                      |
|------------------------|---------------------|--------------------------------------------------|
| `/`                    | ❌                  | Landing / Homepage                               |
| `/onboarding`          | ✅ (after signup)   | Multi-step onboarding pipeline                   |
| `/login`               | ❌                  | Login via credentials or OAuth                   |
| `/signup`              | ❌                  | New user registration                            |
| `/profile/[username]`  | ❌                  | Public dynamic developer profile                 |
| `/profile/edit`        | ✅ (owner only)     | Edit profile details and manage platform links   |

### API Routes

| Route                                                          | Method                       | Description |
|----------------------------------------------------------------|------------------------------|-------------|
| `/api/auth/[...nextauth]`                                      | `ALL`                        | NextAuth authentication handler (OAuth + credentials) |
| `/api/onboarding`                                              | `POST`                       | Submit validated multi-step onboarding data |
| `/api/profile`                                                 | `GET` (owner only)           | Fetch authenticated user's profile data (edit mode rehydration) |
| `/api/profile`                                                 | `PUT` (owner only)           | Update profile details and connected platforms |
| `/api/dsa/leetcode/[username]`                                 | `GET`                        | Fetch structured LeetCode analytics (profile, contests, current-year calendar) |
| `/api/dsa/leetcode/[username]/calendar?year=YYYY`              | `GET`                        | Fetch LeetCode submission calendar for specific year (lazy-loaded) |
| `/api/dsa/codeforces/[username]`                               | `GET`                        | Fetch Codeforces analytics (profile, rating history, solved breakdown) |
| `/api/dev/github/[username]`                                   | `GET`                        | Fetch GitHub analytics (profile, repos, current-year calendar) |
| `/api/dev/github/[username]/calendar?year=YYYY`                | `GET`                        | Fetch GitHub contribution calendar for specific year (lazy-loaded) |
| `/api/refresh`                                                 | `POST`                       | Trigger controlled cache revalidation for a specific platform |


## Project Structure

- `public`
- `src`  
  - `app`
    - `(auth)`
    - `api` 
    - `onboarding`
    - `profile` 
    - `page.tsx`, `not-found.tsx`, `error.tsx` etc.
  - `components`
    - `ui`
    - `auth`
    - `dev`
    - `dsa` 
  - `constants`
  - `hooks` 
  - `interfaces`
  - `lib` - Utility functions, model schemas, and auth configurations.
- `middleware.ts` - Application middleware logic.
- `.env` 


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vidhi-Mathur/CodeOrbit.git
    ```
2. Navigate to project repository:
    ```bash
   cd code_orbit
    ```
3. Install frontend dependencies: 
   ```bash
   npm install
    ```
4. Set up the environment variables by creating a .env file in the root directory:
    ```bash
    GOOGLE_CLIENT_ID=<your-google-client-id>
    GOOGLE_CLIENT_SECRET=<your-google-client-secret>
    GITHUB_CLIENT_ID=<your-github-client-id>
    GITHUB_CLIENT_SECRET=<your-github-client-secret>
    TWITTER_API_KEY=<your-twitter-api-secret>
    TWITTER_API_SECRET=<your-twitter-api-secret>
    SECRET_KEY=<your-secret-key>         
    GITHUB_AUTH_KEY=<your-github-auth-key> 
    MONGODB_URI=<your-mongodb-uri>
    UPSTASH_REDIS_REST_URL=<your-upstash-redis-rest-url>
    UPSTASH_REDIS_REST_TOKEN=<your-upstash-redis-rest-token>
    ```    
4. Start the server
    ```bash
   npm run dev
    ```


## Usage
- Once started, visit http://localhost:3000 to view the application.


## Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) (v15.3.2)  
- [React](https://reactjs.org/) (v19.0.0)  
- [TypeScript](https://www.typescriptlang.org/) (v5)  
- [Tailwind CSS](https://tailwindcss.com/) (v4.1.8)  
- [Chart.js](https://www.chartjs.org/) (v4.5.0)
- [Material UI](https://mui.com/) (v7.1.0)  
- [React Slick](https://react-slick.neostack.com/) (v0.30.3)

### Security and Authetication
- [NextAuth.js](https://next-auth.js.org/) (v4.24.11)  
- Auth Providers: Google, GitHub, Twitter, Custom Credentials 
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) (v3.0.2) 

### Backend and API Layer
- [GraphQL](https://graphql.org/) 
- [Axios](https://axios-http.com/) (v1.9.0) 
- [Zod](https://zod.dev/) (v4.3.6)

### Database
- [MongoDB](https://www.mongodb.com/)  
- [Mongoose](https://mongoosejs.com/) (v8.15.0)  

### Caching 
- [Tanstack React Query](https://tanstack.com/query/latest) (v5.90.21)
- [Upstash](https://upstash.com/) (v1.36.2)