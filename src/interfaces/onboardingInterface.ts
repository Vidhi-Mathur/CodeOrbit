export type FieldConfig<T> = {
    id: keyof T;
    label: string;
    placeholder: string;
};

export interface FormDataInterface {
    basicDetails: BasicDetailsInterface,
    education: EducationInterface,
    social: SocialInterface,
    development: DevelopmentInterface,
    codingProfiles: CodingProfilesInterface,
}

export interface BasicDetailsInterface {
    name: string,
    username: string
}

export interface EducationInterface {
    degree: string
    branch: string
    college: string
    gradYear: number
    location: string
    currentProfile: string
}

export interface SocialInterface {
    twitter: string
    linkedin: string
    website: string
    email: string
}

export interface DevelopmentInterface {
    github: string
}

export interface CodingProfilesInterface {
    leetcode: string
    geeksforgeeks: string,
    codeforces: string,
    codechef: string
    hackerrank: string
    interviewbit: string,
    codingninjas: string
}