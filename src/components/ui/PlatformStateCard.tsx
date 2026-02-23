import { PlatformStateProps } from "@/interfaces/profileInterfaces"

export const PlatformStateCard = ({ icon, title, message }: PlatformStateProps) => {
    return (
        <div className="flex items-center justify-center h-64 bg-white rounded-lg m-3 sm:m-4 lg:m-6 sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-md overflow-hidden w-full max-w-[95%] mx-auto lg:ml-auto lg:mr-0 relative">
            <div className="text-center">
                <div className="text-6xl mb-4">{icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600 capitalize">{message}</p>
            </div>
        </div>
    )
}