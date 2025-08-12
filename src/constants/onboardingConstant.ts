import type { BasicDetailsInterface, FieldConfig, FormDataInterface } from "@/interfaces/onboardingInterface"
import { CodingProfilesInterface, DevelopmentInterface, EducationInterface, InfoInterface } from "@/interfaces/profileInterfaces"

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
    id: "github",
    label: "GitHub",
    placeholder: "Your GitHub Username (no url)"
}]

export const codingProfilesFields: FieldConfig<CodingProfilesInterface>[] = [{
        id: "leetcode",
        label: "LeetCode Profile",
        placeholder: "Your LeetCode Username (no url)"
    }, {
        id: "geeksforgeeks",
        label: "GeeksForGeeks Profile",
        placeholder: "Your GeeksForGeeks Username"
    }, {
        id: "codeforces",
        label: "CodeForces Profile",
        placeholder: "Your CodeForces Username"
    }, {
        id: "codechef",
        label: "CodeChef Profile",
        placeholder: "Your CodeChef Username"
    }, {
        id: "hackerrank",
        label: "HackerRank Profile",
        placeholder: "Your HackerRank Username"
    }, {
        id: "interviewbit",
        label: "InterviewBit Profile",
        placeholder: "Your InterviewBit Username"
    }, {
        id: "codingninjas",
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
