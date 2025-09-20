import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "../api/apiClient";

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['login'], 
        mutationFn: async ({ email, password }) => {
            const res = await apiClient.post('/auth/login', { email, password })
            const { user, token } = res.data
            
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            
            queryClient.setQueryData(["user"], user)

            return { user, token }
        }       
    })
}

export const useRegister = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['register'],
        mutationFn: async ({ name, email, password }) => {
            const res = await apiClient.post('/auth/register', { name, email, password})
            return res.data
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            return true
        },
        onSuccess: () => {
            queryClient.clear()
        }
    })
}