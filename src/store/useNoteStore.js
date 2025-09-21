import { create } from "zustand";

export const useNoteStore = create((set) => ({
    title: "",
    description: "",
    dueDate: null,
    showCalendar: false,


    setTitle:(title) => set({title}),
    setDescription: (description) => set({description}),
    setDueDate: (dueDate) => set({dueDate}),
    toggleCalendar: () => set((state) => ({showCalendar: !state.showCalendar})),
    reset: () => set({ title: '', description: '', dueDate: null })
}))