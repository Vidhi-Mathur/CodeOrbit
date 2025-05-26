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
