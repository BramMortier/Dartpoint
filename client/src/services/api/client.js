import wretch from "wretch"

export const apiClient = wretch("http://localhost:3000", { mode: "cors" })
