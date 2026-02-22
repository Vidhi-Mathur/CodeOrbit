"use client"
import axios from "axios"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { FormDataInterface } from "@/interfaces/onboardingInterface"
import { basicDetailsFields, codingProfilesFields,  developmentFields, educationFields, initialFormData, socialFields, stepConfig, totalSteps } from "@/constants/onboardingConstant"
import { LoadingSpinner } from "@/components/ui/ShimmerUI"

export default function OnboardingPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState<number>(1)
    const [formData, setFormData] = useState<FormDataInterface>(initialFormData)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        if(fieldErrors[name]){
            setFieldErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
        const sectionKey = stepConfig[currentStep - 1].key
        setFormData(prev => ({
            ...prev,
            [sectionKey]: {
                ...prev[sectionKey],
                [name]: name === "gradYear"? Number.parseInt(value) || new Date().getFullYear(): value,
            },
        }))
    }
    const currentStepValidator = () => {
        const errors: Record<string, string> = {}
        switch(currentStep){
        case 1:
            if(!formData.basicDetails.username.trim()) errors.username = "Username is required"
            break
        case 2:
            if(!formData.education.degree.trim()) errors.degree = "Degree is required"
            if(!formData.education.college.trim()) errors.college = "College is required"
            if(!formData.education.gradYear) errors.gradYear = "Graduation year is required"
            if(!formData.education.location.trim()) errors.location = "Location is required"
            if(!formData.education.currentProfile.trim()) errors.currentProfile = "Current profile is required"
            break
        case 3:
            if(!formData.social.linkedin.trim()) errors.linkedin = "LinkedIn username is required"
            break
        case 4:
            if(!formData.development.github.trim()) errors.github = "GitHub username is required"
            break
        case 5:
            if(!formData.codingProfiles.leetcode.trim()) errors.leetcode = "LeetCode username is required"
            if(!formData.codingProfiles.codeforces.trim()) errors.codeforces = "Codeforces username is required"
            break
        }
        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    const nextStep = () => {
        if(currentStepValidator() && currentStep <= totalSteps) setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        if(currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const submitHandler = async() => {
        if(!currentStepValidator())  return
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post("/api/onboarding", formData)
            if(response.status === 200){
                router.push(`/profile/${formData.basicDetails.username}`)
            }
        } 
        catch(err: any){
            if(axios.isAxiosError(err) && err.response?.data?.errors?.fieldErrors){
                const backendErrors = err.response.data.errors.fieldErrors
                setFieldErrors(backendErrors)
                //Todo: Auto navigate to step
                const firstErrorField = Object.keys(backendErrors)[0]
                const stepIndex = stepConfig.findIndex(step => step.fields.some(field => field.id === firstErrorField))
                if(stepIndex !== -1) setCurrentStep(stepIndex + 1)
            }  
        else setError("Something went wrong. Try again.")
        } 
        finally {
            setIsLoading(false)
        }
    }

    const renderFormFields = () => {
        switch(currentStep){
        case 1:
            return (
                <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Basic Details</h2>
                    {basicDetailsFields.map((input) => (
                        <div key={input.id}>
                            <label htmlFor={input.id} className="block text-blue-700 font-semibold mb-2">
                                {input.label} <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id={input.id} name={input.id} value={formData.basicDetails[input.id]} onChange={changeHandler} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue-50 text-blue-900 ${fieldErrors[input.id] ? "border-red-300" : "border-blue-300"}`} placeholder={input.placeholder} />
                            {fieldErrors[input.id] && <p className="text-red-500 text-sm mt-1">{fieldErrors[input.id]}</p>}
                        </div>
                    ))}
                </div>
            )
        case 2:
            return (
                <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Education Details</h2>
                    {educationFields.map((input) => {
                        const isRequired = ["degree", "college", "gradYear", "location", "currentProfile"].includes(input.id)
                        if(input.id === "currentProfile"){
                            return (
                                <div key={input.id}>
                                    <label htmlFor={input.id} className="block text-blue-700 font-semibold mb-2">
                                        {input.label} {isRequired && <span className="text-red-500">*</span>}
                                    </label>
                                    <select id={input.id} name={input.id} value={formData.education[input.id]} onChange={(e) => changeHandler(e)} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue-50 text-blue-900 ${fieldErrors[input.id] ? "border-red-300" : "border-blue-300"}`}>
                                        <option value="">Select your current profile</option>
                                        <option value="Student">Student</option>
                                        <option value="Fresher">Fresher</option>
                                        <option value="Working Professional">Working Professional</option>
                                        <option value="Freelancer">Freelancer</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {fieldErrors[input.id] && <p className="text-red-500 text-sm mt-1">{fieldErrors[input.id]}</p>}
                                </div>
                            )
                        }
                        return (
                            <div key={input.id}>
                                <label htmlFor={input.id} className="block text-blue-700 font-semibold mb-2">
                                    {input.label} {isRequired && <span className="text-red-500">*</span>}
                                </label>
                                <input type={input.id === "gradYear" ? "number" : "text"} id={input.id} name={input.id} value={formData.education[input.id]} onChange={changeHandler} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue-50 text-blue-900 ${fieldErrors[input.id] ? "border-red-300" : "border-blue-300"}`} placeholder={input.placeholder} min={input.id === "gradYear" ? 1950 : undefined} max={input.id === "gradYear" ? new Date().getFullYear() + 10 : undefined}/>
                                {fieldErrors[input.id] && <p className="text-red-500 text-sm mt-1">{fieldErrors[input.id]}</p>}
                            </div>
                        )
                    })}
                </div>
            )
        case 3:
            return (
                <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Social Links</h2>
                    {socialFields.map((input) => {
                        const isRequired = input.id === "linkedin"
                        return (
                            <div key={input.id}>
                                <label htmlFor={input.id} className="block text-blue-700 font-semibold mb-2">
                                    {input.label} {isRequired && <span className="text-red-500">*</span>}
                                </label>
                                <input type="text" id={input.id} name={input.id} value={formData.social[input.id]} onChange={changeHandler} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue-50 text-blue-900 ${fieldErrors[input.id] ? "border-red-300" : "border-blue-300"}`} placeholder={input.placeholder}/>
                                {fieldErrors[input.id] && <p className="text-red-500 text-sm mt-1">{fieldErrors[input.id]}</p>}
                            </div>
                        )
                    })}
                </div>
            )
        case 4:
            return (
                <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Development Profiles</h2>
                    {developmentFields.map((input) => {
                        const isRequired = input.id === "github"
                        return (
                            <div key={input.id}>
                                <label htmlFor={input.id} className="block text-blue-700 font-semibold mb-2">
                                    {input.label} {isRequired && <span className="text-red-500">*</span>}
                                </label>
                                <input type="text" id={input.id} name={input.id} value={formData.development[input.id]} onChange={changeHandler} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue-50 text-blue-900 ${fieldErrors[input.id] ? "border-red-300" : "border-blue-300"}`} placeholder={input.placeholder}/>
                                {fieldErrors[input.id] && <p className="text-red-500 text-sm mt-1">{fieldErrors[input.id]}</p>}
                            </div>
                        )
                    })}
                </div>
            )
        case 5:
            return (
                <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Coding Profiles</h2>
                    {codingProfilesFields.map((input) => {
                        const isRequired = input.id === "leetcode" || input.id === "codeforces"
                        return (
                            <div key={input.id}>
                                <label htmlFor={input.id} className="block text-blue-700 font-semibold mb-2">
                                    {input.label} {isRequired && <span className="text-red-500">*</span>}
                                </label>
                                <input type="text" id={input.id} name={input.id} value={formData.codingProfiles[input.id]} onChange={changeHandler} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue-50 text-blue-900 ${fieldErrors[input.id] ? "border-red-300" : "border-blue-300"}`} placeholder={input.placeholder}/>
                                {fieldErrors[input.id] && <p className="text-red-500 text-sm mt-1">{fieldErrors[input.id]}</p>}
                            </div>
                        )
                    })}
                </div>
            )
        default:
            return null
        }
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-blue-50 to-blue-900 pt-[72px]">
            {/* For sm/md - on top with 3:2 */}
            <div className="w-full h-48 sm:h-64 md:h-72 lg:hidden relative">
                <div className="absolute inset-0 bg-blue-900">
                    <Image src="/bg/onboarding_mobile.png" alt="Developer profile" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-blue-900/60 flex flex-col justify-center items-center p-4 text-center">
                        <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">Join Our Developer Community</h3>
                        <p className="text-blue-100 text-sm sm:text-base">
                            Complete your profile to connect with other developers and access exclusive opportunities.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 lg:h-screen">
                <div className="w-full lg:w-3/4 bg-gradient-to-br from-blue-50 to-blue-100 overflow-y-auto scrollbar-hide">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Create Your Developer Profile</h1>
                            <p className="text-blue-700 mt-2 text-sm sm:text-base">
                                Complete all steps to set up your professional profile
                            </p>
                        </div>
                        {error && (
                            <div className="mb-4 lg:mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                                <p className="font-medium text-sm sm:text-base">{error}</p>
                            </div>
                        )}
                        <div className="mb-6 lg:mb-10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-blue-800 font-medium text-sm sm:text-base">
                                    Step {currentStep} of {totalSteps}
                                </span>
                                <span className="text-blue-800 font-medium text-sm sm:text-base">
                                    {Math.round((currentStep / totalSteps) * 100)}% Complete
                                </span>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-2.5">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-2.5 rounded-full transition-all duration-300 ease-in-out" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
                            </div>
                        </div>
                        <div>
                            {renderFormFields()}
                            <div className="mt-6 lg:mt-10 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                                <button type="button" onClick={prevStep} className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base disabled:cursor-not-allowed disabled:opacity-50 ${currentStep === 1? "bg-blue-100 text-blue-400": "bg-white text-blue-700 border-2 border-blue-500 hover:bg-blue-50" }`} disabled={currentStep === 1}>
                                    Previous Step
                                </button>
                                {currentStep < totalSteps ? (
                                    <button type="button" onClick={nextStep} className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg text-sm sm:text-base">
                                        Continue
                                    </button>
                                    ) : (
                                    <button type="button" onClick={submitHandler} disabled={isLoading} className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg flex items-center justify-center text-sm sm:text-base disabled:cursor-not-allowed disabled:opacity-50">
                                        {isLoading ? (
                                            <>
                                                <LoadingSpinner />
                                                Processing...
                                            </>
                                        ) : (
                                            "Complete Profile"
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* For lg - on top with 2:3 */}
                <div className="w-1/3 relative hidden lg:block">
                    <div className="absolute inset-0 bg-blue-900">
                        <Image src="/bg/onboarding_pc.png" alt="Developer profile" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-blue-900/60 flex flex-col justify-end p-8">
                            <h3 className="text-white text-2xl font-bold mb-2">Join Our Developer Community</h3>
                            <p className="text-blue-100">
                                Complete your profile to connect with other developers and access exclusive opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}