import { create } from "zustand";

export const useAuthLoginStore = create((set) => ({
    email: '',
    password: '',
    
    setEmail: (email) => set({email}),
    setPassword: (password) => set({password}),
    reset: () => set({ email: '', password: '' })
}))