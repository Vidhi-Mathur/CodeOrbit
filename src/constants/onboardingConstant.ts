import type { BasicDetailsInterface, FieldConfig, FormDataInterface } from "@/interfaces/onboardingInterface"
import { CodingProfilesInterface, DevelopmentInterface, EducationInterface, InfoInterface } from "@/interfaces/profileInterfaces"
import { DEV_LINKS, DSA_LINKS } from "./profileConstant"

export const totalSteps: number = 5

export const basicDetailsFields: FieldConfig<BasicDetailsInterface>[] = [{
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

export const socialFields: FieldConfig<InfoInterface>[] = [{
        id: "twitter",
        label: "Twitter",
        placeholder: "Your Twitter Username (without @)",
    }, {
        id: "linkedin",
        label: "LinkedIn",
        placeholder: "Your LinkedIn Username",
    }, {
        id: "website",
        label: "Your Website",
        placeholder: "Your personal website/blog/portfolio",
    }
]

export const developmentFields: FieldConfig<DevelopmentInterface>[] = [{
    id: DEV_LINKS.GITHUB,
    label: "GitHub",
    placeholder: "Your GitHub Username (no url)"
}]

export const codingProfilesFields: FieldConfig<CodingProfilesInterface>[] = [{
        id: DSA_LINKS.LEETCODE,
        label: "LeetCode Profile",
        placeholder: "Your LeetCode Username (no url)"
    }, {
        id: DSA_LINKS.GEEKSFORGEEKS,
        label: "GeeksForGeeks Profile",
        placeholder: "Your GeeksForGeeks Username"
    }, {
        id: DSA_LINKS.CODEFORCES,
        label: "CodeForces Profile",
        placeholder: "Your CodeForces Username"
    }, {
        id: DSA_LINKS.CODECHEF,
        label: "CodeChef Profile",
        placeholder: "Your CodeChef Username"
    }, {
        id: DSA_LINKS.HACKERRANK,
        label: "HackerRank Profile",
        placeholder: "Your HackerRank Username"
    }, {
        id: DSA_LINKS.INTERVIEWBIT,
        label: "InterviewBit Profile",
        placeholder: "Your InterviewBit Username"
    }, {
        id: DSA_LINKS.CODINGNINJAS,
        label: "CodingNinjas Profile",
        placeholder: "Your CodingNinjas Username"
    }
]

export const initialFormData: FormDataInterface = {
    basicDetails: { 
        username: "" 
    },
    education: {
        degree: "", 
        college: "", 
        gradYear: new Date().getFullYear(),
        location: "", 
        currentProfile: ""
    },
    social: { 
        linkedin: "", 
    },
    development: { 
        github: "" 
    },
    codingProfiles: {
        leetcode: "",
        codeforces: ""
    }
}
