import { create } from "zustand";

export const useAuthRegisterStore = create((set) => ({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    setName: (name) => set({name}),
    setEmail: (email) => set({email}),
    setPassword: (password) => set({password}),
    setConfirmPassword: (confirmPassword) => set({confirmPassword}),
    reset: () => set({ name: '', email: '', password: '', confirmPassword: '' })
}))