import { InfoLink, months } from "@/constants/profileConstant"
import { AboutProps } from "@/interfaces/profileInterfaces"

export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
}

export const calculateYears= (dateString: string) => {
    const created = new Date(dateString)
    const now = new Date()
    let years = now.getFullYear() - created.getFullYear()
    let months = now.getMonth() - created.getMonth()
    if(months < 0){
        years--;
        months += 12;
    }
    return `${years} year${years !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''} `;
}

//Get the current date and calculate the start date (here is 1st Jan), and generate all dates for the year
export const generateDates = (year: number) => {
    const dates = []
    const today = new Date()
    const start = new Date(year, 0, 1) 
    const end = new Date(year === today.getFullYear() ? today : new Date(year, 11, 31)) 
    const current = new Date(start)
    while(current <= end){
        dates.push(new Date(current))
        current.setDate(current.getDate() + 1)
    }
    return dates
}

//Get color intensity based on submission count
export const getIntensity = (count: number) => {
    if(count === 0) return "bg-gray-100 border-gray-200"
    if(count <= 2) return "bg-green-200 border-green-300"
    if(count <= 5) return "bg-green-400 border-green-500"
    if(count <= 10) return "bg-green-600 border-green-700"
    return "bg-green-800 border-green-900"
}

//Group dates by month, then organize into weeks within each month
export const groupDatesByMonth = (dates: Date[]) => {
    const monthGroups: {
        month: number
        year: number
        label: string
        weeks: (Date | null)[][]
    }[] = []

    //Group dates by month-year
    const datesByMonth: { [key: string]: Date[] } = {}
    //Iterate through all dates and group them by month
    dates.forEach((date) => {
        const monthKey = `${date.getFullYear()}-${date.getMonth().toString().padStart(2, "0")}`
        if(!datesByMonth[monthKey]){
            datesByMonth[monthKey] = []
        }
        datesByMonth[monthKey].push(date)
    })

    //Convert each month's dates into week structure (sort chronologically)
    Object.keys(datesByMonth).sort((a, b) => {
        const [yearA, monthA] = a.split("-").map(Number)
        const [yearB, monthB] = b.split("-").map(Number)
        if(yearA !== yearB) return yearA - yearB
        return monthA - monthB
    }).forEach((monthKey) => {
        const [year, month] = monthKey.split("-").map(Number)
        const monthDates = datesByMonth[monthKey]

        if (monthDates.length === 0) return

        //Create weeks for this month
        const weeks: (Date | null)[][] = []
        let currentWeek: (Date | null)[] = []

        //Find the first date and determine what day of week it starts on
        const firstDate = monthDates[0]
        //[0, 6] = [Sunday, Saturday]
        const startDayOfWeek = firstDate.getDay()

        //Fill in empty slots at the beginning of the first week if needed
        for(let i = 0; i < startDayOfWeek; i++){
          currentWeek.push(null)
        }

        //Add all dates for this month
        monthDates.forEach((date) => {
            currentWeek.push(date)
            //Filled a week, start new
            if(currentWeek.length === 7){
                weeks.push([...currentWeek])
                currentWeek = []
            }
        })

        //Fill the last week with nulls if needed
        while(currentWeek.length > 0 && currentWeek.length < 7){
            currentWeek.push(null)
        }

        //If there are any remaining days in the current week, add it to weeks
        if(currentWeek.length > 0){
            weeks.push(currentWeek)
        }

        //Add this month group
        monthGroups.push({ month, year, label: months[month], weeks })
    })
    return monthGroups
}

//Format large numbers with commas 
export const formatNumber = (num: number) => {
    return num.toLocaleString()
}

//Format rating to 2 decimal places
export const formatRating = (rating: number) => {
    return Math.round(rating).toString()
}

//Get rating color based on value
export const getRatingColor = (rating: number) => {
    if(rating >= 2100) return "text-red-600"
    if(rating >= 1900) return "text-orange-500"
    if(rating >= 1600) return "text-purple-600"
    if(rating >= 1400) return "text-blue-600"
    return "text-green-600"
}

export const getRedirection = (key: InfoLink, info: AboutProps["info"], email: string): string => {
    switch (key) {
        case "email":
            return `mailto:${email}`;
        case "linkedin":
            return info.linkedin ? `https://www.linkedin.com/in/${info.linkedin}` : "/";
        case "twitter":
            return info.twitter ? `https://x.com/${info.twitter}` : "/";
        case "website":
            return info.website || "/";
        default:
            return "/";
    }
}