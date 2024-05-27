export const timeSince = (date) => {
    const now = new Date()

    const seconds = Math.floor((now - date) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? "s" : ""}`
    } else if (hours < 24) {
        return `${hours} hour${hours !== 1 ? "s" : ""}`
    } else {
        return `${days} day${days !== 1 ? "s" : ""}`
    }
}
