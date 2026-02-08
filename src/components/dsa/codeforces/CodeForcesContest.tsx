import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined"
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined"
import type { ContestStatsProps } from "@/interfaces/dsa/codeforces/codeforcesInterface"
import { formatRating, getRatingColor } from "@/lib/helper"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeSeriesScale } from "chart.js"
import { Line } from "react-chartjs-2"
import "chartjs-adapter-date-fns"
import type { ChartOptions } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeSeriesScale)

export const CodeForcesContest = ({ contest }: ContestStatsProps) => {
    const { currRating, maxRating, contestHistory } = contest
    const chartData = {
        datasets: [{
            label: "Rating",
            data: contestHistory.map((c) => ({
                x: new Date(c.contestTime * 1000),
                y: c.contestRating
            })),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.2,
            borderWidth: window.innerWidth < 640? 1: 3,
            pointRadius: window.innerWidth < 640? 1.5: 4,
            pointHoverRadius: window.innerWidth < 640? 3: 6
        }]
    }
    const chartOptions: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    title: (ctx: any) => {
                        const contest = contestHistory[ctx[0].dataIndex]
                        return contest.contestName
                    },
                    label: (ctx: any) => {
                        const contest = contestHistory[ctx.dataIndex]
                        return `Rating: ${contest.contestRating} | Rank: ${contest.contestRank}`
                    }
                }
            }
        },
        scales: {
            x: {
                type: "timeseries",
                time: {
                    unit: "year"
                },
                title: {
                    display: true,
                    text: "Year",
                    font: {
                        size: window.innerWidth < 640? 8: 12,
                        weight: 600
                    }
                },
                ticks: {
                    font: {
                        size: window.innerWidth < 640? 7: 11
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Rating",
                    font: {
                        size: window.innerWidth < 640? 8: 12,
                        weight: 600
                    },
                },
                ticks: {
                    font: {
                      size: window.innerWidth < 640? 7: 11
                    }
                }
            }
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-[95%] mx-auto lg:ml-auto lg:mr-0 relative">
            <div className="mb-2 sm:mb-3 md:mb-3 lg:mb-4">
                <div className="bg-[#1A1B2E] p-2 sm:p-4 md:p-3 lg:p-5 text-white mb-2 sm:mb-3 md:mb-3 lg:mb-4">
                    <h3 className="text-sm sm:text-base md:text-base lg:text-lg font-bold text-white leading-tight tracking-wider">
                        Contest Performance
                    </h3>
                </div>
                <div className="px-2 sm:px-3 md:px-3 lg:px-4 space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-3 lg:gap-4">
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3 p-2 sm:p-2.5 md:p-2 lg:p-3 bg-gray-50 rounded-lg">
                            <div className="p-1.5 sm:p-2 md:p-1.5 lg:p-2 bg-yellow-100 rounded-lg">
                                <EmojiEventsOutlinedIcon className="text-yellow-600" style={{ fontSize: "16px" }} />
                            </div>
                            <div>
                                <div className={`text-lg sm:text-2xl md:text-xl lg:text-3xl font-black tracking-tight ${getRatingColor(maxRating)}`}>
                                    {formatRating(maxRating)}
                                </div>
                                <div className="text-[10px] sm:text-xs md:text-xs lg:text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Maximum Rating
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3 p-2 sm:p-2.5 md:p-2 lg:p-3 bg-green-50 rounded-lg">
                            <div className="p-1.5 sm:p-2 md:p-1.5 lg:p-2 bg-green-100 rounded-lg">
                                <TrendingUpOutlinedIcon className="text-green-600" style={{ fontSize: "14px" }} />
                            </div>
                            <div>
                                <div className="text-sm sm:text-base md:text-sm lg:text-lg font-bold text-gray-900">
                                    {formatRating(currRating)}
                                </div>
                                <div className="text-[10px] sm:text-xs md:text-xs lg:text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Current Rating
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-0.5 sm:p-3">
                <div className="h-[180px] sm:h-[400px] md:h-[500px] lg:h-[650px]">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    )
}
