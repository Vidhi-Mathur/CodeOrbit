
# CodeOrbit

**CodeOrbit** is a modern, fully‑responsive developer portfolio and project showcase platform that provides a sleek, interactive interface for developers to present their coding profiles, education, and project work in a structured and visually appealing way.


## Features

- **Onboarding Workflow**  
  - Multi-step form with step-wise validation to capture basic info, social links, education, and coding profiles.

- **Dynamic User Profiles**  
  - Auto-generated public profile pages combining bio, education, social links, and coding stats/activity.

- **Submission Activity Calendar**  
  - Visual heatmap showcasing your yearly developer activity across multiple platforms.

- **Integrated Developer Data**
    - Custom GraphQL queries written from scratch to fetch coding profile data (e.g., stats, contests, submissions).
    - Responses transformed into REST-style APIs for clean frontend consumption and reusable hooks.

- **Authentication**  
  - Secure sign‑in and session management for efficient onboarding for new users.

- **Responsive Design**  
  - Mobile‑first layouts, smooth animations, and optimized loading states.


## Routes Overview

### Pages

| Route                  | Auth Required | Description                             |
|------------------------|----------------|-----------------------------------------|
| `/`                   | ❌             | Landing/Homepage                        |
| `/onboarding`         | ✅  (after signup)           | Multi-step onboarding form              |
| `/login`              | ❌             | Login page with credentials or OAuth    |
| `/signup`             | ❌             | Signup page or flow for new users       |
| `/profile/[username]` | ❌             | Public user profile page (dynamic)      |

---

### API Routes

| Route                                                    | Method  | Description                                     |
|-----------------------------------------------------------|---------|-------------------------------------------------|
| `/api/profile/leetcode/[leetcode_username]`              | `GET`   | Fetch LeetCode stats for a specific user        |
| `/api/profile/github/[github_username]`                  | `GET`   | Fetch GitHub profile data for a specific user   |
| `/api/onboarding`                                        | `POST`  | Submit onboarding form data                     |
| `/api/auth/[...nextauth]`                                | `ALL`   | Handles all NextAuth.js authentication routes   |

## Project Structure

- `public`
- `src`  
  - `app`
    - `(auth)`
    - `api` 
    - `onboarding`
    - `profile` 
    - `page.tsx`, `found.tsx`, etc.
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
- [Material UI](https://mui.com/) (v7.1.0)  
- [React Slick](https://react-slick.neostack.com/) (v0.30.3)

### Security and Authetication
- [NextAuth.js](https://next-auth.js.org/) (v4.24.11)  
- Auth Providers: Google, GitHub, Twitter, Custom Credentials 
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) (v3.0.2) 

### API & Data Layer
- [GraphQL](https://graphql.org/)  
- [Axios](https://axios-http.com/) (v1.9.0) 

### Database
- [MongoDB](https://www.mongodb.com/)  
- [Mongoose](https://mongoosejs.com/) (v8.15.0)  
