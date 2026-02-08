const ShimmerEffect = ({ className = "" }) => {
    return (
        <div className={`animate-pulse relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent ${className}`}></div>
    )
}

export const ShimmerProfile = () => {
    return (
        <div className="bg-white rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-md overflow-hidden w-full max-w-[95%] mx-auto lg:ml-auto lg:mr-0 relative m-4">
            <div className="bg-[#1A1B2E] p-5 text-white">
                <div className="flex items-center gap-4">
                    <ShimmerEffect className="h-8 w-40 bg-gray-700 rounded-md" />
                </div>
            </div>
            <div className="p-5">
                <div className="mb-6 space-y-2">
                    <ShimmerEffect className="h-4 w-3/4 bg-gray-200 rounded-md" />
                    <ShimmerEffect className="h-4 w-full bg-gray-200 rounded-md" />
                </div>
                <div className="flex flex-row gap-4 mb-6">
                    <div className="flex-1 bg-cyan-200 p-4 rounded-lg text-center space-y-2">
                        <ShimmerEffect className="h-6 w-16 bg-gray-300 rounded-md mx-auto" />
                        <ShimmerEffect className="h-4 w-24 bg-gray-300 rounded-md mx-auto" />
                    </div>
                    <div className="flex-1 bg-blue-200 p-4 rounded-lg text-center space-y-2">
                        <ShimmerEffect className="h-6 w-16 bg-gray-300 rounded-md mx-auto" />
                        <ShimmerEffect className="h-4 w-24 bg-gray-300 rounded-md mx-auto" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <ShimmerEffect className="w-4 h-4 bg-gray-300 rounded-full" />
                            </div>
                            <div className="space-y-1">
                                <ShimmerEffect className="h-3 w-20 bg-gray-200 rounded-md" />
                                <ShimmerEffect className="h-4 w-28 bg-gray-200 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const ShimmerRepo = () => {
    return (
        <div className="space-y-3 sm:space-y-3 md:space-y-3 lg:space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-md n w-full max-w-[95%] mx-auto lg:ml-auto lg:mr-0 relative">
                    <div className="bg-[#1A1B2E] px-5 py-4">
                        <ShimmerEffect className="h-5 w-40 bg-gray-700 rounded-md" />
                    </div>
                    <div className="bg-white px-5 py-4 space-y-4">
                        <div className="space-y-2">
                            <ShimmerEffect className="h-4 w-full bg-gray-200 rounded-md" />
                            <ShimmerEffect className="h-4 w-3/4 bg-gray-200 rounded-md" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <ShimmerEffect className="h-4 w-24 bg-gray-200 rounded-md" />
                            <ShimmerEffect className="h-4 w-28 bg-gray-200 rounded-md" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map((t) => (
                                <ShimmerEffect key={t} className="h-6 w-16 bg-cyan-100 rounded-lg"/>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <ShimmerEffect className="h-10 w-full bg-blue-100 rounded-lg" />
                            <ShimmerEffect className="h-10 w-full bg-gray-100 rounded-lg" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export const ShimmerCalendar = () => {
    return (
    <div className="bg-white rounded-xl shadow-sm border relative m-4">
        <div className="mb-4">
            <div className="bg-[#1A1B2E] px-5 py-4 rounded-md mb-4">
                <ShimmerEffect className="h-6 w-40 bg-gray-600 rounded" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm px-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex flex-col items-center gap-1 text-center">
                        <ShimmerEffect className="w-10 h-10 bg-gray-200 rounded-lg" />
                        <ShimmerEffect className="h-5 w-8 bg-gray-300 rounded mt-1" />
                        <ShimmerEffect className="h-3 w-20 bg-gray-200 rounded mt-1" />
                    </div>
                ))}
            </div>
        </div>
        <div className="mb-4 px-4 m-2">
            <ShimmerEffect className="h-4 w-8 bg-gray-300 rounded mb-2" />
            <ShimmerEffect className="h-10 w-24 bg-gray-200 rounded-lg" />
        </div>
        <div className="relative px-4 pb-4">
            <div className="grid grid-cols-4 gap-6">
                {[...Array(8)].map((_, monthIndex) => (
                    <div key={monthIndex}>
                        <ShimmerEffect className="h-3 w-8 bg-gray-300 rounded mb-2 mx-auto" />
                        <div className="flex gap-[2px]">
                            {[...Array(5)].map((_, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-[2px]">
                                    {[...Array(7)].map((_, dayIndex) => (
                                      <ShimmerEffect key={dayIndex} className="w-3 h-3 bg-gray-200 rounded-sm" />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export const ShimmerContest = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border m-4">
            <div className="mb-4">
            <div className="bg-[#1A1B2E] px-5 py-4 rounded-md mb-4">
                <ShimmerEffect className="h-6 w-40 bg-gray-600 rounded" />
            </div>
            <div className="px-4 space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <ShimmerEffect className="w-10 h-10 bg-gray-200 rounded-lg" />
                        <div>
                            <ShimmerEffect className="h-4 w-24 bg-gray-300 rounded mb-2" />
                            <ShimmerEffect className="h-8 w-16 bg-gray-400 rounded" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <ShimmerEffect className="w-10 h-10 bg-gray-200 rounded-lg" />
                            <div>
                                <ShimmerEffect className="h-5 w-8 bg-gray-300 rounded mb-1" />
                                <ShimmerEffect className="h-3 w-16 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-lg border border-indigo-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <ShimmerEffect className="h-4 w-64 bg-gray-300 rounded" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export const LoadingSpinner = () => {
    return <div className="w-5 h-5 border-2 border-t-transparent border-[#03357a] rounded-full animate-spin ml-1" />
}
