export const getUsers = async () => {
    const response = await fetch("http://localhost:3000/users")
    const data = response.json()
    return data
}
