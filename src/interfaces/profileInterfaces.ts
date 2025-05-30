export interface CurvedNavProps {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

export interface AboutProps {
    name?: string | null
    username?: string | null
    image?: string | null
    email: string
    education: EducationInterface
    info: InfoInterface
}

export interface ProfileComponentProps {
    user: {
        name: string
        email: string
        image: string
        authProvider: string
        authProviderId: string
        username: string, 
        isOnboarded: boolean
        education: EducationInterface,
        platforms: {
            dsa: {
                leetcode: string
                geeksforgeeks: string
                codeforces: string
                codechef: string
                hackerrank: string
                interviewbit: string
                codingninjas: string
            }
            dev: {
                github: string
            }
            others: InfoInterface
        }
    }
};

interface EducationInterface {
    degree: string
    branch: string
    college: string
    gradYear: string
    location: string
    current_profile: string
}

interface InfoInterface {
    website: string,
    linkedin: string,
    X: string
}