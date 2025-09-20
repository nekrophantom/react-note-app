import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiClient from "../api/apiClient"

export const useNotes = () => {
    return useQuery({
        queryKey: ['notes'],
        queryFn: async () => (await apiClient.get('/notes')).data,
        enabled: !!localStorage.getItem("token")
    })    
}

export const useAddNote = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (newNote) => await apiClient.post('/notes', newNote),
        onSuccess: () => {
            queryClient.invalidateQueries(['notes'])
        }
    })
}

export const useUpdateNote = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, ...data }) => {
            const res = await apiClient.put(`/notes/${id}`, data);
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['notes'])
        }
    })
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id) => await apiClient.delete(`/notes/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['notes'])
        }
    })
}