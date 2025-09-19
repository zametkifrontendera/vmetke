import { create } from 'zustand'

interface AppState {
  user: { id: string; name: string } | null
  setUser: (user: AppState['user']) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}))