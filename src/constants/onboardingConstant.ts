import type { BasicDetailsInterface, CodingProfilesInterface, DevelopmentInterface, EducationInterface, FieldConfig, FormDataInterface, SocialInterface } from "@/interfaces/onboardingInterface"

export const totalSteps: number = 5

export const basicDetailsFields: FieldConfig<BasicDetailsInterface>[] = [{
        id: "name",
        label: "Your name",
        placeholder: "Enter your full name"
    }, {
        id: "username",
        label: "Username",
        placeholder: "Enter your username"
    }
]

export const educationFields: FieldConfig<EducationInterface>[] = [{
        id: "degree",
        label: "Degree",
        placeholder: "Your degree"
    }, {
        id: "branch",
        label: "Branch",
        placeholder: "Your branch/specialization"
    }, {
        id: "college",
        label: "College",
        placeholder: "Your college/university"
    }, {
        id: "gradYear",
        label: "Graduation Year",
        placeholder: "Year of graduation"
    }, {
        id: "location",
        label: "Location",
        placeholder: "Your current location"
    }, {
        id: "currentProfile",
        label: "Current Profile",
        placeholder: "Your current role/profile"
    }
]

export const socialFields: FieldConfig<SocialInterface>[] = [{
        id: "twitter",
        label: "Twitter",
        placeholder: "Your Twitter profile",
    }, {
        id: "linkedin",
        label: "LinkedIn",
        placeholder: "Your LinkedIn profile",
    }, {
        id: "website",
        label: "Your Website",
        placeholder: "Your personal website",
    }, {
        id: "email",
        label: "Your Email",
        placeholder: "Your email address",
    }
]

export const developmentFields: FieldConfig<DevelopmentInterface>[] = [{
    id: "github",
    label: "GitHub",
    placeholder: "Your GitHub profile"
}]

export const codingProfilesFields: FieldConfig<CodingProfilesInterface>[] = [{
        id: "leetcode",
        label: "LeetCode Profile",
        placeholder: "Your LeetCode profile"
    }, {
        id: "geeksforgeeks",
        label: "GeeksForGeeks Profile",
        placeholder: "Your GeeksForGeeks profile"
    }, {
        id: "codeforces",
        label: "CodeForces Profile",
        placeholder: "Your CodeForces profile"
    }, {
        id: "codechef",
        label: "CodeChef Profile",
        placeholder: "Your CodeChef profile"
    }, {
        id: "hackerrank",
        label: "HackerRank Profile",
        placeholder: "Your HackerRank profile"
    }, {
        id: "interviewbit",
        label: "InterviewBit Profile",
        placeholder: "Your InterviewBit profile"
    }, {
        id: "codingninjas",
        label: "CodingNinjas Profile",
        placeholder: "Your CodingNinjas profile"
    }
]

export const initialFormData: FormDataInterface = {
    basicDetails: { 
        name: "", 
        username: "" 
    },
    education: {
        degree: "", 
        branch: "", 
        college: "", 
        gradYear: "", 
        location: "", 
        currentProfile: ""
    },
    social: { 
        twitter: "", 
        linkedin: "", 
        website: "", 
        email: "" 
    },
    development: { 
        github: "" 
    },
    codingProfiles: {
        leetcode: "", 
        geeksforgeeks: "", 
        codeforces: "", 
        codechef: "",
        hackerrank: "", 
        interviewbit: "", 
        codingninjas: ""
    }
}
