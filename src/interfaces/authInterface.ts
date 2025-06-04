export interface AuthProps {
    heading: string
    subheading: string
    redirectLink: string
    redirectText: string
    credentials: Credential[]
}

export interface Credential {
    name: string      
    label: string
    type: "email" | "password" | "text"
    placeholder: string
    required: boolean    
}

export interface Profile {
    label: string
    image: string
}