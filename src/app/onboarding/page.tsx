"use client"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { FormDataInterface } from "@/interfaces/onboardingInterface"
import { basicDetailsFields, codingProfilesFields, developmentFields, educationFields, initialFormData, socialFields, totalSteps } from "@/constants/onboardingConstant"

export default function OnboardingPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState<number>(1)
    const [formData, setFormData] = useState<FormDataInterface>(initialFormData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => {
        if(!prev) return prev
        const updatedSection = (section: any) => ({
            ...section,
            [name]: value,
        })
        switch (currentStep){
            case 1:
                return {
                    ...prev,
                    basicDetails: updatedSection(prev.basicDetails),
                }
            case 2:
                return {
                    ...prev,
                    education: updatedSection(prev.education),
                }
            case 3:
                return {
                    ...prev,
                    social: updatedSection(prev.social),
                }
            case 4:
                return {
                    ...prev,
                    development: updatedSection(prev.development),
                }
            case 5:
                return {
                    ...prev,
                codingProfiles: updatedSection(prev.codingProfiles),
                }
            default:
                return prev
            }
        })
    }

    const nextStep = () => {
        if(currentStep < totalSteps) setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        if(currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post("/api/onboarding", formData)
            if(response.status === 200){
                router.push(`/profile/${formData.basicDetails.username}`)
            }
        } 
        catch (err) {
            console.error("API call failed", err)
            setError("Something went wrong. Try again.")
        } 
        finally {
            setIsLoading(false)
        }
    }

    const renderFormFields = () => {
        switch (currentStep) {
        case 1:
            return (
                <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Basic Details</h2>
                    {basicDetailsFields.map((input) => (
                        <div key={input.id}>
                            <label htmlFor={input.id} className="block text-blue-700 font-semibold mb-2">{input.label}</label>
                            <input type="text" id={input.id} name={input.id} value={formData.basicDetails[input.id]} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue-50 text-blue-900" placeholder={input.placeholder} required />
                        </div>
                    ))}
                </div>
            )
        case 2:
            return (
                <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Education Details</h2>
                    {educationFields.map((input) => (
                        <div key={input.id}>
                            <label htmlFor={input.id} className="block text-blue-700 font-semibold mb-2">{input.label}</label>
                            <input type="text" id={input.id} name={input.id} value={formData.education[input.id]} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue-50 text-blue-900" placeholder={input.placeholder} required />
                        </div>
                    ))}
                </div>
            )
      case 3:
            return (
                <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Social Links</h2>
                    {socialFields.map((input) => (
                        <div key={input.id}>
                            <label htmlFor={input.id} className="block text-blue-700 font-semibold mb-2">{input.label}</label>
                            <input type="text" id={input.id} name={input.id} value={formData.social[input.id]} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue-50 text-blue-900" placeholder={input.placeholder} required />
                        </div>
                    ))}
                </div>
            )
        case 4:
            return (
                <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Development Profiles</h2>
                    {developmentFields.map((input) => (
                        <div key={input.id}>
                            <label htmlFor={input.id} className="block text-blue-700 font-semibold mb-2">{input.label}</label>
                            <input type="text" id={input.id} name={input.id} value={formData.development[input.id]} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue-50 text-blue-900" placeholder={input.placeholder} required />
                        </div>
                    ))}
                </div>
            )
        case 5:
            return (
                <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Coding Profiles</h2>
                    {codingProfilesFields.map((input) => (
                        <div key={input.id}>
                            <label htmlFor={input.id} className="block text-blue-700 font-semibold mb-2">{input.label}</label>
                            <input type="text" id={input.id} name={input.id} value={formData.codingProfiles[input.id]} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-blue-50 text-blue-900" placeholder={input.placeholder} required />
                        </div>
                    ))}
                </div>
            )
        default:
            return null
        }
    }

  return (
        <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-900">
            <div className="flex h-screen w-full mt-[72px]">
                <div className="w-3/4 bg-gradient-to-br from-blue-50 to-blue-100 overflow-y-auto scrollbar-hide">
                    <div className="max-w-3xl mx-auto px-8 py-10">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-blue-900">Create Your Developer Profile</h1>
                            <p className="text-blue-700 mt-2">Complete all steps to set up your professional profile</p>
                        </div>
                        {/* Error message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                                <p className="font-medium">{error}</p>
                            </div>
                        )}
                        {/* Progress bar */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-blue-800 font-medium">
                                    Step {currentStep} of {totalSteps}
                                </span>
                                <span className="text-blue-800 font-medium">
                                    {Math.round((currentStep / totalSteps) * 100)}% Complete
                                </span>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-2.5">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-2.5 rounded-full transition-all duration-300 ease-in-out" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
                            </div>
                        </div>
                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            {renderFormFields()}
                            {/* Navigation buttons */}
                                <div className="mt-10 flex justify-between">
                                    <button type="button" onClick={prevStep} className={`px-6 py-3 rounded-lg font-semibold transition-all ${currentStep === 1? "bg-blue-100 text-blue-400 cursor-not-allowed": "bg-white text-blue-700 border-2 border-blue-500 hover:bg-blue-50"}`} disabled={currentStep === 1}>
                                        Previous Step
                                    </button>
                                {currentStep < totalSteps ? (
                                    <button type="button" onClick={nextStep} className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg">
                                    Continue
                                    </button>
                                ) : (
                                    <button type="submit" disabled={isLoading} className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg flex items-center">
                                    {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                        </>
                                    ) : (
                                        "Complete Profile"
                                    )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                {/* Image Section (25% width) */}
                <div className="w-1/3 relative hidden md:block">
                    <div className="absolute inset-0 bg-blue-900">
                        <Image src="/bg/onboarding.png" alt="Developer profile" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-blue-900/60 flex flex-col justify-end p-8">
                            <h3 className="text-white text-2xl font-bold mb-2">Join Our Developer Community</h3>
                            <p className="text-blue-100">Complete your profile to connect with other developers and access exclusive opportunities.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
