"use client"
import type React from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import type { ChartOptions } from "chart.js"
import { CodeForcesProblemBreakdownProps } from "@/interfaces/dsa/codeforces/codeforcesInterface"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const CodeForcesProblemBreakdown = ({ problemBreakdown }: CodeForcesProblemBreakdownProps) => {
    const labels = problemBreakdown.map(item => item.rating.toString())
    const counts = problemBreakdown.map(item => item.count)
    const percentages = problemBreakdown.map(item => item.percentage)

    const data = {
        labels,
        datasets: [{
            label: "Solved Problems",
            data: counts,
            backgroundColor: "rgb(75, 192, 192)",
            borderRadius: 6,
            barThickness: 30
        }]
    }

    const chartOptions: ChartOptions<"bar"> = {
        indexAxis: "y" as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const index = context.dataIndex
                        return `${counts[index]} solved (${percentages[index]}%) >= ${labels[index]}) rating`
                    }
                }
            }
        },
        scales: {
            x: {
                border: {
                    display: false
                },
                grid: {
                    color: "#E5E7EB"
                },
                title: {
                    display: true,
                    text: "Problem Count",
                    font: {
                        size: window.innerWidth < 640? 8: 12,
                        weight: 600
                    },
                },
                ticks: {
                    color: "#374151",
                    font: {
                        size: window.innerWidth < 640? 7: 11
                    }
                }
            },
            y: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Rating",
                    font: {
                        size: window.innerWidth < 640? 8: 12,
                        weight: 600
                    },
                },
                ticks: {
                    color: "#374151",
                    font: {
                        size: window.innerWidth < 640? 7: 11
                    }
                }
            }
        }
    }

    return (
    <div className="bg-white rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-sm border relative m-1 sm:m-1.5 md:m-0 lg:m-2">
        <div className="mb-3 sm:mb-3 md:mb-3 lg:mb-4">
            <div className="bg-[#1A1B2E] px-3 sm:px-4 md:px-4 lg:px-5 py-2.5 sm:py-3 md:py-3 lg:py-4 rounded-md mb-3 sm:mb-3 md:mb-3 lg:mb-4">
                <h3 className="text-sm sm:text-base md:text-base lg:text-lg font-bold text-white leading-tight tracking-wide">
                    Problem Difficulty Breakdown
                </h3>
            </div>
            <div className="h-56 sm:h-64 md:h-72 lg:h-80 px-2 sm:px-3 md:px-4">
                <Bar data={data} options={chartOptions} />
            </div>
      </div>
    </div>
    )
}