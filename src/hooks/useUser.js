import { useQuery } from "@tanstack/react-query"

const isTokenExpired = (token) => {
    try {
        const { exp } = jwtDecode(token)
        return Date.now() >= exp * 1000
    } catch {
        return true
    }
}

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const token = localStorage.getItem("token")
            const user = localStorage.getItem('user');

            if (!token || !user || isTokenExpired(token)) {
                throw new Error("User not logged in or token expired")
            }

            return JSON.parse(user)
        },
        initialData: () => {
            const token = localStorage.getItem("token")
            const user = localStorage.getItem("user")

            if (!token || !user || isTokenExpired(token)) {
                return null
            }

            return JSON.parse(user)
        }
    })
}