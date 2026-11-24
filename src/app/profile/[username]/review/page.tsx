"use client";
import { useParams } from "next/navigation";
import { ProfileReview } from "@/interfaces/profileInterfaces";
import { useProfileReviewQuery } from "@/hooks/useProfileReview";
import { useState } from "react";


export default function Page() {
  const params = useParams();
  const rawUsername = params.username;
  const username = Array.isArray(rawUsername) ? rawUsername[0] : rawUsername;
  const {
    data: review,
    isLoading,
    error,
    refetch,
    regenerateReview
} = useProfileReviewQuery(username);

const [regenerating, setRegenerating] = useState(false);

const regenerateHandler = async () => {
    setRegenerating(true);
    try {
        await regenerateReview();
    } 
    catch(err){
        console.error("Regeneration failed:", error);
    } 
    finally {
        setRegenerating(false);
    }
};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyan-200 flex items-center justify-center text-lg font-medium text-gray-800">
        Generating AI review...
      </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen bg-cyan-200 flex flex-col items-center justify-center gap-4 p-6">
            <p className="text-red-600 font-medium text-center bg-white rounded-lg px-6 py-4">
                {error instanceof Error
                    ? error.message
                    : "Something went wrong"}
            </p>

            <button
                onClick={() => refetch()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
                Retry
            </button>
        </div>
    );
}

  if (!review) {
    return (
      <div className="min-h-screen bg-cyan-200 flex items-center justify-center text-gray-800">
        No review found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-100 to-teal-100 overflow-y-auto scrollbar-hide">
       <div className="max-w-7xl mx-auto p-4 sm:p-8 pt-20 sm:pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">AI Review</h1>
          <p className="text-gray-700">Your personalized developer assessment and growth roadmap</p>
        </div>

        {/* Main Grid - Left & Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-cyan-500">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {review.summary}
              </p>
            </div>

            {/* Strengths Card */}
            <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Your Strengths</h2>
              <ul className="space-y-3">
                {review.strengths.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-700 pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps Card */}
            <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Next Steps</h2>
              <ul className="space-y-3">
                {review.nextSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Readiness Score Card - Large */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 shadow-lg text-white">
              <p className="text-sm uppercase tracking-widest font-bold opacity-90 mb-2">Interview Readiness</p>
              <div className="flex items-baseline gap-1">
                <p className="text-7xl font-bold">{review.readinessScore}</p>
                <p className="text-2xl opacity-90">/10</p>
              </div>
              <div className="mt-6 bg-white/20 rounded-lg p-4">
                <p className="text-sm text-blue-100">
                  {review.readinessScore >= 8
                    ? "Excellent! You're well-prepared for interviews."
                    : review.readinessScore >= 6
                    ? "Good foundation. Continue improving with the roadmap below."
                    : "Focus on the skill gaps and follow the recommended steps."}
                </p>
              </div>
            </div>

            {/* Skill Gaps Card */}
            <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange-500">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Areas to Improve</h2>
              <ul className="space-y-3">
                {review.skillGaps.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-600 font-bold text-sm">!</span>
                    </div>
                    <span className="text-gray-700 pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regenerate Button */}
            <button onClick={regenerateHandler} disabled={regenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-60 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg cursor-pointer disabled:cursor-default">
              {regenerating? "Regenerating..." :'Regenerate Review'}
            </button>
          </div>
        </div>

        {/* 4 Week Roadmap - Full Width */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">4-Week Growth Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(review.roadmap).map(([week, tasks]) => (
              <div
                key={week}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-cyan-500"
              >
                <h3 className="font-bold text-gray-900 mb-4 text-lg capitalize">
                  {week.replace(/week(\d)/, "Week $1")}
                </h3>
                <ul className="space-y-2.5">
                  {tasks.map((task) => (
                    <li key={task} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-sm text-gray-700 leading-relaxed">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
