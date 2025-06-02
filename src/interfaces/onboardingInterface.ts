import { CodingProfilesInterface, DevelopmentInterface, EducationInterface, InfoInterface } from "./profileInterfaces";

export type FieldConfig<T> = {
    id: keyof T;
    label: string;
    placeholder: string;
};

export interface FormDataInterface {
    basicDetails: BasicDetailsInterface,
    education: EducationInterface,
    social: InfoInterface,
    development: DevelopmentInterface,
    codingProfiles: CodingProfilesInterface,
}

export interface BasicDetailsInterface {
    username: string
}