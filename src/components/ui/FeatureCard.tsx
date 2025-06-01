import { FeatureCardInterface } from "@/interfaces/hompageInterface"
import React from "react"

export const FeatureCard = ({ icon, title, description, gradient }: FeatureCardInterface) => {
  return (
    <div className="group relative bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        <div className="relative">
            <div className={`p-4 bg-gradient-to-br ${gradient} rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {React.createElement(icon, {className: "text-blue-600", style: { fontSize: "40px" }})}
            </div>
            <h3 className="text-2xl font-bold text-[#1A1B2E] mb-4 group-hover:text-blue-600 transition-colors">
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed font-medium">{description}</p>
        </div>
    </div>
  )
}