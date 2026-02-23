import { DevLink, DsaLink, ProfileTabs } from "@/constants/profileConstant";
import { SideBarProps } from "./hompageInterface";
import { FormDataInterface } from "./onboardingInterface";

export interface CurvedNavProps {
    activeTab: ProfileTabs
    setActiveTab: (value: ProfileTabs) => void;
}

export interface StatsProps<T> {
    onClick: (platform: T) => void
    activePlatform: T
}

export interface SectionProps {
    user: ProfileComponentProps["user"]
    activePlatform: DsaLink | DevLink
    onPlatformChange: (platform: DsaLink | DevLink) => void
    renderSidebarOnly?: boolean
}

export interface AboutProps extends SideBarProps {
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
            dsa: CodingProfilesInterface
            dev: DevelopmentInterface
            social: InfoInterface
        }
    }
};

export interface RefreshInterface {
    status: "idle" | "loading" | "success" | "error"
    message?: string
}

export interface ProfileHeaderProps {
    user: ProfileComponentProps["user"]
    activeTab: ProfileTabs
    onTabChange: (tab: ProfileTabs) => void
    onRefresh: () => void
    refreshState: RefreshInterface
}

export interface ProfileFormProps {
    mode: "create" | "edit",
    initialData?: FormDataInterface,
    onSubmit: (data: FormDataInterface) => Promise<void>
    isFetching?: boolean
}

export interface EducationInterface {
    degree: string
    branch?: string
    college: string
    gradYear: number
    location: string
    currentProfile: string
}

export interface DevelopmentInterface {
    github: string
}

export interface CodingProfilesInterface {
    leetcode: string
    codeforces: string,
}

export interface InfoInterface {
    website?: string,
    linkedin: string,
    twitter?: string
}