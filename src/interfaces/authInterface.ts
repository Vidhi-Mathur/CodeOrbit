export interface AuthProps {
    heading: string, 
    subheading: string, 
    redirectLink: string,
    redirectText: string, 
    crendentials: Credential[]
}

export interface Credential {
    label: string,
    type: "email" | "password" | "text",
    placeholder: string
}

export interface Profile {
    label: string,
    image: string
}

